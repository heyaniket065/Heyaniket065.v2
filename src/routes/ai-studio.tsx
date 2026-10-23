import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  ArrowUpRight,
  Bot,
  Check,
  Copy,
  Download,
  Globe,
  ImagePlus,
  Loader2,
  MapPin,
  MessageSquarePlus,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Trash2,
  Upload,
  Volume2,
  Wand2,
} from "lucide-react";
import { AstatecLogo } from "@/components/ui/AstatecLogo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/ai-studio")({
  head: () => ({
    meta: [
      { title: "Astatec AI Studio — LuminaLM Intelligence by Aniket Bhalerao" },
      {
        name: "description",
        content:
          "Full-featured AI workspace powered by Gemini 4 Argon, Gemini 3.8 Flash, Nano Banana 2.1 image studio, Google Search & Maps grounding, and real-time voice.",
      },
    ],
  }),
  component: AiStudioPage,
});

type GroundingSource = {
  kind: "web" | "maps";
  title: string;
  uri: string;
  snippet?: string;
};

type Message = {
  id: string;
  role: "user" | "model";
  text: string;
  modelUsed?: string;
  timestamp: string;
  sources?: GroundingSource[];
  imageUrl?: string;
};

type Thread = {
  id: string;
  title: string;
  updatedAt: string;
  messages: Message[];
};

const MODELS = [
  {
    id: "gemini-4-argon",
    label: "Gemini 4 Argon",
    badge: "Deep Reasoning & STEM",
  },
  {
    id: "gemini-3.8-flash",
    label: "Gemini 3.8 Flash",
    badge: "Balanced & Grounding",
  },
  {
    id: "gemini-3.1-flash-lite",
    label: "Gemini 3.1 Flash-Lite",
    badge: "Ultra-Fast",
  },
] as const;

const STARTER_CARDS = [
  {
    category: "Portfolio Ecosystem",
    title: "Explore all 7 live websites by Aniket Bhalerao",
    prompt:
      "Give me a complete breakdown of all 7 live websites in Aniket Bhalerao's digital ecosystem and their URLs.",
  },
  {
    category: "Marathi Co-Pilot",
    title: "अनिकेत भालेराव आणि LuminaLM बद्दल माहिती",
    prompt:
      "अनिकेत भालेराव कोण आहे आणि त्याच्या LuminaLM इकोसिस्टम, 3D स्टुडिओ आणि प्रोजेक्ट्सबद्दल मराठीत माहिती दे.",
  },
  {
    category: "Live Web Search",
    title: "Latest breakthroughs in AI & Protein Design",
    prompt:
      "What are the latest breakthroughs in AI agents and AlphaFold protein structure design?",
  },
  {
    category: "Case Study Strategy",
    title: "Deconstruct 'Madara in Phonk' & 'Dark Psychology'",
    prompt:
      "Explain the creative strategy, research, and execution behind Aniket's Madara in Phonk and Dark Psychology series.",
  },
] as const;

const ASPECT_RATIOS = ["1:1", "16:9", "4:3", "3:4", "9:16"] as const;
const IMAGE_SIZES = ["1K", "2K", "4K"] as const;

