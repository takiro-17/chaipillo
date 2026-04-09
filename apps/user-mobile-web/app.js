/* ===================================================
   SUPERFIT USER APP — Core Application Logic
   All gym data, products, auth, cart, and helpers
   =================================================== */

// ─── GYM DATA ───
const GYMS = [
  {
    id: 1,
    name: 'Iron Paradise',
    tagline: 'Where Champions Train',
    location: 'Andheri West, Mumbai',
    distance: '0.8 km',
    rating: 4.8,
    reviewCount: 234,
    memberCount: 450,
    priceRange: '₹1,500 - ₹12,000',
    photo: 'images/gym1.png',
    photos: ['images/gym1.png', 'images/gym2.png', 'images/gym3.png'],
    amenities: ['🏋️ Weights', '❄️ AC', '🅿️ Parking', '🚿 Shower', '🔒 Locker', '♨️ Steam Room', '🧘 Yoga', '🥤 Juice Bar'],
    hours: '5:00 AM - 11:00 PM',
    phone: '9876543210',
    description: 'Premium fitness center with world-class equipment, certified trainers, and a vibrant community of fitness enthusiasts.',
    plans: [
      { name: '3 Day Free Trial', price: 0, duration: '3 days', tag: 'FREE', popular: false },
      { name: '1 Month', price: 1500, duration: '30 days', tag: '', popular: false },
      { name: '3 Months', price: 4000, duration: '90 days', tag: 'SAVE 11%', popular: true },
      { name: '6 Months', price: 7000, duration: '180 days', tag: 'SAVE 22%', popular: false },
      { name: '1 Year', price: 12000, duration: '365 days', tag: 'BEST VALUE', popular: false }
    ],
    offers: [
      { title: '50% Off First Month', desc: 'New members only', code: 'NEWFIT50', gradient: 'gradient-1' },
      { title: 'Refer & Earn ₹500', desc: 'For each friend who joins', code: 'REFER500', gradient: 'gradient-2' }
    ],
    reviews: [
      { user: 'Arjun M.', rating: 5, date: '2 days ago', comment: 'Best gym in the area! Trainers are super knowledgeable. Been coming here for 6 months and the results are amazing. 💪', reply: 'Thank you Arjun! Keep crushing it!' },
      { user: 'Priya S.', rating: 5, date: '5 days ago', comment: 'Love the vibe here. Clean, well-maintained, and the AC works perfectly even during Mumbai summers.', reply: '' },
      { user: 'Rahul D.', rating: 4, date: '1 week ago', comment: 'Great gym overall. Only wish they had more treadmills during peak hours.', reply: '' },
      { user: 'Sneha K.', rating: 5, date: '2 weeks ago', comment: 'Personal training sessions are worth every rupee. My trainer helped me lose 8kgs in 3 months! 🔥', reply: 'So proud of you Sneha!' },
      { user: 'Karan M.', rating: 4, date: '3 weeks ago', comment: 'Signed up for annual plan. Facilities are amazing — steam room, cardio zone, and protein bar!', reply: '' }
    ],
    trialAvailable: true
  },
  {
    id: 2,
    name: 'FitZone Elite',
    tagline: 'Elevate Your Fitness',
    location: 'Bandra East, Mumbai',
    distance: '1.2 km',
    rating: 4.6,
    reviewCount: 189,
    memberCount: 380,
    priceRange: '₹1,200 - ₹10,000',
    photo: 'images/gym2.png',
    photos: ['images/gym2.png', 'images/gym3.png', 'images/gym1.png'],
    amenities: ['🏋️ Weights', '❄️ AC', '🚿 Shower', '🧘 Yoga', '🥊 Boxing', '💪 CrossFit'],
    hours: '6:00 AM - 10:00 PM',
    phone: '9876543211',
    description: 'Modern fitness studio offering CrossFit, boxing, and functional training with expert coaches.',
    plans: [
      { name: '3 Day Free Trial', price: 0, duration: '3 days', tag: 'FREE', popular: false },
      { name: '1 Month', price: 1200, duration: '30 days', tag: '', popular: false },
      { name: '3 Months', price: 3200, duration: '90 days', tag: 'SAVE 11%', popular: true },
      { name: '6 Months', price: 5500, duration: '180 days', tag: 'SAVE 23%', popular: false },
      { name: '1 Year', price: 10000, duration: '365 days', tag: 'BEST VALUE', popular: false }
    ],
    offers: [
      { title: 'Weekend Warrior 30% Off', desc: 'Weekend-only memberships', code: 'WEEKEND30', gradient: 'gradient-3' }
    ],
    reviews: [
      { user: 'Meera J.', rating: 5, date: '1 day ago', comment: 'The boxing classes are incredible! Coach Raj is the best. Totally transformed my fitness.', reply: '' },
      { user: 'Vikram S.', rating: 4, date: '4 days ago', comment: 'Good gym with friendly staff. CrossFit sessions are intense but rewarding.', reply: 'Thank you Vikram!' },
      { user: 'Ananya I.', rating: 5, date: '1 week ago', comment: 'Clean, modern, and well-equipped. The yoga studio is so peaceful.', reply: '' }
    ],
    trialAvailable: true
  },
  {
    id: 3,
    name: 'Muscle Factory',
    tagline: 'Built Different',
    location: 'Powai, Mumbai',
    distance: '2.5 km',
    rating: 4.5,
    reviewCount: 312,
    memberCount: 600,
    priceRange: '₹1,000 - ₹9,000',
    photo: 'images/gym3.png',
    photos: ['images/gym3.png', 'images/gym1.png', 'images/gym2.png'],
    amenities: ['🏋️ Weights', '❄️ AC', '🅿️ Parking', '🚿 Shower', '🔒 Locker', '🏊 Pool', '🧖 Sauna'],
    hours: '24 Hours',
    phone: '9876543212',
    description: 'Massive 24-hour gym with swimming pool, sauna, and over 300+ pieces of equipment.',
    plans: [
      { name: '3 Day Free Trial', price: 0, duration: '3 days', tag: 'FREE', popular: false },
      { name: '1 Month', price: 1000, duration: '30 days', tag: '', popular: false },
      { name: '3 Months', price: 2700, duration: '90 days', tag: 'SAVE 10%', popular: true },
      { name: '6 Months', price: 5000, duration: '180 days', tag: 'SAVE 17%', popular: false },
      { name: '1 Year', price: 9000, duration: '365 days', tag: 'BEST VALUE', popular: false }
    ],
    offers: [
      { title: 'Student Discount 40%', desc: 'Show valid college ID', code: 'STUDENT40', gradient: 'gradient-4' },
      { title: 'Couple Plan ₹1,500/mo', desc: 'Train together, save together', code: 'COUPLE15', gradient: 'gradient-1' }
    ],
    reviews: [
      { user: 'Rohan P.', rating: 5, date: '3 days ago', comment: '24-hour access is a game changer. I come at midnight and it is perfectly equipped.', reply: '' },
      { user: 'Divya N.', rating: 4, date: '1 week ago', comment: 'The pool and sauna make this more than a gym. Amazing value for money.', reply: '' },
      { user: 'Aditya R.', rating: 4, date: '2 weeks ago', comment: 'Huge gym with everything you need. A bit crowded in evenings though.', reply: '' },
      { user: 'Simran K.', rating: 5, date: '3 weeks ago', comment: 'Best gym in Powai hands down. Equipment quality is outstanding.', reply: '' }
    ],
    trialAvailable: true
  },
  {
    id: 4,
    name: 'Zen Fitness Studio',
    tagline: 'Mind. Body. Soul.',
    location: 'Juhu, Mumbai',
    distance: '3.1 km',
    rating: 4.9,
    reviewCount: 156,
    memberCount: 220,
    priceRange: '₹2,000 - ₹15,000',
    photo: 'images/gym1.png',
    photos: ['images/gym1.png', 'images/gym3.png', 'images/gym2.png'],
    amenities: ['🧘 Yoga', '🏋️ Weights', '❄️ AC', '🧖 Spa', '🥤 Juice Bar', '🎵 Sound System'],
    hours: '5:30 AM - 9:00 PM',
    phone: '9876543213',
    description: 'Boutique fitness studio blending strength training with mindfulness. Yoga, pilates, and meditation included.',
    plans: [
      { name: '3 Day Free Trial', price: 0, duration: '3 days', tag: 'FREE', popular: false },
      { name: '1 Month', price: 2000, duration: '30 days', tag: '', popular: false },
      { name: '3 Months', price: 5500, duration: '90 days', tag: 'SAVE 8%', popular: true },
      { name: '6 Months', price: 10000, duration: '180 days', tag: 'SAVE 17%', popular: false },
      { name: '1 Year', price: 15000, duration: '365 days', tag: 'BEST VALUE', popular: false }
    ],
    offers: [
      { title: 'Free Yoga Mat', desc: 'With 3-month plans', code: 'FREEMAT', gradient: 'gradient-2' }
    ],
    reviews: [
      { user: 'Kavya N.', rating: 5, date: '2 days ago', comment: 'The meditation room is heavenly. Perfect blend of fitness and wellness.', reply: 'Thank you Kavya! Namaste 🙏' },
      { user: 'Harsh C.', rating: 5, date: '1 week ago', comment: 'Best yoga classes in Mumbai. The instructors are certified professionals.', reply: '' }
    ],
    trialAvailable: true
  },
  {
    id: 5,
    name: 'Beast Mode Gym',
    tagline: 'No Pain No Gain',
    location: 'Dadar, Mumbai',
    distance: '4.2 km',
    rating: 4.3,
    reviewCount: 278,
    memberCount: 520,
    priceRange: '₹800 - ₹7,000',
    photo: 'images/gym3.png',
    photos: ['images/gym3.png', 'images/gym2.png', 'images/gym1.png'],
    amenities: ['🏋️ Weights', '💪 CrossFit', '🥊 Boxing', '🅿️ Parking', '🚿 Shower'],
    hours: '5:00 AM - 11:30 PM',
    phone: '9876543214',
    description: 'Old-school bodybuilding gym with hardcore equipment, battle ropes, and strongman training area.',
    plans: [
      { name: '3 Day Free Trial', price: 0, duration: '3 days', tag: 'FREE', popular: false },
      { name: '1 Month', price: 800, duration: '30 days', tag: '', popular: false },
      { name: '3 Months', price: 2200, duration: '90 days', tag: 'SAVE 8%', popular: true },
      { name: '6 Months', price: 4000, duration: '180 days', tag: 'SAVE 17%', popular: false },
      { name: '1 Year', price: 7000, duration: '365 days', tag: 'BEST VALUE', popular: false }
    ],
    offers: [],
    reviews: [
      { user: 'Sanjay G.', rating: 5, date: '3 days ago', comment: 'This is a REAL gym. Heavy iron, no fancy stuff, just pure gains.', reply: '' },
      { user: 'Pooja R.', rating: 4, date: '2 weeks ago', comment: 'Affordable and effective. Great for serious lifters.', reply: '' }
    ],
    trialAvailable: true
  },
  {
    id: 6,
    name: 'Apex Fitness Hub',
    tagline: 'Reach Your Peak',
    location: 'Goregaon, Mumbai',
    distance: '5.0 km',
    rating: 4.7,
    reviewCount: 145,
    memberCount: 310,
    priceRange: '₹1,300 - ₹11,000',
    photo: 'images/gym2.png',
    photos: ['images/gym2.png', 'images/gym1.png', 'images/gym3.png'],
    amenities: ['🏋️ Weights', '❄️ AC', '🚿 Shower', '🔒 Locker', '🧘 Yoga', '🏃 Cardio Zone', '📱 Smart Training'],
    hours: '5:30 AM - 10:30 PM',
    phone: '9876543215',
    description: 'Tech-enabled gym with smart workout tracking, personalized training plans, and premium facilities.',
    plans: [
      { name: '3 Day Free Trial', price: 0, duration: '3 days', tag: 'FREE', popular: false },
      { name: '1 Month', price: 1300, duration: '30 days', tag: '', popular: false },
      { name: '3 Months', price: 3500, duration: '90 days', tag: 'SAVE 10%', popular: true },
      { name: '6 Months', price: 6500, duration: '180 days', tag: 'SAVE 17%', popular: false },
      { name: '1 Year', price: 11000, duration: '365 days', tag: 'BEST VALUE', popular: false }
    ],
    offers: [
      { title: 'Early Bird 20% Off', desc: 'For 5AM-8AM sessions only', code: 'EARLY20', gradient: 'gradient-3' },
      { title: 'Family Pack ₹3,500/mo', desc: 'Up to 4 family members', code: 'FAMILY35', gradient: 'gradient-4' }
    ],
    reviews: [
      { user: 'Nikhil T.', rating: 5, date: '1 day ago', comment: 'Smart workout tracking is amazing. Love how it tracks my progress automatically.', reply: '' },
      { user: 'Shruti P.', rating: 5, date: '5 days ago', comment: 'Best facilities in Goregaon. Everything is clean and modern.', reply: '' },
      { user: 'Amit K.', rating: 4, date: '2 weeks ago', comment: 'Great gym, slightly expensive but you get what you pay for.', reply: '' }
    ],
    trialAvailable: true
  }
];

