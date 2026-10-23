export type Service = {
  slug: string;
  n: string;
  title: string;
  short: string;
  overview: string;
  problem: string;
  approach: string[];
  process: { step: string; title: string; copy: string }[];
  deliverables: string[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "content-strategy",
    n: "01",
    title: "Content Strategy",
    short: "Positioning, formats and a release architecture the work can sustain.",
    overview:
      "A content strategy defines what a channel is for, who it speaks to, and which formats carry the idea best. It replaces guesswork with a repeatable system.",
    problem:
      "Most creators produce constantly without a structure. Output rises, clarity falls, and the audience never learns what to expect.",
    approach: [
      "Define the single idea the body of work defends.",
      "Map audience motivation before choosing formats.",
      "Design series architecture instead of isolated uploads.",
      "Set a release rhythm that production can actually hold.",
    ],
    process: [
      {
        step: "01",
        title: "Audit",
        copy: "Read the existing work for pattern, strength and drift.",
      },
      { step: "02", title: "Position", copy: "Write the positioning statement in one sentence." },
      { step: "03", title: "Architecture", copy: "Build the format and series structure." },
      { step: "04", title: "Calendar", copy: "Translate structure into a sustainable schedule." },
    ],
    deliverables: [
      "Positioning statement",
      "Format architecture",
      "Series map",
      "Release calendar",
      "Review loop",
    ],
    faq: [
      {
        q: "Is this only for YouTube?",
        a: "No. The structure applies to any channel where a body of work accumulates.",
      },
      {
        q: "How long does it take?",
        a: "Scope is agreed per project. Timelines are confirmed before work begins.",
      },
    ],
  },
  {
    slug: "digital-storytelling",
    n: "02",
    title: "Digital Storytelling",
    short: "Narrative structure built for screens, scroll and short attention.",
    overview:
      "Storytelling for digital media is a structural discipline: setup, tension, turn and residue, compressed into the time an audience will actually give.",
    problem:
      "Good footage with no narrative spine plays as content, not as a story worth finishing.",
    approach: [
      "Find the tension before writing a single line.",
      "Build the turn the viewer cannot predict but accepts.",
      "Cut everything that does not carry the arc.",
      "End on the idea, not on the outro.",
    ],
    process: [
      { step: "01", title: "Premise", copy: "Agree the one thing the piece is about." },
      { step: "02", title: "Structure", copy: "Beat map with pacing marked." },
      { step: "03", title: "Script", copy: "Written for voice and for edit rhythm." },
      { step: "04", title: "Refine", copy: "Read, cut, tighten, test." },
    ],
    deliverables: ["Beat map", "Script", "Pacing notes", "Edit direction"],
    faq: [
      {
        q: "Do you write in one voice only?",
        a: "No. The voice is derived from the creator or brand, not imposed.",
      },
    ],
  },
  {
    slug: "creative-direction",
    n: "03",
    title: "Creative Direction",
    short: "One coherent visual and editorial standard across everything published.",
    overview:
      "Creative direction is the decision layer: what the work looks like, sounds like and refuses to do — held consistently across every output.",
    problem:
      "Without direction, each release looks like a different brand and none of them compound.",
    approach: [
      "Set a visual language with explicit rules.",
      "Define what is deliberately excluded.",
      "Review output against the standard, not against taste.",
      "Evolve the system slowly and on purpose.",
    ],
    process: [
      { step: "01", title: "Reference", copy: "Build the visual and tonal reference set." },
      { step: "02", title: "System", copy: "Type, colour, composition, motion rules." },
      { step: "03", title: "Apply", copy: "Direct the first outputs against the system." },
      { step: "04", title: "Govern", copy: "Ongoing review to prevent drift." },
    ],
    deliverables: ["Direction document", "Visual rules", "Motion rules", "Review checklist"],
    faq: [
      {
        q: "Do you produce the assets too?",
        a: "Direction and production can be scoped together or separately.",
      },
    ],
  },
  {
    slug: "video-media-creation",
    n: "04",
    title: "Video / Media Creation",
    short: "Edited pieces where rhythm, sound and image serve the narrative.",
    overview:
      "Production and edit work built on the structure agreed beforehand — pacing, sound design, grade and typography as narrative tools.",
    problem: "Edits often chase effects. Effects without rhythm read as noise.",
    approach: [
      "Cut to the beat map.",
      "Use sound as structure.",
      "Grade for mood, not for filter.",
      "Type as a design element, not a caption.",
    ],
    process: [
      { step: "01", title: "Prep", copy: "Assets, structure and references aligned." },
      { step: "02", title: "Assembly", copy: "Rough cut against the beats." },
      { step: "03", title: "Design", copy: "Sound, grade, typography, motion." },
      { step: "04", title: "Finish", copy: "Review passes and delivery." },
    ],
    deliverables: [
      "Master edit",
      "Platform cuts",
      "Thumbnail direction",
      "Project files on request",
    ],
    faq: [
      {
        q: "Which formats?",
        a: "Long form and short form, with platform-specific cuts where useful.",
      },
    ],
  },
  {
    slug: "brand-narrative",
    n: "05",
    title: "Brand Narrative",
    short: "The story a brand can repeat for years without wearing out.",
    overview:
      "A narrative that explains why the brand exists, what it believes and what it refuses — written so every future piece can inherit it.",
    problem:
      "Brands describe features and forget the belief underneath. Nothing memorable survives.",
    approach: [
      "Locate the belief.",
      "Write the story in plain language.",
      "Define proof, not adjectives.",
      "Make it usable by anyone producing work.",
    ],
    process: [
      { step: "01", title: "Discovery", copy: "Conversations, materials, existing work." },
      { step: "02", title: "Draft", copy: "Narrative written and pressure-tested." },
      { step: "03", title: "System", copy: "Messaging hierarchy and tone." },
      { step: "04", title: "Handover", copy: "Editable document for ongoing use." },
    ],
    deliverables: ["Narrative document", "Messaging hierarchy", "Tone of voice", "Usage examples"],
    faq: [{ q: "Is this copywriting?", a: "It precedes copywriting. Copy is written from it." }],
  },
  {
    slug: "psychology-audience-strategy",
    n: "06",
    title: "Psychology & Audience Strategy",
    short: "Designing work around how people actually watch and decide.",
    overview:
      "Applied attention research: pacing, curiosity gaps, contrast, memory and the ethics of holding attention without manipulating it.",
    problem: "Advice about hooks is everywhere; the reasoning behind them rarely is.",
    approach: [
      "Model the viewer's motivation.",
      "Design openings around curiosity, not shock.",
      "Use contrast to create memory.",
      "Keep persuasion honest.",
    ],
    process: [
      { step: "01", title: "Map", copy: "Audience motivations and contexts." },
      { step: "02", title: "Principles", copy: "The psychological levers relevant to the work." },
      { step: "03", title: "Apply", copy: "Translate into openings, structure and pacing." },
      { step: "04", title: "Review", copy: "Assess retention qualitatively and adjust." },
    ],
    deliverables: ["Audience map", "Principle set", "Opening frameworks", "Review notes"],
    faq: [
      {
        q: "Do you guarantee performance?",
        a: "No. Performance is never guaranteed; the work improves the odds.",
      },
    ],
  },
  {
    slug: "visual-editing",
    n: "07",
    title: "Visual Editing",
    short: "Edit craft: rhythm, grade, typography and restraint.",
    overview:
      "Focused editing work for creators who have the idea and need the execution to match its ambition.",
    problem: "An idea worth watching can still be lost in a flat, rhythmless edit.",
    approach: [
      "Cut for rhythm first.",
      "Grade with intent.",
      "Type with hierarchy.",
      "Remove one more thing than feels comfortable.",
    ],
    process: [
      { step: "01", title: "Brief", copy: "Intent, references, constraints." },
      { step: "02", title: "Cut", copy: "Structure and rhythm locked." },
      { step: "03", title: "Polish", copy: "Grade, sound, typography." },
      { step: "04", title: "Deliver", copy: "Exports and revisions." },
    ],
    deliverables: ["Edited piece", "Revision passes", "Export set"],
    faq: [{ q: "How many revisions?", a: "Agreed per project before work begins." }],
  },
  {
    slug: "personal-brand-development",
    n: "08",
    title: "Personal Brand Development",
    short: "A creator identity that stays recognisable as the work grows.",
    overview:
      "Positioning, visual identity direction and content architecture for individuals building a long-term public practice.",
    problem: "Personal brands often copy the aesthetics of the moment and become interchangeable.",
    approach: [
      "Start from the person, not the trend.",
      "Define a point of view.",
      "Design an identity that ages well.",
      "Build a publishing structure around it.",
    ],
    process: [
      { step: "01", title: "Interview", copy: "Understand the person and the ambition." },
      { step: "02", title: "Position", copy: "Point of view and territory." },
      { step: "03", title: "Identity", copy: "Visual and editorial direction." },
      { step: "04", title: "System", copy: "Content architecture and rhythm." },
    ],
    deliverables: ["Positioning", "Identity direction", "Content system", "Roll-out plan"],
    faq: [
      { q: "Is this for businesses too?", a: "The same method applies to founder-led brands." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