function AiStudioPage() {
  const [activeTab, setActiveTab] = useState<"chat" | "image" | "voice">("chat");
  const [selectedModel, setSelectedModel] = useState<string>("gemini-4-argon");
  const [useSearch, setUseSearch] = useState<boolean>(true);
  const [useMaps, setUseMaps] = useState<boolean>(false);
  const [userCoords, setUserCoords] = useState<{ latitude: number; longitude: number } | null>(
    null,
  );

  const [threads, setThreads] = useState<Thread[]>([
    {
      id: "default-thread",
      title: "LuminaLM Intelligence Session",
      updatedAt: "Just now",
      messages: [
        {
          id: "welcome-1",
          role: "model",
          text: "Welcome to **ASTATEC AI Studio** — the flagship intelligence workspace for **Aniket Bhalerao × LuminaLM**.\n\nYou can switch between **Gemini 4 Argon**, **Gemini 3.8 Flash**, and **Gemini 3.1 Flash-Lite**, enable real-time **Google Search** or **Google Maps Grounding**, generate/edit visuals with **Nano Banana 2.1**, or converse via **Live Voice**.",
          modelUsed: "gemini-4-argon",
          timestamp: "Now",
        },
      ],
    },
  ]);
  const [activeThreadId, setActiveThreadId] = useState<string>("default-thread");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Image Studio State
  const [imgPrompt, setImgPrompt] = useState(
    "Architectural dark navy creative laboratory with glowing cobalt holographic chronometer, editorial 8k photography",
  );
  const [aspectRatio, setAspectRatio] = useState<string>("16:9");
  const [imageSize, setImageSize] = useState<string>("1K");
  const [uploadedImage, setUploadedImage] = useState<{
    base64: string;
    mimeType: string;
    preview: string;
  } | null>(null);
  const [generatedImages, setGeneratedImages] = useState<
    Array<{ id: string; url: string; prompt: string; model: string }>
  >([]);
  const [imgLoading, setImgLoading] = useState(false);
  const [imgError, setImgError] = useState<string | null>(null);

  // Voice Conversation State
  const [listening, setListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [voiceReply, setVoiceReply] = useState(
    "Tap the microphone below to speak with Astatec AI in real time.",
  );
  const [voiceName, setVoiceName] = useState<"Zephyr" | "Kore" | "Puck">("Zephyr");

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const currentThread = threads.find((t) => t.id === activeThreadId) ?? threads[0];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentThread?.messages, loading]);

  const toggleMapsGrounding = () => {
    const next = !useMaps;
    setUseMaps(next);
    if (next) {
      setUseSearch(false);
      if ("geolocation" in navigator && !userCoords) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setUserCoords({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          },
          () => {
            // ignore permission denial
          },
        );
      }
    }
  };

  const createNewThread = () => {
    const id = `thread-${Date.now()}`;
    const newT: Thread = {
      id,
      title: `Session ${threads.length + 1}`,
      updatedAt: "Just now",
      messages: [
        {
          id: `w-${Date.now()}`,
          role: "model",
          text: "New **ASTATEC AI** thread initialized. Ask me anything in Marathi, Hindi, or English—or query live web and maps data.",
          modelUsed: selectedModel,
          timestamp: "Now",
        },
      ],
    };
    setThreads((prev) => [newT, ...prev]);
    setActiveThreadId(id);
  };

  const handleSendChat = async (promptOverride?: string) => {
    const text = (promptOverride ?? input).trim();
    if (!text || loading || !currentThread) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...currentThread.messages, userMessage];
    setThreads((prev) =>
      prev.map((t) =>
        t.id === currentThread.id
          ? {
              ...t,
              title: t.messages.length <= 1 ? text.slice(0, 34) : t.title,
              updatedAt: "Just now",
              messages: updatedMessages,
            }
          : t,
      ),
    );
    if (!promptOverride) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, text: m.text })),
          model: selectedModel,
          useSearch,
          useMaps,
          latLng: userCoords,
        }),
      });
      const data = (await res.json()) as {
        text?: string;
        modelUsed?: string;
        sources?: GroundingSource[];
      };

      const modelMessage: Message = {
        id: `m-${Date.now()}`,
        role: "model",
        text: data.text || "Response generated.",
        modelUsed: data.modelUsed || selectedModel,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sources: data.sources ?? [],
      };

      setThreads((prev) =>
        prev.map((t) =>
          t.id === currentThread.id ? { ...t, messages: [...updatedMessages, modelMessage] } : t,
        ),
      );
    } catch {
      const errMsg: Message = {
        id: `err-${Date.now()}`,
        role: "model",
        text: "Unable to reach the server right now. Please try again.",
        timestamp: "Now",
      };
      setThreads((prev) =>
        prev.map((t) =>
          t.id === currentThread.id ? { ...t, messages: [...updatedMessages, errMsg] } : t,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      const base64 = result.split(",")[1] ?? "";
      setUploadedImage({
        base64,
        mimeType: file.type || "image/png",
        preview: result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateImage = async () => {
    if (!imgPrompt.trim() || imgLoading) return;
    setImgLoading(true);
    setImgError(null);
    try {
      const res = await fetch("/api/ai/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: imgPrompt,
          aspectRatio,
          imageSize,
          ...(uploadedImage
            ? { base64Image: uploadedImage.base64, mimeType: uploadedImage.mimeType }
            : {}),
        }),
      });
      const data = (await res.json()) as {
        imageUrl?: string;
        modelUsed?: string;
        error?: string;
      };
      if (data.imageUrl) {
        setGeneratedImages((prev) => [
          {
            id: `img-${Date.now()}`,
            url: data.imageUrl!,
            prompt: imgPrompt,
            model: data.modelUsed || "gemini-nano-banana-2.1",
          },
          ...prev,
        ]);
      } else {
        setImgError(
          data.error ||
            "Image generation with gemini-nano-banana-2.1 requires a billing-enabled Gemini API key in Settings > Secrets.",
        );
      }
    } catch {
      setImgError("Could not complete image synthesis request.");
    } finally {
      setImgLoading(false);
    }
  };

  const speakText = async (id: string, text: string) => {
    setSpeakingId(id);
    try {
      const res = await fetch("/api/ai/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.replace(/[*#`]/g, ""), voice: voiceName }),
      });
      const data = (await res.json()) as { audioDataUrl?: string };
      if (data.audioDataUrl) {
        const audio = new Audio(data.audioDataUrl);
        audio.onended = () => setSpeakingId(null);
        await audio.play();
      } else if ("speechSynthesis" in window) {
        const u = new SpeechSynthesisUtterance(text.replace(/[*#`]/g, ""));
        u.onend = () => setSpeakingId(null);
        window.speechSynthesis.speak(u);
      } else {
        setSpeakingId(null);
      }
    } catch {
      setSpeakingId(null);
    }
  };

  const toggleVoiceConversation = () => {
    const SpeechRec =
      (
        window as unknown as {
          SpeechRecognition?: new () => {
            lang: string;
            start: () => void;
            stop: () => void;
            onresult: (ev: { results: Array<Array<{ transcript: string }>> }) => void;
            onend: () => void;
          };
        }
      ).SpeechRecognition ||
      (
        window as unknown as {
          webkitSpeechRecognition?: new () => {
            lang: string;
            start: () => void;
            stop: () => void;
            onresult: (ev: { results: Array<Array<{ transcript: string }>> }) => void;
            onend: () => void;
          };
        }
      ).webkitSpeechRecognition;

    if (!SpeechRec) {
      void speakText(
        "voice-demo",
        "Voice mode active. Ask me about Aniket Bhalerao's LuminaLM ecosystem.",
      );
      return;
    }

    if (listening) {
      setListening(false);
      return;
    }

    const recognition = new SpeechRec();
    recognition.lang = "en-IN";
    setListening(true);
    recognition.onresult = async (event) => {
      const spoken = event.results[0]?.[0]?.transcript ?? "";
      setVoiceTranscript(spoken);
      setListening(false);
      if (spoken.trim()) {
        setVoiceReply("Thinking...");
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", text: spoken }],
            model: "gemini-3.8-flash",
            useSearch: true,
          }),
        });
        const data = (await res.json()) as { text?: string };
        const answer = data.text || "Here is what I found.";
        setVoiceReply(answer);
        await speakText(`v-${Date.now()}`, answer);
      }
    };
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-editorial">
        {/* Top Studio Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border border-hairline bg-surface p-5">
          <div className="flex items-center gap-3.5">
            <AstatecLogo size={38} />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent-yellow">
                LuminaLM Intelligence OS · Multi-Model Workspace
              </p>
              <h1 className="font-display text-2xl tracking-normal sm:text-4xl">
                ASTATEC AI STUDIO
              </h1>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className={`px-4 py-2 font-mono text-[10px] uppercase transition-colors ${
                activeTab === "chat"
                  ? "bg-accent-blue text-primary-foreground"
                  : "border border-hairline bg-background text-ink-soft hover:text-ink"
              }`}
            >
              01 · Chat & Grounding
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("image")}
              className={`px-4 py-2 font-mono text-[10px] uppercase transition-colors ${
                activeTab === "image"
                  ? "bg-accent-blue text-primary-foreground"
                  : "border border-hairline bg-background text-ink-soft hover:text-ink"
              }`}
            >
              02 · Image Studio (Nano Banana 2.1)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("voice")}
              className={`px-4 py-2 font-mono text-[10px] uppercase transition-colors ${
                activeTab === "voice"
                  ? "bg-accent-blue text-primary-foreground"
                  : "border border-hairline bg-background text-ink-soft hover:text-ink"
              }`}
            >
              03 · Live Voice Co-Pilot
            </button>
          </div>
        </div>

        {activeTab === "chat" ? (
          <div className="grid min-h-[72vh] border border-hairline bg-surface lg:grid-cols-[17rem_1fr]">
            {/* Left Sidebar: Threads & Capabilities */}
            <aside className="flex flex-col justify-between border-b border-hairline bg-background/70 p-4 lg:border-b-0 lg:border-r">
              <div>
                <Button
                  type="button"
                  onClick={createNewThread}
                  className="h-10 w-full justify-start rounded-none bg-accent-blue font-mono text-[10px] uppercase text-primary-foreground hover:bg-accent-blue/90"
                >
                  <MessageSquarePlus className="mr-2 size-4" /> New Conversation
                </Button>

                <p className="mt-6 font-mono text-[9px] uppercase text-ink-soft">Active Threads</p>
                <ul className="mt-2 space-y-1.5">
                  {threads.map((t) => (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => setActiveThreadId(t.id)}
                        className={`w-full border p-2.5 text-left transition-colors ${
                          t.id === activeThreadId
                            ? "border-accent-blue bg-surface text-ink"
                            : "border-hairline bg-background/50 text-ink-soft hover:text-ink"
                        }`}
                      >
                        <p className="truncate text-xs font-medium">{t.title}</p>
                        <p className="mt-0.5 font-mono text-[9px] uppercase text-ink-soft">
                          {t.messages.length} msgs · {t.updatedAt}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-hairline pt-4">
                <p className="font-mono text-[9px] uppercase text-accent-yellow">
                  Grounded Knowledge
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                  Trained on all 07 LuminaLM websites, case studies, skills, 3D core, and live
                  Google Search & Maps.
                </p>
              </div>
            </aside>

            {/* Right Main Chat Area */}
            <div className="flex flex-col justify-between">
              {/* Top Model & Grounding Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-background/50 px-5 py-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {MODELS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedModel(m.id)}
                      className={`px-3 py-1.5 font-mono text-[10px] uppercase transition-colors ${
                        selectedModel === m.id
                          ? "border border-accent-yellow bg-surface-strong text-accent-yellow"
                          : "border border-hairline bg-background text-ink-soft hover:text-ink"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setUseSearch(!useSearch);
                      if (!useSearch) setUseMaps(false);
                    }}
                    className={`inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono text-[10px] uppercase transition-colors ${
                      useSearch
                        ? "border-accent-blue bg-accent-blue/20 text-ink"
                        : "border-hairline bg-background text-ink-soft"
                    }`}
                  >
                    <Globe className="size-3.5 text-accent-blue" />
                    <span>Google Search: {useSearch ? "ON" : "OFF"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleMapsGrounding}
                    className={`inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono text-[10px] uppercase transition-colors ${
                      useMaps
                        ? "border-accent-yellow bg-accent-yellow/20 text-ink"
                        : "border-hairline bg-background text-ink-soft"
                    }`}
                  >
                    <MapPin className="size-3.5 text-accent-yellow" />
                    <span>Google Maps: {useMaps ? "ON" : "OFF"}</span>
                  </button>
                </div>
              </div>

              {/* Scrollable Message Stream */}
              <div className="max-h-[56vh] flex-1 space-y-5 overflow-y-auto p-5 md:p-7">
                {currentThread?.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "model" ? <AstatecLogo size={28} className="mt-1" /> : null}
                    <div
                      className={`max-w-3xl border p-4 md:p-5 ${
                        msg.role === "user"
                          ? "border-accent-blue/60 bg-accent-blue/15 text-ink"
                          : "border-hairline bg-background text-ink"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 border-b border-hairline/60 pb-2 font-mono text-[9px] uppercase text-ink-soft">
                        <span>
                          {msg.role === "user"
                            ? "You"
                            : `ASTATEC AI · ${msg.modelUsed ?? selectedModel}`}
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">
                        {msg.text}
                      </div>

                      {msg.sources && msg.sources.length > 0 ? (
                        <div className="mt-4 border-t border-hairline pt-3">
                          <p className="font-mono text-[9px] uppercase text-accent-yellow">
                            Verified Grounding Citations ({msg.sources.length})
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {msg.sources.map((src, i) => (
                              <a
                                key={`${src.uri}-${i}`}
                                href={src.uri}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex items-center gap-1.5 border border-hairline bg-surface px-2.5 py-1 font-mono text-[10px] text-accent-blue hover:border-accent-yellow"
                              >
                                {src.kind === "maps" ? (
                                  <MapPin className="size-3 text-accent-yellow" />
                                ) : (
                                  <Globe className="size-3" />
                                )}
                                <span className="max-w-[220px] truncate">{src.title}</span>
                                <ArrowUpRight className="size-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {msg.role === "model" ? (
                        <div className="mt-3 flex items-center gap-3 border-t border-hairline/50 pt-2.5 font-mono text-[10px] uppercase text-ink-soft">
                          <button
                            type="button"
                            onClick={() => {
                              void navigator.clipboard.writeText(msg.text);
                              setCopiedId(msg.id);
                              setTimeout(() => setCopiedId(null), 1600);
                            }}
                            className="inline-flex items-center gap-1 hover:text-ink"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="size-3 text-accent-yellow" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="size-3" /> Copy
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => void speakText(msg.id, msg.text)}
                            className="inline-flex items-center gap-1 hover:text-accent-yellow"
                          >
                            <Volume2 className="size-3 text-accent-blue" />
                            <span>{speakingId === msg.id ? "Playing Audio..." : "Read Aloud"}</span>
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}

                {loading ? (
                  <div className="flex items-center gap-3 border border-hairline bg-background p-4 font-mono text-xs text-accent-yellow">
                    <Loader2 className="size-4 animate-spin" />
                    <span>
                      Synthesizing with {selectedModel}
                      {useSearch ? " + Google Search Grounding" : ""}
                      {useMaps ? " + Google Maps Grounding" : ""}...
                    </span>
                  </div>
                ) : null}

                {/* Starter Prompt Cards when conversation has only 1 message */}
                {currentThread && currentThread.messages.length <= 1 ? (
                  <div className="grid gap-3 pt-4 sm:grid-cols-2">
                    {STARTER_CARDS.map((card) => (
                      <button
                        key={card.title}
                        type="button"
                        onClick={() => void handleSendChat(card.prompt)}
                        className="group border border-hairline bg-background/70 p-4 text-left transition-colors hover:border-accent-blue hover:bg-background"
                      >
                        <p className="font-mono text-[9px] uppercase text-accent-yellow">
                          {card.category}
                        </p>
                        <p className="mt-1.5 text-sm font-semibold group-hover:text-accent-blue">
                          {card.title}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : null}

                <div ref={chatEndRef} />
              </div>

              {/* Bottom Prompt Composer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSendChat();
                }}
                className="border-t border-hairline bg-background p-4"
              >
                <div className="flex items-end gap-3">
                  <textarea
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void handleSendChat();
                      }
                    }}
                    placeholder="Message Astatec AI in Marathi or English... (Press Enter to send)"
                    className="w-full resize-none border border-hairline bg-surface p-3 text-sm text-ink outline-none focus:border-accent-blue"
                  />
                  <Button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="h-14 rounded-none bg-accent-blue px-6 font-mono text-xs uppercase text-primary-foreground hover:bg-accent-blue/90"
                  >
                    Send <Send className="ml-1.5 size-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : activeTab === "image" ? (
          /* IMAGE CREATION & EDITING STUDIO (gemini-nano-banana-2.1) */
          <div className="grid gap-6 border border-hairline bg-surface p-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-5 border border-hairline bg-background p-6">
              <div>
                <p className="font-mono text-[10px] uppercase text-accent-yellow">
                  Nano Banana 2.1 · Create & Edit Visuals
                </p>
                <h2 className="mt-2 font-editorial text-3xl">Image Synthesis & Editing</h2>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                  Generate new editorial visuals from text prompts or upload a reference image to
                  edit with <code className="text-accent-blue">gemini-nano-banana-2.1</code>.
                </p>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase text-ink-soft">
                  Visual Prompt
                  <textarea
                    rows={4}
                    value={imgPrompt}
                    onChange={(e) => setImgPrompt(e.target.value)}
                    className="mt-2 w-full border border-hairline bg-surface p-3 text-sm text-ink outline-none focus:border-accent-blue"
                    placeholder="Describe the image you want to create or how to edit the uploaded image..."
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase text-ink-soft">
                    Aspect Ratio
                  </span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {ASPECT_RATIOS.map((ar) => (
                      <button
                        key={ar}
                        type="button"
                        onClick={() => setAspectRatio(ar)}
                        className={`px-2.5 py-1 font-mono text-[10px] ${
                          aspectRatio === ar
                            ? "bg-accent-blue text-primary-foreground"
                            : "border border-hairline bg-surface text-ink-soft"
                        }`}
                      >
                        {ar}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase text-ink-soft">Resolution</span>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {IMAGE_SIZES.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setImageSize(sz)}
                        className={`px-2.5 py-1 font-mono text-[10px] ${
                          imageSize === sz
                            ? "bg-accent-yellow text-accent-foreground"
                            : "border border-hairline bg-surface text-ink-soft"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Optional Reference Image Upload for Editing */}
              <div className="border border-dashed border-hairline bg-surface/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-ink-soft">
                    Reference Image for Editing (Optional)
                  </span>
                  {uploadedImage ? (
                    <button
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="font-mono text-[10px] uppercase text-accent-yellow"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>
                <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 border border-hairline bg-background py-2.5 font-mono text-[10px] uppercase text-ink hover:border-accent-blue">
                  <Upload className="size-3.5 text-accent-blue" />
                  <span>{uploadedImage ? "Change Uploaded Image" : "Upload Image to Edit"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {uploadedImage ? (
                  <img
                    src={uploadedImage.preview}
                    alt="Uploaded reference"
                    className="mt-3 max-h-36 w-auto border border-hairline object-contain"
                  />
                ) : null}
              </div>

              <Button
                type="button"
                disabled={imgLoading}
                onClick={() => void handleGenerateImage()}
                className="h-12 w-full rounded-none bg-accent-blue font-mono text-xs uppercase text-primary-foreground hover:bg-accent-blue/90"
              >
                {imgLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" /> Synthesizing Image...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 size-4" />{" "}
                    {uploadedImage
                      ? "Edit Image with Nano Banana 2.1"
                      : "Generate with Nano Banana 2.1"}
                  </>
                )}
              </Button>

              {imgError ? (
                <div className="border border-accent-yellow/50 bg-surface p-3 text-xs text-ink-soft">
                  {imgError}
                </div>
              ) : null}
            </div>

            {/* Right: Generated Image Canvas */}
            <div className="flex flex-col justify-between border border-hairline bg-background p-6">
              <p className="font-mono text-[10px] uppercase text-ink-soft">
                Output Canvas · {generatedImages.length} Generated
              </p>

              {generatedImages.length === 0 ? (
                <div className="my-auto flex flex-col items-center justify-center py-20 text-center">
                  <ImagePlus className="size-10 text-accent-blue/60" />
                  <p className="mt-4 font-editorial text-2xl">Ready for Visual Synthesis</p>
                  <p className="mt-2 max-w-sm text-xs text-ink-soft">
                    Enter a prompt on the left and click Generate to create or edit high-resolution
                    imagery.
                  </p>
                </div>
              ) : (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {generatedImages.map((item) => (
                    <div key={item.id} className="border border-hairline bg-surface p-3">
                      <img
                        src={item.url}
                        alt={item.prompt}
                        className="w-full border border-hairline object-cover"
                      />
                      <p className="mt-2 line-clamp-2 text-xs text-ink-soft">{item.prompt}</p>
                      <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase text-accent-blue">
                        <span>{item.model}</span>
                        <a
                          href={item.url}
                          download={`${item.id}.png`}
                          className="inline-flex items-center gap-1 text-accent-yellow"
                        >
                          <Download className="size-3" /> Save
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* LIVE VOICE CO-PILOT (gemini-3.8-live / Speech + TTS) */
          <div className="border border-hairline bg-surface p-8 text-center md:p-14">
            <div className="mx-auto max-w-2xl">
              <div className="mx-auto flex size-24 items-center justify-center border border-accent-blue bg-background">
                <AstatecLogo size={54} />
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-accent-yellow">
                Gemini 3.8 Live Audio & Voice Interface
              </p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">LIVE VOICE CONVERSATION</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Speak naturally with Astatec AI about Aniket Bhalerao&apos;s portfolio, 3D graphics,
                or bioscience tools and hear spoken responses in real time.
              </p>

              {/* Voice Persona Selector */}
              <div className="mt-6 flex justify-center gap-2">
                {(["Zephyr", "Kore", "Puck"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVoiceName(v)}
                    className={`px-3.5 py-1.5 font-mono text-[10px] uppercase ${
                      voiceName === v
                        ? "bg-accent-blue text-primary-foreground"
                        : "border border-hairline bg-background text-ink-soft"
                    }`}
                  >
                    Voice: {v}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={toggleVoiceConversation}
                  className={`flex items-center gap-3 border px-8 py-4 font-mono text-xs uppercase transition-all ${
                    listening
                      ? "border-accent-yellow bg-accent-yellow text-accent-foreground"
                      : "border-accent-blue bg-accent-blue text-primary-foreground hover:bg-accent-blue/90"
                  }`}
                >
                  {listening ? <MicOff className="size-5" /> : <Mic className="size-5" />}
                  <span>
                    {listening ? "Listening... Click to Stop" : "Start Voice Conversation"}
                  </span>
                </button>
              </div>

              {voiceTranscript ? (
                <div className="mt-6 border border-hairline bg-background p-4 text-left">
                  <p className="font-mono text-[9px] uppercase text-accent-blue">You Spoke:</p>
                  <p className="mt-1 text-sm">{voiceTranscript}</p>
                </div>
              ) : null}

              <div className="mt-4 border border-hairline bg-background p-5 text-left">
                <div className="flex items-center justify-between font-mono text-[9px] uppercase text-accent-yellow">
                  <span>Astatec Voice Output ({voiceName})</span>
                  <button
                    type="button"
                    onClick={() => void speakText("manual-replay", voiceReply)}
                    className="inline-flex items-center gap-1 text-accent-blue hover:underline"
                  >
                    <Volume2 className="size-3" /> Replay Audio
                  </button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink">{voiceReply}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