// ─── PRODUCT DATA ───
const LEGACY_PRODUCTS = [
  { id: 1, name: 'Whey Protein Isolate', brand: 'MuscleBlaze', price: 2499, originalPrice: 3499, rating: 4.6, reviews: 1240, category: 'protein', emoji: '🥛', desc: 'Premium whey isolate with 26g protein per serving. Zero added sugar. Fast absorbing.', sizes: ['1kg', '2kg'] },
  { id: 2, name: 'Gold Standard Whey', brand: 'Optimum Nutrition', price: 4299, originalPrice: 5199, rating: 4.8, reviews: 3420, category: 'protein', emoji: '🏆', desc: 'World\'s #1 selling whey protein. 24g protein, 5.5g BCAAs per serving.', sizes: ['2lb', '5lb'] },
  { id: 3, name: 'Plant Protein Blend', brand: 'Yoga Bar', price: 1899, originalPrice: 2299, rating: 4.4, reviews: 560, category: 'protein', emoji: '🌱', desc: 'Vegan protein from pea, brown rice & quinoa. 25g protein. Chocolate flavor.', sizes: ['1kg'] },
  { id: 4, name: 'Pre-Workout Surge', brand: 'Bigmuscles', price: 999, originalPrice: 1499, rating: 4.3, reviews: 890, category: 'supplements', emoji: '⚡', desc: 'Explosive energy, laser focus, skin-splitting pumps. 200mg caffeine.', sizes: ['300g'] },
  { id: 5, name: 'BCAA Energy Drink', brand: 'Fast&Up', price: 799, originalPrice: 999, rating: 4.5, reviews: 670, category: 'supplements', emoji: '💧', desc: 'Effervescent BCAA with electrolytes. Instant recovery during workouts.', sizes: ['20 tabs', '40 tabs'] },
  { id: 6, name: 'Creatine Monohydrate', brand: 'GNC', price: 1299, originalPrice: 1599, rating: 4.7, reviews: 2100, category: 'supplements', emoji: '💎', desc: 'Pure micronized creatine. Increases strength, power & muscle volume.', sizes: ['250g', '500g'] },
  { id: 7, name: 'Compression T-Shirt', brand: 'SuperFit Gear', price: 899, originalPrice: 1299, rating: 4.5, reviews: 340, category: 'clothing', emoji: '👕', desc: 'Moisture-wicking, 4-way stretch fabric. Perfect for intense training.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 8, name: 'Training Shorts', brand: 'SuperFit Gear', price: 699, originalPrice: 999, rating: 4.4, reviews: 280, category: 'clothing', emoji: '🩳', desc: 'Lightweight training shorts with zippered pocket. Quick-dry material.', sizes: ['S', 'M', 'L', 'XL'] },
  { id: 9, name: 'Tank Top (Stringer)', brand: 'SuperFit Gear', price: 599, originalPrice: 799, rating: 4.3, reviews: 190, category: 'clothing', emoji: '🎽', desc: 'Bodybuilding stringer tank. Breathable cotton-poly blend. Show off those gains.', sizes: ['M', 'L', 'XL'] },
  { id: 10, name: 'Gym Gloves Pro', brand: 'Kobo', price: 499, originalPrice: 799, rating: 4.2, reviews: 450, category: 'accessories', emoji: '🧤', desc: 'Premium leather gloves with wrist support. Better grip, no blisters.', sizes: ['S/M', 'L/XL'] },
  { id: 11, name: 'Lifting Belt', brand: 'RDX', price: 1599, originalPrice: 2199, rating: 4.6, reviews: 820, category: 'accessories', emoji: '🔰', desc: 'Heavy-duty leather lifting belt. 10mm thick. Competition grade.', sizes: ['M', 'L', 'XL'] },
  { id: 12, name: 'Shaker Bottle 700ml', brand: 'BlenderBottle', price: 399, originalPrice: 599, rating: 4.7, reviews: 5200, category: 'accessories', emoji: '🥤', desc: 'Leak-proof shaker with wire whisk ball. BPA-free. Iconic design.', sizes: ['700ml'] },
  { id: 13, name: 'Resistance Bands Set', brand: 'Boldfit', price: 599, originalPrice: 899, rating: 4.4, reviews: 1100, category: 'accessories', emoji: '🏷️', desc: 'Set of 5 latex bands with different resistance levels. Home & gym use.', sizes: ['Set of 5'] },
  { id: 14, name: 'Mass Gainer 3kg', brand: 'MuscleBlaze', price: 2199, originalPrice: 2999, rating: 4.3, reviews: 780, category: 'protein', emoji: '💪', desc: 'High-calorie mass gainer with 60g carbs, 30g protein per serving, for hard gainers.', sizes: ['3kg'] },
  { id: 15, name: 'Gym Duffle Bag', brand: 'SuperFit Gear', price: 1199, originalPrice: 1699, rating: 4.5, reviews: 420, category: 'accessories', emoji: '👜', desc: 'Water-resistant duffle with shoe compartment and wet pocket. 35L capacity.', sizes: ['35L'] },
  { id: 16, name: 'Joggers Slim Fit', brand: 'SuperFit Gear', price: 999, originalPrice: 1499, rating: 4.6, reviews: 510, category: 'clothing', emoji: '👖', desc: 'Tapered joggers with zippered pockets. Cotton-poly blend. Gym to street style.', sizes: ['S', 'M', 'L', 'XL'] }
];

const LEGACY_CATEGORIES = [
  { id: 'all', label: '🔥 All', active: true },
  { id: 'protein', label: '🥛 Protein', active: false },
  { id: 'supplements', label: '⚡ Supplements', active: false },
  { id: 'clothing', label: '👕 Clothing', active: false },
  { id: 'accessories', label: '🎒 Accessories', active: false }
];

const LEGACY_PRODUCT_ART_THEMES = {
  protein: { base: '#7C3AED', tint: '#C4B5FD', accent: '#FDE68A' },
  supplements: { base: '#0F766E', tint: '#5EEAD4', accent: '#FDE68A' },
  clothing: { base: '#1D4ED8', tint: '#93C5FD', accent: '#FCA5A5' },
  accessories: { base: '#9A3412', tint: '#FDBA74', accent: '#FDE68A' }
};

// ─── USER STATE ───
const PARTNER_SOURCES = {
  amazon: {
    id: 'amazon',
    label: 'Amazon',
    emblem: 'A',
    accent: '#F59E0B',
    tint: '#FDE68A',
    glow: '#FFF3C4',
    surface: 'rgba(245,158,11,0.14)',
    ctaLabel: 'Open in Amazon',
    checkoutLabel: 'Continue in Amazon',
    checkoutNote: 'Final pricing, offers, and payment happen on Amazon.'
  },
  flipkart: {
    id: 'flipkart',
    label: 'Flipkart',
    emblem: 'F',
    accent: '#38BDF8',
    tint: '#BAE6FD',
    glow: '#E0F2FE',
    surface: 'rgba(56,189,248,0.14)',
    ctaLabel: 'Open in Flipkart',
    checkoutLabel: 'Continue in Flipkart',
    checkoutNote: 'Your FitConnect bag stays here, but checkout moves to Flipkart.'
  },
  meesho: {
    id: 'meesho',
    label: 'Meesho',
    emblem: 'M',
    accent: '#FB7185',
    tint: '#FDA4AF',
    glow: '#FFE4E6',
    surface: 'rgba(251,113,133,0.14)',
    ctaLabel: 'Open in Meesho',
    checkoutLabel: 'Continue in Meesho',
    checkoutNote: 'Value picks stay grouped here and open in Meesho when you are ready.'
  },
  zomato: {
    id: 'zomato',
    label: 'Zomato',
    emblem: 'Z',
    accent: '#EF4444',
    tint: '#FCA5A5',
    glow: '#FEE2E2',
    surface: 'rgba(239,68,68,0.14)',
    ctaLabel: 'Open in Zomato',
    checkoutLabel: 'Continue in Zomato',
    checkoutNote: 'Protein meal availability depends on your location in Zomato.'
  }
};

const PRODUCTS = [
  { id: 1, name: 'Whey Protein Isolate', brand: 'MuscleBlaze', price: 2499, originalPrice: 3499, rating: 4.6, reviews: 1240, category: 'protein', source: 'amazon', desc: 'Premium whey isolate with 26g protein per serving, shortlisted for fast post-workout recovery.', sizes: ['1kg', '2kg'], partnerQuery: 'MuscleBlaze whey protein isolate 1kg', deliveryText: 'Curated from Amazon. Final offers confirm on Amazon.', highlights: ['26g protein per scoop', 'Low sugar recovery pick', 'Trusted marketplace listing'], curatorNote: 'Picked for lean recovery stacks.' },
  { id: 2, name: 'Gold Standard Whey', brand: 'Optimum Nutrition', price: 4299, originalPrice: 5199, rating: 4.8, reviews: 3420, category: 'protein', source: 'flipkart', desc: 'Popular whey blend with strong flavor coverage and dependable protein density.', sizes: ['2lb', '5lb'], partnerQuery: 'Optimum Nutrition Gold Standard Whey 2lb', deliveryText: 'Curated from Flipkart. Compare seller offers before payment.', highlights: ['24g whey protein', 'High review confidence', 'Strong flavor variety'], curatorNote: 'Great for users who want a proven everyday whey.' },
  { id: 3, name: 'Plant Protein Blend', brand: 'Yoga Bar', price: 1899, originalPrice: 2299, rating: 4.4, reviews: 560, category: 'protein', source: 'amazon', desc: 'A vegan recovery option with pea and brown rice protein for lighter digestion.', sizes: ['1kg'], partnerQuery: 'Yoga Bar plant protein blend 1kg', deliveryText: 'Curated from Amazon. Good option for dairy-free users.', highlights: ['Plant-based protein', 'Digestive friendly blend', 'Single-serve simplicity'], curatorNote: 'Added for members avoiding dairy-heavy supplements.' },
  { id: 4, name: 'Pre-Workout Surge', brand: 'Bigmuscles', price: 999, originalPrice: 1499, rating: 4.3, reviews: 890, category: 'supplements', source: 'flipkart', desc: 'A high-energy pre-workout option with caffeine support for early training sessions.', sizes: ['300g'], partnerQuery: 'Bigmuscles pre workout surge 300g', deliveryText: 'Curated from Flipkart. Ingredients and tolerance should be checked before use.', highlights: ['High-stim workout boost', 'Best for early sessions', 'Curated for advanced users'], curatorNote: 'Intended for users who already know their caffeine tolerance.' },
  { id: 5, name: 'BCAA Energy Drink', brand: 'Fast&Up', price: 799, originalPrice: 999, rating: 4.5, reviews: 670, category: 'supplements', source: 'amazon', desc: 'Electrolyte and BCAA support for long cardio or hot-weather sessions.', sizes: ['20 tabs', '40 tabs'], partnerQuery: 'Fast&Up BCAA energy drink tablets', deliveryText: 'Curated from Amazon. Useful for training days with higher sweat loss.', highlights: ['Electrolyte support', 'Portable hydration format', 'Easy daily recovery stack'], curatorNote: 'Good fit for long sessions and outdoor training.' },
  { id: 6, name: 'Creatine Monohydrate', brand: 'GNC', price: 1299, originalPrice: 1599, rating: 4.7, reviews: 2100, category: 'supplements', source: 'amazon', desc: 'Micronized creatine for strength and power-focused routines.', sizes: ['250g', '500g'], partnerQuery: 'GNC creatine monohydrate 250g', deliveryText: 'Curated from Amazon. Final stock depends on partner seller availability.', highlights: ['Pure creatine support', 'Strength and power focus', 'Repeat-purchase staple'], curatorNote: 'Included as a simple strength baseline supplement.' },
  { id: 7, name: 'Compression T-Shirt', brand: 'HRX', price: 899, originalPrice: 1299, rating: 4.5, reviews: 340, category: 'clothing', source: 'flipkart', desc: 'A close-fit training tee that looks sharp in-gym and holds up through repeat washes.', sizes: ['S', 'M', 'L', 'XL'], partnerQuery: 'HRX compression t shirt men gym', deliveryText: 'Curated from Flipkart. Sizing should be checked in the partner listing.', highlights: ['Training fit silhouette', 'Quick dry fabric', 'Gym-to-street styling'], curatorNote: 'Selected to keep apparel aligned with the app vibe.' },
  { id: 8, name: 'Training Shorts', brand: 'Performax', price: 699, originalPrice: 999, rating: 4.4, reviews: 280, category: 'clothing', source: 'meesho', desc: 'Lightweight active shorts with storage pockets and a clean minimal look.', sizes: ['S', 'M', 'L', 'XL'], partnerQuery: 'men training shorts gym quick dry', deliveryText: 'Curated from Meesho. Best for budget-friendly gym staples.', highlights: ['Budget activewear pick', 'Quick dry for cardio days', 'Pocket-friendly essential'], curatorNote: 'A lower-ticket essential that still fits the visual tone.' },
  { id: 9, name: 'Stringer Tank', brand: 'Maniac Sport', price: 599, originalPrice: 799, rating: 4.3, reviews: 190, category: 'clothing', source: 'meesho', desc: 'Classic stringer cut for lifting days and warm weather workouts.', sizes: ['M', 'L', 'XL'], partnerQuery: 'stringer tank top gym men', deliveryText: 'Curated from Meesho. Review fit and fabric details before ordering.', highlights: ['Bodybuilding cut', 'Breathable gym layer', 'Value-focused apparel'], curatorNote: 'Added for serious lifting-day styling.' },
  { id: 10, name: 'Gym Gloves Pro', brand: 'Kobo', price: 499, originalPrice: 799, rating: 4.2, reviews: 450, category: 'accessories', source: 'amazon', desc: 'Grip-focused gloves with wrist support for higher-volume sessions.', sizes: ['S/M', 'L/XL'], partnerQuery: 'Kobo gym gloves wrist support', deliveryText: 'Curated from Amazon. Useful for pulling volume and beginner comfort.', highlights: ['Grip support for pull days', 'Wrist support included', 'Low-ticket add-on'], curatorNote: 'A practical accessory for entry-level gym users.' },
  { id: 11, name: 'Lifting Belt', brand: 'RDX', price: 1599, originalPrice: 2199, rating: 4.6, reviews: 820, category: 'accessories', source: 'flipkart', desc: 'Structured support belt for heavy compound lifts and more confident bracing.', sizes: ['M', 'L', 'XL'], partnerQuery: 'RDX lifting belt gym leather', deliveryText: 'Curated from Flipkart. Best for intermediate and advanced lifting routines.', highlights: ['Heavy lift support', 'Bracing confidence', 'Serious strength accessory'], curatorNote: 'Selected for users moving into heavier training blocks.' },
  { id: 12, name: 'Shaker Bottle 700ml', brand: 'Boldfit', price: 399, originalPrice: 599, rating: 4.7, reviews: 5200, category: 'accessories', source: 'meesho', desc: 'A practical bottle for shakes, hydration, and fast carry inside the gym bag.', sizes: ['700ml'], partnerQuery: 'shaker bottle 700ml gym', deliveryText: 'Curated from Meesho. Easy add-on item for everyday use.', highlights: ['Easy daily carry', 'Simple gym essential', 'Fast utility purchase'], curatorNote: 'A low-friction everyday accessory.' },
  { id: 13, name: 'Resistance Bands Set', brand: 'Boldfit', price: 599, originalPrice: 899, rating: 4.4, reviews: 1100, category: 'accessories', source: 'amazon', desc: 'Portable set for warmups, home workouts, and mobility sessions.', sizes: ['Set of 5'], partnerQuery: 'Boldfit resistance bands set of 5', deliveryText: 'Curated from Amazon. Useful both in-gym and at home.', highlights: ['Warmup and mobility support', 'Compact home workout kit', 'Travel-friendly format'], curatorNote: 'Included for flexibility and hotel-room training.' },
  { id: 14, name: 'Mass Gainer 3kg', brand: 'MuscleBlaze', price: 2199, originalPrice: 2999, rating: 4.3, reviews: 780, category: 'protein', source: 'flipkart', desc: 'Calorie-dense support for hard gainers trying to push consistent surplus days.', sizes: ['3kg'], partnerQuery: 'MuscleBlaze mass gainer 3kg', deliveryText: 'Curated from Flipkart. Check flavor and calorie profile before purchase.', highlights: ['High-calorie bulking support', 'Budget-conscious weight gain', 'Good for hard gainer phases'], curatorNote: 'Added specifically for bulk-cycle users.' },
  { id: 15, name: 'Protein Wrap Combo', brand: 'Healthy Bowl', price: 349, originalPrice: 399, rating: 4.5, reviews: 220, category: 'food', source: 'zomato', desc: 'A protein-forward meal idea saved into your bag so you can jump into the delivery app when ready.', sizes: ['Meal combo'], partnerUrl: 'https://www.zomato.com/', deliveryText: 'Curated from Zomato. Meal availability depends on your area and the live menu.', highlights: ['High-protein meal idea', 'Location-based availability', 'Fast post-workout food'], curatorNote: 'Used as a prototype for food-partner handoff flows.' },
  { id: 16, name: 'Grilled Chicken Rice Bowl', brand: 'EatFit', price: 289, originalPrice: 339, rating: 4.4, reviews: 310, category: 'food', source: 'zomato', desc: 'Lean protein and carbs in a simple post-workout format, surfaced as a curated food pick.', sizes: ['Single bowl'], partnerUrl: 'https://www.zomato.com/', deliveryText: 'Curated from Zomato. Search opens in the partner app or site based on your location.', highlights: ['Lean protein meal', 'Fast refuel format', 'Live location-based catalog'], curatorNote: 'Best used as a nearby delivery suggestion, not fixed inventory.' }
];

const CATEGORIES = [
  { id: 'all', label: 'All', active: true },
  { id: 'protein', label: 'Protein', active: false },
  { id: 'supplements', label: 'Supplements', active: false },
  { id: 'clothing', label: 'Clothing', active: false },
  { id: 'accessories', label: 'Accessories', active: false },
  { id: 'food', label: 'Protein Food', active: false }
];

function getSourceMeta(sourceId) {
  return PARTNER_SOURCES[sourceId] || {
    id: 'partner',
    label: 'Partner',
    emblem: 'P',
    accent: '#94A3B8',
    tint: '#CBD5E1',
    glow: '#E2E8F0',
    surface: 'rgba(148,163,184,0.14)',
    ctaLabel: 'Open partner listing',
    checkoutLabel: 'Continue in partner app',
    checkoutNote: 'Checkout continues in the partner app.'
  };
}

function getProductById(productId) {
  return PRODUCTS.find(product => String(product.id) === String(productId)) || null;
}

function getStorageScope(userData) {
  const user = userData || getUserData();
  const phone = user && user.phone ? String(user.phone).trim() : '';
  return phone ? 'user:' + phone : 'guest';
}

function readScopedCollection(storageKey) {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return { [getStorageScope()]: parsed };
    }
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    console.warn('Failed to parse storage for', storageKey, error);
    return {};
  }
}

