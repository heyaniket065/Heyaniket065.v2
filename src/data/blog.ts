export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: string;
  date: string;
  featured?: boolean;
  body: { type: "p" | "h2" | "quote" | "list"; text?: string; items?: string[] }[];
};

export const blogCategories = [
  "All",
  "Storytelling",
  "Psychology",
  "Strategy",
  "Mindset",
  "Craft",
] as const;

export const articles: Article[] = [
  {
    slug: "structure-before-spectacle",
    title: "Structure Before Spectacle",
    category: "Storytelling",
    excerpt:
      "Effects are the cheapest part of an edit. Structure is the part nobody can copy from a tutorial.",
    readingTime: "6 min read",
    date: "Draft",
    featured: true,
    body: [
      {
        type: "p",
        text: "Most creative work fails quietly. Not because the visuals are weak, but because there is nothing underneath them holding attention in place.",
      },
      { type: "h2", text: "The spine of a piece" },
      {
        type: "p",
        text: "Before a single asset is imported, a piece should be describable in one sentence: what tension it opens, and what it resolves. If that sentence does not exist, the edit becomes decoration.",
      },
      {
        type: "quote",
        text: "If the idea cannot survive being said plainly, no amount of grading will save it.",
      },
      { type: "h2", text: "A working order" },
      {
        type: "list",
        items: [
          "Write the premise.",
          "Map the beats.",
          "Cut to the beats.",
          "Add craft last, as reinforcement.",
        ],
      },
      {
        type: "p",
        text: "This order feels slower. It is consistently faster, because the timeline stops being the place where decisions get made.",
      },
    ],
  },
  {
    slug: "attention-is-not-a-trick",
    title: "Attention Is Not a Trick",
    category: "Psychology",
    excerpt:
      "Hooks are taught as tactics. They work as consequences — of curiosity, contrast and honest tension.",
    readingTime: "7 min read",
    date: "Draft",
    body: [
      {
        type: "p",
        text: "The most repeated advice in creative work is to open strong. Very little of that advice explains why an opening works.",
      },
      { type: "h2", text: "Curiosity over shock" },
      {
        type: "p",
        text: "Shock spends attention. Curiosity lends it. An opening that raises a question the viewer wants answered buys the entire middle of the piece.",
      },
      {
        type: "quote",
        text: "You are not competing for a click. You are competing for the second minute.",
      },
      { type: "h2", text: "Contrast creates memory" },
      {
        type: "p",
        text: "People remember differences, not information. A calm frame after a dense one is a memory device, not a pause.",
      },
    ],
  },
  {
    slug: "the-discipline-of-restraint",
    title: "The Discipline of Restraint",
    category: "Craft",
    excerpt:
      "Removing one more element than feels comfortable is the fastest way to make work look expensive.",
    readingTime: "5 min read",
    date: "Draft",
    body: [
      {
        type: "p",
        text: "Premium work is rarely the work with the most in it. It is the work where every remaining element is load-bearing.",
      },
      { type: "h2", text: "A subtraction pass" },
      {
        type: "list",
        items: [
          "Remove the second call to action.",
          "Remove the decorative motion.",
          "Remove the adjective.",
          "Keep whatever breaks when removed.",
        ],
      },
      {
        type: "p",
        text: "Restraint reads as confidence because it is confidence: it assumes the idea is strong enough to stand with less around it.",
      },
    ],
  },
  {
    slug: "planning-is-a-creative-act",
    title: "Planning Is a Creative Act",
    category: "Strategy",
    excerpt:
      "Strategy is not the opposite of creativity. It is the container that lets creativity be reused.",
    readingTime: "6 min read",
    date: "Draft",
    body: [
      {
        type: "p",
        text: "Creators often treat planning as bureaucracy — something that arrives after the fun part. In practice the plan is where most of the creative decisions already happen.",
      },
      { type: "h2", text: "Series over uploads" },
      {
        type: "p",
        text: "A single upload competes alone. A series compounds: each piece teaches the audience how to read the next one.",
      },
      { type: "quote", text: "Focus. Plan. Execute. Built different." },
    ],
  },
  {
    slug: "consistency-as-identity",
    title: "Consistency as Identity",
    category: "Mindset",
    excerpt:
      "A recognisable body of work is built by keeping the same standard on the days it is inconvenient.",
    readingTime: "4 min read",
    date: "Draft",
    body: [
      {
        type: "p",
        text: "Identity is not declared in a bio. It is inferred by an audience from repetition.",
      },
      { type: "h2", text: "The standard when nobody looks" },
      {
        type: "p",
        text: "Discipline is not intensity. It is the refusal to lower the bar on an ordinary Tuesday, repeated long enough to become a signature.",
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
