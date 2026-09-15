import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSEO, breadcrumbSchema, localBusinessSchema } from '../hooks/useSEO';

// ─── SEO Page Configs ──────────────────────────────────────────────────────────
export const SEO_PAGES: Record<string, {
  slug: string;
  keyword: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  heroHeading: string;
  heroSubtitle: string;
  intro: string[];
  sections: { heading: string; body: string; icon: string }[];
  faqs: { q: string; a: string }[];
  cta: string;
  breadcrumb: { name: string; url: string }[];
}> = {
  'best-travel-agency-varanasi': {
    slug: 'best-travel-agency-varanasi',
    keyword: 'Best Travel Agency in Varanasi',
    title: 'Best Travel Agency in Varanasi',
    metaTitle: 'Best Travel Agency in Varanasi | Soil n Soul Travels',
    metaDescription:
      'Looking for the best travel agency in Varanasi? Soil n Soul Travels offers verified stays, Ganga Aarti packages, cultural tours & airport transfers — trusted by 500+ travellers.',
    keywords:
      'best travel agency in Varanasi, best tours and travel agency in Varanasi, varanasi travel agency, travel agency in varanasi, top travel agency in varanasi, local travel agency varanasi, trusted travel company Varanasi, Varanasi tour operator',
    heroHeading: 'Best Travel Agency in Varanasi',
    heroSubtitle:
      'Authentic, transparent & heartfelt Varanasi experiences — trusted by 500+ travellers from 38 countries.',
    intro: [
      'Finding the best travel agency in Varanasi can be overwhelming. The city is full of touts, overpriced packages, and misleading promises. Soil n Soul Travels was born precisely to solve this problem.',
      'Founded by Anchal Pandey, a native of Banaras, we offer honest pricing, personally inspected accommodation, and experiences rooted in real local culture — not tourist gimmicks.',
    ],
    sections: [
      {
        heading: 'Why We Are Varanasi\'s Most Trusted Agency',
        body: 'Every property we recommend has been personally inspected. Every guide on our team is a local who grew up in these lanes. We don\'t upsell. We don\'t cut corners. And we are available 24/7 throughout your stay.',
        icon: 'verified',
      },
      {
        heading: '500+ Journeys Curated',
        body: 'From solo pilgrims to large family groups, from international tourists to NRIs returning to their roots — we have crafted over 500 journeys and carry a 4.9-star satisfaction rating.',
        icon: 'star',
      },
      {
        heading: 'Transparent, Fixed Pricing',
        body: 'We believe you should know exactly what you are paying for. Our pricing is all-inclusive, written down, and agreed before your journey begins. No hidden charges. Ever.',
        icon: 'receipt_long',
      },
      {
        heading: 'Local Expertise, Global Standards',
        body: 'We combine the warmth and deep knowledge of a local guide with the professionalism and communication standards expected by international travellers. Bilingual team. 24/7 support.',
        icon: 'language',
      },
    ],
    faqs: [
      {
        q: 'Is Soil n Soul the best travel agency in Varanasi?',
        a: 'We are rated 4.9 stars by 500+ travellers from 38 countries. Our founder is a native of Banaras and every experience we curate is personally reviewed for authenticity and value.',
      },
      {
        q: 'How do I book a tour with the best travel agency in Varanasi?',
        a: 'Simply WhatsApp us at +91 95804 17547 or fill in our contact form. We respond within the hour and will design a custom itinerary for you — no off-the-shelf packages.',
      },
      {
        q: 'What makes Soil n Soul different from other travel agencies in Varanasi?',
        a: 'We are local, honest, and fully transparent. Our founder personally vets every hotel, guide, and vendor. We do not charge commissions from partners — our loyalty is entirely to the traveller.',
      },
    ],
    cta: 'Book Your Varanasi Journey',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Best Travel Agency in Varanasi', url: '/travel/best-travel-agency-varanasi' },
    ],
  },

  'varanasi-tour-packages': {
    slug: 'varanasi-tour-packages',
    keyword: 'Varanasi Tour Packages',
    title: 'Varanasi Tour Packages',
    metaTitle: 'Varanasi Tour Packages 2025 | Customised & Affordable | Soil n Soul',
    metaDescription:
      'Explore handcrafted Varanasi tour packages for 2025. Ganga Aarti, heritage walks, pilgrimage packages & luxury stays. Book with Soil n Soul Travels — Varanasi\'s most trusted agency.',
    keywords:
      'Varanasi tour packages, varanasi tour package price, varanasi travel packages, book varanasi tour package, varanasi trip planning services, varanasi travel planner, 2 day varanasi tour package, 3 day varanasi itinerary, varanasi trip plan for family, varanasi travel guide 2026',
    heroHeading: 'Varanasi Tour Packages 2025',
    heroSubtitle:
      'Bespoke, fully customised Varanasi tour packages for every traveller — pilgrims, culture seekers, families, and luxury travellers.',
    intro: [
      'Varanasi is unlike any other destination in the world. Its ghats, temples, rituals, and labyrinthine lanes demand more than a quick visit — they demand a thoughtfully curated journey.',
      'Soil n Soul Travels designs completely bespoke Varanasi tour packages built around your interests, dates, and budget. No cookie-cutter itineraries. Every package is made fresh for you.',
    ],
    sections: [
      {
        heading: 'Ganga Aarti & Spiritual Package',
        body: 'Experience the magnificent Ganga Aarti at Dashashwamedh Ghat, sunrise boat ride on the Ganges, private puja arrangements, and guided visits to Kashi Vishwanath Temple. Perfect for pilgrims and spiritual seekers.',
        icon: 'temple_hindu',
      },
      {
        heading: 'Heritage & Culture Package',
        body: 'Explore the ancient ghats, old city bazaars, Banaras Hindu University, Ramnagar Fort, and the living culture of Kashi with expert local guides who know every hidden lane.',
        icon: 'museum',
      },
      {
        heading: 'Luxury Varanasi Package',
        body: 'Stay at handpicked boutique heritage hotels overlooking the Ganges. Private boat rides at dawn. Curated silk shopping with verified weaver families. A Varanasi few tourists ever experience.',
        icon: 'diamond',
      },
      {
        heading: 'Family Pilgrimage Package',
        body: 'Comfortable, family-friendly accommodation, private transport, guided rituals, and personalised itineraries that accommodate every age and mobility level in your group.',
        icon: 'family_restroom',
      },
    ],
    faqs: [
      {
        q: 'How much do Varanasi tour packages cost?',
        a: 'Package costs depend on duration, group size, and accommodation tier. Our packages start from ₹3,500 per person per day for budget stays and range up to ₹15,000+ for luxury boutique experiences. Contact us for a custom quote.',
      },
      {
        q: 'Can I get a customised Varanasi tour package?',
        a: 'Absolutely. Every package we create is completely bespoke. Share your travel dates, group size, interests, and budget — and we will design a personalised itinerary within 24 hours.',
      },
      {
        q: 'Do Varanasi tour packages include accommodation?',
        a: 'Yes. All our packages include personally inspected accommodation options at budget, mid-range, and luxury tiers. We can book hotels, heritage havelis, and ghat-facing guesthouses.',
      },
    ],
    cta: 'Get a Custom Package Quote',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Varanasi Tour Packages', url: '/travel/varanasi-tour-packages' },
    ],
  },

  'ganga-aarti-varanasi': {
    slug: 'ganga-aarti-varanasi',
    keyword: 'Ganga Aarti Varanasi',
    title: 'Ganga Aarti Varanasi — Complete Guide & Booking',
    metaTitle: 'Ganga Aarti Varanasi 2025 | Best View, Timings & Booking | Soil n Soul',
    metaDescription:
      'Witness the grand Ganga Aarti in Varanasi with the best view guaranteed. Know timings, what to expect, and how to book a front-row experience with Soil n Soul Travels.',
    keywords:
      'Ganga Aarti Varanasi, ganga aarti booking varanasi, Dashashwamedh Ghat Aarti, Ganga Aarti timings, Ganga Aarti boat ride, varanasi pooja booking, kashi vishwanath darshan booking, varanasi temple tour package',
    heroHeading: 'Ganga Aarti Varanasi — A Divine Spectacle',
    heroSubtitle:
      'Experience the most magnificent evening ritual in India with a guaranteed front-row view and deep cultural insight.',
    intro: [
      'The Ganga Aarti at Dashashwamedh Ghat in Varanasi is one of the most mesmerising spiritual events in the world. Every evening as dusk falls over the Ganges, a team of priests perform a grand, synchronised ritual of fire offerings — a ceremony unchanged for centuries.',
      'Watching the Ganga Aarti for the first time can be emotionally overwhelming. Thousands gather on the ghat steps and in boats on the river. Fire, chanting, incense, and the sound of bells fill the air. Soil n Soul Travels ensures you experience this not as a tourist in a crowd, but with genuine understanding and the best possible view.',
    ],
    sections: [
      {
        heading: 'Ganga Aarti Timings 2025',
        body: 'The Ganga Aarti takes place every evening at Dashashwamedh Ghat. Evening Aarti (Sandhya Aarti) begins approximately at 6:30 PM in winter and 7:00 PM in summer. A morning Aarti also occurs at sunrise. Exact timings shift with the season — we always confirm current timings for your visit.',
        icon: 'schedule',
      },
      {
        heading: 'Best View: Boat vs. Ghat Steps',
        body: 'A private boat on the Ganges offers an unobstructed, panoramic view of all seven priests performing simultaneously — arguably the best angle for photography and a complete visual experience. Ghat steps provide an immersive, closer atmosphere. We arrange both options based on your preference.',
        icon: 'directions_boat',
      },
      {
        heading: 'What to Expect at the Aarti',
        body: 'The ceremony lasts approximately 45 minutes. Seven priests stand at elevated platforms and perform ritualised fire worship using large brass lamps (diyas), conch shells, yak-tail whisks, and flowers. The atmosphere is deeply devotional and mesmerising.',
        icon: 'celebration',
      },
      {
        heading: 'Private Aarti Arrangements',
        body: 'We can arrange private aarti participation, personalised puja (ritual prayer) on the ghats, flower offerings, and after-aarti boat rides in the calm of the Ganges by night. A deeply personal experience beyond what any group tour offers.',
        icon: 'spa',
      },
    ],
    faqs: [
      {
        q: 'What time does Ganga Aarti happen in Varanasi?',
        a: 'The main (Sandhya) Ganga Aarti starts between 6:30 PM and 7:00 PM depending on the season. Morning Aarti happens just after sunrise. We confirm exact timings for your travel dates.',
      },
      {
        q: 'Is a boat needed to see Ganga Aarti?',
        a: 'A boat is not mandatory, but it offers the best panoramic view. We arrange private boats with comfortable seating so you can photograph and absorb the ceremony without being in a crowd.',
      },
      {
        q: 'Can tourists participate in Ganga Aarti?',
        a: 'Yes. Visitors of all faiths are welcome to observe and participate in offerings. We help our guests offer diyas (flower lamps) on the Ganges after the Aarti — a beautiful, meditative ritual.',
      },
    ],
    cta: 'Book a Ganga Aarti Experience',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Ganga Aarti Varanasi', url: '/travel/ganga-aarti-varanasi' },
    ],
  },

  'varanasi-hotels': {
    slug: 'varanasi-hotels',
    keyword: 'Best Hotels in Varanasi',
    title: 'Best Hotels in Varanasi — Verified Stays',
    metaTitle: 'Best Hotels in Varanasi 2025 | Ghat View & Heritage Stays | Soil n Soul',
    metaDescription:
      'Find verified hotels in Varanasi for every budget. Ghat-view guesthouses, heritage havelis, and luxury boutique hotels — handpicked and personally inspected by Soil n Soul Travels.',
    keywords:
      'best hotels in Varanasi, Varanasi ghat view hotels, heritage hotels Varanasi, luxury hotels Varanasi, budget stays Varanasi, guesthouses Varanasi',
    heroHeading: 'Best Hotels in Varanasi — Personally Verified',
    heroSubtitle:
      'Ghat-view guesthouses, heritage havelis, and luxury stays — every property inspected by our team for safety, cleanliness, and character.',
    intro: [
      'Choosing where to stay in Varanasi can make or break your entire trip. The wrong hotel — poorly located, noisy, or unsanitary — can ruin what should be a life-changing journey.',
      'Soil n Soul Travels personally inspects every property we recommend. We stay in them ourselves. We check room quality, staff responsiveness, water supply, power backup, wifi, and most importantly — the character and warmth of the property. We only recommend places we would confidently send our own family to.',
    ],
    sections: [
      {
        heading: 'Ghat-Facing Guesthouses',
        body: 'Wake up to the sight of the Ganges and the sounds of morning prayers. We have curated a selection of guesthouses that sit directly on or within a short walk of the historic ghats — offering an immersive, authentic Varanasi experience.',
        icon: 'water',
      },
      {
        heading: 'Heritage Havelis & Boutique Hotels',
        body: 'Varanasi has some stunning heritage properties — old merchant havelis and restored colonial-era buildings with characterful rooms, courtyards, and rooftop terraces. These are our personal favourites and represent the soul of the city.',
        icon: 'account_balance',
      },
      {
        heading: 'Luxury Hotels & Resorts',
        body: 'For travellers seeking premium comfort, we work with the best luxury properties in Varanasi — offering world-class amenities while maintaining proximity to the spiritual heart of the city.',
        icon: 'hotel',
      },
      {
        heading: 'Budget & Backpacker Stays',
        body: 'Budget does not mean compromising safety or cleanliness. Our budget recommendations are clean, safe, centrally located properties popular with solo travellers, backpackers, and budget-conscious families.',
        icon: 'savings',
      },
    ],
    faqs: [
      {
        q: 'Which is the best area to stay in Varanasi?',
        a: 'The ghat area (particularly near Dashashwamedh Ghat and Assi Ghat) is the most recommended for first-time visitors — it puts you within walking distance of the most important sights and the Ganga Aarti.',
      },
      {
        q: 'Do you help with hotel booking in Varanasi?',
        a: 'Yes. We handle all accommodation arrangements as part of our travel packages. We negotiate the best rates, ensure rooms are prepared for your arrival, and are available 24/7 if any issues arise.',
      },
      {
        q: 'Are hotels in Varanasi safe?',
        a: 'Safety varies widely. Our recommended properties are all personally inspected for safety features, fire exits, water quality, and overall security. We never recommend a property we haven\'t vetted.',
      },
    ],
    cta: 'Find Your Perfect Varanasi Stay',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Best Hotels in Varanasi', url: '/travel/varanasi-hotels' },
    ],
  },

  'varanasi-sightseeing': {
    slug: 'varanasi-sightseeing',
    keyword: 'Varanasi Sightseeing',
    title: 'Varanasi Sightseeing — Complete Guide',
    metaTitle: 'Varanasi Sightseeing 2025 | Ghats, Temples & Hidden Gems | Soil n Soul',
    metaDescription:
      'Discover the best Varanasi sightseeing spots — ancient ghats, Kashi Vishwanath, Sarnath, Ramnagar Fort, and hidden local gems. Guided tours with Soil n Soul Travels.',
    keywords:
      'Varanasi sightseeing, places to visit in Varanasi, Varanasi tourist spots, ghats in Varanasi, Kashi tourist places, best places Varanasi, travel agency near me varanasi, varanasi city tour near me, best tour guide in varanasi, varanasi local tour services, varanasi sarnath tour package',
    heroHeading: 'Varanasi Sightseeing — See Kashi Beyond Tourism',
    heroSubtitle:
      'From ancient ghats and sacred temples to hidden lanes and living traditions — a complete insider\'s guide to Varanasi sightseeing.',
    intro: [
      'Varanasi (Kashi / Banaras) is one of the world\'s oldest continuously inhabited cities. Every lane, every ghat, every crumbling haveli carries centuries of history, mythology, and living culture.',
      'Most tourist guides only show you the surface. Soil n Soul Travels was founded by a native of Banaras who knows which temple opens at 4 AM for the most sacred darshan, which ghat is peaceful at sunrise, and which silk weaver family in Madanpura creates the finest Banarasi sarees. We take you beyond the photograph to the experience.',
    ],
    sections: [
      {
        heading: 'The Famous Ghats of Varanasi',
        body: 'Varanasi has 88 ghats stretching along the Ganges. Dashashwamedh (Aarti), Manikarnika (cremation), Assi (sunrise yoga), Harishchandra, and Kedar ghats each have distinct energy and significance. A morning boat ride covering all ghats is the quintessential Varanasi experience.',
        icon: 'water',
      },
      {
        heading: 'Kashi Vishwanath Temple',
        body: 'One of the holiest temples in Hinduism, newly transformed into the Kashi Vishwanath Corridor. We help our guests plan their visit, understand the darshan timings, and experience the temple with proper ritual preparation rather than just joining the tourist queue.',
        icon: 'temple_hindu',
      },
      {
        heading: 'Sarnath — Where Buddha Gave His First Sermon',
        body: 'Just 10 km from Varanasi, Sarnath is where the Buddha turned the wheel of Dharma. The Dhamek Stupa, Mulagandhakuti Vihara, and Sarnath Museum make for a half-day visit full of depth and meaning.',
        icon: 'self_improvement',
      },
      {
        heading: 'Old City Lanes & Silk Bazaars',
        body: 'The real Varanasi is in its labyrinthine lanes (gallis) — narrow, ancient streets filled with chai shops, sweet sellers, flower vendors, and silk weavers. We guide you through safely and help you discover genuine local life.',
        icon: 'store',
      },
    ],
    faqs: [
      {
        q: 'What are the must-see places in Varanasi?',
        a: 'The Ganges ghats (especially Dashashwamedh and Assi), Kashi Vishwanath Temple, Ganga Aarti at sunset, Sarnath, Ramnagar Fort, and the old city lanes are absolute must-sees for every visitor.',
      },
      {
        q: 'How many days are needed for Varanasi sightseeing?',
        a: 'We recommend a minimum of 3 full days to properly experience Varanasi — to see the sights without rushing, absorb the atmosphere, and participate in the spiritual rituals that make this city extraordinary.',
      },
      {
        q: 'Do you offer guided sightseeing tours?',
        a: 'Yes. All our sightseeing tours are guided by local experts who were born and raised in Varanasi. Our guides speak English, Hindi, and can arrange interpreters for other languages.',
      },
    ],
    cta: 'Book a Varanasi Sightseeing Tour',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Varanasi Sightseeing', url: '/travel/varanasi-sightseeing' },
    ],
  },

  'varanasi-honeymoon': {
    slug: 'varanasi-honeymoon',
    keyword: 'Varanasi Honeymoon Package',
    title: 'Varanasi Honeymoon Package',
    metaTitle: 'Varanasi Honeymoon Package 2025 | Romantic Stays & Private Experiences | Soil n Soul',
    metaDescription:
      'Plan a magical honeymoon in Varanasi. Romantic ghat-view stays, private boat rides at sunrise, couple\'s puja, pre-wedding photography & personalised experiences by Soil n Soul Travels.',
    keywords:
      'Varanasi honeymoon package, romantic Varanasi tour, Varanasi couple tour, honeymoon in Kashi, Varanasi pre-wedding shoot',
    heroHeading: 'Varanasi Honeymoon Package — Romance by the Ganges',
    heroSubtitle:
      'Begin your journey together with the mystical, timeless beauty of Kashi — private boat rides, heritage stays, and moments you\'ll never forget.',
    intro: [
      'Varanasi as a honeymoon destination surprises many — but couples who come here often say it was the most meaningful and romantic trip of their lives. There is something about the Ganges, the ancient ghats, and the spiritual energy of Kashi that creates an atmosphere of deep connection.',
      'Soil n Soul Travels designs private, personalised honeymoon experiences — intimate boat rides at dawn, candlelit dinners with a Ganges view, pre-wedding photography sessions in the most photogenic corners of the old city, and stays in heritage rooms with river-facing terraces.',
    ],
    sections: [
      {
        heading: 'Private Sunrise Boat Ride',
        body: 'As the city slowly wakes, drift along the Ganges in a private wooden boat as the golden light touches the ancient ghats. Include a flower offering ceremony on the river for a profoundly moving start to your married life.',
        icon: 'directions_boat',
      },
      {
        heading: 'Pre-Wedding & Couple Photography',
        body: 'Our professional photographers capture your moments against the timeless backdrop of Varanasi — the ghats, alleys, temples, and river create an extraordinary canvas. Cinematic reels and high-quality stills included.',
        icon: 'photo_camera',
      },
      {
        heading: 'Heritage Romantic Stays',
        body: 'We arrange stays in beautifully restored heritage guesthouses and boutique hotels — often with private terraces overlooking the Ganges, where you can watch the Ganga Aarti from the comfort of your room.',
        icon: 'hotel',
      },
      {
        heading: 'Couple\'s Private Puja',
        body: 'A personalised ritual blessing by a learned Pandit on the banks of the Ganges — an auspicious and deeply meaningful way to begin a new chapter of life together.',
        icon: 'spa',
      },
    ],
    faqs: [
      {
        q: 'Is Varanasi a good honeymoon destination?',
        a: 'Absolutely. Varanasi offers profound beauty, spiritual depth, heritage architecture, and intimate experiences that most honeymoon destinations cannot match. Couples consistently describe it as one of the most meaningful trips of their lives.',
      },
      {
        q: 'What is included in a Varanasi honeymoon package?',
        a: 'Our honeymoon packages include accommodation, private transport, guided tours, a dawn boat ride, Ganga Aarti experience, couple\'s photography session, and personalised puja. Everything is fully customisable.',
      },
      {
        q: 'Can you arrange pre-wedding photography in Varanasi?',
        a: 'Yes. Pre-wedding and post-wedding photography in Varanasi is one of our most popular services. The ghats, temples, silk alleys, and river light create stunning, unique backdrops. Contact us to discuss packages.',
      },
    ],
    cta: 'Plan Your Varanasi Honeymoon',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Varanasi Honeymoon Package', url: '/travel/varanasi-honeymoon' },
    ],
  },

  // ── NEW: Pooja & Spiritual Bookings ──────────────────────────────────────────
  'varanasi-pooja-booking': {
    slug: 'varanasi-pooja-booking',
    keyword: 'Varanasi Pooja Booking',
    title: 'Varanasi Pooja & Spiritual Booking Service',
    metaTitle: 'Varanasi Pooja Booking | Ganga Aarti, Kashi Vishwanath Darshan & Pandit | Soil n Soul',
    metaDescription:
      'Book authentic puja ceremonies, Kashi Vishwanath darshan, Ganga Aarti, and pandit services in Varanasi. Spiritual arrangements handled end-to-end by Soil n Soul Travels.',
    keywords:
      'varanasi pooja booking, ganga aarti booking varanasi, kashi vishwanath darshan booking, pandit booking varanasi, varanasi temple tour package, varanasi spiritual tour, puja arrangement varanasi, ganga puja varanasi',
    heroHeading: 'Varanasi Pooja Booking — Authentic Spiritual Arrangements',
    heroSubtitle:
      'Ganga Aarti, Kashi Vishwanath darshan, personalised puja, and pandit booking — arranged with reverence and deep local knowledge.',
    intro: [
      'Varanasi is the spiritual capital of India. Every ritual performed here — whether a simple ghat puja or the full Kashi Vishwanath darshan — carries an energy and significance that is unlike anywhere else in the world.',
      'But navigating spiritual bookings in Varanasi as a visitor can be daunting. Long queues, language barriers, and the risk of being misled by touts are real challenges. Soil n Soul Travels handles all spiritual arrangements personally — ensuring every ritual is authentic, conducted by qualified pandits, and deeply meaningful.',
    ],
    sections: [
      {
        heading: 'Ganga Aarti Booking',
        body: 'We arrange premium viewing positions for the Ganga Aarti at Dashashwamedh Ghat — either from private boats on the river or from designated spots on the ghat steps. We confirm timings and handle all logistics so you simply arrive and experience.',
        icon: 'celebration',
      },
      {
        heading: 'Kashi Vishwanath Darshan Booking',
        body: 'Kashi Vishwanath Temple darshan involves specific planning — correct entry points, VIP darshan options, ritual flower offerings, and understanding the puja timings. We guide our guests through the entire process with a knowledgeable local escort.',
        icon: 'temple_hindu',
      },
      {
        heading: 'Pandit Booking for Private Puja',
        body: 'We connect you with learned, authentic pandits for private puja ceremonies on the ghats — pitru tarpan (ancestor rituals), Satyanarayan Puja, Rudrabhishek, naming ceremonies, and other rituals performed with full Vedic authenticity.',
        icon: 'auto_stories',
      },
      {
        heading: 'Varanasi Temple Tour Package',
        body: 'Varanasi has thousands of temples — each one significant, beautiful, and often missed entirely by mainstream tourism. Our guided temple tours cover 8–12 major and hidden temples across the old city, with complete ritual participation included.',
        icon: 'location_on',
      },
    ],
    faqs: [
      {
        q: 'How do I book a puja in Varanasi?',
        a: 'Simply WhatsApp us with your travel dates and the type of puja or ritual you want to perform. We organise everything — the pandit, the ritual materials, the ghat booking, and any special permissions needed.',
      },
      {
        q: 'Can you book Kashi Vishwanath darshan in advance?',
        a: 'Yes. We help guests plan their Kashi Vishwanath visit, select the right darshan time, arrange VIP options where available, and provide a local escort who knows the temple procedures to ensure a smooth and spiritually fulfilling visit.',
      },
      {
        q: 'Are the pandits you recommend genuine?',
        a: 'Absolutely. All the pandits we work with are practicing priests from Varanasi — many from families with centuries of ritual tradition. We personally verify credentials and consistently receive feedback about the authenticity and power of the ceremonies.',
      },
    ],
    cta: 'Book a Puja or Darshan',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Varanasi Pooja Booking', url: '/travel/varanasi-pooja-booking' },
    ],
  },

  // ── NEW: Multi-City Location Combos ──────────────────────────────────────────
  'varanasi-multi-city-tours': {
    slug: 'varanasi-multi-city-tours',
    keyword: 'Varanasi Multi-City Tour Packages',
    title: 'Varanasi Multi-City Tour Packages — Ayodhya, Prayagraj & More',
    metaTitle: 'Varanasi Ayodhya Prayagraj Tour Package | Multi-City Pilgrimage | Soil n Soul',
    metaDescription:
      'Combine Varanasi with Ayodhya, Prayagraj, Sarnath, or Bodhgaya for an epic multi-city pilgrimage tour. Custom packages by Soil n Soul Travels — fully arranged, end-to-end.',
    keywords:
      'varanasi ayodhya tour package, varanasi prayagraj tour package, varanasi sarnath tour package, varanasi bodhgaya tour, multi city pilgrimage tour UP, varanasi allahabad tour, varanasi lucknow tour, kashi mathura vrindavan tour',
    heroHeading: 'Varanasi Multi-City Tours — The Great Pilgrimage Circuit',
    heroSubtitle:
      'Combine the spiritual power of Varanasi with Ayodhya, Prayagraj, Sarnath, and Bodhgaya — fully curated, end-to-end pilgrim circuits.',
    intro: [
      'Varanasi sits at the heart of India\'s most spiritually dense region. Within 300 km, you have Ayodhya (birthplace of Ram), Prayagraj (the Triveni Sangam), Sarnath (where Buddha preached), and Bodhgaya (where Buddha attained enlightenment). No other region on earth concentrates this much sacred significance.',
      'Soil n Soul Travels designs seamless multi-city pilgrimage circuits starting from Varanasi. We handle all road transport, accommodation at each destination, local guides, and ritual arrangements — so your journey is sacred and stress-free from the first day to the last.',
    ],
    sections: [
      {
        heading: 'Varanasi + Ayodhya Package',
        body: 'Visit Ram Janmabhoomi, Hanuman Garhi, Kanak Bhawan, and the newly built Ram Mandir in Ayodhya — then return to Varanasi for the Ganga Aarti. We arrange 3–5 day combined packages with comfortable road transport and accommodation at both destinations.',
        icon: 'temple_hindu',
      },
      {
        heading: 'Varanasi + Prayagraj Package',
        body: 'Prayagraj hosts the confluence of the Ganga, Yamuna, and mythical Saraswati rivers — one of the holiest spots in Hinduism. Combined 2–4 day packages include the Triveni Sangam holy dip, Allahabad Fort, and Akbar\'s tomb, alongside Varanasi\'s ghats.',
        icon: 'water',
      },
      {
        heading: 'Varanasi + Sarnath Package',
        body: 'Just 10 km from Varanasi, Sarnath is where the Buddha gave his first sermon. Most visitors combine it as a half-day trip or add it as an overnight extension — visiting the Dhamek Stupa, Mulagandhakuti Vihara, and the Sarnath Museum.',
        icon: 'self_improvement',
      },
      {
        heading: 'Varanasi + Bodhgaya Package',
        body: 'Bodhgaya — where the Buddha attained enlightenment under the Bodhi Tree — is approximately 250 km from Varanasi. We arrange 2-night Bodhgaya extensions including the Mahabodhi Temple, the Bodhi Tree, and guided meditation sessions at Buddhist monasteries.',
        icon: 'spa',
      },
    ],
    faqs: [
      {
        q: 'Can you arrange a Varanasi and Ayodhya combined tour package?',
        a: 'Yes. Our Varanasi–Ayodhya package runs for 3–5 days and includes private road transport, accommodation in both cities, guided temple tours, and all ritual arrangements. Contact us for pricing.',
      },
      {
        q: 'Is it easy to travel between Varanasi and Prayagraj?',
        a: 'Yes — Prayagraj (Allahabad) is approximately 120 km from Varanasi and accessible by road in 2–3 hours. We arrange private car transfers and can extend your itinerary to include both cities seamlessly.',
      },
      {
        q: 'What is the best multi-city pilgrimage circuit from Varanasi?',
        a: 'The most popular circuit is Varanasi → Prayagraj → Ayodhya (or reverse), which covers the three holiest sites of Sanatana Dharma in one journey. A Buddhist circuit would be Varanasi → Sarnath → Bodhgaya. We customise both based on your schedule.',
      },
    ],
    cta: 'Plan a Multi-City Pilgrimage',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Varanasi Multi-City Tours', url: '/travel/varanasi-multi-city-tours' },
    ],
  },

  // ── NEW: Comparison / How-to-Choose Page ─────────────────────────────────────
  'how-to-choose-travel-agency-varanasi': {
    slug: 'how-to-choose-travel-agency-varanasi',
    keyword: 'How to Choose a Travel Agency in Varanasi',
    title: 'How to Choose the Best Travel Agency in Varanasi',
    metaTitle: 'How to Choose a Travel Agency in Varanasi | Honest Guide | Soil n Soul',
    metaDescription:
      'Avoid tourist traps. Learn exactly how to identify and choose the best travel agency in Varanasi — red flags to avoid, questions to ask, and why Soil n Soul Travels is different.',
    keywords:
      'how to choose travel agency in varanasi, best vs cheap travel agency varanasi, varanasi tour packages comparison, which travel agency is best in varanasi, avoid tourist trap varanasi, reliable travel agency varanasi, trusted tour operator varanasi',
    heroHeading: 'How to Choose — The Best Travel Agency in Varanasi',
    heroSubtitle:
      'An honest, no-nonsense guide to avoiding tourist traps, spotting red flags, and finding an agency that genuinely serves your interests.',
    intro: [
      'Varanasi is one of India\'s most visited cities — and unfortunately, that makes it a target for overpriced packages, fake guides, and agencies that prioritise their own commissions over your experience.',
      'This guide is written by Anchal Pandey, founder of Soil n Soul Travels and a lifelong resident of Banaras. It is completely honest — including things that many travel agencies would never tell you. Read it before you book anything.',
    ],
    sections: [
      {
        heading: 'Red Flags: What to Avoid',
        body: 'Avoid any agency that: (1) quotes prices without asking about your group size, duration, or requirements, (2) pushes you toward specific hotels or shops where they earn commissions, (3) cannot provide you with the name and contact of your guide before you arrive, (4) offers prices so low they make no logical sense. These are all signs of a commission-driven operation with no real interest in your journey.',
        icon: 'warning',
      },
      {
        heading: 'Green Flags: Signs of a Genuine Agency',
        body: 'A trustworthy travel agency will: ask you questions before quoting a price, be transparent about exactly what is included, have verifiable reviews from travellers (not just Google stars), give you a local contact number that works on WhatsApp, and be willing to provide references from past clients if asked.',
        icon: 'verified',
      },
      {
        heading: 'Cheap vs. Transparent: The Real Comparison',
        body: 'A package that appears cheap often hides costs in hidden extras — surprise entry fees, tipping obligations, and upsells during the tour. A genuinely transparent package tells you everything upfront and costs slightly more — but you nearly always end up paying less in total and getting far more in return.',
        icon: 'balance',
      },
      {
        heading: 'Why Soil n Soul Is Different',
        body: 'We were born from frustration at the exact problems described above. Our founder saw tourists being exploited and decided to build an alternative. We charge no commissions from hotels or vendors. All pricing is fixed and agreed in writing. And our 4.9-star rating from 500+ travellers from 38 countries is our proof.',
        icon: 'diversity_3',
      },
    ],
    faqs: [
      {
        q: 'Which travel agency is best in Varanasi?',
        a: 'Soil n Soul Travels is consistently rated 4.9 stars. We are founded by a native of Banaras, charge no hidden commissions, and have served 500+ travellers from 38 countries. We believe the best agency is one that is fully transparent — and we put that in writing before every journey.',
      },
      {
        q: 'How do I compare Varanasi tour packages?',
        a: 'Compare: (1) what is itemised in the package — don\'t accept vague bundled prices, (2) whether accommodation is named or just described as "standard", (3) whether transport is private or shared, (4) who your guide will be and their credentials. Ask all these questions before paying any deposit.',
      },
      {
        q: 'How do I avoid being scammed by a travel agency in Varanasi?',
        a: 'Book only with agencies that have verifiable independent reviews (Google / TripAdvisor), provide a WhatsApp number that responds quickly, name your accommodation before you arrive, and give you a clear written itinerary with fixed costs. Never pay 100% upfront with no cancellation terms.',
      },
    ],
    cta: 'Talk to Us — No Obligation',
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'How to Choose a Travel Agency in Varanasi', url: '/travel/how-to-choose-travel-agency-varanasi' },
    ],
  },
};

