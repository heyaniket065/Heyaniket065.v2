export type Resource = {
  slug: string;
  title: string;
  type: "Framework" | "Guide" | "Template" | "Article";
  summary: string;
  status: "Available" | "In progress";
  contents: string[];
};

export const resourceTypes = ["All", "Framework", "Guide", "Template", "Article"] as const;

export const resources: Resource[] = [
  {
    slug: "narrative-beat-map",
    title: "Narrative Beat Map",
    type: "Framework",
    summary: "The four-beat structure used to plan a piece before any footage is opened.",
    status: "In progress",
    contents: ["Premise line", "Tension beat", "Turn beat", "Residue beat", "Pacing notes"],
  },
  {
    slug: "opening-frameworks",
    title: "Opening Frameworks",
    type: "Guide",
    summary:
      "Five ways to open a piece using curiosity rather than shock, with the reasoning behind each.",
    status: "In progress",
    contents: [
      "Question openings",
      "Contrast openings",
      "Scene openings",
      "Claim openings",
      "Silence openings",
    ],
  },
  {
    slug: "series-architecture-template",
    title: "Series Architecture Template",
    type: "Template",
    summary: "A one-page structure for turning scattered uploads into a series that compounds.",
    status: "In progress",
    contents: ["Series premise", "Episode pattern", "Recurring elements", "Release rhythm"],
  },
  {
    slug: "subtraction-checklist",
    title: "Subtraction Checklist",
    type: "Framework",
    summary: "The final pass: what to remove from an edit, a page or a script before publishing.",
    status: "In progress",
    contents: ["Motion audit", "Copy audit", "Colour audit", "Element count"],
  },
  {
    slug: "audience-motivation-map",
    title: "Audience Motivation Map",
    type: "Guide",
    summary:
      "A worksheet for describing who the work is for in terms of motivation, not demographics.",
    status: "In progress",
    contents: ["Context", "Motivation", "Objection", "Payoff"],
  },
];

export const getResource = (slug: string) => resources.find((r) => r.slug === slug);

export type Faq = { q: string; a: string; category: string };

export const faqCategories = [
  "All",
  "General",
  "Services",
  "Projects",
  "Process",
  "Pricing",
  "Collaboration",
] as const;

export const faqs: Faq[] = [
  {
    category: "General",
    q: "What is LuminaLM?",
    a: "LuminaLM is Aniket Bhalerao's creator identity — a body of work exploring storytelling, psychology, strategy and mindset through visual media. It is a creative practice, not only a channel.",
  },
  {
    category: "General",
    q: "Where can I watch the work?",
    a: "The published video work lives on YouTube. Selected pieces and their thinking are documented in the portfolio and case studies here.",
  },
  {
    category: "Services",
    q: "What kind of work do you take on?",
    a: "Content strategy, storytelling, creative direction, media creation, brand narrative, audience strategy, visual editing and personal brand development.",
  },
  {
    category: "Services",
    q: "Do you work with brands or only creators?",
    a: "Both, where the work fits the practice. Fit is discussed before anything is scoped.",
  },
  {
    category: "Projects",
    q: "Are the projects shown real?",
    a: "The projects listed are real bodies of work. Performance numbers are only published when verified, which is why you will not see invented statistics here.",
  },
  {
    category: "Process",
    q: "How does a project start?",
    a: "With a conversation about intent and constraints, followed by a written scope. Nothing is produced before the structure is agreed.",
  },
  {
    category: "Process",
    q: "How involved do I need to be?",
    a: "Involvement is heaviest at the start — positioning and structure — and lighter during production.",
  },
  {
    category: "Pricing",
    q: "What does it cost?",
    a: "Pricing is set per project scope. Public price plans are not published yet; request a quote through the contact page.",
  },
  {
    category: "Collaboration",
    q: "Do you collaborate with other creators?",
    a: "Yes, when the idea is worth the time of everyone involved. Reach out with the concept.",
  },
  {
    category: "Collaboration",
    q: "What is the best way to reach you?",
    a: "The contact form here, or the social channels linked in the footer.",
  },
];

export const projectTypes = [
  "Content Strategy",
  "Storytelling",
  "Creative Direction",
  "Video / Media",
  "Brand Narrative",
  "Collaboration",
  "Other",
];
export const budgets = ["To be discussed", "Small scope", "Medium scope", "Large scope"];
export const timelines = ["Flexible", "Within a month", "1–3 months", "Ongoing"];
