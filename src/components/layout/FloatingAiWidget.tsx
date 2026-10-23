import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Globe,
  Loader2,
  MapPin,
  Maximize2,
  Mic,
  Send,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import { AstatecLogo } from "@/components/ui/AstatecLogo";

type GroundingSource = {
  kind: "web" | "maps";
  title: string;
  uri: string;
  snippet?: string;
};

type ChatMsg = {
  id: string;
  role: "user" | "model";
  text: string;
  modelUsed?: string;
  sources?: GroundingSource[];
};

const QUICK_PROMPTS = [
  "Aniket च्या सर्व ७ वेबसाईट्स दाखव",
  "Who is Aniket Bhalerao & what is LuminaLM?",
  "Tell me about ToolNami & Bioscience tools",
  "How can I hire or collaborate with Aniket?",
] as const;

export function FloatingAiWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [useSearch, setUseSearch] = useState(true);
  const [useMaps, setUseMaps] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: "welcome",
      role: "model",
      text: "नमस्कार! मी **ASTATEC AI** (LuminaLM Intelligence) आहे. मला अनिकेत भालेरावच्या ७ लाईव्ह वेबसाईट्स, 3D स्टुडिओ, Bioscience टूल्स किंवा प्रोजेक्ट्सबद्दल मराठी किंवा English मध्ये काहीही विचारा!",
      modelUsed: "gemini-3.8-flash",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendPrompt = async (promptText: string) => {
    const trimmed = promptText.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      text: trimmed,
    };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextHistory.map((m) => ({ role: m.role, text: m.text })),
          model: "gemini-3.8-flash",
          useSearch,
          useMaps,
        }),
      });
      const data = (await res.json()) as {
        text?: string;
        modelUsed?: string;
        sources?: GroundingSource[];
      };

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          role: "model",
          text: data.text || "I processed your request.",
          modelUsed: data.modelUsed || "gemini-3.8-flash",
          sources: data.sources ?? [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "model",
          text: "कनेक्शनमध्ये अडचण आली. तुम्ही `/ai-studio` वर जाऊन पूर्ण AI Workspace वापरू शकता.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const speakMessage = async (msg: ChatMsg) => {
    if (speakingId === msg.id) return;
    setSpeakingId(msg.id);
    try {
      const res = await fetch("/api/ai/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: msg.text.replace(/[*#`]/g, ""), voice: "Zephyr" }),
      });
      const data = (await res.json()) as { audioDataUrl?: string };
      if (data.audioDataUrl) {
        const audio = new Audio(data.audioDataUrl);
        audio.onended = () => setSpeakingId(null);
        await audio.play();
      } else if ("speechSynthesis" in window) {
        const u = new SpeechSynthesisUtterance(msg.text.replace(/[*#`]/g, ""));
        u.onend = () => setSpeakingId(null);
        window.speechSynthesis.speak(u);
      } else {
        setSpeakingId(null);
      }
    } catch {
      setSpeakingId(null);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[85]">
      {open ? (
        <div className="flex h-[min(36rem,82vh)] w-[min(25rem,92vw)] flex-col border border-accent-blue/50 bg-background shadow-[0_30px_90px_rgba(0,0,0,0.75)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-hairline bg-surface px-4 py-3">
            <div className="flex items-center gap-2.5">
              <AstatecLogo size={26} />
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                  ASTATEC AI · LUMINALM
                </p>
                <p className="font-mono text-[9px] uppercase text-accent-yellow">
                  Real-Time Portfolio Co-Pilot
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Link
                to="/ai-studio"
                onClick={() => setOpen(false)}
                title="Open Full AI Studio"
                className="inline-flex items-center gap-1 border border-hairline bg-background px-2 py-1 font-mono text-[9px] uppercase text-accent-blue transition-colors hover:border-accent-yellow hover:text-accent-yellow"
              >
                <Maximize2 className="size-3" />
                <span>Full Studio</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close AI Widget"
                className="grid size-7 place-items-center border border-hairline text-ink-soft hover:text-ink"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Real-Time Grounding Bar */}
          <div className="flex items-center justify-between border-b border-hairline bg-surface/60 px-3.5 py-1.5 font-mono text-[9px] uppercase">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setUseSearch(!useSearch);
                  if (!useSearch) setUseMaps(false);
                }}
                className={`inline-flex items-center gap-1 px-2 py-0.5 transition-colors ${
                  useSearch
                    ? "bg-accent-blue text-primary-foreground"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                <Globe className="size-2.5" /> Search
              </button>
              <button
                type="button"
                onClick={() => {
                  setUseMaps(!useMaps);
                  if (!useMaps) setUseSearch(false);
                }}
                className={`inline-flex items-center gap-1 px-2 py-0.5 transition-colors ${
                  useMaps
                    ? "bg-accent-yellow text-accent-foreground"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                <MapPin className="size-2.5" /> Maps
              </button>
            </div>
            <span className="text-ink-soft">Gemini 3.8 Flash</span>
          </div>

          {/* Scrollable Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-3.5">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] border p-3 text-xs leading-relaxed ${
                    m.role === "user"
                      ? "border-accent-blue/60 bg-accent-blue/15 text-ink"
                      : "border-hairline bg-surface text-ink"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>

                  {m.sources && m.sources.length > 0 ? (
                    <div className="mt-2.5 border-t border-hairline pt-2">
                      <p className="font-mono text-[9px] uppercase text-accent-yellow">
                        Live Grounding Sources:
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {m.sources.slice(0, 3).map((s, idx) => (
                          <a
                            key={`${s.uri}-${idx}`}
                            href={s.uri}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1 border border-hairline bg-background px-2 py-0.5 font-mono text-[9px] text-accent-blue hover:border-accent-yellow"
                          >
                            <span className="max-w-[140px] truncate">{s.title}</span>
                            <ArrowUpRight className="size-2.5 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {m.role === "model" ? (
                    <div className="mt-2 flex items-center justify-between border-t border-hairline/60 pt-1.5 font-mono text-[9px] text-ink-soft">
                      <span>{m.modelUsed ?? "astatec-core"}</span>
                      <button
                        type="button"
                        onClick={() => void speakMessage(m)}
                        className="inline-flex items-center gap-1 text-accent-blue hover:text-accent-yellow"
                      >
                        <Volume2 className="size-3" />
                        {speakingId === m.id ? "Speaking..." : "Listen"}
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {loading ? (
              <div className="flex items-center gap-2 border border-hairline bg-surface p-2.5 font-mono text-[10px] uppercase text-accent-yellow">
                <Loader2 className="size-3.5 animate-spin" />
                <span>Astatec AI thinking...</span>
              </div>
            ) : null}
          </div>

          {/* Quick Prompt Starters */}
          <div className="flex gap-1.5 overflow-x-auto border-t border-hairline bg-surface/50 px-3 py-2">
            {QUICK_PROMPTS.map((qp) => (
              <button
                key={qp}
                type="button"
                onClick={() => void sendPrompt(qp)}
                className="shrink-0 border border-hairline bg-background px-2.5 py-1 font-mono text-[9px] text-ink-soft transition-colors hover:border-accent-blue hover:text-ink"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void sendPrompt(input);
            }}
            className="flex items-center gap-2 border-t border-hairline bg-surface p-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Astatec AI (Marathi / English)..."
              className="h-9 flex-1 border border-hairline bg-background px-3 text-xs text-ink outline-none focus:border-accent-blue"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="grid size-9 place-items-center bg-accent-blue text-primary-foreground transition-colors hover:bg-accent-blue/90 disabled:opacity-50"
            >
              <Send className="size-3.5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          data-cursor="AI Chat"
          className="group flex items-center gap-3 border border-accent-blue/60 bg-background/95 px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-yellow"
        >
          <AstatecLogo size={26} />
          <div className="text-left">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
              ASTATEC AI
            </p>
            <p className="font-mono text-[9px] uppercase text-accent-yellow">
              Ask Portfolio · Live Grounding
            </p>
          </div>
        </button>
      )}
    </div>
  );
}
