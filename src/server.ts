import "./lib/error-capture";
import { GoogleGenAI } from "@google/genai";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

const PORTFOLIO_SYSTEM_INSTRUCTION = `You are ASTATEC AI (LuminaLM Intelligence), the official interactive AI assistant and digital co-pilot embedded in Aniket Bhalerao's flagship portfolio website.
Your personality: Cool, razor-sharp, architectural, strategic, articulate, and helpful. You can converse fluently in English, Marathi (मराठी), and Hindi (हिंदी) — match the user's language or blend English/Marathi naturally when asked in Marathi.

COMPLETE KNOWLEDGE BASE OF ANIKET BHALERAO & LUMINALM:
1. Identity & Philosophy:
   - Name: Aniket Bhalerao
   - Role: Digital Creator • AI Enthusiast • Developer • Strategic Storyteller • Founder of LuminaLM
   - Tagline / Philosophy: "Think Better. Build Better." / "Learn. Create. Improve." / "Focus. Plan. Execute."
   - Background: BA Student (building cultural, linguistic, and journalistic range), NCC Cadet training (discipline, leadership, preparation), independent AI & web builder.
   - Contact Emails: aniketbhalerao065@gmail.com and support.neoluxetrust@gmail.com

2. The 07 Live Digital Ecosystem Websites:
   - 01. Personal Website (https://sites.google.com/view/aniketbhalerao) — Early personal publishing space documenting Aniket's work and creative direction.
   - 02. NeoLuxe Trust (https://neoluxetrast.lovable.app) — Visual publishing experiment connecting LuminaLM, psychology, storytelling, and anime edits.
   - 03. NeoLuxe (https://neoluxe.lovable.app) — Premium digital portfolio exploring creative development, design systems, and AI engineering.
   - 04. Aniket Portfolio (https://aniketbhalerao.lovable.app) — Cinematic creator portfolio presenting the evolving LuminaLM identity.
   - 05. ToolNami Studio (https://toolnami.ai.studio) — Flagship fast online utility platform for everyday productivity, PDFs, files, images, and creator workflows.
   - 06. ToolNami Lovable Edition (https://toolnami.lovable.app) — Practical online tools shaped for speed, clarity, and frictionless use.
   - 07. Figma Showcase (https://cone-spore-23450341.figma.site/) — Visual interface experiment built through Figma Make and expressive web composition.

3. The 06 Connected Social Channels:
   - GitHub: heyaniket065 (https://github.com/heyaniket065?tab=repositories)
   - YouTube: @luminalm065 (https://youtube.com/@luminalm065) — Featured video: https://youtu.be/brPc_3KXcB8
   - LinkedIn: Aniket Bhalerao (https://www.linkedin.com/in/aniket-bhalerao-o07)
   - Instagram: @hey_aniket_065 (https://www.instagram.com/hey_aniket_065)
   - X (Twitter): @Instgram136 (https://x.com/Instgram136)
   - Facebook: https://www.facebook.com/share/19cdfcUFpw/

4. Signature Projects & Case Studies:
   - 01. Madara in Phonk (Video / Anime Edit): Built on rhythm and restraint, cut to a phonk track where every transition is locked to a pre-mapped musical beat.
   - 02. Dark Psychology (Psychology / Analytical Series): Examines influence, manipulation, and self-awareness to explain behavioral mechanisms ethically.
   - 03. Mastery & Vision (Strategy / Visual Essays): Long-form exploration of discipline, deliberate practice, and environment design over fleeting motivation.
   - 04. LuminaLM Identity (Brand System): Deep navy (#0B1220), cool white (#F8FAFC), electric blue (#3B82F6), solar yellow (#FACC15), Archivo Black, Instrument Serif, Manrope, and Space Mono.
   - 05. Field Notes (Storytelling / Photography): Observational pieces on place, light, and ordinary days.
   - 06. Discipline Series (Storytelling / Mindset): NCC uniform, training, and routine.

5. Core Skills & New Interactive Labs on This Site:
   - Intelligence: AI & LLMs, Prompt Engineering, Python, AI Research.
   - Development: HTML, CSS, JavaScript, TypeScript, React, Three.js WebGL, GitHub.
   - Design: Figma, UI/UX Design, Photoshop, Illustrator, Design Systems.
   - Media: Content Creation, CapCut, After Effects, Video Editing.
   - 3D Kinetic Core Studio: Interactive Three.js procedural 8-part sculpture with PBR studio lighting, exploded view, and material finishes.
   - Bioscience & Molecular Workbench: Live AlphaFold DB v6 3D protein structure & pLDDT confidence analyzer, RCSB PDB metadata inspector, UniProt functional viewer, and PubChem drug-likeness scout.

Always give clear, well-structured, high-signal answers.`;