function writeScopedCollection(storageKey, state) {
  localStorage.setItem(storageKey, JSON.stringify(state && typeof state === 'object' ? state : {}));
}

function getScopedCollectionItems(storageKey, userData) {
  const scope = getStorageScope(userData);
  const state = readScopedCollection(storageKey);
  return Array.isArray(state[scope]) ? state[scope] : [];
}

function saveScopedCollectionItems(storageKey, items, userData) {
  const scope = getStorageScope(userData);
  const state = readScopedCollection(storageKey);

  if (Array.isArray(items) && items.length) {
    state[scope] = items;
  } else {
    delete state[scope];
  }

  writeScopedCollection(storageKey, state);
}

function normalizeCartItems(items) {
  const merged = new Map();

  (Array.isArray(items) ? items : []).forEach(item => {
    const product = getProductById(item && item.id);
    const qty = Number(item && item.qty);
    if (!product || !Number.isFinite(qty) || qty <= 0) return;

    const size = String((item && item.size) || '');
    const key = String(product.id) + '::' + size;
    if (!merged.has(key)) {
      merged.set(key, {
        id: product.id,
        size: size,
        qty: 0
      });
    }
    merged.get(key).qty += Math.max(1, Math.floor(qty));
  });

  return Array.from(merged.values());
}

function mergeCartItems(baseItems, incomingItems) {
  return normalizeCartItems((Array.isArray(baseItems) ? baseItems : []).concat(Array.isArray(incomingItems) ? incomingItems : []));
}

function promoteGuestStoreStateToUser(userData) {
  const scope = getStorageScope(userData);
  if (scope === 'guest') return;

  const state = readScopedCollection('superfit_cart');
  const guestItems = Array.isArray(state.guest) ? state.guest : [];
  if (!guestItems.length) return;

  state[scope] = mergeCartItems(Array.isArray(state[scope]) ? state[scope] : [], guestItems);
  delete state.guest;
  writeScopedCollection('superfit_cart', state);
}

function getUserData() {
  const saved = localStorage.getItem('superfit_user');
  if (saved) return JSON.parse(saved);
  return null;
}

function saveUserData(data) {
  localStorage.setItem('superfit_user', JSON.stringify(data));
  promoteGuestStoreStateToUser(data);
}

function isLoggedIn() {
  return !!getUserData();
}

function logout() {
  localStorage.removeItem('superfit_user');
  window.location.href = 'login.html';
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// ─── CART ───
function getCart() {
  const cart = normalizeCartItems(getScopedCollectionItems('superfit_cart'));
  const current = JSON.stringify(cart);
  const stored = JSON.stringify(getScopedCollectionItems('superfit_cart'));
  if (current !== stored) {
    saveScopedCollectionItems('superfit_cart', cart);
  }
  return cart;
}

function saveCart(cart) {
  saveScopedCollectionItems('superfit_cart', normalizeCartItems(cart));
  updateCartUI();
}

function addToCart(productId, size) {
  const product = getProductById(productId);
  if (!product) return;
  const cart = getCart();
  const normalizedSize = String(size || '');
  const existing = cart.find(item => String(item.id) === String(product.id) && item.size === normalizedSize);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: product.id, size: normalizedSize, qty: 1 });
  }
  saveCart(cart);
  showToast('Added to your bag.', 'success');
}

function removeFromCart(productId, size) {
  let cart = getCart();
  cart = cart.filter(item => !(String(item.id) === String(productId) && String(item.size) === String(size || '')));
  saveCart(cart);
}

function updateCartQty(productId, size, delta) {
  const cart = getCart();
  const item = cart.find(i => String(i.id) === String(productId) && String(i.size) === String(size || ''));
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId, size);
      return;
    }
  }
  saveCart(cart);
}

function getCartTotal() {
  const cart = getCart();
  let total = 0;
  cart.forEach(item => {
    const product = getProductById(item.id);
    if (product) total += product.price * item.qty;
  });
  return total;
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  // Update cart FAB if exists
  const fab = document.getElementById('cartFab');
  const count = getCartCount();
  if (fab) {
    const shouldShowFab = document.body.dataset.cartFabEnabled === 'true';
    if (shouldShowFab && count > 0) {
      fab.classList.remove('hidden');
      fab.querySelector('.cart-count').textContent = count;
    } else {
      fab.classList.add('hidden');
    }
  }
}

// ─── FAVORITES ───
function getFavorites() {
  return JSON.parse(localStorage.getItem('superfit_favorites') || '[]');
}

function toggleFavorite(gymId) {
  let favs = getFavorites();
  const idx = favs.indexOf(gymId);
  if (idx > -1) {
    favs.splice(idx, 1);
    showToast('Removed from favorites', 'info');
  } else {
    favs.push(gymId);
    showToast('Added to favorites! ❤️', 'success');
  }
  localStorage.setItem('superfit_favorites', JSON.stringify(favs));
  return favs.includes(gymId);
}

function isFavorite(gymId) {
  return getFavorites().includes(gymId);
}