// ─── Component ─────────────────────────────────────────────────────────────────
const SeoLanding = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const page = SEO_PAGES[slug];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // If page not found, redirect to first page
  if (!page) {
    return (
      <div className="min-h-screen bg-[#1A120B] text-slate-100 flex items-center justify-center">
        <Navbar />
        <div className="text-center py-32 px-4">
          <span className="material-symbols-outlined text-6xl text-primary/40 mb-4 block">search_off</span>
          <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
          <p className="text-slate-400 mb-6">The travel guide you're looking for doesn't exist yet.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all">
            <span className="material-symbols-outlined text-sm">home</span>
            Return Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // SEO
  useSEO({
    title: page.metaTitle.replace(' | Soil n Soul Travels', '').replace(' | Soil n Soul', ''),
    description: page.metaDescription,
    keywords: page.keywords,
    url: `/travel/${slug}`,
    canonical: `/travel/${slug}`,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        localBusinessSchema,
        breadcrumbSchema(page.breadcrumb),
        {
          '@type': 'WebPage',
          '@id': `https://www.soilnsoultravels.com/travel/${slug}`,
          name: page.metaTitle,
          description: page.metaDescription,
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: page.breadcrumb.map((b, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: b.name,
              item: `https://www.soilnsoultravels.com${b.url}`,
            })),
          },
        },
      ],
    },
  });

  // (siteUrl available for future use)
  // const siteUrl = 'https://www.soilnsoultravels.com';

  return (
    <div className="min-h-screen bg-[#1A120B] text-slate-100">
      <Navbar />

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('/images/hero/hero-1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A120B]/80 via-[#1A120B]/60 to-[#1A120B]" />

        {/* Decorative orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-8 flex-wrap">
            {page.breadcrumb.map((crumb, i) => (
              <React.Fragment key={crumb.url}>
                {i > 0 && (
                  <span className="material-symbols-outlined text-slate-600" style={{ fontSize: '14px' }}>
                    chevron_right
                  </span>
                )}
                {i < page.breadcrumb.length - 1 ? (
                  <Link
                    to={crumb.url}
                    className="hover:text-primary transition-colors font-medium"
                  >
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-primary font-semibold">{crumb.name}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary text-xs font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Soil n Soul Travels — Varanasi
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            {page.heroHeading.split(' — ').length > 1 ? (
              <>
                {page.heroHeading.split(' — ')[0]} —{' '}
                <span className="text-primary italic font-light">{page.heroHeading.split(' — ')[1]}</span>
              </>
            ) : (
              <>
                {page.heroHeading.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="text-primary italic font-light">
                  {page.heroHeading.split(' ').slice(-2).join(' ')}
                </span>
              </>
            )}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl">
            {page.heroSubtitle}
          </p>

          {/* Trust metrics */}
          <div className="flex flex-wrap gap-6 mb-10">
            {[
              { icon: 'verified', label: '500+ Journeys' },
              { icon: 'star', label: '4.9 Rating' },
              { icon: 'language', label: '38 Countries' },
              { icon: 'support_agent', label: '24/7 Support' },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-slate-300">
                <span className="material-symbols-outlined text-primary text-lg">{b.icon}</span>
                <span className="text-sm font-medium">{b.label}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/919580417547"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              {page.cta}
            </a>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-primary text-white hover:text-primary px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all active:scale-95"
            >
              Explore Services
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── INTRO ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#23160f]/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-3 space-y-5">
              <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase">About This Guide</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Why Trust <span className="text-primary italic font-light">Soil n Soul</span> for Your Varanasi Journey?
              </h2>
              {page.intro.map((para, i) => (
                <p key={i} className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  {para}
                </p>
              ))}
            </div>

            {/* Stat card */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 space-y-5">
                {[
                  { number: '500+', label: 'Journeys Curated' },
                  { number: '4.9★', label: 'Average Rating' },
                  { number: '38', label: 'Countries Served' },
                  { number: '24/7', label: 'Support Available' },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between border-b border-white/8 pb-4 last:border-0 last:pb-0">
                    <span className="text-slate-400 text-sm">{s.label}</span>
                    <span className="text-2xl font-black text-primary">{s.number}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DETAILED SECTIONS ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#1A120B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">What We Offer</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Everything You Need to Know
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {page.sections.map((sec, i) => (
              <article
                key={i}
                className="group p-6 sm:p-7 bg-white/4 border border-white/8 hover:border-primary/40 rounded-2xl transition-all duration-300 hover:bg-white/7"
              >
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-3xl text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    {sec.icon}
                  </span>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-3 leading-snug group-hover:text-primary transition-colors">
                      {sec.heading}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{sec.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#23160f]/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-3">FAQs</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {page.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-white/10 hover:border-primary/30 rounded-2xl overflow-hidden transition-all duration-300"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  className="w-full text-left flex justify-between items-center px-6 py-5 gap-4"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span className="text-white font-semibold text-base" itemProp="name">
                    {faq.q}
                  </span>
                  <span
                    className={`material-symbols-outlined text-primary shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-56 pb-5' : 'max-h-0'}`}
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <p className="px-6 text-slate-400 text-sm leading-relaxed" itemProp="text">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#1A120B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <div className="bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-primary/25 rounded-3xl p-10 sm:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="material-symbols-outlined text-5xl text-primary mb-4 block">travel_explore</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Experience Varanasi?
              </h2>
              <p className="text-slate-300 mb-8 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Talk to Anchal and our team directly. We respond within the hour and will design a completely personalised Varanasi experience for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/919580417547"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95"
                >
                  <span className="material-symbols-outlined">chat</span>
                  WhatsApp Us Now
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm">mail</span>
                  Send an Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERNAL LINKS (related SEO pages) ────────────────── */}
      <section className="py-12 sm:py-16 bg-[#23160f]/40 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
          <p className="text-primary text-xs font-bold tracking-[0.25em] uppercase mb-6 text-center">
            More Varanasi Travel Guides
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(SEO_PAGES)
              .filter((p) => p.slug !== slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  to={`/travel/${p.slug}`}
                  className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-primary/15 border border-white/10 hover:border-primary/40 text-slate-300 hover:text-primary px-4 py-2 rounded-full text-xs font-semibold transition-all"
                >
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  {p.keyword}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SeoLanding;
