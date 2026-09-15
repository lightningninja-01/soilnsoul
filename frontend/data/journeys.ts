import { WHATSAPP_NUMBER } from "@/lib/constants";

export const experiences = [
  {
    slug: "sacred-kashi",
    name: "01 Sacred Kashi",
    description: "Dawn rituals, temple trails, Ganga aarti",
    image: "/images/hero/hero-2.jpg",
    alt: "A priest holding a ceremonial flame at Ganga aarti",
  },
  {
    slug: "living-banaras",
    name: "02 Living Banaras",
    description: "Artisans, silk weavers, old city life",
    image: "/images/hero/hero-1.jpg",
    alt: "Saffron-clad locals walking beside the ghats",
  },
  {
    slug: "taste-of-kashi",
    name: "03 Taste of Kashi",
    description: "Family kitchens, street food, chaat culture",
    image: "/images/services/service-city-tour.jpg",
    alt: "Evening aarti ceremonies in Varanasi",
  },
  {
    slug: "hidden-banaras",
    name: "04 Hidden Banaras",
    description: "Secret ghats, unmarked lanes, forgotten temples",
    image: "/images/hero/hero-3.jpg",
    alt: "The historic riverfront of Banaras",
  },
  {
    slug: "celebrations",
    name: "05 Celebrations",
    description: "Weddings, festivals, private events in Kashi",
    image: "/images/services/service-event.jpg",
    alt: "Celebration arrangements from the Soil n Soul collection",
  },
  {
    slug: "kashi-through-your-lens",
    name: "06 Kashi Through Your Lens",
    description: "Photography journeys — golden hour & beyond",
    image: "/images/hero/hero-2.jpg",
    alt: "Aarti flames and gathered devotees in Kashi",
  },
];

export const durationOptions = [
  "1 Day",
  "2 Days / 1 Night",
  "3 Days / 2 Nights",
  "4 Days / 3 Nights",
  "5 Days / 4 Nights",
  "6+ Days"
];

export const groupSizeOptions = [
  "1–2 Guests",
  "3–4 Guests",
  "5–6 Guests",
  "7–10 Guests",
  "10+ Guests"
];