function getLocalDateKey(date = new Date()) {
  const value = date instanceof Date ? date : new Date(date);
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function getCurrentMembership() {
  const user = getUserData();
  return user && user.membership ? user.membership : null;
}

function getMembershipHistory() {
  const user = getUserData();
  return user && Array.isArray(user.membershipHistory) ? user.membershipHistory : [];
}

function saveMembershipHistoryEntry(gym, plan, startDate, expiryDate) {
  const user = getUserData();
  if (!user) return;

  if (!Array.isArray(user.membershipHistory)) {
    user.membershipHistory = [];
  }

  user.membershipHistory.unshift({
    gymId: gym.id,
    supabaseGymId: gym.supabaseGymId || null,
    gymName: gym.name,
    plan: plan.name,
    startDate: startDate,
    expiryDate: expiryDate
  });
  user.membershipHistory = user.membershipHistory.slice(0, 20);
  saveUserData(user);
}

function isSameGymMembership(membership, gym) {
  if (!membership || !gym) return false;

  const membershipGymId = membership.supabaseGymId || membership.gymId;
  const gymId = gym.supabaseGymId || gym.id;
  if (membershipGymId != null && gymId != null) {
    return String(membershipGymId) === String(gymId);
  }

  return normalizeGymName(membership.gymName) === normalizeGymName(gym.name);
}

function getGymMembershipState(gym) {
  const membership = getCurrentMembership();
  if (!membership) return 'none';
  if (isSameGymMembership(membership, gym)) {
    return isMembershipActive(membership) ? 'active_here' : 'expired_here';
  }
  return isMembershipActive(membership) ? 'active_elsewhere' : 'none';
}

function hasMembershipHistoryForGym(gym) {
  return getMembershipHistory().some(entry => {
    if ((entry.supabaseGymId || entry.gymId) && (gym.supabaseGymId || gym.id)) {
      return String(entry.supabaseGymId || entry.gymId) === String(gym.supabaseGymId || gym.id);
    }
    return normalizeGymName(entry.gymName) === normalizeGymName(gym.name);
  });
}

function getStoredReviews() {
  return JSON.parse(localStorage.getItem('superfit_reviews') || '{}');
}

function saveStoredReviews(reviews) {
  localStorage.setItem('superfit_reviews', JSON.stringify(reviews));
}

function getStoredReviewsForGym(gym) {
  const reviews = getStoredReviews();
  const keys = [String(gym.id)];
  if (gym.supabaseGymId) keys.push(String(gym.supabaseGymId));

  for (const key of keys) {
    if (Array.isArray(reviews[key])) return reviews[key];
  }

  return [];
}

function saveReviewForGym(gym, rating, comment) {
  const user = getUserData();
  if (!user) return null;

  const reviews = getStoredReviews();
  const key = String(gym.supabaseGymId || gym.id);
  const createdAt = new Date().toISOString();
  const nextReview = {
    id: 'review-' + Date.now(),
    user: user.name,
    rating: rating,
    date: 'Just now',
    comment: comment,
    reply: '',
    createdAt: createdAt,
    _gymId: key
  };

  if (!Array.isArray(reviews[key])) reviews[key] = [];
  reviews[key].unshift(nextReview);
  saveStoredReviews(reviews);
  try {
    const sharedReviews = JSON.parse(localStorage.getItem('fitconnect_reviews') || '[]');
    const flatReview = {
      id: nextReview.id,
      name: nextReview.user,
      rating: nextReview.rating,
      date: new Date(createdAt).toLocaleDateString('en-GB'),
      comment: nextReview.comment,
      reply: '',
      createdAt: createdAt,
      _gymId: key
    };
    sharedReviews.unshift(flatReview);
    localStorage.setItem('fitconnect_reviews', JSON.stringify(sharedReviews.slice(0, 200)));
  } catch (error) {
    console.warn('Shared review cache update failed', error);
  }
  return nextReview;
}

function mapCloudReviewToLocal(row) {
  return {
    id: row.id,
    user: row.member_name || 'Member',
    rating: Number(row.rating) || 0,
    date: new Date(row.created_at || row.updated_at || Date.now()).toLocaleDateString('en-GB'),
    comment: row.comment || '',
    reply: row.reply || '',
    createdAt: row.created_at || new Date().toISOString()
  };
}

async function resolveGymIdForCloud(gym) {
  if (!gym) return null;
  if (gym.supabaseGymId) return String(gym.supabaseGymId);
  if (gym.id && /^[0-9a-f-]{36}$/i.test(String(gym.id))) return String(gym.id);

  const user = getUserData();
  if (user && user.membership && normalizeGymName(user.membership.gymName) === normalizeGymName(gym.name) && user.membership.supabaseGymId) {
    return String(user.membership.supabaseGymId);
  }

  const gymRow = await resolveGymRowForMembership({
    gymId: gym.id,
    supabaseGymId: gym.supabaseGymId || null,
    gymName: gym.name
  });

  if (gymRow && gymRow.id) {
    gym.supabaseGymId = gymRow.id;
    return String(gymRow.id);
  }

  return gym.id ? String(gym.id) : null;
}

async function trackGymActivity(gym, eventType, metadata) {
  const client = getSupabaseClient();
  if (!gym || !eventType) return null;

  const gymId = await resolveGymIdForCloud(gym);
  if (!gymId) return null;

  const user = getUserData();
  const createdAt = new Date();
  const sharedEvent = {
    id: 'evt-' + createdAt.getTime() + '-' + Math.floor(Math.random() * 1000),
    name: user && user.name ? user.name : 'Guest',
    location: gym.location || 'User App',
    action: eventType,
    time: createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    createdAt: createdAt.toISOString(),
    daysAgo: 0,
    minutesAgo: (createdAt.getHours() * 60) + createdAt.getMinutes(),
    _gymId: gymId
  };

  try {
    const sharedEvents = JSON.parse(localStorage.getItem('fitconnect_activity_viewers') || '[]');
    sharedEvents.unshift(sharedEvent);
    localStorage.setItem('fitconnect_activity_viewers', JSON.stringify(sharedEvents.slice(0, 300)));
  } catch (error) {
    console.warn('Shared activity cache update failed', error);
  }

  if (!client) return null;

  const payload = {
    gym_id: gymId,
    member_phone: user && user.phone ? user.phone : null,
    member_name: user && user.name ? user.name : 'Guest',
    event_type: eventType,
    source_page: window.location.pathname.split('/').pop() || 'user-app',
    metadata: Object.assign({
      gymName: gym.name || '',
      localGymId: gym.id || null
    }, metadata || {})
  };

  try {
    const result = await client.from('gym_activity_events').insert(payload).select('id').maybeSingle();
    if (result && result.error) {
      console.warn('Activity sync failed', result.error);
      return null;
    }
    return result && result.data ? result.data : null;
  } catch (error) {
    console.warn('Activity sync failed', error);
    return null;
  }
}

async function syncReviewToCloud(gym, review) {
  const client = getSupabaseClient();
  if (!gym || !review) return null;

  const gymId = await resolveGymIdForCloud(gym);
  if (!gymId) return null;

  try {
    const sharedReviews = JSON.parse(localStorage.getItem('fitconnect_reviews') || '[]');
    const reviewIndex = sharedReviews.findIndex(item => String(item.id) === String(review.id));
    const localMappedReview = {
      id: String(review.id),
      name: review.user || 'Member',
      rating: Number(review.rating) || 0,
      date: new Date(review.createdAt || Date.now()).toLocaleDateString('en-GB'),
      comment: review.comment || '',
      reply: review.reply || '',
      createdAt: review.createdAt || new Date().toISOString(),
      _gymId: gymId
    };
    if (reviewIndex >= 0) {
      sharedReviews[reviewIndex] = Object.assign({}, sharedReviews[reviewIndex], localMappedReview);
    } else {
      sharedReviews.unshift(localMappedReview);
    }
    localStorage.setItem('fitconnect_reviews', JSON.stringify(sharedReviews.slice(0, 200)));
  } catch (error) {
    console.warn('Shared review cache sync failed', error);
  }

  if (!client) return null;

  const user = getUserData();
  const payload = {
    id: String(review.id),
    gym_id: gymId,
    member_phone: user && user.phone ? user.phone : null,
    member_name: review.user || (user && user.name) || 'Member',
    rating: Number(review.rating) || 0,
    comment: review.comment || '',
    reply: review.reply || '',
    created_at: review.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  try {
    const result = await client
      .from('gym_reviews')
      .upsert(payload, { onConflict: 'id' })
      .select('*')
      .maybeSingle();

    if (result && result.error) {
      console.warn('Review sync failed', result.error);
      return null;
    }

    return result && result.data ? result.data : null;
  } catch (error) {
    console.warn('Review sync failed', error);
    return null;
  }
}

async function syncCloudReviewsToLocal() {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const result = await client
      .from('gym_reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (result && result.error) {
      console.warn('Review fetch failed', result.error);
      return null;
    }

    const grouped = {};
    (result && result.data ? result.data : []).forEach(row => {
      const key = String(row.gym_id || '').trim();
      if (!key) return;
      if (!Array.isArray(grouped[key])) grouped[key] = [];
      grouped[key].push(mapCloudReviewToLocal(row));
    });

    saveStoredReviews(grouped);
    return grouped;
  } catch (error) {
    console.warn('Review fetch failed', error);
    return null;
  }
}

function getAllReviewsForGym(gym) {
  return getStoredReviewsForGym(gym).concat(Array.isArray(gym.reviews) ? gym.reviews : []);
}

function getGymReviewSummary(gym) {
  const reviews = getAllReviewsForGym(gym);
  if (reviews.length === 0) {
    return {
      count: 0,
      rating: Number(gym.rating) || 0
    };
  }

  const total = reviews.reduce((sum, review) => sum + (Number(review.rating) || 0), 0);
  return {
    count: reviews.length,
    rating: Math.round((total / reviews.length) * 10) / 10
  };
}

function canReviewGym(gym) {
  if (!isLoggedIn()) return false;
  const state = getGymMembershipState(gym);
  return state === 'active_here' || state === 'expired_here' || hasMembershipHistoryForGym(gym);
}

function getReviewEligibilityMessage(gym) {
  if (!isLoggedIn()) return 'Sign in and join this gym to leave a review.';
  if (canReviewGym(gym)) return '';
  const membership = getCurrentMembership();
  if (membership && isMembershipActive(membership) && !isSameGymMembership(membership, gym)) {
    return 'Only users who have joined this gym can leave a review. Your active plan is at ' + membership.gymName + '.';
  }
  return 'Only users who have joined this gym can leave a review.';
}

function getOrders() {
  return JSON.parse(localStorage.getItem('superfit_orders') || '[]');
}

function saveOrders(orders) {
  localStorage.setItem('superfit_orders', JSON.stringify(orders));
}

function getPartnerHandoffs() {
  return getScopedCollectionItems('superfit_partner_handoffs');
}

function savePartnerHandoffs(handoffs) {
  saveScopedCollectionItems('superfit_partner_handoffs', Array.isArray(handoffs) ? handoffs.slice(0, 20) : []);
}

function createOrderFromCart() {
  const cart = getCart();
  if (!cart.length) return null;

  const items = cart.map(item => {
    const product = getProductById(item.id);
    if (!product) return null;
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      size: item.size,
      qty: item.qty,
      price: product.price
    };
  }).filter(Boolean);

  if (!items.length) return null;

  const orders = getOrders();
  const order = {
    id: 'ORD-' + Date.now(),
    createdAt: new Date().toISOString(),
    status: 'Confirmed',
    total: items.reduce((sum, item) => sum + (item.price * item.qty), 0),
    items: items
  };

  orders.unshift(order);
  saveOrders(orders.slice(0, 20));
  return order;
}

function getProductTheme(product) {
  const source = getSourceMeta(product && product.source);
  return {
    base: source.accent,
    tint: source.tint,
    accent: source.glow
  };
}

function getProductHighlights(product) {
  const highlights = Array.isArray(product && product.highlights) ? product.highlights.slice() : [];

  if ((product && product.sizes || []).length > 1) {
    highlights.push((product.sizes || []).length + ' size options');
  } else if ((product && product.sizes || []).length === 1) {
    highlights.push('Available in ' + product.sizes[0]);
  }

  return highlights.slice(0, 3);
}

function getProductDeliveryText(product) {
  return product && product.deliveryText
    ? product.deliveryText
    : ('Curated from ' + getSourceMeta(product && product.source).label + '. Final checkout happens in the partner app.');
}

function getProductPartnerUrl(product) {
  if (!product) return '';
  if (product.partnerUrl) return product.partnerUrl;

  const query = encodeURIComponent(String(product.partnerQuery || product.name || '').trim());
  if (!query) return '';

  if (product.source === 'amazon') return 'https://www.amazon.in/s?k=' + query;
  if (product.source === 'flipkart') return 'https://www.flipkart.com/search?q=' + query;
  if (product.source === 'meesho') return 'https://www.meesho.com/search?q=' + query;
  if (product.source === 'zomato') return 'https://www.zomato.com/';
  return '';
}

function openPartnerProduct(product, options = {}) {
  const url = getProductPartnerUrl(product);
  if (!url) {
    showToast('Partner link is unavailable right now.', 'warning');
    return false;
  }

  const target = options.sameTab ? '_self' : '_blank';
  const opened = window.open(url, target, target === '_blank' ? 'noopener' : undefined);
  if (!opened && target === '_blank') {
    window.location.href = url;
  }

  if (!options.skipToast) {
    showToast('Opening ' + getSourceMeta(product.source).label + ' for ' + product.name + '.', 'info');
  }

  return true;
}

