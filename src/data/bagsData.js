// Curated High Fashion Luxury Bags Collection for IKIS
// Pricing in Indian Rupees (₹ INR) matching authentic luxury flagship boutiques

export const CATEGORIES = [
  { id: 'all', name: 'ALL COLLECTIONS' },
  { id: 'handbags', name: 'HANDBAGS' },
  { id: 'shoulder', name: 'SHOULDER BAGS' },
  { id: 'totes', name: 'TOTES & DUFFLES' },
  { id: 'crossbody', name: 'CROSSBODY' },
  { id: 'evening', name: 'CLUTCHES & EVENING' },
  { id: 'travel', name: 'TRAVEL & LUGGAGE' }
];

export const BAGS_DATA = [
  {
    id: 'ikis-horsebit-1955',
    name: 'IKIS Horsebit 1955 Small Shoulder Bag',
    tagline: 'Timeless equestrian emblem in Florentine box calfskin',
    category: 'shoulder',
    categoryName: 'Shoulder Bags',
    price: 245000,
    originalPrice: 265000,
    badge: 'ICONIC HERITAGE',
    rating: 4.9,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Cognac Cuir', hex: '#8B4513', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Alabaster Ivory', hex: '#F5F2EB', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85' }
    ],
    material: 'Full-Grain Box Calfskin Leather',
    hardware: 'Burnished Antique Gold-Toned Hardware',
    lining: 'Natural Cotton-Linen Canvas with Moire Silk Pocket',
    dimensions: '25 cm (W) x 18 cm (H) x 8 cm (D)',
    strapDrop: 'Adjustable shoulder strap with 25 cm to 45 cm drop',
    weight: '0.84 kg approx.',
    origin: 'Handcrafted in Florence, Italy',
    styleCode: 'IK-602204-1DB0G-1000',
    description: 'The IKIS Horsebit 1955 unifies classic equestrian codes with contemporary Italian luxury. Styled with double ring and bar signature metalwork, an expandable gusseted interior, and an adjustable shoulder strap for shoulder or crossbody styling.',
    features: [
      'Gold-toned signature equestrian horsebit detail',
      'Three interior gussets with one zipper pocket and one open pocket',
      'Microfiber lining with suede-like opulent finish',
      'Includes certificate of authenticity, dust bag, and magnetic boutique box'
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'ikis-jackie-1961',
    name: 'IKIS Jackie 1961 Small Hobo Shoulder Bag',
    tagline: 'The curved silhouette that defined high society',
    category: 'shoulder',
    categoryName: 'Shoulder Bags',
    price: 285000,
    originalPrice: 300000,
    badge: 'TIMELESS ICON',
    rating: 5.0,
    reviewsCount: 52,
    images: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Florentine Noir', hex: '#1A1A1A', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Signature Forest Green', hex: '#0F3B2E', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Crimson Rosso', hex: '#8B1E26', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85' }
    ],
    material: 'Smooth Aniline Calfskin Leather',
    hardware: 'Piston Gold-Tone Clasp Mechanism',
    lining: 'Suede-effect microfiber',
    dimensions: '27.5 cm (W) x 19 cm (H) x 4 cm (D)',
    strapDrop: 'Detachable second strap with 52 cm drop',
    weight: '0.62 kg approx.',
    origin: 'Artisanal atelier, Scandicci, Italy',
    styleCode: 'IK-636706-10O0G-3154',
    description: 'Brought into the spotlight as an aristocratic staple, the IKIS Jackie 1961 is reimagined with a clean, sleek silhouette and an additional detachable strap that allows it to be carried over the shoulder or worn crossbody.',
    features: [
      'Signature golden piston lock closure with spring catch',
      'Dual strap functionality: hand carry or crossbody extension',
      'Interior zip compartment and smartphone slip pocket',
      'Laser-engraved serial code with RFID authenticity chip'
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'ikis-bamboo-1947',
    name: 'IKIS Bamboo 1947 Small Top Handle Bag',
    tagline: 'Florentine bamboo crafted over open flames since 1947',
    category: 'handbags',
    categoryName: 'Handbags',
    price: 395000,
    originalPrice: 420000,
    badge: 'ARTISANAL MASTERPIECE',
    rating: 5.0,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Emerald Jewel', hex: '#0F3B2E', image: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Warm Crema', hex: '#F0ECE1', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Tuscan Tan', hex: '#A0522D', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=85' }
    ],
    material: 'Cuir Grained Leather & Torched Natural Bamboo',
    hardware: 'Hand-shaped Bamboo Turnlock & Antique Gold Hardware',
    lining: 'Plush lambskin nappa leather',
    dimensions: '21 cm (W) x 15 cm (H) x 7 cm (D)',
    strapDrop: 'Hand-shaped bamboo handle with 8 cm drop, plus leather strap 55 cm',
    weight: '0.75 kg approx.',
    origin: 'Hand-shaped in Florence, Italy',
    styleCode: 'IK-675797-10O0G-1000',
    description: 'Each piece of bamboo is selected by hand, heated over an open flame and shaped into a distinctive semi-circle by master artisans. No two handles are ever alike, creating an utterly bespoke work of wearable art.',
    features: [
      'Flame-treated natural bamboo top handle and closure knob',
      'Interchangeable straps: tonal leather strap & striped webbing strap',
      'Pocket mirror with custom leather case enclosed',
      'Interior vanity pocket with snap button'
    ],
    isFeatured: true,
    isBestseller: false
  },
  {
    id: 'ikis-dionysus-chain',
    name: 'IKIS Dionysus Small Shoulder & Chain Bag',
    tagline: 'Textured tiger head spur closure referencing Greek myth',
    category: 'crossbody',
    categoryName: 'Crossbody',
    price: 265000,
    originalPrice: 280000,
    badge: 'BEST SELLER',
    rating: 4.8,
    reviewsCount: 44,
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Taupe Monogram', hex: '#8B7D6B', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Onyx Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85' }
    ],
    material: 'Monogram Canvas with Fine Suede Leather Gussets',
    hardware: 'Antiqued Silver-Toned Double Tiger Head Spur Hardware',
    lining: 'Microfiber with suede-like finish & calfskin accents',
    dimensions: '28 cm (W) x 17 cm (H) x 9 cm (D)',
    strapDrop: 'Sliding chain strap can be worn as a shoulder strap with 38 cm drop or top handle with 22 cm drop',
    weight: '0.92 kg approx.',
    origin: 'Florence atelier, Italy',
    styleCode: 'IK-400249-KHNRN-8642',
    description: 'A structured shoulder bag distinguished by a textured tiger-head spur closure—a unique detail honoring the Greek god Dionysus. The sliding chain strap can be worn in multiple ways, transitioning smoothly between shoulder and top handle carry.',
    features: [
      'Pin closure with side release trigger',
      'Tiger head spur accented with micro crystals',
      'Hand-stitched leather edge paint finishing',
      'Internal zippered partition compartment'
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'ikis-diana-tote',
    name: 'IKIS Diana Medium Bamboo Tote Bag',
    tagline: 'Regal structured shopper with neon decorative leather belts',
    category: 'totes',
    categoryName: 'Totes & Duffles',
    price: 360000,
    originalPrice: 385000,
    badge: 'RUNWAY EXCLUSIVE',
    rating: 4.9,
    reviewsCount: 22,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Cuir Caramel', hex: '#B87333', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Royal Onyx', hex: '#111111', image: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Chalk White', hex: '#FAF9F6', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=85' }
    ],
    material: 'Natural Grained Italian Calfskin Leather',
    hardware: 'Double Bamboo Handles & Gold Hardware',
    lining: 'Warm microfiber suede interior',
    dimensions: '35 cm (W) x 30 cm (H) x 14 cm (D)',
    strapDrop: 'Bamboo handle 11 cm drop; Detachable leather shoulder strap 50 cm drop',
    weight: '1.18 kg approx.',
    origin: 'Tuscany, Italy',
    styleCode: 'IK-655663-17Q0T-2535',
    description: 'Originally introduced in 1991 and beloved by international royalty, the IKIS Diana features curved bamboo handles secured with functional neon leather handle shapers, blending aristocratic majesty with modern wit.',
    features: [
      'Two decorative fluorescent leather handle shapers included',
      'Double G golden metallic logo badge',
      'Magnetic tab closure with reinforced reinforced base studs',
      'Spacious interior accommodating laptops up to 13 inches and daily essentials'
    ],
    isFeatured: true,
    isBestseller: false
  },
  {
    id: 'ikis-ophidia-tote',
    name: 'IKIS Ophidia Webbing Medium Tote',
    tagline: 'Signature green and crimson ribbon with double monogrammed crest',
    category: 'totes',
    categoryName: 'Totes & Duffles',
    price: 195000,
    originalPrice: 215000,
    badge: 'EVERYDAY LUXURY',
    rating: 4.9,
    reviewsCount: 67,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Beige & Forest Webbing', hex: '#C2B280', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Onyx Webbing Edition', hex: '#1C1C1C', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85' }
    ],
    material: 'Coated Canvas with Rich Calfskin Trim & Inlaid Webbing',
    hardware: 'Double IKIS Gold-Toned Hardware',
    lining: 'Durable microfiber lining with slip pockets',
    dimensions: '38 cm (W) x 28 cm (H) x 14 cm (D)',
    strapDrop: 'Dual leather flat handles with 25 cm drop',
    weight: '0.86 kg approx.',
    origin: 'Florence, Italy',
    styleCode: 'IK-631685-96IWB-8745',
    description: 'The world of Ophidia evolves with everyday elegance. Inlaid with the house green-and-red signature webbing stripe and accented with gold-toned double monogram crests, this roomy tote is ideal for travel, boutique shopping, and modern business.',
    features: [
      'Inlaid iconic signature webbing ribbon down center',
      'Reinforced leather bottom with protective metal feet',
      'Interior zippered pouch with tethered key leash',
      'Magnetic bridge closure for quick security'
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: 'ikis-marmont-matelasse',
    name: 'IKIS Marmont Matelassé Shoulder Bag',
    tagline: 'Chevron quilted calfskin with stitched heart emblem',
    category: 'shoulder',
    categoryName: 'Shoulder Bags',
    price: 210000,
    originalPrice: 230000,
    badge: 'SIGNATURE PIECE',
    rating: 4.8,
    reviewsCount: 89,
    images: [
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Pure Noir', hex: '#111111', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Blush Rose', hex: '#E8C5C8', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Porcelain White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=85' }
    ],
    material: 'Matelassé Chevron Soft Calf Leather',
    hardware: 'Antique Brass Double IKIS Monogram',
    lining: 'Silky microfiber with suede touch',
    dimensions: '26 cm (W) x 15 cm (H) x 7 cm (D)',
    strapDrop: 'Sliding chain strap 55 cm drop or doubled 30 cm drop',
    weight: '0.64 kg approx.',
    origin: 'Milano, Italy',
    styleCode: 'IK-443497-DTDIT-1000',
    description: 'The small IKIS Marmont chain shoulder bag has a softly structured shape and a flap closure with Double IKIS hardware. The sliding chain strap allows versatile styling from day to night.',
    features: [
      'Spring clasp closure beneath flap',
      'Embossed heart detail on the back exterior',
      'Antiqued gold-toned hardware with gentle brushed sheen',
      'Interior zippered safety compartment'
    ],
    isFeatured: false,
    isBestseller: true
  },
  {
    id: 'ikis-broadway-evening',
    name: 'IKIS Broadway Evening Crystal Minaudière',
    tagline: 'Hand-set pavé crystals on polished gold brass frame',
    category: 'evening',
    categoryName: 'Clutches & Evening',
    price: 320000,
    originalPrice: 345000,
    badge: 'RED CARPET',
    rating: 5.0,
    reviewsCount: 17,
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#D4AF37', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Midnight Jet', hex: '#000000', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85' }
    ],
    material: 'Pavé Swarovski Crystals & Solid Gold-Plated Brass',
    hardware: 'Push-button Jewel Clasp with Emerald Cabochon',
    lining: 'Pure Italian mulberry satin',
    dimensions: '20 cm (W) x 12 cm (H) x 5 cm (D)',
    strapDrop: 'Detachable jewelry serpentine chain with 50 cm drop',
    weight: '0.55 kg approx.',
    origin: 'Vicenza, Italy',
    styleCode: 'IK-500781-0GRET-8000',
    description: 'Designed for the most glamorous gala evenings and black-tie affairs. Glistening under night lights with hundreds of multifaceted pavé crystals, finished with a fine cabochon jewel lock.',
    features: [
      'Hand-set micro crystals across exterior shell',
      'Interior silk accordion compartments with card slots',
      'Detachable fine jewel chain strap',
      'Includes custom velvet jewel box and polishing cloth'
    ],
    isFeatured: true,
    isBestseller: false
  },
  {
    id: 'ikis-savoy-duffle',
    name: 'IKIS Savoy Large Duffle Travel Bag',
    tagline: 'Aristocratic luggage with padlock, key clochette and monogram luggage tag',
    category: 'travel',
    categoryName: 'Travel & Luggage',
    price: 275000,
    originalPrice: 295000,
    badge: 'HERITAGE TRAVEL',
    rating: 4.9,
    reviewsCount: 31,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Ebony Monogram & Tan', hex: '#4A3B32', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85' },
      { name: 'All Noir Leather', hex: '#111111', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85' }
    ],
    material: 'Monogram Coated Canvas with Full-Grain Saddle Leather Trim',
    hardware: 'Double Zipper with Padlock and Brass Key Clochette',
    lining: 'Water-resistant cotton-linen canvas',
    dimensions: '52 cm (W) x 30 cm (H) x 29 cm (D)',
    strapDrop: 'Rolled leather top handles 14 cm; Detachable webbing shoulder strap 55 cm',
    weight: '2.10 kg approx.',
    origin: 'Scandicci, Florence, Italy',
    styleCode: 'IK-724642-FACN4-8465',
    description: 'Named in tribute to the famed Savoy hotel in London where the founder once observed the elite world of international travel. This spacious weekend duffle effortlessly holds wardrobe changes, grooming travel cases, and digital gear.',
    features: [
      'Brass combination padlock and matching leather key clochette',
      'Customizable leather luggage identification tag with gold foil initials',
      'Two interior zippered valuables pockets',
      'Compliant with international cabin carry-on regulations'
    ],
    isFeatured: false,
    isBestseller: true
  },
  {
    id: 'ikis-blondie-messenger',
    name: 'IKIS Blondie Medium Top Handle Messenger',
    tagline: '1970s geometric interlocking emblem in smooth saddlery leather',
    category: 'crossbody',
    categoryName: 'Crossbody',
    price: 255000,
    originalPrice: 270000,
    badge: 'NEW SEASON',
    rating: 4.7,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Warm Cognac', hex: '#9E5B32', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Noir Black', hex: '#111111', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85' }
    ],
    material: 'Natural Vegetable-Tanned Saddle Leather',
    hardware: 'Circular Cutout Interlocking Emblem in Light Gold',
    lining: 'Soft cotton-linen blend',
    dimensions: '28 cm (W) x 19 cm (H) x 8 cm (D)',
    strapDrop: 'Detachable leather strap 52 cm drop; detachable top handle 12 cm',
    weight: '0.78 kg approx.',
    origin: 'Pisa, Italy',
    styleCode: 'IK-699268-U3Z0G-2535',
    description: 'First uncovered from the house 1971 design archives, the circular logo gives the Blondie messenger a distinctive retro-glamour energy, equally captivating dressed down with denim or paired with tailored evening coats.',
    features: [
      'Magnet closure under round emblem flap',
      'Two swappable straps: slim leather strap and bold webbing strap',
      'Rear external slip pocket with magnetic fastener',
      'Interior pocket with IKIS gold heat-stamped leather patch'
    ],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'ikis-aphrodite-hobo',
    name: 'IKIS Aphrodite Small Hobo Bag',
    tagline: 'Casual slouch in butter-soft Italian lambskin leather',
    category: 'shoulder',
    categoryName: 'Shoulder Bags',
    price: 185000,
    originalPrice: 198000,
    badge: 'TRENDING',
    rating: 4.9,
    reviewsCount: 27,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Cerise Coral', hex: '#B83B46', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Obsidian Black', hex: '#141414', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=85' }
    ],
    material: 'Plonge Butter Lambskin Leather',
    hardware: 'Double G Clasp with Magnetic Snapping Closure',
    lining: 'Plush tonal microfiber',
    dimensions: '29 cm (W) x 18 cm (H) x 6 cm (D)',
    strapDrop: 'Shoulder strap with 25 cm drop; secondary chain strap 45 cm drop',
    weight: '0.48 kg approx.',
    origin: 'Milan, Italy',
    styleCode: 'IK-735112-AAA1G-6204',
    description: 'An effortlessly relaxed hobo silhouette crafted from sumptuously soft lambskin that drapes naturally. Finished with a discreet metallic closure and dual strap possibilities.',
    features: [
      'Ultra-lightweight ergonomic build',
      'Hidden magnetic closure with gold logo badge',
      'Slouchy crescent structure with reinforced piped edges',
      'Dual chain and leather strap options'
    ],
    isFeatured: false,
    isBestseller: false
  },
  {
    id: 'ikis-padlock-bamboo',
    name: 'IKIS Padlock Small Bamboo Shoulder Bag',
    tagline: 'Signature archival key lock with bamboo top handle',
    category: 'handbags',
    categoryName: 'Handbags',
    price: 235000,
    originalPrice: 250000,
    badge: 'LIMITED EDITION',
    rating: 4.8,
    reviewsCount: 33,
    images: [
      'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85'
    ],
    colors: [
      { name: 'Crema & Honey Canvas', hex: '#F0ECE1', image: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=1000&q=85' },
      { name: 'Midnight Onyx', hex: '#111111', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85' }
    ],
    material: 'Monogram Coated Canvas with Calf Leather Flap',
    hardware: 'Key-Lock Padlock Clasp & Bamboo Handle',
    lining: 'Suede-like microfiber with leather trimmed slots',
    dimensions: '24 cm (W) x 17 cm (H) x 10 cm (D)',
    strapDrop: 'Bamboo handle with 4 cm drop; chain strap with 55 cm drop',
    weight: '0.85 kg approx.',
    origin: 'Florence, Italy',
    styleCode: 'IK-603221-96IWG-8745',
    description: 'A key lock closure pulled straight from the archive pairs with a burnt bamboo handle in this small shoulder bag. A key case hangs effortlessly from the strap for an extra touch of artisanal character.',
    features: [
      'Functional working key lock with detachable key clochette',
      'Artisanal scorched bamboo handle',
      'Chain shoulder strap with leather shoulder rest',
      'Back exterior envelope pocket for phone or cards'
    ],
    isFeatured: false,
    isBestseller: false
  }
];

export const BOUTIQUES = [
  {
    city: 'Mumbai',
    mall: 'Jio World Plaza, Bandra Kurla Complex (BKC)',
    address: 'Unit G-04, Ground Floor, Jio World Plaza, G Block, Bandra Kurla Complex, Mumbai, Maharashtra 400051',
    phone: '+91 (22) 6982 7000',
    hours: 'Mon – Sun: 11:00 AM – 9:00 PM',
    services: ['Made to Order Monogramming', 'Private VIP Suite', 'Leather Restoration', 'Champagne Bar']
  },
  {
    city: 'New Delhi',
    mall: 'DLF Emporio, Vasant Kunj',
    address: 'Store 122, Ground Floor, DLF Emporio, 4 Nelson Mandela Marg, Vasant Kunj, New Delhi 110070',
    phone: '+91 (11) 4610 8800',
    hours: 'Mon – Sun: 11:00 AM – 9:30 PM',
    services: ['Bespoke Hot Stamping', 'Client Advisor Concierge', 'Valet White Glove Service']
  },
  {
    city: 'Bengaluru',
    mall: 'The Collection, UB City',
    address: 'Shop 104, Level 1, UB City, 24 Vittal Mallya Road, Bengaluru, Karnataka 560001',
    phone: '+91 (80) 4173 9900',
    hours: 'Mon – Sun: 10:30 AM – 9:00 PM',
    services: ['Private Viewing Lounge', 'After-Sales Leather Spa', 'VIP Personal Stylist']
  }
];

// Helper to format Indian Rupees luxuriously
export const formatRupees = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
