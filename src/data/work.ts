import { photos } from "./site";

export type Project = {
  slug: string;
  n: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  image: { src: string; alt: string };
  year: string;
  caseStudy?: {
    overview: string;
    challenge: string;
    research: string;
    strategy: string;
    direction: string;
    execution: string[];
    result: string;
    learnings: string[];
  };
};

export const categories = [
  "All",
  "Strategy",
  "Storytelling",
  "Video",
  "Psychology",
  "Visual Media",
  "Brand",
] as const;

export const projects: Project[] = [
  {
    slug: "madara-in-phonk",
    n: "01",
    title: "Madara in Phonk",
    category: "Video",
    tags: ["Strategy", "Anime Edit", "Visual Media"],
    summary:
      "An edit built on rhythm and restraint — cut to a phonk track where every transition is timed to a beat that already exists in the music.",
    image: { src: photos.bike.src, alt: "Editorial visual for the Madara in Phonk edit" },
    year: "—",
    caseStudy: {
      overview:
        "A character-driven edit designed as a study in pacing: how far rhythm alone can carry attention when the visual language stays consistent.",
      challenge:
        "Edits in this space compete on effects. The challenge was to stand out through structure and timing rather than adding more.",
      research:
        "Reviewed how the track builds tension, where its silences fall, and which visual beats a viewer anticipates before they arrive.",
      strategy:
        "Lock the cut to the music's own architecture, then remove any effect that does not serve a beat.",
      direction:
        "High contrast, limited palette, hard cuts, typography used sparingly as punctuation.",
      execution: [
        "Beat map built before importing footage.",
        "Assembly cut locked to the beat map only.",
        "Grade and sound design added last, as reinforcement.",
        "Final pass removing every non-essential element.",
      ],
      result:
        "A piece that reads as deliberate rather than decorated. Verified performance figures are not published here.",
      learnings: [
        "Rhythm outperforms volume.",
        "Restraint is visible.",
        "Structure before the timeline saves hours.",
      ],
    },
  },
  {
    slug: "dark-psychology",
    n: "02",
    title: "Dark Psychology",
    category: "Psychology",
    tags: ["Psychology", "Mindset", "Analysis"],
    summary:
      "An analytical series examining influence, manipulation and self-awareness — written to explain mechanisms, not to teach tactics.",
    image: { src: photos.ncc.src, alt: "Editorial visual for the Dark Psychology series" },
    year: "—",
    caseStudy: {
      overview:
        "A narrative-analysis format that treats psychology as a subject to understand rather than a trick to sell.",
      challenge:
        "The topic attracts sensationalism. The work had to hold attention without becoming exploitative.",
      research:
        "Grounded each episode in recognised concepts, then stress-tested claims against plain-language explanations.",
      strategy:
        "Lead with a real situation, explain the mechanism, close on self-awareness rather than advantage.",
      direction: "Calm delivery, slow visual rhythm, typographic emphasis over dramatic effects.",
      execution: [
        "Episode structure standardised across the series.",
        "Claims limited to what could be explained clearly.",
        "Visual restraint used as a credibility signal.",
        "Closing frames written to leave a thought, not a hook.",
      ],
      result:
        "A format that can run for years without changing its ethics. Verified metrics are not published here.",
      learnings: [
        "Calm is a differentiator.",
        "Explaining beats asserting.",
        "Ethics narrow the topic and sharpen it.",
      ],
    },
  },
  {
    slug: "mastery-and-vision",
    n: "03",
    title: "Mastery & Vision",
    category: "Strategy",
    tags: ["Philosophy", "Strategy", "Analysis"],
    summary:
      "A long-form exploration of discipline, deliberate practice and long-horizon thinking, told through structured visual essays.",
    image: { src: photos.campus.src, alt: "Editorial visual for the Mastery and Vision series" },
    year: "—",
    caseStudy: {
      overview:
        "A series arguing that mastery is a design problem: environment, repetition and standards over motivation.",
      challenge:
        "Self-improvement content is saturated and interchangeable. The series needed a point of view.",
      research:
        "Collected recurring patterns across disciplines — training, craft, military routine — and looked for the shared structure.",
      strategy:
        "Anchor every episode in one principle, supported by one concrete example and one honest limitation.",
      direction:
        "Editorial typography, architectural composition, photography used as breathing space.",
      execution: [
        "One principle per episode, no exceptions.",
        "Each claim paired with a limitation.",
        "Visual system reused to build recognition.",
        "Written first, filmed second.",
      ],
      result:
        "A body of work that compounds instead of resetting each upload. Verified metrics are not published here.",
      learnings: [
        "A point of view is the format.",
        "Limitations build trust.",
        "Consistency is design, not willpower.",
      ],
    },
  },
  {
    slug: "luminalm-identity",
    n: "04",
    title: "LuminaLM Identity",
    category: "Brand",
    tags: ["Brand", "Visual Media", "Direction"],
    summary:
      "The visual and editorial system behind LuminaLM: typography, pacing, tone and the rules that keep it coherent.",
    image: { src: photos.waterfall.src, alt: "Editorial visual for the LuminaLM identity system" },
    year: "—",
  },
  {
    slug: "field-notes",
    n: "05",
    title: "Field Notes",
    category: "Storytelling",
    tags: ["Storytelling", "Photography"],
    summary:
      "Short observational pieces made on location — a running study of place, light and the quiet story inside ordinary days.",
    image: { src: photos.waterfall.src, alt: "Aniket Bhalerao photographed on location" },
    year: "—",
  },
  {
    slug: "discipline-series",
    n: "06",
    title: "Discipline Series",
    category: "Storytelling",
    tags: ["Mindset", "Storytelling"],
    summary:
      "A photographic and written series on training, routine and the unglamorous part of building a standard.",
    image: { src: photos.ncc.src, alt: "Aniket Bhalerao in NCC uniform" },
    year: "—",
  },
];

export const caseStudies = projects.filter((p) => p.caseStudy);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