function getProductArt(product) {
  if (product.imageDataUri) return product.imageDataUri;

  const theme = getProductTheme(product);
  const source = getSourceMeta(product && product.source);
  const title = escapeSvgText(String(product.name || '').slice(0, 20));
  const brand = escapeSvgText(String(product.brand || '').slice(0, 16));
  const badge = escapeSvgText(String(product.category || 'gear').toUpperCase());
  const sourceBadge = escapeSvgText(String(source.emblem || 'P'));
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.tint}" />
          <stop offset="100%" stop-color="${theme.base}" />
        </linearGradient>
      </defs>
      <rect width="320" height="320" rx="36" fill="#071019" />
      <circle cx="255" cy="66" r="78" fill="${theme.accent}" opacity="0.22" />
      <circle cx="72" cy="72" r="38" fill="${theme.accent}" opacity="0.2" />
      <rect x="76" y="36" width="168" height="248" rx="26" fill="url(#bg)" />
      <rect x="105" y="22" width="110" height="28" rx="14" fill="#F8FAFC" opacity="0.9" />
      <rect x="26" y="26" width="52" height="52" rx="18" fill="#071019" opacity="0.88" />
      <text x="52" y="58" text-anchor="middle" font-family="Outfit, Arial, sans-serif" font-size="26" font-weight="800" fill="#F8FAFC">${sourceBadge}</text>
      <rect x="96" y="88" width="128" height="96" rx="20" fill="#0B1220" opacity="0.18" />
      <text x="160" y="116" text-anchor="middle" font-family="Outfit, Arial, sans-serif" font-size="18" font-weight="700" fill="#F8FAFC">${brand}</text>
      <text x="160" y="144" text-anchor="middle" font-family="Outfit, Arial, sans-serif" font-size="22" font-weight="800" fill="#F8FAFC">${badge}</text>
      <text x="160" y="210" text-anchor="middle" font-family="Outfit, Arial, sans-serif" font-size="24" font-weight="800" fill="#FFFFFF">${title}</text>
      <text x="160" y="246" text-anchor="middle" font-family="Outfit, Arial, sans-serif" font-size="14" font-weight="600" fill="#E2E8F0">${escapeSvgText(source.label)} curated pick</text>
    </svg>
  `;

  product.imageDataUri = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  return product.imageDataUri;
}

function escapeSvgText(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─── TRIALS ───
function getClaimedTrials() {
  return JSON.parse(localStorage.getItem('superfit_trials') || '[]');
}

function claimTrial(gymId) {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }
  const trials = getClaimedTrials();
  if (trials.includes(gymId)) {
    showToast('You already claimed a trial for this gym!', 'warning');
    return false;
  }
  trials.push(gymId);
  localStorage.setItem('superfit_trials', JSON.stringify(trials));

  // Create membership entry
  const gym = GYMS.find(g => g.id === gymId);
  const user = getUserData();
  const today = new Date();
  const expiry = new Date(today);
  expiry.setDate(today.getDate() + 3);

  user.membership = {
    gymId: gymId,
    gymName: gym.name,
    plan: '3 Day Free Trial',
    startDate: today.toISOString(),
    expiryDate: expiry.toISOString(),
    status: 'active'
  };
  saveUserData(user);
  syncUserMembershipToCloud().catch(error => console.warn('Membership sync failed', error));

  showToast('🎉 Trial claimed! 3 days free at ' + gym.name, 'success');
  return true;
}

function getPlanDurationDays(plan) {
  const durationText = String((plan && plan.duration) || '').toLowerCase();
  const dayMatch = durationText.match(/(\d+)\s*day/);
  if (dayMatch) return parseInt(dayMatch[1], 10) || 0;
  const monthMatch = durationText.match(/(\d+)\s*month/);
  if (monthMatch) return (parseInt(monthMatch[1], 10) || 0) * 30;
  const yearMatch = durationText.match(/(\d+)\s*year/);
  if (yearMatch) return (parseInt(yearMatch[1], 10) || 0) * 365;
  return 30;
}

function joinGymPlan(gymId, planName) {
  if (!isLoggedIn()) {
    window.location.href = 'login.html?redirect=gym-profile.html?id=' + gymId;
    return false;
  }

  const gym = getGymById(gymId);
  if (!gym) {
    showToast('Gym not found.', 'error');
    return false;
  }

  const plan = (gym.plans || []).find(item => String(item.name || '') === String(planName || ''));
  if (!plan) {
    showToast('Select a valid plan first.', 'warning');
    return false;
  }

  const user = getUserData();
  const today = new Date();
  const expiry = new Date(today);
  expiry.setDate(today.getDate() + getPlanDurationDays(plan));

  user.membership = {
    gymId: gym.id,
    supabaseGymId: gym.supabaseGymId || null,
    gymName: gym.name,
    plan: plan.name,
    startDate: today.toISOString(),
    expiryDate: expiry.toISOString(),
    status: 'active'
  };

  saveUserData(user);
  syncUserMembershipToCloud().catch(error => console.warn('Membership sync failed', error));
  showToast('Joined ' + gym.name + ' on the ' + plan.name + ' plan.', 'success');
  return true;
}

function hasClaimedTrial(gymId) {
  return getClaimedTrials().includes(gymId);
}

// ─── ATTENDANCE ───
function getUserAttendance() {
  return JSON.parse(localStorage.getItem('superfit_attendance') || '[]');
}

function logEntry() {
  if (!isLoggedIn()) return;
  const user = getUserData();
  if (!user.membership) {
    showToast('No active membership! Join a gym first.', 'warning');
    return;
  }
  const attendance = getUserAttendance();
  const now = new Date();
  const entry = {
    date: now.toISOString().split('T')[0],
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    gymName: user.membership.gymName,
    otp: generateOTP()
  };
  attendance.unshift(entry);
  localStorage.setItem('superfit_attendance', JSON.stringify(attendance));
  return entry;
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ─── TOAST ───
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML = '<span>' + (icons[type] || 'ℹ') + '</span><span>' + message + '</span>';
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ─── STAR RENDERING ───
function renderStars(rating) {
  let html = '<div class="stars">';
  for (let i = 1; i <= 5; i++) {
    html += '<span class="star' + (i > rating ? ' empty' : '') + '">' + (i <= rating ? '★' : '☆') + '</span>';
  }
  html += '</div>';
  return html;
}

// ─── BOTTOM NAV ───
function renderBottomNav(activePage) {
  const pages = [
    { id: 'explore', icon: '🔍', label: 'Explore', href: 'index.html' },
    { id: 'store', icon: '🛍️', label: 'Store', href: 'store.html' },
    { id: 'dashboard', icon: '📋', label: 'My Gym', href: 'dashboard.html' },
    { id: 'profile', icon: '👤', label: 'Profile', href: 'profile.html' }
  ];

  let html = '<nav class="bottom-nav">';
  pages.forEach(p => {
    const isActive = p.id === activePage;
    html += '<a href="' + p.href + '" class="nav-tab' + (isActive ? ' active' : '') + '">' +
      '<span class="nav-icon">' + p.icon + '</span>' +
      '<span>' + p.label + '</span>' +
    '</a>';
  });
  html += '</nav>';

  // Insert nav
  const navEl = document.createElement('div');
  navEl.innerHTML = html;
  document.body.appendChild(navEl.firstElementChild);
}

// ─── AMBIENT BACKGROUND ───
function renderAmbientBg() {
  const bg = document.createElement('div');
  bg.className = 'ambient-bg';
  bg.innerHTML = '<div class="blob blob-1"></div><div class="blob blob-2"></div><div class="blob blob-3"></div>';
  document.body.prepend(bg);
}

// ─── HELPER: Get Gym by ID ───
function getGymById(id) {
  const lookup = String(id || '').trim();
  if (!lookup) return null;

  return GYMS.find(gym =>
    String(gym.id) === lookup ||
    String(gym.supabaseGymId || '') === lookup ||
    normalizeGymName(gym.name) === normalizeGymName(lookup)
  ) || null;
}

// ─── HELPER: URL Params ───
function getParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

// ─── HELPER: Discount % ───
function getDiscount(original, current) {
  if (!Number.isFinite(Number(original)) || !Number.isFinite(Number(current)) || Number(original) <= Number(current) || Number(original) <= 0) {
    return 0;
  }
  return Math.round(((Number(original) - Number(current)) / Number(original)) * 100);
}

function getSupabaseClient() {
  return typeof window.getFitConnectSupabase === 'function' ? window.getFitConnectSupabase() : null;
}

function looksLikeUuid(value) {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function normalizeGymName(value) {
  return String(value || '').trim().toLowerCase();
}

function buildRemoteGymCard(row) {
  const data = row && row.data && typeof row.data === 'object' ? row.data : {};
  const plans = Array.isArray(data.plans) && data.plans.length ? data.plans : [
    { name: '1 Month', price: 1500, duration: '30 days', tag: '', popular: false },
    { name: '3 Months', price: 4000, duration: '90 days', tag: 'POPULAR', popular: true },
    { name: '6 Months', price: 7000, duration: '180 days', tag: '', popular: false },
    { name: '12 Months', price: 12000, duration: '365 days', tag: 'BEST VALUE', popular: false }
  ];
  const paidPlans = plans.filter(plan => (Number(plan.price) || 0) > 0);
  const lowestPlan = paidPlans.length ? Math.min(...paidPlans.map(plan => Number(plan.price) || 0)) : 0;
  const highestPlan = paidPlans.length ? Math.max(...paidPlans.map(plan => Number(plan.price) || 0)) : 0;

  return {
    id: row.id,
    supabaseGymId: row.id,
    name: row.name || data.gymName || 'Gym',
    tagline: data.tagline || 'Train smarter',
    location: row.location || data.location || 'Mumbai',
    distance: data.distance || 'Live on FitConnect',
    rating: Number(data.rating) || 4.7,
    reviewCount: Number(data.reviewCount) || 0,
    memberCount: Array.isArray(data.members) ? data.members.length : (Number(data.memberCount) || 0),
    priceRange: highestPlan ? ('â‚¹' + (lowestPlan || highestPlan).toLocaleString('en-IN') + ' - â‚¹' + highestPlan.toLocaleString('en-IN')) : 'Contact gym',
    photo: data.logoUrl || data.logo || 'images/gym1.png',
    photos: Array.isArray(data.photos) && data.photos.length ? data.photos : ['images/gym1.png', 'images/gym2.png', 'images/gym3.png'],
    amenities: Array.isArray(data.amenities) && data.amenities.length ? data.amenities : ['ðŸ‹ï¸ Weights', 'â„ï¸ AC', 'ðŸ…¿ï¸ Parking', 'ðŸš¿ Shower'],
    hours: data.hours || 'Open daily',
    phone: row.phone || data.phone || '',
    description: data.description || 'Explore this gym on FitConnect.',
    plans: plans,
    offers: Array.isArray(data.offers) ? data.offers : [],
    reviews: Array.isArray(data.reviews) ? data.reviews : [],
    trialAvailable: data.trialAvailable !== false,
    entryCooldownHours: normalizeEntryCooldownHours(data.entryCooldownHours)
  };
}

async function mergeRemoteGymsIntoCatalog() {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const result = await client
      .from('gyms')
      .select('id, name, location, phone, is_published, data')
      .eq('is_published', true)
      .order('updated_at', { ascending: false });

    if (result.error) {
      console.warn('Gym catalog fetch failed', result.error);
      return [];
    }

    const existingKeys = new Set(GYMS.map(gym => normalizeGymName(gym.name)));
    const added = [];

    (result.data || []).forEach(row => {
      const key = normalizeGymName(row.name || (row.data && row.data.gymName));
      if (!key || existingKeys.has(key)) return;
      const gymCard = buildRemoteGymCard(row);
      GYMS.unshift(gymCard);
      existingKeys.add(key);
      added.push(gymCard);
    });

    return added;
  } catch (error) {
    console.warn('Gym catalog fetch failed', error);
    return [];
  }
}

async function resolveGymRowForMembership(membership) {
  const client = getSupabaseClient();
  if (!client || !membership) return null;

  const directId = membership.supabaseGymId || (looksLikeUuid(membership.gymId) ? membership.gymId : null);
  if (directId) {
    const directResult = await client
      .from('gyms')
      .select('id, name, location, phone, data')
      .eq('id', directId)
      .maybeSingle();
    if (!directResult.error && directResult.data) return directResult.data;
  }

  const gymName = membership.gymName || '';
  if (!gymName) return null;

  const nameResult = await client
    .from('gyms')
    .select('id, name, location, phone, data')
    .ilike('name', gymName)
    .limit(1)
    .maybeSingle();

  if (nameResult.error) {
    console.warn('Gym lookup failed', nameResult.error);
    return null;
  }

  return nameResult.data || null;
}

function getPlanPriceForGym(gym, planName) {
  const plans = gym && Array.isArray(gym.plans) ? gym.plans : [];
  const match = plans.find(plan => String(plan.name || '').trim().toLowerCase() === String(planName || '').trim().toLowerCase());
  return match ? (Number(match.price) || 0) : 0;
}

function mapCloudMembershipToLocal(row, fallbackMembership) {
  const data = fallbackMembership || {};
  return {
    gymId: row.gym_id || data.gymId || null,
    supabaseGymId: row.gym_id || data.supabaseGymId || null,
    membershipId: row.id,
    gymName: row.gym_name || data.gymName || '',
    plan: row.plan_name || data.plan || '',
    startDate: row.joined_at || data.startDate || new Date().toISOString(),
    expiryDate: row.expires_at || data.expiryDate || new Date().toISOString(),
    status: row.membership_status === 'expired' ? 'expired' : 'active'
  };
}

async function syncCurrentMembershipFromCloud() {
  const client = getSupabaseClient();
  const user = getUserData();
  if (!client || !user || !user.phone) return null;

  try {
    const result = await client
      .from('gym_memberships')
      .select('id, gym_id, member_name, member_phone, plan_name, fee_amount, membership_status, payment_status, joined_at, expires_at')
      .eq('member_phone', user.phone)
      .order('joined_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (result.error || !result.data) return null;

    const row = result.data;
    const mappedGym = getGymById(row.gym_id);
    row.gym_name = (mappedGym && mappedGym.name) || (user.membership && user.membership.gymName) || '';
    user.membership = mapCloudMembershipToLocal(row, user.membership);
    saveUserData(user);
    return row;
  } catch (error) {
    console.warn('Membership fetch failed', error);
    return null;
  }
}

async function syncUserMembershipToCloud() {
  const client = getSupabaseClient();
  const user = getUserData();
  if (!client || !user || !user.phone || !user.membership) return null;

  const gymRow = await resolveGymRowForMembership(user.membership);
  if (!gymRow) return null;

  user.membership.supabaseGymId = gymRow.id;
  user.membership.gymId = user.membership.gymId || gymRow.id;
  user.membership.gymName = gymRow.name || user.membership.gymName;
  saveUserData(user);

  const localGym = getGymById(user.membership.gymId) || GYMS.find(gym => normalizeGymName(gym.name) === normalizeGymName(user.membership.gymName));
  const feeAmount = getPlanPriceForGym(localGym, user.membership.plan);
  const payload = {
    gym_id: gymRow.id,
    member_name: user.name || 'Member',
    member_phone: user.phone,
    plan_name: user.membership.plan || 'Membership',
    fee_amount: feeAmount,
    payment_status: feeAmount > 0 ? 'pending' : 'completed',
    membership_status: isMembershipActive(user.membership) ? 'active' : 'expired',
    joined_at: user.membership.startDate || new Date().toISOString(),
    expires_at: user.membership.expiryDate || null,
    source_app: 'UserApp',
    metadata: {
      localGymId: user.membership.gymId
    }
  };

  try {
    const result = await client
      .from('gym_memberships')
      .upsert(payload, { onConflict: 'gym_id,member_phone' })
      .select('id, gym_id')
      .maybeSingle();

    if (result.error) {
      console.warn('Membership upsert failed', result.error);
      return null;
    }

    if (result.data) {
      user.membership.membershipId = result.data.id;
      user.membership.supabaseGymId = result.data.gym_id;
      saveUserData(user);
    }

    return result.data || null;
  } catch (error) {
    console.warn('Membership upsert failed', error);
    return null;
  }
}

async function cancelCurrentMembership(options) {
  const settings = options || {};
  const user = getUserData();
  if (!user || !user.membership) {
    showToast('There is no active membership to cancel.', 'info');
    return null;
  }

  const membership = user.membership;
  const endedAt = new Date().toISOString();
  const currentGym = findCurrentMembershipGym();
  const cancelReason = String(settings.reason || 'Cancelled by member');

  user.membership = Object.assign({}, membership, {
    status: 'expired',
    expiryDate: endedAt,
    cancelledAt: endedAt
  });
  saveUserData(user);

  let synced = false;
  const client = getSupabaseClient();
  if (client && user.phone) {
    try {
      const gymRow = await resolveGymRowForMembership(membership);
      const gymId = gymRow && gymRow.id ? gymRow.id : (membership.supabaseGymId || membership.gymId || null);
      if (gymId) {
        const localGym = currentGym || getGymById(gymId);
        const feeAmount = getPlanPriceForGym(localGym, membership.plan);
        const payload = {
          gym_id: gymId,
          member_name: user.name || 'Member',
          member_phone: user.phone,
          plan_name: membership.plan || 'Membership',
          fee_amount: feeAmount,
          payment_status: feeAmount > 0 ? 'pending' : 'completed',
          membership_status: 'expired',
          joined_at: membership.startDate || endedAt,
          expires_at: endedAt,
          source_app: 'UserApp',
          metadata: {
            localGymId: membership.gymId || null,
            cancelReason: cancelReason,
            cancelledAt: endedAt
          }
        };

        const result = await client
          .from('gym_memberships')
          .upsert(payload, { onConflict: 'gym_id,member_phone' })
          .select('id, gym_id')
          .maybeSingle();

        if (result && !result.error) {
          synced = true;
          if (result.data) {
            user.membership.membershipId = result.data.id;
            user.membership.supabaseGymId = result.data.gym_id;
            saveUserData(user);
          }
        } else if (result && result.error) {
          console.warn('Membership cancel sync failed', result.error);
        }
      }
    } catch (error) {
      console.warn('Membership cancel sync failed', error);
    }
  }

  if (currentGym && typeof trackGymActivity === 'function') {
    trackGymActivity(currentGym, 'Cancelled Membership', {
      planName: membership.plan || '',
      reason: cancelReason
    }).catch(error => console.warn('Membership cancel activity sync failed', error));
  }

  rerenderCurrentUserAppView();
  showToast(
    synced
      ? 'Membership cancelled. You can now join another gym.'
      : 'Membership cancelled locally. Cloud sync will catch up shortly.',
    synced ? 'success' : 'warning'
  );
  return {
    synced: synced,
    endedAt: endedAt
  };
}

function rerenderCurrentUserAppView() {
  if (typeof window.renderOffers === 'function') window.renderOffers();
  if (typeof window.renderGyms === 'function') window.renderGyms();
  if (typeof window.renderDashboard === 'function') window.renderDashboard();
  if (typeof window.renderProfile === 'function') window.renderProfile();
  if (typeof window.renderEntryRequestHint === 'function') window.renderEntryRequestHint();

  if (typeof window.renderGymProfile === 'function') {
    const currentGymId = getParam('id');
    const currentGym = getGymById(currentGymId);
    if (currentGym) window.renderGymProfile(currentGym);
  }
}

async function warmCloudState() {
  await mergeRemoteGymsIntoCatalog();
  await syncCurrentMembershipFromCloud();
  rerenderCurrentUserAppView();
}

// --- LIVE ENTRY BRIDGE ---
function getEntryBridge() {
  return window.FitConnectEntryBridge || null;
}

function isMembershipActive(membership) {
  if (!membership || !membership.expiryDate) return false;
  return new Date(membership.expiryDate).getTime() >= Date.now();
}

function normalizeEntryCooldownHours(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return 0;
  return Math.min(parsed, 168);
}

function getGymEntryCooldownHours(gym) {
  if (!gym) return 0;
  return normalizeEntryCooldownHours(gym.entryCooldownHours);
}

function getAttendanceExitTimestamp(entry) {
  if (!entry) return null;

  if (entry.exitTimeIso) {
    const parsedIso = new Date(entry.exitTimeIso).getTime();
    if (!Number.isNaN(parsedIso)) return parsedIso;
  }

  if (entry.date && entry.exitTime) {
    const parsedLocal = new Date(String(entry.date) + 'T' + String(entry.exitTime)).getTime();
    if (!Number.isNaN(parsedLocal)) return parsedLocal;
  }

  return null;
}

function getLatestClosedAttendanceEntryForGym(gym, attendanceOverride) {
  if (!gym) return null;

  const attendance = Array.isArray(attendanceOverride) ? attendanceOverride : getUserAttendance();
  const gymId = String(gym.supabaseGymId || gym.id || '');
  const gymName = normalizeGymName(gym.name);

  const matches = attendance.filter(entry => {
    if (!entry || isAttendanceEntryOpen(entry)) return false;

    const entryGymId = String(entry.gymId || '');
    const entryGymName = normalizeGymName(entry.gymName);
    if (gymId && entryGymId === gymId) return true;
    if (gymName && entryGymName === gymName) return true;
    return false;
  });

  if (!matches.length) return null;

  matches.sort((left, right) => {
    return (getAttendanceExitTimestamp(right) || getAttendanceEntrySortValue(right))
      - (getAttendanceExitTimestamp(left) || getAttendanceEntrySortValue(left));
  });

  return matches[0] || null;
}

function getEntryCooldownState(gym, attendanceOverride) {
  const cooldownHours = getGymEntryCooldownHours(gym);
  if (!cooldownHours) {
    return {
      enabled: false,
      hours: 0,
      active: false,
      remainingMs: 0,
      availableAt: null,
      lastExitAt: null
    };
  }

  const latestClosedEntry = getLatestClosedAttendanceEntryForGym(gym, attendanceOverride);
  const lastExitAt = getAttendanceExitTimestamp(latestClosedEntry);
  if (!lastExitAt) {
    return {
      enabled: true,
      hours: cooldownHours,
      active: false,
      remainingMs: 0,
      availableAt: null,
      lastExitAt: null
    };
  }

  const availableAt = lastExitAt + (cooldownHours * 60 * 60 * 1000);
  const remainingMs = Math.max(0, availableAt - Date.now());
  return {
    enabled: true,
    hours: cooldownHours,
    active: remainingMs > 0,
    remainingMs: remainingMs,
    availableAt: availableAt,
    lastExitAt: lastExitAt
  };
}

function formatEntryCooldownRemaining(ms) {
  const totalMinutes = Math.max(1, Math.ceil((Number(ms) || 0) / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours && minutes) return hours + 'h ' + minutes + 'm';
  if (hours) return hours + 'h';
  return minutes + 'm';
}

function formatEntryCooldownAvailability(state) {
  if (!state || !state.availableAt) return '';
  return new Date(state.availableAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getEntryRequestMeta(request) {
  const bridge = getEntryBridge();
  if (!bridge || !request) return null;

  const expiresAt = typeof bridge.getRequestExpiresAt === 'function'
    ? bridge.getRequestExpiresAt(request)
    : new Date(new Date(request.requestedAt || request.updatedAt || Date.now()).getTime() + 2 * 60 * 1000).toISOString();

  const msRemaining = typeof bridge.getRequestRemainingMs === 'function'
    ? bridge.getRequestRemainingMs(request)
    : Math.max(0, new Date(expiresAt).getTime() - Date.now());

  const isExpired = request.status === 'expired'
    || (typeof bridge.isRequestExpired === 'function' ? bridge.isRequestExpired(request) : msRemaining <= 0);

  return {
    expiresAt,
    msRemaining,
    isExpired
  };
}

function formatEntryRequestTimeLeft(request) {
  const meta = getEntryRequestMeta(request);
  if (!meta || meta.msRemaining <= 0) return 'Expired';

  const totalSeconds = Math.ceil(meta.msRemaining / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes + ':' + String(seconds).padStart(2, '0') + ' left';
}

function getLatestEntryRequestForGym(gymId, statuses) {
  const bridge = getEntryBridge();
  const user = getUserData();
  if (!bridge || !user || !user.phone) return null;
  const membership = user.membership || {};
  const requestGymId = membership.supabaseGymId || gymId;

  const requests = bridge.getRequests({
    gymId: requestGymId,
    userPhone: user.phone
  });

  const latestRequest = requests[0] || null;
  if (!latestRequest) {
    return null;
  }

  if (Array.isArray(statuses) && statuses.length > 0 && !statuses.includes(latestRequest.status)) {
    return null;
  }

  return latestRequest;
}

function retireStalePendingEntryRequests(gymId, keepRequestId) {
  const bridge = getEntryBridge();
  const user = getUserData();
  if (!bridge || !user || !user.phone) return [];

  const membership = user.membership || {};
  const requestGymId = membership.supabaseGymId || gymId;
  const retired = [];

  bridge.getRequests({
    gymId: requestGymId,
    userPhone: user.phone
  }).forEach(request => {
    if (request.status !== 'pending') return;
    if (keepRequestId && String(request.id) === String(keepRequestId)) return;

    const nextRequest = typeof bridge.cancelRequest === 'function'
      ? bridge.cancelRequest(request.id)
      : bridge.resolveRequest(request.id, 'cancelled', { resolvedAt: new Date().toISOString() });

    if (nextRequest) {
      retired.push(nextRequest);
    }
  });

  return retired;
}

function cancelEntryRequest(requestId) {
  const bridge = getEntryBridge();
  if (!bridge) {
    showToast('Live sync is unavailable right now.', 'warning');
    return null;
  }

  const request = bridge.getRequestById(requestId);
  if (!request || request.status !== 'pending') {
    showToast('This entry code is no longer active.', 'info');
    return null;
  }

  const cancelled = typeof bridge.cancelRequest === 'function'
    ? bridge.cancelRequest(requestId)
    : bridge.resolveRequest(requestId, 'cancelled', { resolvedAt: new Date().toISOString() });

  if (cancelled) {
    retireStalePendingEntryRequests(request.gymId, request.id);
  }

  return cancelled;
}

function syncApprovedEntryRequests() {
  const bridge = getEntryBridge();
  const user = getUserData();
  if (!bridge || !user || !user.phone) return false;

  const attendance = getUserAttendance();
  const knownRequestIds = attendance.map(entry => entry.requestId).filter(Boolean);
  let changed = false;

  bridge.getRequests({
    userPhone: user.phone,
    status: 'approved'
  }).forEach(request => {
    if (knownRequestIds.includes(request.id)) return;

    const approvedAt = request.approvedAt || request.resolvedAt || request.updatedAt || new Date().toISOString();
    attendance.unshift({
      requestId: request.id,
      date: approvedAt.split('T')[0],
      time: new Date(approvedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      gymName: request.gymName,
      otp: request.otp
    });
    changed = true;
  });

  if (changed) {
    localStorage.setItem('superfit_attendance', JSON.stringify(attendance));
  }

  return changed;
}

function createEntryRequest(gym) {
  const bridge = getEntryBridge();
  if (!bridge) {
    showToast('Live sync is unavailable. Start the app from the FitConnect server.', 'warning');
    return null;
  }

  if (!isLoggedIn()) {
    window.location.href = 'login.html?redirect=gym-profile.html?id=' + gym.id;
    return null;
  }

  const user = getUserData();
  if (!user.membership) {
    showToast('Claim a trial or join a plan first!', 'warning');
    return null;
  }

  if (!isMembershipActive(user.membership)) {
    showToast('Your membership has expired. Renew it before requesting entry.', 'warning');
    return null;
  }

  const membershipGymId = user.membership.supabaseGymId || user.membership.gymId;
  const currentGymId = gym.supabaseGymId || gym.id;

  if (String(membershipGymId) !== String(currentGymId)) {
    showToast('Your active membership is at ' + user.membership.gymName + '.', 'warning');
    return null;
  }

  const pendingRequest = getLatestEntryRequestForGym(currentGymId, ['pending']);
  if (pendingRequest) {
    showToast('Your active code is ' + pendingRequest.otp + '. Waiting for gym approval.', 'info');
    return pendingRequest;
  }

  return bridge.createRequest({
    gymId: currentGymId,
    gymName: user.membership.gymName || gym.name,
    membershipId: user.membership.membershipId || null,
    otp: bridge.generateOtp(),
    userName: user.name,
    userPhone: user.phone,
    membershipPlan: user.membership.plan || '',
    sourceApp: 'UserApp'
  });
}

function findCurrentMembershipGym() {
  const user = getUserData();
  if (!user || !user.membership) return null;

  const membership = user.membership;
  return getGymById(membership.supabaseGymId || membership.gymId)
    || GYMS.find(gym => normalizeGymName(gym.name) === normalizeGymName(membership.gymName))
    || null;
}

function bindEntryBridge() {
  if (window._superfitEntryBridgeBound) return;

  const bridge = getEntryBridge();
  if (!bridge) return;

  window._superfitEntryBridgeBound = true;
  syncApprovedEntryRequests();

  bridge.subscribe(() => {
    syncApprovedEntryRequests();

    if (typeof window.renderDashboard === 'function') {
      window.renderDashboard();
    }

    if (typeof window.renderEntryRequestHint === 'function') {
      window.renderEntryRequestHint();
    }
  });
}

// ─── Init common elements ───
function claimTrial(gymId) {
  if (!isLoggedIn()) {
    window.location.href = 'login.html?redirect=gym-profile.html?id=' + gymId;
    return false;
  }

  const gym = getGymById(gymId);
  if (!gym) {
    showToast('Gym not found.', 'error');
    return false;
  }

  if (!gym.trialAvailable) {
    showToast('This gym does not offer a free trial.', 'warning');
    return false;
  }

  const membershipState = getGymMembershipState(gym);
  if (membershipState === 'active_elsewhere') {
    const membership = getCurrentMembership();
    showToast('Finish or switch your active membership at ' + membership.gymName + ' first.', 'warning');
    return false;
  }

  const trials = getClaimedTrials();
  if (trials.includes(gymId)) {
    showToast('You already claimed a trial for this gym!', 'warning');
    return false;
  }

  trials.push(gymId);
  localStorage.setItem('superfit_trials', JSON.stringify(trials));

  const user = getUserData();
  const today = new Date();
  const expiry = new Date(today);
  expiry.setDate(today.getDate() + 3);
  const startDate = today.toISOString();
  const expiryDate = expiry.toISOString();

  user.membership = {
    gymId: gymId,
    supabaseGymId: gym.supabaseGymId || null,
    gymName: gym.name,
    plan: '3 Day Free Trial',
    startDate: startDate,
    expiryDate: expiryDate,
    status: 'active'
  };

  saveUserData(user);
  saveMembershipHistoryEntry(gym, { name: '3 Day Free Trial' }, startDate, expiryDate);
  syncUserMembershipToCloud().catch(error => console.warn('Membership sync failed', error));
  showToast('Trial claimed. You now have 3 days free at ' + gym.name + '.', 'success');
  return true;
}

function joinGymPlan(gymId, planName) {
  if (!isLoggedIn()) {
    window.location.href = 'login.html?redirect=gym-profile.html?id=' + gymId;
    return false;
  }

  const gym = getGymById(gymId);
  if (!gym) {
    showToast('Gym not found.', 'error');
    return false;
  }

  const plan = (gym.plans || []).find(item => String(item.name || '') === String(planName || ''));
  if (!plan) {
    showToast('Select a valid plan first.', 'warning');
    return false;
  }

  if (Number(plan.price) === 0) {
    return claimTrial(gymId);
  }

  const membershipState = getGymMembershipState(gym);
  if (membershipState === 'active_elsewhere') {
    const membership = getCurrentMembership();
    showToast('You already have an active plan at ' + membership.gymName + '.', 'warning');
    return false;
  }

  const user = getUserData();
  if (membershipState === 'active_here' && user.membership && String(user.membership.plan) === String(plan.name)) {
    showToast('You are already on the ' + plan.name + ' plan at ' + gym.name + '.', 'info');
    return false;
  }

  const today = new Date();
  const expiry = new Date(today);
  expiry.setDate(today.getDate() + getPlanDurationDays(plan));
  const startDate = today.toISOString();
  const expiryDate = expiry.toISOString();

  user.membership = {
    gymId: gym.id,
    supabaseGymId: gym.supabaseGymId || null,
    gymName: gym.name,
    plan: plan.name,
    startDate: startDate,
    expiryDate: expiryDate,
    status: 'active'
  };

  saveUserData(user);
  saveMembershipHistoryEntry(gym, plan, startDate, expiryDate);
  syncUserMembershipToCloud().catch(error => console.warn('Membership sync failed', error));
  showToast('Joined ' + gym.name + ' on the ' + plan.name + ' plan.', 'success');
  return true;
}

let attendanceCloudSyncPromise = null;
let lastAttendanceCloudSyncAt = 0;

function getAttendanceEntryKey(entry) {
  if (!entry) return '';
  if (entry.requestId != null && entry.requestId !== '') {
    return 'request:' + String(entry.requestId);
  }

  const timeKey = entry.entryTimeIso || ((entry.date || '') + '|' + (entry.time || ''));
  return 'entry:' + String(timeKey) + '|' + String(entry.gymId || entry.gymName || '');
}

function getAttendanceEntrySortValue(entry) {
  if (entry && entry.entryTimeIso) {
    const parsedIso = new Date(entry.entryTimeIso).getTime();
    if (!Number.isNaN(parsedIso)) return parsedIso;
  }

  if (entry && entry.date) {
    const parsedLocal = new Date(String(entry.date) + 'T' + String(entry.time || '00:00')).getTime();
    if (!Number.isNaN(parsedLocal)) return parsedLocal;
  }

  return 0;
}

function isAttendanceEntryOpen(entry) {
  if (!entry) return false;
  return !String(entry.exitTime || '').trim() && !String(entry.exitTimeIso || '').trim();
}

function getOpenAttendanceEntryForGym(gym, attendanceOverride) {
  if (!gym) return null;

  const attendance = Array.isArray(attendanceOverride) ? attendanceOverride : getUserAttendance();
  const gymId = String(gym.supabaseGymId || gym.id || '');
  const gymName = normalizeGymName(gym.name);

  return attendance.find(entry => {
    if (!isAttendanceEntryOpen(entry)) return false;

    const entryGymId = String(entry.gymId || '');
    const entryGymName = normalizeGymName(entry.gymName);

    if (gymId && entryGymId === gymId) return true;
    if (gymName && entryGymName === gymName) return true;
    return false;
  }) || null;
}

async function syncAttendanceLogsFromCloud(options) {
  const settings = options || {};
  const force = !!settings.force;
  const minIntervalMs = typeof settings.minIntervalMs === 'number' ? settings.minIntervalMs : 15000;

  if (!force && attendanceCloudSyncPromise) {
    return attendanceCloudSyncPromise;
  }

  if (!force && lastAttendanceCloudSyncAt && (Date.now() - lastAttendanceCloudSyncAt) < minIntervalMs) {
    return false;
  }

  const client = getSupabaseClient();
  const user = getUserData();
  if (!client || !user || !user.phone) {
    return false;
  }

  attendanceCloudSyncPromise = (async function() {
    try {
      const result = await client
        .from('attendance_logs')
        .select('entry_request_id, gym_id, member_name, member_phone, entry_time, exit_time')
        .eq('member_phone', user.phone)
        .order('entry_time', { ascending: false })
        .limit(100);

      if (result.error) {
        console.warn('Attendance sync failed', result.error);
        return false;
      }

      const attendance = getUserAttendance();
      const localByKey = {};
      attendance.forEach(entry => {
        localByKey[getAttendanceEntryKey(entry)] = entry;
      });

      const cloudEntries = (result.data || []).map(row => {
        const requestId = row && row.entry_request_id != null ? row.entry_request_id : null;
        const lookupKey = requestId != null
          ? 'request:' + String(requestId)
          : 'entry:' + String((row && row.entry_time) || '') + '|' + String((row && row.gym_id) || '');
        const localEntry = localByKey[lookupKey] || null;
        const gymCard = getGymById((row && row.gym_id) || '') || (localEntry ? getGymById(localEntry.gymId || localEntry.gymName) : null);
        const entryDate = row && row.entry_time ? new Date(row.entry_time) : new Date();
        const exitDate = row && row.exit_time ? new Date(row.exit_time) : null;
        const membershipGymId = user.membership ? String(user.membership.supabaseGymId || user.membership.gymId || '') : '';
        const rowGymId = String((row && row.gym_id) || '');

        return {
          requestId: requestId,
          gymId: row && row.gym_id ? row.gym_id : (localEntry ? localEntry.gymId || null : null),
          date: getLocalDateKey(entryDate),
          time: entryDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          gymName: gymCard
            ? gymCard.name
            : (localEntry && localEntry.gymName
              ? localEntry.gymName
              : (membershipGymId && membershipGymId === rowGymId && user.membership && user.membership.gymName
                ? user.membership.gymName
                : 'Gym')),
          otp: localEntry && localEntry.otp ? localEntry.otp : '',
          entryTimeIso: entryDate.toISOString(),
          exitTime: exitDate ? exitDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
          exitTimeIso: exitDate ? exitDate.toISOString() : '',
          memberName: row && row.member_name ? row.member_name : (localEntry && localEntry.memberName ? localEntry.memberName : '')
        };
      });

      const cloudKeys = new Set(cloudEntries.map(entry => getAttendanceEntryKey(entry)).filter(Boolean));
      const mergedAttendance = cloudEntries.concat(
        attendance.filter(entry => !cloudKeys.has(getAttendanceEntryKey(entry)))
      );

      mergedAttendance.sort((left, right) => getAttendanceEntrySortValue(right) - getAttendanceEntrySortValue(left));
      lastAttendanceCloudSyncAt = Date.now();

      const nextSerialized = JSON.stringify(mergedAttendance);
      if (nextSerialized !== JSON.stringify(attendance)) {
        localStorage.setItem('superfit_attendance', nextSerialized);
        return true;
      }

      return false;
    } catch (error) {
      console.warn('Attendance sync failed', error);
      return false;
    }
  })();

  try {
    return await attendanceCloudSyncPromise;
  } finally {
    attendanceCloudSyncPromise = null;
  }
}

async function warmCloudState() {
  await mergeRemoteGymsIntoCatalog();
  await syncCurrentMembershipFromCloud();
  await syncCloudReviewsToLocal();
  await syncAttendanceLogsFromCloud({ force: true });
  rerenderCurrentUserAppView();
}

function toggleFavorite(gymId) {
  let favs = getFavorites();
  const idx = favs.indexOf(gymId);
  if (idx > -1) {
    favs.splice(idx, 1);
    showToast('Removed from favorites', 'info');
  } else {
    favs.push(gymId);
    const gym = getGymById(gymId);
    trackGymActivity(gym, 'Saved to Favorites', {
      target: 'favorite'
    }).catch(error => console.warn('Favorite activity sync failed', error));
    showToast('Added to favorites! to saved list.', 'success');
  }
  localStorage.setItem('superfit_favorites', JSON.stringify(favs));
  return favs.includes(gymId);
}

function claimTrial(gymId) {
  if (!isLoggedIn()) {
    window.location.href = 'login.html?redirect=gym-profile.html?id=' + gymId;
    return false;
  }

  const gym = getGymById(gymId);
  if (!gym) {
    showToast('Gym not found.', 'error');
    return false;
  }

  if (!gym.trialAvailable) {
    showToast('This gym does not offer a free trial.', 'warning');
    return false;
  }

  const membershipState = getGymMembershipState(gym);
  if (membershipState === 'active_elsewhere') {
    const membership = getCurrentMembership();
    showToast('Finish or switch your active membership at ' + membership.gymName + ' first.', 'warning');
    return false;
  }

  const trials = getClaimedTrials();
  if (trials.includes(gymId)) {
    showToast('You already claimed a trial for this gym!', 'warning');
    return false;
  }

  trials.push(gymId);
  localStorage.setItem('superfit_trials', JSON.stringify(trials));

  const user = getUserData();
  const today = new Date();
  const expiry = new Date(today);
  expiry.setDate(today.getDate() + 3);
  const startDate = today.toISOString();
  const expiryDate = expiry.toISOString();

  user.membership = {
    gymId: gymId,
    supabaseGymId: gym.supabaseGymId || null,
    gymName: gym.name,
    plan: '3 Day Free Trial',
    startDate: startDate,
    expiryDate: expiryDate,
    status: 'active'
  };

  saveUserData(user);
  saveMembershipHistoryEntry(gym, { name: '3 Day Free Trial' }, startDate, expiryDate);
  syncUserMembershipToCloud().catch(error => console.warn('Membership sync failed', error));
  trackGymActivity(gym, 'Claimed Trial', {
    planName: '3 Day Free Trial',
    planPrice: 0
  }).catch(error => console.warn('Trial activity sync failed', error));
  showToast('Trial claimed. You now have 3 days free at ' + gym.name + '.', 'success');
  return true;
}

function joinGymPlan(gymId, planName) {
  if (!isLoggedIn()) {
    window.location.href = 'login.html?redirect=gym-profile.html?id=' + gymId;
    return false;
  }

  const gym = getGymById(gymId);
  if (!gym) {
    showToast('Gym not found.', 'error');
    return false;
  }

  const plan = (gym.plans || []).find(item => String(item.name || '') === String(planName || ''));
  if (!plan) {
    showToast('Select a valid plan first.', 'warning');
    return false;
  }

  if (Number(plan.price) === 0) {
    return claimTrial(gymId);
  }

  const membershipState = getGymMembershipState(gym);
  if (membershipState === 'active_elsewhere') {
    const membership = getCurrentMembership();
    showToast('You already have an active plan at ' + membership.gymName + '.', 'warning');
    return false;
  }

  const user = getUserData();
  if (membershipState === 'active_here' && user.membership && String(user.membership.plan) === String(plan.name)) {
    showToast('You are already on the ' + plan.name + ' plan at ' + gym.name + '.', 'info');
    return false;
  }

  const today = new Date();
  const expiry = new Date(today);
  expiry.setDate(today.getDate() + getPlanDurationDays(plan));
  const startDate = today.toISOString();
  const expiryDate = expiry.toISOString();

  user.membership = {
    gymId: gym.id,
    supabaseGymId: gym.supabaseGymId || null,
    gymName: gym.name,
    plan: plan.name,
    startDate: startDate,
    expiryDate: expiryDate,
    status: 'active'
  };

  saveUserData(user);
  saveMembershipHistoryEntry(gym, plan, startDate, expiryDate);
  syncUserMembershipToCloud().catch(error => console.warn('Membership sync failed', error));
  trackGymActivity(gym, 'Joined Plan', {
    planName: plan.name,
    planPrice: Number(plan.price) || 0,
    duration: plan.duration || ''
  }).catch(error => console.warn('Plan activity sync failed', error));
  showToast('Joined ' + gym.name + ' on the ' + plan.name + ' plan.', 'success');
  return true;
}

async function createEntryRequest(gym) {
  const bridge = getEntryBridge();
  if (!bridge) {
    showToast('Live sync is unavailable. Start the app from the FitConnect server.', 'warning');
    return null;
  }

  if (!isLoggedIn()) {
    window.location.href = 'login.html?redirect=gym-profile.html?id=' + gym.id;
    return null;
  }

  const user = getUserData();
  if (!user.membership) {
    showToast('Claim a trial or join a plan first!', 'warning');
    return null;
  }

  if (!isMembershipActive(user.membership)) {
    showToast('Your membership has expired. Renew it before requesting entry.', 'warning');
    return null;
  }

  const membershipGymId = user.membership.supabaseGymId || user.membership.gymId;
  const currentGymId = gym.supabaseGymId || gym.id;

  if (String(membershipGymId) !== String(currentGymId)) {
    showToast('Your active membership is at ' + user.membership.gymName + '.', 'warning');
    return null;
  }

  const currentRequest = getLatestEntryRequestForGym(currentGymId);
  if (currentRequest && currentRequest.status === 'pending') {
    retireStalePendingEntryRequests(currentGymId, currentRequest.id);
    showToast('Your active code is ' + currentRequest.otp + '. Waiting for gym approval.', 'info');
    return currentRequest;
  }

  syncApprovedEntryRequests();
  await syncAttendanceLogsFromCloud({ force: true });

  const openEntry = getOpenAttendanceEntryForGym(gym);
  if (openEntry) {
    showToast('You are still checked in. Ask the admin to mark your exit before requesting another code.', 'warning');
    return null;
  }

  const cooldownState = getEntryCooldownState(gym);
  if (cooldownState.active) {
    showToast(
      'You can request the next entry in '
        + formatEntryCooldownRemaining(cooldownState.remainingMs)
        + '. Available after '
        + formatEntryCooldownAvailability(cooldownState)
        + '.',
      'info'
    );
    return null;
  }

  retireStalePendingEntryRequests(currentGymId);

  const createdRequest = bridge.createRequest({
    gymId: currentGymId,
    gymName: user.membership.gymName || gym.name,
    membershipId: user.membership.membershipId || null,
    otp: bridge.generateOtp(),
    userName: user.name,
    userPhone: user.phone,
    membershipPlan: user.membership.plan || '',
    sourceApp: 'UserApp'
  });

  if (createdRequest) {
    trackGymActivity(gym, 'Requested Entry', {
      membershipPlan: user.membership.plan || ''
    }).catch(error => console.warn('Entry activity sync failed', error));
  }

  return createdRequest;
}

function logEntry() {
  if (!isLoggedIn()) return;
  const user = getUserData();
  if (!user.membership) {
    showToast('No active membership! Join a gym first.', 'warning');
    return;
  }
  if (!isMembershipActive(user.membership)) {
    showToast('Your membership has expired. Renew it before logging entry.', 'warning');
    return;
  }

  const attendance = getUserAttendance();
  const now = new Date();
  const entry = {
    date: getLocalDateKey(now),
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    gymName: user.membership.gymName,
    otp: generateOTP()
  };

  attendance.unshift(entry);
  localStorage.setItem('superfit_attendance', JSON.stringify(attendance));
  return entry;
}

function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: 'OK', error: 'X', info: 'i', warning: '!' };
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;

  const icon = document.createElement('span');
  icon.textContent = icons[type] || 'i';
  const text = document.createElement('span');
  text.textContent = String(message || '');

  toast.appendChild(icon);
  toast.appendChild(text);
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function syncApprovedEntryRequests() {
  const bridge = getEntryBridge();
  const user = getUserData();
  if (!bridge || !user || !user.phone) return false;

  const attendance = getUserAttendance();
  const knownRequestIds = attendance.map(entry => entry.requestId).filter(Boolean);
  let changed = false;

  bridge.getRequests({
    userPhone: user.phone,
    status: 'approved'
  }).forEach(request => {
    if (knownRequestIds.includes(request.id)) return;

    const approvedAt = request.approvedAt || request.resolvedAt || request.updatedAt || new Date().toISOString();
    const approvedDate = new Date(approvedAt);
    attendance.unshift({
      requestId: request.id,
      gymId: request.gymId || null,
      date: getLocalDateKey(approvedDate),
      time: approvedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      gymName: request.gymName,
      otp: request.otp,
      entryTimeIso: approvedDate.toISOString(),
      exitTime: '',
      exitTimeIso: ''
    });
    changed = true;
  });

  if (changed) {
    localStorage.setItem('superfit_attendance', JSON.stringify(attendance));
  }

  return changed;
}

async function mergeRemoteGymsIntoCatalog() {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const result = await client
      .from('gyms')
      .select('id, name, location, phone, is_published, data')
      .eq('is_published', true)
      .order('updated_at', { ascending: false });

    if (result.error) {
      console.warn('Gym catalog fetch failed', result.error);
      return [];
    }

    const changed = [];
    (result.data || []).forEach(row => {
      const gymCard = buildRemoteGymCard(row);
      const existingIndex = GYMS.findIndex(gym =>
        String(gym.supabaseGymId || gym.id) === String(row.id) ||
        normalizeGymName(gym.name) === normalizeGymName(gymCard.name)
      );

      if (existingIndex >= 0) {
        GYMS[existingIndex] = Object.assign({}, GYMS[existingIndex], gymCard);
        changed.push(GYMS[existingIndex]);
      } else {
        GYMS.unshift(gymCard);
        changed.push(gymCard);
      }
    });

    return changed;
  } catch (error) {
    console.warn('Gym catalog fetch failed', error);
    return [];
  }
}

let liveCloudRefreshPromise = null;
let liveCloudRefreshTimer = null;

async function refreshVisibleCloudState(options) {
  const settings = options || {};
  if (liveCloudRefreshPromise) return liveCloudRefreshPromise;

  liveCloudRefreshPromise = (async function() {
    let changed = false;

    try {
      const gymUpdates = await mergeRemoteGymsIntoCatalog();
      if (Array.isArray(gymUpdates) && gymUpdates.length) changed = true;
    } catch (error) {
      console.warn('Gym refresh failed', error);
    }

    if (settings.includeMembership) {
      try {
        const membershipRow = await syncCurrentMembershipFromCloud();
        if (membershipRow) changed = true;
      } catch (error) {
        console.warn('Membership refresh failed', error);
      }
    }

    try {
      const attendanceChanged = await syncAttendanceLogsFromCloud({ force: true, minIntervalMs: 0 });
      if (attendanceChanged) changed = true;
    } catch (error) {
      console.warn('Attendance refresh failed', error);
    }

    if (changed) {
      rerenderCurrentUserAppView();
    }

    return changed;
  })();

  try {
    return await liveCloudRefreshPromise;
  } finally {
    liveCloudRefreshPromise = null;
  }
}

function syncVisibleCloudRefreshTimer() {
  if (liveCloudRefreshTimer) {
    clearInterval(liveCloudRefreshTimer);
    liveCloudRefreshTimer = null;
  }

  if (document.hidden) return;

  liveCloudRefreshTimer = setInterval(() => {
    refreshVisibleCloudState().catch(error => console.warn('Cloud refresh failed', error));
  }, 5000);
}

function bindCloudRefresh() {
  if (window._userCloudRefreshBound) return;
  window._userCloudRefreshBound = true;

  function refreshNow(includeMembership) {
    refreshVisibleCloudState({ includeMembership: !!includeMembership }).catch(error => console.warn('Cloud refresh failed', error));
  }

  window.addEventListener('focus', () => {
    refreshNow(true);
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      refreshNow(true);
    }
    syncVisibleCloudRefreshTimer();
  });

  syncVisibleCloudRefreshTimer();
}

function initApp(activePage, options = {}) {
  const config = Object.assign({
    showCartFab: activePage === 'store'
  }, options);

  document.body.dataset.cartFabEnabled = config.showCartFab ? 'true' : 'false';
  renderAmbientBg();
  renderBottomNav(activePage);
  updateCartUI();
  bindEntryBridge();
  bindCloudRefresh();
  warmCloudState().catch(error => console.warn('Cloud warm-up failed', error));
}
