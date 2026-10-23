import personalAsset from "@/assets/personal.jpg.asset.json";
import neoluxeTrustAsset from "@/assets/neoluxe-trust.jpg.asset.json";
import neoluxeAsset from "@/assets/neoluxe.jpg.asset.json";
import aniketPortfolioAsset from "@/assets/aniket-portfolio.jpg.asset.json";
import toolnamiStudioAsset from "@/assets/toolnami-studio.jpg.asset.json";
import toolnamiAsset from "@/assets/toolnami.jpg.asset.json";
import figmaShowcaseAsset from "@/assets/figma-showcase.jpg.asset.json";

export const ecosystemProjects = [
  {
    number: "01",
    title: "Personal Website",
    url: "https://sites.google.com/view/aniketbhalerao",
    description:
      "An early personal publishing space documenting Aniket's work, ideas, and creative direction.",
    image: personalAsset.url,
    type: "Personal platform",
  },
  {
    number: "02",
    title: "NeoLuxe Trust",
    url: "https://neoluxetrast.lovable.app",
    description:
      "A visual publishing experiment connecting LuminaLM, psychology, storytelling, and anime edits.",
    image: neoluxeTrustAsset.url,
    type: "Creative media",
  },
  {
    number: "03",
    title: "NeoLuxe",
    url: "https://neoluxe.lovable.app",
    description:
      "A premium digital portfolio exploring creative development, design systems, and AI engineering.",
    image: neoluxeAsset.url,
    type: "Digital experience",
  },
  {
    number: "04",
    title: "Aniket Portfolio",
    url: "https://aniketbhalerao.lovable.app",
    description:
      "A cinematic creator portfolio presenting the evolving LuminaLM identity and body of work.",
    image: aniketPortfolioAsset.url,
    type: "Creator portfolio",
  },
  {
    number: "05",
    title: "ToolNami Studio",
    url: "https://toolnami.ai.studio",
    description:
      "A fast online utility platform for everyday productivity, files, images, and creator workflows.",
    image: toolnamiStudioAsset.url,
    type: "Productivity tools",
  },
  {
    number: "06",
    title: "ToolNami",
    url: "https://toolnami.lovable.app",
    description:
      "The Lovable edition of ToolNami: practical tools shaped for speed, clarity, and frictionless use.",
    image: toolnamiAsset.url,
    type: "Web application",
  },
  {
    number: "07",
    title: "Figma Showcase",
    url: "https://cone-spore-23450341.figma.site/",
    description:
      "A visual interface experiment built through Figma Make and expressive web composition.",
    image: figmaShowcaseAsset.url,
    type: "Design experiment",
  },
] as const;