export const journeys = [
  // FEATURED / SIGNATURE JOURNEYS
  {
    id: "the-soul-of-kashi",
    slug: "the-soul-of-kashi",
    name: "The Soul of Kashi",
    category: "Signature Journey",
    duration: "3 Days · 2 Nights",
    guests: "2–4 Guests",
    durationOptions: ["3 Days / 2 Nights", "4 Days / 3 Nights", "5 Days / 4 Nights"],
    groupSizeOptions,
    image: "/images/hero/hero-3.jpg",
    mood: "A deeper connection",
    description: "Dawn boat · Temple trails · Silk studio · Heritage dining",
    story: "Let the city reveal itself slowly. A morning on the Ganga, a conversation in a silk studio, a meal steeped in memory. This is an invitation to meet Kashi through the people who call it home.",
    timeline: [
      "Day 01 — Arrive, settle in, and walk the old city with a local storyteller.",
      "Day 02 — Take to the Ganga at dawn, follow temple trails, and visit a silk studio.",
      "Day 03 — Share a heritage dining experience and leave time for a final riverside walk.",
    ],
    highlights: ["Private Ganga boat ride", "Silk weaving studio visit", "Heritage dining with a local family"],
    components: ["Heritage Haveli Stay", "Private Boat", "Local Storyteller Guide"],
    attraction: "Banaras Old City",
  },
  {
    id: "kashi-after-dark",
    slug: "kashi-after-dark",
    name: "Kashi After Dark",
    category: "Signature Journey",
    duration: "2 Days",
    guests: "Private journey",
    durationOptions: ["1 Day", "2 Days / 1 Night"],
    groupSizeOptions,
    image: "/images/hero/hero-2.jpg",
    mood: "When the city glows",
    description: "Evening aarti · Old city lanes · Cultural evenings",
    story: "As daylight fades, another Kashi comes alive. Follow the glow of the river, the sounds of evening prayer, and the conversations that linger in the old city.",
    timeline: [
      "Day 01 — Settle in and experience the evening Ganga aarti.",
      "Day 02 — Explore the old city and shape a cultural evening around your interests.",
    ],
    highlights: ["VIP Aarti view", "Old city night walk", "Classical music performance"],
    components: ["Comfort Hotel Stay", "Cultural Performance", "Evening Walk"],
    attraction: "Ganga Aarti & Ghats",
  },
  {
    id: "the-sacred-morning",
    slug: "the-sacred-morning",
    name: "The Sacred Morning",
    category: "Signature Journey",
    duration: "1 Day",
    guests: "Private journey",
    durationOptions: ["1 Day"],
    groupSizeOptions,
    image: "/images/hero/hero-1.jpg",
    mood: "Begin with the river",
    description: "Dawn boat · Sunrise ghat walk · Temple trails",
    story: "Before the city gathers pace, the river offers a quieter introduction. A morning for watching, listening, and finding your own connection to Kashi.",
    timeline: [
      "Dawn — A private boat experience on the Ganga.",
      "Morning — A sunrise ghat walk and temple trails, at your pace.",
    ],
    highlights: ["Subah-e-Banaras", "Private rowboat at dawn", "Quiet temple visits"],
    components: ["Private Boat", "Local Guide"],
    attraction: "Assi Ghat & Subah-e-Banaras",
  },
  {
    id: "the-banarasi-table",
    slug: "the-banarasi-table",
    name: "The Banarasi Table",
    category: "Signature Journey",
    duration: "1 Day",
    guests: "Private journey",
    durationOptions: ["1 Day"],
    groupSizeOptions,
    image: "/images/services/service-city-tour.jpg",
    mood: "A city, tasted slowly",
    description: "Family kitchens · Street food · Chaat culture",
    story: "The stories of Banaras live in its kitchens, too. Meet the city through the flavours, family traditions, and everyday rituals that make a meal memorable.",
    timeline: [
      "Morning — Discover neighbourhood flavours with your local host.",
      "Afternoon — Explore family kitchen traditions and the city’s chaat culture.",
    ],
    highlights: ["Hidden chaat spots", "Home-cooked heritage meal", "Sweets of Banaras"],
    components: ["Food Expert Guide", "Family Kitchen Visit"],
    attraction: "Banaras Old City",
  },
  // ATTRACTION-LED JOURNEYS (EXPLORE KASHI)
  {
    id: "kashi-vishwanath",
    slug: "kashi-vishwanath",
    name: "Kashi Vishwanath",
    category: "Explore Kashi",
    duration: "From 1 Day",
    guests: "Up to 10+ Guests",
    durationOptions,
    groupSizeOptions,
    image: "/images/services/service-pooja-booking.jpg",
    mood: "Sacred Kashi",
    description: "A deeply personal introduction to one of Kashi's most important spiritual landmarks.",
    story: "Experience the spiritual heart of Banaras with guided, respectful access to the Kashi Vishwanath Temple, supported by our local expertise to navigate the sacred corridors.",
    timeline: [
      "Custom timeline based on your preferred duration and rituals."
    ],
    highlights: ["Guided temple access", "Ritual arrangements", "Corridor walk"],
    components: ["VIP Darshan Support", "Ritual Arrangements"],
    attraction: "Kashi Vishwanath Temple",
  },
  {
    id: "dashashwamedh-ghat",
    slug: "dashashwamedh-ghat",
    name: "Dashashwamedh Ghat & Ganga Aarti",
    category: "Explore Kashi",
    duration: "From 1 Day",
    guests: "Up to 10+ Guests",
    durationOptions,
    groupSizeOptions,
    image: "/images/hero/hero-2.jpg",
    mood: "The River's Devotion",
    description: "Witness the grand evening ritual from the best vantage points on the river.",
    story: "The evening Aarti at Dashashwamedh Ghat is a spectacle of devotion. We arrange comfortable viewing spots, either from a private boat or exclusive balconies.",
    timeline: [
      "Custom timeline based on your preferred duration."
    ],
    highlights: ["Private boat viewing", "Exclusive balcony access", "Guided ritual context"],
    components: ["Private Boat", "Aarti Arrangements"],
    attraction: "Dashashwamedh Ghat & Ganga Aarti",
  },
  {
    id: "assi-ghat",
    slug: "assi-ghat",
    name: "Assi Ghat & Subah-e-Banaras",
    category: "Explore Kashi",
    duration: "From 1 Day",
    guests: "Up to 10+ Guests",
    durationOptions,
    groupSizeOptions,
    image: "/images/hero/hero-1.jpg",
    mood: "Morning Awakening",
    description: "Begin your day with Vedic chants, classical music, and the first light on the Ganga.",
    story: "Subah-e-Banaras at Assi Ghat is the most peaceful way to start the day. Experience morning rituals, yoga, and classical performances.",
    timeline: [
      "Custom timeline based on your preferred duration."
    ],
    highlights: ["Morning Aarti", "Classical music performance", "Yoga by the river"],
    components: ["Sunrise Ghat Walk", "Local Mobility"],
    attraction: "Assi Ghat & Subah-e-Banaras",
  },
  {
    id: "sankat-mochan",
    slug: "sankat-mochan",
    name: "Sankat Mochan Temple",
    category: "Explore Kashi",
    duration: "From 1 Day",
    guests: "Up to 10+ Guests",
    durationOptions,
    groupSizeOptions,
    image: "/images/services/service-event.jpg",
    mood: "Spiritual Heritage",
    description: "Visit the historic temple established by Tulsidas in the serene southern part of the city.",
    story: "Dedicated to Lord Hanuman, the Sankat Mochan Temple offers a deeply spiritual atmosphere, away from the bustling ghats. We provide seamless transport and guided visits.",
    timeline: [
      "Custom timeline based on your preferred duration."
    ],
    highlights: ["Guided temple visit", "Local prasad specialties", "Quiet surroundings"],
    components: ["Local Mobility", "Guided Temple Tour"],
    attraction: "Sankat Mochan Temple",
  },
  {
    id: "bhu-new-vishwanath",
    slug: "bhu-new-vishwanath",
    name: "New Vishwanath Temple / BHU",
    category: "Explore Kashi",
    duration: "From 1 Day",
    guests: "Up to 10+ Guests",
    durationOptions,
    groupSizeOptions,
    image: "/images/about-us/about-1.png",
    mood: "Academic & Architectural Grandeur",
    description: "Explore the vast campus of Banaras Hindu University and the stunning marble temple at its heart.",
    story: "BHU represents a different, expansive side of Varanasi. Drive through the lush campus and visit the New Vishwanath Temple, known for its towering spire and peaceful ambiance.",
    timeline: [
      "Custom timeline based on your preferred duration."
    ],
    highlights: ["Campus drive", "Marble temple architecture", "Bharat Kala Bhavan Museum"],
    components: ["Car Travel", "Guided Campus Tour"],
    attraction: "New Vishwanath Temple / BHU",
  },
  {
    id: "sarnath",
    slug: "sarnath",
    name: "Sarnath",
    category: "Explore Kashi",
    duration: "From 1 Day",
    guests: "Up to 10+ Guests",
    durationOptions,
    groupSizeOptions,
    image: "/images/hero/hero-3.jpg",
    mood: "Buddhist Heritage",
    description: "Step into tranquility where Buddha delivered his first sermon.",
    story: "Just a short drive from Varanasi, Sarnath offers a quiet, green contrast. Walk among ancient stupas, monasteries, and the archaeological museum with an expert guide.",
    timeline: [
      "Custom timeline based on your preferred duration."
    ],
    highlights: ["Dhamek Stupa", "Archaeological Museum", "Mulagandhakuti Vihara"],
    components: ["Car Travel", "Expert Heritage Guide"],
    attraction: "Sarnath",
  },
  {
    id: "ramnagar-fort",
    slug: "ramnagar-fort",
    name: "Ramnagar Fort",
    category: "Explore Kashi",
    duration: "From 1 Day",
    guests: "Up to 10+ Guests",
    durationOptions,
    groupSizeOptions,
    image: "/images/about-us/about-2.png",
    mood: "Royal Legacy",
    description: "Cross the Ganga to explore the ancestral home of the Maharaja of Banaras.",
    story: "Built in red sandstone on the eastern bank of the river, Ramnagar Fort is a fascinating glimpse into the region's royal past. We arrange sunset boat crossings or private car visits.",
    timeline: [
      "Custom timeline based on your preferred duration."
    ],
    highlights: ["Vintage car museum", "Armory collection", "Sunset across the river"],
    components: ["Traditional Boat", "Car Travel"],
    attraction: "Ramnagar Fort",
  },
  {
    id: "varanasi-ayodhya",
    slug: "varanasi-ayodhya",
    name: "Varanasi + Ayodhya",
    category: "Beyond Kashi",
    duration: "From 2 Days",
    guests: "Up to 10+ Guests",
    durationOptions: ["2 Days / 1 Night", "3 Days / 2 Nights", "4 Days / 3 Nights"],
    groupSizeOptions,
    image: "/images/hero/hero-1.jpg",
    mood: "A Twin Spiritual Journey",
    description: "Combine the ancient energy of Kashi with the profound heritage of Ayodhya.",
    story: "Seamlessly travel between two of India's most significant spiritual centres. We handle all logistics, stays, and guided experiences across both cities.",
    timeline: [
      "Custom timeline based on your preferred duration."
    ],
    highlights: ["Ram Janmabhoomi", "Sarayu River Aarti", "Comfortable intercity transfer"],
    components: ["Car Travel", "Comfort Hotels", "Guided Tours"],
    attraction: "Varanasi + Ayodhya",
  },
  {
    id: "varanasi-heritage",
    slug: "varanasi-heritage",
    name: "Varanasi Heritage Experience",
    category: "Explore Kashi",
    duration: "From 1 Day",
    guests: "Up to 10+ Guests",
    durationOptions,
    groupSizeOptions,
    image: "/images/services/service-city-tour.jpg",
    mood: "Living History",
    description: "Immerse yourself in the centuries-old traditions, crafts, and culture of the old city.",
    story: "Banaras is a city of layers. This journey takes you through hidden alleyways, to the doorsteps of master weavers, and into the heart of its living heritage.",
    timeline: [
      "Custom timeline based on your preferred duration."
    ],
    highlights: ["Old city heritage walk", "Silk weavers village", "Historical landmarks"],
    components: ["Local Heritage Guide", "Local Mobility"],
    attraction: "Banaras Old City",
  },
  {
    id: "ganga-boat",
    slug: "ganga-boat",
    name: "Ganga Boat Experience",
    category: "Explore Kashi",
    duration: "From 1 Day",
    guests: "Up to 10+ Guests",
    durationOptions,
    groupSizeOptions,
    image: "/images/hero/hero-3.jpg",
    mood: "The River's Rhythm",
    description: "The quintessential Varanasi experience—floating on the sacred river as the city unfolds.",
    story: "Whether at dawn or dusk, the Ganga offers the best vantage point to witness the life of the city. We provide comfortable, private traditional boat experiences.",
    timeline: [
      "Custom timeline based on your preferred duration."
    ],
    highlights: ["Sunrise or sunset ride", "Ghat photography", "Private traditional rowboat"],
    components: ["Private Boat", "Local Guide"],
    attraction: "Ganga River & Ghats",
  },
  {
    id: "kashi-temple-circuit",
    slug: "kashi-temple-circuit",
    name: "Kashi Temple Circuit",
    category: "Explore Kashi",
    duration: "From 1 Day",
    guests: "Up to 10+ Guests",
    durationOptions,
    groupSizeOptions,
    image: "/images/services/service-pooja-booking.jpg",
    mood: "Sacred Trails",
    description: "A thoughtfully guided journey through the most revered and historic temples of Kashi.",
    story: "Beyond the main Vishwanath temple, Kashi is home to countless ancient shrines. This circuit covers the essential spiritual landmarks with respect and ease.",
    timeline: [
      "Custom timeline based on your preferred duration."
    ],
    highlights: ["Kaal Bhairav Temple", "Durga Temple", "Tulsi Manas Mandir"],
    components: ["Car Travel", "Guided Temple Tour"],
    attraction: "Kashi Temple Circuit",
  },
  {
    id: "varanasi-sarnath",
    slug: "varanasi-sarnath",
    name: "Varanasi + Sarnath",
    category: "Beyond Kashi",
    duration: "From 2 Days",
    guests: "Up to 10+ Guests",
    durationOptions: ["2 Days / 1 Night", "3 Days / 2 Nights", "4 Days / 3 Nights"],
    groupSizeOptions,
    image: "/images/hero/hero-2.jpg",
    mood: "Hindu & Buddhist Roots",
    description: "Experience the vibrant energy of Kashi alongside the peaceful Buddhist heritage of Sarnath.",
    story: "A journey of contrasts. We blend the vibrant, intense devotion of Varanasi with the serene, contemplative atmosphere of nearby Sarnath.",
    timeline: [
      "Custom timeline based on your preferred duration."
    ],
    highlights: ["Ganga Aarti", "Sarnath Stupas", "Museum visits"],
    components: ["Car Travel", "Guided Tours", "Comfort Stays"],
    attraction: "Varanasi & Sarnath",
  }
];

