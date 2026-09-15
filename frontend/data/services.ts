export interface SubService {
  title: string;
  description: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  image: string;
  subServices: SubService[];
  faqs: FAQ[];
}

export const SERVICES: Service[] = [
  {
    slug: 'travel',
    title: 'Travel',
    shortDesc: 'Comfortable and affordable travel across Varanasi and beyond -- by car, bike, or traditional boat on the sacred Ganges.',
    fullDesc: 'We provide reliable, safe, and well-maintained transport options tailored to your journey. Whether you need a private car for city transfers, a bike rental for independent exploration, or a traditional wooden boat for a sunrise ride on the Ganges -- we have you covered with vetted drivers and transparent pricing.',
    icon: 'directions_car',
    image: '/images/services/service-travel.jpg',
    subServices: [
      { title: 'Car', description: 'Private AC car hire for airport pickups, city sightseeing, railway transfers, and intercity trips to nearby destinations.' },
      { title: 'Bike', description: 'Rented bicycles and motorcycles for self-driven exploration of Varanasi\'s alleys, ghats, and markets at your own pace.' },
      { title: 'Boat', description: 'Traditional wooden boat rides on the sacred Ganges -- sunrise rides, evening aarti cruises, and full ghat tours.' },
    ],
    faqs: [
      { q: 'Can I book a car for an airport pickup at odd hours?', a: 'Yes. Our car services are available 24/7 and we track your flight or train to ensure the driver is there when you arrive.' },
      { q: 'What types of boats do you offer?', a: 'We offer traditional wooden rowboats for a classic experience as well as motorboats for covering more of the ghats in less time.' },
      { q: 'Can I rent a bike for a full day?', a: 'Yes. Both bicycles and motorcycles can be rented on a half-day or full-day basis. A local map and route suggestions are included.' },
    ],
  },
  {
    slug: 'stay',
    title: 'Stay',
    shortDesc: 'Verified, comfortable, and safe accommodations near the ghats -- from budget homestays to premium heritage havelis.',
    fullDesc: 'Finding the right place to stay in Varanasi can make or break your experience. We personally inspect every property before recommending it -- checking safety, cleanliness, staff, and location. Whether you\'re a budget backpacker or looking for a luxury riverside heritage room, we will match you to the perfect stay.',
    icon: 'hotel',
    image: '/images/services/service-stay.jpg',
    subServices: [
      { title: 'Budget Homestays', description: 'Cozy, clean, hosted stays in local homes near the ghats -- warm, affordable, and authentic.' },
      { title: 'Heritage Havelis', description: 'Beautifully restored old Banarasi mansions offering river views, traditional decor, and premium hospitality.' },
      { title: 'Comfort Hotels', description: 'Well-located, mid-range hotels with modern amenities and easy access to the main sights.' },
      { title: 'Women-Safe Properties', description: 'Verified properties with female staff, secure access, and additional safety protocols for solo female travelers.' },
    ],
    faqs: [
      { q: 'How do you verify stays?', a: 'Each property is physically visited by our team. We inspect rooms, bathrooms, staff behaviour, security, and overall cleanliness before listing it.' },
      { q: 'Can I request a ghat-view room?', a: 'Yes. Let us know when booking and we will do our best to secure a room with a Ganga view based on availability.' },
      { q: 'Are early check-in and late checkout available?', a: 'For most properties we partner with, flexible check-in/checkout can be arranged with advance notice.' },
    ],
  },
  {
    slug: 'pooja-booking',
    title: 'Pooja Booking',
    shortDesc: 'Authentic Vedic ceremonies and puja arrangements -- Ganga Aarti, Pind Daan, Kashi Vishwanath puja, and more.',
    fullDesc: 'Varanasi is India\'s spiritual capital and performing a puja or ceremony here carries immense significance. We connect you with learned, trustworthy Brahmin priests and handle all logistics -- ritual materials, timing, permissions, and guidance -- so you can focus fully on your devotion without confusion or hidden charges.',
    icon: 'temple_hindu',
    image: '/images/services/service-pooja-booking.jpg',
    subServices: [
      { title: 'Ganga Aarti Arrangements', description: 'Private front-row viewing or active participation arrangements at the iconic Dashashwamedh Ghat evening Ganga Aarti.' },
      { title: 'Pind Daan', description: 'Authentic ancestral rites (Pind Daan) conducted at the correct ghats by experienced Brahmin priests.' },
      { title: 'Kashi Vishwanath Puja', description: 'Priority darshan and puja bookings at the holy Kashi Vishwanath Temple with dedicated priest support.' },
      { title: 'Personal Brahmin Priest', description: 'A dedicated Brahmin priest accompanying you throughout your Varanasi stay for personal rituals, prayers, and guidance.' },
    ],
    faqs: [
      { q: 'Are all ritual costs included in the quoted price?', a: 'Yes. We give you a complete transparent quote upfront including priest fees, flowers, materials, and any donations. No surprise charges at the ghat.' },
      { q: 'Can non-Hindus book puja ceremonies?', a: 'Absolutely. Our priests welcome visitors of all faiths and backgrounds and will guide you respectfully through every ritual.' },
      { q: 'How far in advance should I book?', a: 'For Kashi Vishwanath puja and Ganga Aarti, at least 2-3 days in advance is recommended. For Pind Daan, 1 week is ideal.' },
    ],
  },
  {
    slug: 'event',
    title: 'Event',
    shortDesc: 'Curated events and celebrations in Varanasi -- pre-wedding shoots, cultural evenings, private ceremonies, and special occasions.',
    fullDesc: 'Varanasi is the most dramatic and spiritually charged backdrop in India for a meaningful event. We plan and execute a wide range of private events -- from pre-wedding photoshoots on the ghats at sunrise, to traditional cultural evenings with classical music and food, to intimate spiritual gatherings. Everything is handled locally with care.',
    icon: 'celebration',
    image: '/images/services/service-event.jpg',
    subServices: [
      { title: 'Pre-Wedding Photography', description: 'Cinematic pre-wedding shoots at sunrise on the ghats, in heritage alleys, and against temple architecture.' },
      { title: 'Cultural Evenings', description: 'Private evenings featuring classical Banarasi music, traditional dance, local cuisine, and storytelling.' },
      { title: 'Private Spiritual Ceremonies', description: 'Intimate spiritual gatherings, personal prayers, and faith-based events arranged with full local support.' },
      { title: 'Special Occasion Celebrations', description: 'Birthdays, anniversaries, and milestone events planned uniquely in the heart of Kashi.' },
    ],
    faqs: [
      { q: 'Do you handle photography for events?', a: 'Yes. We have a curated network of professional photographers and videographers experienced in Varanasi\'s unique light and locations.' },
      { q: 'Can you arrange traditional outfits for photo shoots?', a: 'Yes -- sarees, lehengas, and sherwanis can be sourced and styled for shoots or cultural events.' },
      { q: 'Do I need permits for outdoor shoots or events?', a: 'For most ghat locations, no formal permit is required. For larger setups (drones, large crews), we handle all necessary local permissions.' },
    ],
  },
  {
    slug: 'city-tour',
    title: 'City Tour',
    shortDesc: 'Expert-guided walks and tours through the ancient streets, temples, ghats, and hidden corners of Varanasi.',
    fullDesc: 'Varanasi is one of the world\'s oldest living cities and its layers of history, spirituality, and culture can overwhelm any first-time visitor. Our expert local guides -- historians, storytellers, and lifelong Banarasis -- take you deep into the city\'s soul. Sunrise ghat walks, heritage walks through ancient alleys, temple circuits, food tours, and day trips to Sarnath.',
    icon: 'tour',
    image: '/images/services/service-city-tour.jpg',
    subServices: [
      { title: 'Sunrise Ghat Walk', description: 'The most iconic Varanasi experience -- an early morning walk along the ghats as the city wakes, prays, and bathes.' },
      { title: 'Old City Heritage Walk', description: 'Explore the labyrinthine lanes of the old city with a local historian, discovering hidden shrines, weavers, and architecture.' },
      { title: 'Temple Circuit Tour', description: 'Guided visits to Kashi Vishwanath, Sankat Mochan, Durga Temple, and other significant temples with cultural context.' },
      { title: 'Food Walk', description: 'A delicious tour through Varanasi\'s famous street food -- chaats, lassi, thandai, baati chokha, and more.' },
      { title: 'Sarnath Day Trip', description: 'A guided half-day or full-day trip to Sarnath, where Lord Buddha gave his first sermon, just 13 km from Varanasi.' },
    ],
    faqs: [
      { q: 'Are tours private or in groups?', a: 'All our tours are private by default -- just you, your group, and your guide. We do not mix clients from different bookings.' },
      { q: 'How much walking is involved?', a: 'Standard walks cover 3-5 km over 2-3 hours at a relaxed pace. We customize the distance and pace based on your needs.' },
      { q: 'Are English-speaking guides available?', a: 'Yes. All our guides speak fluent English. Hindi, Bengali, and Gujarati-speaking guides are also available on request.' },
    ],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);
