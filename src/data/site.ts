export const site = {
  name: "Aniket Bhalerao",
  brand: "LuminaLM",
  role: "Digital Creator • AI Enthusiast • Developer • Strategic Storyteller",
  philosophy: "Think Better. Build Better.",
  intro:
    "I build useful tools, experiment with AI systems, design digital products, and create content that combines creativity with technology.",
} as const;

export const photos = {
  ncc: {
    src: "/images/aniket-ncc-pride.png",
    alt: "Aniket Bhalerao in NCC uniform on the parade ground",
    role: "Discipline, leadership, personal journey",
  },
  waterfall: {
    src: "/images/aniket-water.png",
    alt: "Aniket Bhalerao standing in front of a waterfall",
    role: "Exploration, personality, environment",
  },
  campus: {
    src: "/images/aniket-white-shirt.png",
    alt: "Aniket Bhalerao outdoors on campus wearing a blue jersey",
    role: "Everyday creator lifestyle",
  },
  bike: {
    src: "/images/aniket-outdoor.png",
    alt: "Aniket Bhalerao seated on a motorcycle",
    role: "Energy, movement, personality",
  },
} as const;

export const primaryNav = [
  { label: "Home", to: "/" },
  { label: "AI Studio", to: "/ai-studio" },
  { label: "About Me", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Experience", to: "/experience" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/portfolio" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Videos", to: "/videos" },
  { label: "Contact", to: "/contact" },
] as const;

export const utilityNav = [
  { label: "AI Studio", to: "/ai-studio" },
  { label: "LuminaLM", to: "/luminalm" },
  { label: "Blog", to: "/blog" },
  { label: "Resources", to: "/resources" },
  { label: "Gallery", to: "/gallery" },
  { label: "Pricing", to: "/pricing" },
  { label: "FAQ", to: "/faq" },
] as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/heyaniket065?tab=repositories" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aniket-bhalerao-o07" },
  { label: "YouTube", href: "https://youtube.com/@luminalm065" },
  { label: "Instagram", href: "https://www.instagram.com/hey_aniket_065" },
  { label: "X", href: "https://x.com/Instgram136" },
  { label: "Facebook", href: "https://www.facebook.com/share/19cdfcUFpw/" },
] as const;

export const youtube = "https://youtube.com/@luminalm065";

export const impact = [
  { n: "01", title: "Reach", copy: "Digital audience and content distribution." },
  { n: "02", title: "Focus", copy: "Strategic creative direction across every release." },
  { n: "03", title: "Execution", copy: "Consistent creative output, shipped on a rhythm." },
  { n: "04", title: "Vision", copy: "Long-term brand building over short-term noise." },
] as const;

export const pillars = [
  {
    id: "storytelling",
    n: "01",
    title: "Storytelling",
    line: "Structure before spectacle.",
    copy: "Every piece begins as a narrative problem: what tension holds attention, what turn earns the ending, what the viewer carries after the last frame.",
    photo: photos.waterfall,
  },
  {
    id: "psychology",
    n: "02",
    title: "Psychology",
    line: "Attention is behaviour, not luck.",
    copy: "Ideas are shaped around how people actually watch, feel and decide — perception, pacing, memory and the quiet mechanics of interest.",
    photo: photos.ncc,
  },
  {
    id: "strategy",
    n: "03",
    title: "Strategy",
    line: "A plan the work can survive.",
    copy: "Positioning, formats, series architecture and release rhythm — decided before production, so creativity has somewhere to land.",
    photo: photos.campus,
  },
  {
    id: "mindset",
    n: "04",
    title: "Mindset",
    line: "Discipline is the aesthetic.",
    copy: "Consistency, restraint and long-horizon thinking. The standard is kept when nobody is watching; the audience only sees the result.",
    photo: photos.bike,
  },
  {
    id: "visual-media",
    n: "05",
    title: "Visual Media",
    line: "Craft carries the meaning.",
    copy: "Edit rhythm, colour, typography, sound and composition used deliberately — the surface is where strategy becomes felt.",
    photo: photos.waterfall,
  },
] as const;

export const timeline = [
  {
    year: "Early",
    title: "Discipline",
    copy: "NCC training builds the working standard: preparation, posture, follow-through.",
  },
  {
    year: "Then",
    title: "Curiosity",
    copy: "Deep interest in psychology, philosophy and how narratives move people.",
  },
  {
    year: "Next",
    title: "LuminaLM",
    copy: "The creator identity is formed — a place for strategic storytelling and analysis.",
  },
  {
    year: "Now",
    title: "Craft",
    copy: "Building a consistent body of visual work across editing, writing and direction.",
  },
  {
    year: "Forward",
    title: "Ecosystem",
    copy: "Expanding LuminaLM from a channel into a broader creative practice.",
  },
] as const;

export const values = [
  { title: "Intention", copy: "Nothing is added without a reason it earns." },
  { title: "Restraint", copy: "Fewer elements, better chosen, better executed." },
  { title: "Clarity", copy: "The idea must survive being said simply." },
  { title: "Consistency", copy: "The work compounds only if it keeps arriving." },
] as const;