export function whatsapp(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// CLIENT CONFIRMATION: Previous homepage: “In 2018, Kavita Shastri began leading
// small, intimate groups ... in 2020, Soil n Soul was formally born.”
// Existing About page identifies Anchal Pandey as founder. Do not reconcile these
// identities or publish a revised founding chronology without client confirmation.
export const founderStory = [
  "I am a resident of Banaras, a city known for its ancient traditions, spiritual energy, and timeless culture.",
  "While growing up here, I often observed the challenges many tourists face when visiting Kashi. Many travelers come with deep faith, curiosity, and excitement — but unfortunately, they sometimes end up paying a lot without receiving genuine services or authentic experiences.",
  "Seeing this repeatedly made me realize that visitors to this sacred city deserve honesty, guidance, and care. That is why I decided to start Soil n Soul Travels.",
  "My vision is simple: to ensure that every traveler who chooses our services feels satisfied with every rupee they spend, and leaves Kashi with beautiful memories, meaningful experiences, and a sense of connection to this incredible city.",
  "At Soil n Soul Travels, we focus on authenticity, transparency, and heartfelt hospitality — so that every journey becomes truly memorable.",
];

export const values = [
  ["Authenticity", "Genuine cultural and spiritual traditions, not spectacle."],
  [
    "Sustainability",
    "Support for local artisans, heritage hotels and community-led initiatives.",
  ],
  [
    "Safety & Trust",
    "Meticulous planning and lived local knowledge, every step of the way.",
  ],
  [
    "Conscious Luxury",
    "Locally crafted excellence and the warmth of heartfelt hospitality.",
  ],
];