function getAiClient(): GoogleGenAI {
  return new GoogleGenAI({
    apiKey: process.env["GEMINI_API_KEY"] ?? "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

type GroundingSource = {
  kind: "web" | "maps";
  title: string;
  uri: string;
  snippet?: string;
};

function extractGroundingSources(response: unknown): GroundingSource[] {
  const sources: GroundingSource[] = [];
  const candidates = (
    response as {
      candidates?: Array<{
        groundingMetadata?: { groundingChunks?: Array<Record<string, unknown>> };
      }>;
    }
  )?.candidates;
  const chunks = candidates?.[0]?.groundingMetadata?.groundingChunks;
  if (!Array.isArray(chunks)) return sources;

  for (const chunk of chunks) {
    const web = chunk["web"] as { uri?: string; title?: string } | undefined;
    if (web?.uri) {
      sources.push({
        kind: "web",
        title: web.title || web.uri,
        uri: web.uri,
      });
    }
    const maps = chunk["maps"] as
      | {
          uri?: string;
          title?: string;
          placeAnswerSources?: { reviewSnippets?: Array<{ content?: string }> };
        }
      | undefined;
    if (maps?.uri) {
      const snippet = maps.placeAnswerSources?.reviewSnippets?.[0]?.content;
      sources.push({
        kind: "maps",
        title: maps.title || "Google Maps Place",
        uri: maps.uri,
        ...(snippet ? { snippet } : {}),
      });
    }
  }
  return sources;
}

function buildLocalPortfolioFallback(prompt: string): string {
  const q = prompt.toLowerCase();
  if (
    q.includes("website") ||
    q.includes("project") ||
    q.includes("toolnami") ||
    q.includes("ecosystem")
  ) {
    return `### Aniket Bhalerao's 07 Live Digital Ecosystem Properties\n\n1. **ToolNami Studio** — [toolnami.ai.studio](https://toolnami.ai.studio) (Flagship online utility & productivity platform)\n2. **ToolNami (Lovable Edition)** — [toolnami.lovable.app](https://toolnami.lovable.app)\n3. **NeoLuxe** — [neoluxe.lovable.app](https://neoluxe.lovable.app) (Creative development & AI engineering portfolio)\n4. **NeoLuxe Trust** — [neoluxetrast.lovable.app](https://neoluxetrast.lovable.app) (Storytelling, psychology & anime edits)\n5. **Aniket Portfolio** — [aniketbhalerao.lovable.app](https://aniketbhalerao.lovable.app)\n6. **Personal Website** — [sites.google.com/view/aniketbhalerao](https://sites.google.com/view/aniketbhalerao)\n7. **Figma Showcase** — [cone-spore-23450341.figma.site](https://cone-spore-23450341.figma.site/)\n\n> *Tip: Select a Gemini API key in **Settings > Secrets** to unlock live Google Search, Maps Grounding, and multi-model reasoning.*`;
  }
  return `**ASTATEC × LuminaLM AI** here. Aniket Bhalerao is a Digital Creator, AI Enthusiast, Developer, and Strategic Storyteller — and the founder of **LuminaLM** (*"Think Better. Build Better."*).\n\n- **Flagship Product**: [ToolNami Studio](https://toolnami.ai.studio)\n- **Case Studies**: *Madara in Phonk*, *Dark Psychology*, *Mastery & Vision*, *LuminaLM Identity*\n- **Interactive Labs**: 3D Three.js Kinetic Core & Live AlphaFold/PubChem Bioscience Workbench\n- **Direct Contact**: \`aniketbhalerao065@gmail.com\`\n\nAsk me anything about Aniket's websites, skills, 3D graphics, or bioscience tools!`;
}

async function handleAiRequest(request: Request, pathname: string): Promise<Response> {
  const jsonHeaders = { "content-type": "application/json; charset=utf-8" };

  try {
    if (pathname === "/api/ai/chat" && request.method === "POST") {
      const body = (await request.json()) as {
        messages?: Array<{ role: "user" | "model"; text: string }>;
        model?: string;
        useSearch?: boolean;
        useMaps?: boolean;
        latLng?: { latitude: number; longitude: number } | null;
      };

      const messages = body.messages ?? [];
      const lastUserMessage = messages[messages.length - 1]?.text ?? "Hello";
      const requestedModel = body.model || "gemini-3.8-flash";

      if (!process.env["GEMINI_API_KEY"]) {
        return new Response(
          JSON.stringify({
            text: buildLocalPortfolioFallback(lastUserMessage),
            modelUsed: "luminalm-knowledge-core",
            sources: [],
          }),
          { status: 200, headers: jsonHeaders },
        );
      }

      const ai = getAiClient();
      const contents = messages.map((m) => ({
        role: m.role === "model" ? "model" : "user",
        parts: [{ text: m.text }],
      }));

      // Note: googleMaps cannot be combined with googleSearch in the same request
      const tools: Array<Record<string, unknown>> = [];
      let toolConfig: Record<string, unknown> | undefined;

      if (body.useMaps) {
        tools.push({ googleMaps: {} });
        if (body.latLng) {
          toolConfig = {
            retrievalConfig: {
              latLng: {
                latitude: body.latLng.latitude,
                longitude: body.latLng.longitude,
              },
            },
          };
        }
      } else if (body.useSearch) {
        tools.push({ googleSearch: {} });
      }

      const runWithModel = async (modelName: string) => {
        return await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: PORTFOLIO_SYSTEM_INSTRUCTION,
            ...(tools.length > 0 ? { tools } : {}),
            ...(toolConfig ? { toolConfig } : {}),
          },
        });
      };

      let response;
      let actualModel = requestedModel;
      try {
        response = await runWithModel(requestedModel);
      } catch (err) {
        if (requestedModel !== "gemini-3.8-flash") {
          actualModel = "gemini-3.8-flash";
          response = await runWithModel("gemini-3.8-flash");
        } else {
          throw err;
        }
      }

      const text = response.text ?? buildLocalPortfolioFallback(lastUserMessage);
      const sources = extractGroundingSources(response);

      return new Response(
        JSON.stringify({
          text,
          modelUsed: actualModel,
          sources,
        }),
        { status: 200, headers: jsonHeaders },
      );
    }

    if (pathname === "/api/ai/image" && request.method === "POST") {
      const body = (await request.json()) as {
        prompt?: string;
        aspectRatio?: string;
        imageSize?: string;
        base64Image?: string;
        mimeType?: string;
      };

      const prompt = body.prompt?.trim() || "Futuristic LuminaLM architectural creative studio";
      const aspectRatio = body.aspectRatio || "1:1";
      const imageSize = body.imageSize || "1K";

      if (!process.env["GEMINI_API_KEY"]) {
        return new Response(
          JSON.stringify({
            error:
              "Please configure or select a Gemini API key in Settings > Secrets to generate images with gemini-nano-banana-2.1.",
          }),
          { status: 400, headers: jsonHeaders },
        );
      }

      const ai = getAiClient();
      const parts: Array<Record<string, unknown>> = [];
      if (body.base64Image && body.mimeType) {
        parts.push({
          inlineData: {
            data: body.base64Image,
            mimeType: body.mimeType,
          },
        });
      }
      parts.push({ text: prompt });

      let response;
      let modelUsed = "gemini-nano-banana-2.1";
      try {
        response = await ai.models.generateContent({
          model: "gemini-nano-banana-2.1",
          contents: { parts },
          config: {
            imageConfig: {
              aspectRatio,
              imageSize,
            },
          },
        });
      } catch {
        modelUsed = "gemini-3.1-flash-lite-image";
        response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite-image",
          contents: { parts },
          config: {
            imageConfig: {
              aspectRatio,
            },
          },
        });
      }

      let imageUrl: string | null = null;
      let caption = "";
      const candidateParts = response.candidates?.[0]?.content?.parts ?? [];
      for (const part of candidateParts) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || "image/png";
          imageUrl = `data:${mime};base64,${part.inlineData.data}`;
        } else if (part.text) {
          caption += part.text;
        }
      }

      if (!imageUrl) {
        return new Response(
          JSON.stringify({
            error:
              caption ||
              "Image generation requires a paid-tier API key for gemini-nano-banana-2.1. Check Settings > Secrets.",
          }),
          { status: 422, headers: jsonHeaders },
        );
      }

      return new Response(
        JSON.stringify({
          imageUrl,
          caption,
          modelUsed,
        }),
        { status: 200, headers: jsonHeaders },
      );
    }

    if (pathname === "/api/ai/tts" && request.method === "POST") {
      const body = (await request.json()) as { text?: string; voice?: string };
      const textToSpeak = (body.text || "Welcome to Aniket Bhalerao's LuminaLM ecosystem.").slice(
        0,
        900,
      );
      const voiceName = body.voice || "Zephyr";

      if (!process.env["GEMINI_API_KEY"]) {
        return new Response(JSON.stringify({ error: "API key not configured for TTS." }), {
          status: 400,
          headers: jsonHeaders,
        });
      }

      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash-lite-tts",
        contents: [
          {
            role: "user",
            parts: [{ text: textToSpeak }],
          },
        ],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) {
        return new Response(JSON.stringify({ error: "No audio returned from model." }), {
          status: 422,
          headers: jsonHeaders,
        });
      }

      return new Response(
        JSON.stringify({
          audioDataUrl: `data:audio/wav;base64,${base64Audio}`,
          modelUsed: "gemini-3.8-flash-lite-tts",
        }),
        { status: 200, headers: jsonHeaders },
      );
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: jsonHeaders,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({
        error: message,
        text: buildLocalPortfolioFallback("overview"),
      }),
      { status: 200, headers: jsonHeaders },
    );
  }
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname.startsWith("/api/ai/")) {
        return await handleAiRequest(request, url.pathname);
      }
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
