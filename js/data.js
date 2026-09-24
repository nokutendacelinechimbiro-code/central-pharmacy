/**
 * data.js — Central Pharmacy catalogue & content
 */

const CP_DATA = {
  pharmacy: {
    name: "Central Pharmacy",
    tagline: "Trusted care for Mutare",
    phone: "020 206 2664",
    mobile: "+263 7 8374 4458",
    email: "centralpharma.mutare@gmail.com",
    address: "Cuthberts Building, 69 Herbert Chitepo Street, Mutare, Manicaland, Zimbabwe",
    hours: [
      { day: "Monday – Saturday", time: "08:00 – 19:00" },
      { day: "Sunday", time: "08:00 – 15:00" }
    ]
  },

  categories: [
    { id: "medicines", name: "Medicines", blurb: "Everyday relief, pharmacist advice" },
    { id: "vitamins", name: "Vitamins & supplements", blurb: "Support daily wellbeing" },
    { id: "baby", name: "Baby care", blurb: "Gentle products for little ones" },
    { id: "skincare", name: "Skincare", blurb: "Derm-friendly daily care" },
    { id: "personal", name: "Personal care", blurb: "Hygiene and everyday essentials" },
    { id: "first-aid", name: "First aid", blurb: "Kits, dressings and support" },
    { id: "equipment", name: "Medical equipment", blurb: "Home monitoring and mobility" }
  ],

  services: [
    {
      title: "Repeat prescriptions",
      text: "Send a request and our pharmacists will review it before you collect or we deliver."
    },
    {
      title: "Health checks",
      text: "Blood pressure, cholesterol screening and lifestyle advice by appointment."
    },
    {
      title: "Vaccinations",
      text: "Seasonal flu and travel vaccines, subject to stock and eligibility."
    },
    {
      title: "Medication reviews",
      text: "Talk through how you take your medicines so they work as well as possible."
    }
  ],

  team: [
    {
      id: "t1",
      name: "Dispensary team",
      role: "Pharmacists & counter staff",
      image: "assets/phmg1.jpeg",
      feature: true
    },
    {
      id: "t2",
      name: "Counter care",
      role: "Patient counselling & OTC advice",
      image: "assets/phmg1.1.jpeg"
    },
    {
      id: "t3",
      name: "Pharmacy services",
      role: "Prescriptions & health checks",
      image: "assets/phmg2.jpeg"
    },
    {
      id: "t4",
      name: "Community support",
      role: "Everyday health guidance",
      image: "assets/phmg2.1.jpeg"
    },
    {
      id: "t5",
      name: "Clinical lead",
      role: "Superintendent pharmacist",
      image: "assets/phmg3.jpeg"
    },
    {
      id: "t6",
      name: "Front-of-house",
      role: "Welcome & collections",
      image: "assets/phmg3.1.jpeg"
    }
  ],

  /* Pharmacy OTC — local product photography */
  products: [
    {
      id: "p1",
      name: "Paracetamol 500mg tablets",
      category: "medicines",
      price: 2.49,
      featured: true,
      stock: 42,
      blurb: "For mild to moderate pain and fever. Always read the label.",
      image: "assets/products/p1.jpg"
    },
    {
      id: "p2",
      name: "Ibuprofen 200mg tablets",
      category: "medicines",
      price: 3.15,
      featured: true,
      stock: 30,
      blurb: "Anti-inflammatory pain relief. Ask a pharmacist if unsure.",
      image: "assets/products/p2.jpg"
    },
    {
      id: "p3",
      name: "Cough & cold syrup",
      category: "medicines",
      price: 5.99,
      featured: false,
      stock: 18,
      blurb: "Soothing syrup for tickly coughs. Not a prescription medicine.",
      image: "assets/products/p3.jpg"
    },
    {
      id: "p4",
      name: "Allergy relief tablets",
      category: "medicines",
      price: 6.5,
      featured: false,
      stock: 25,
      blurb: "Non-drowsy daytime hay fever support.",
      image: "assets/products/p4.jpg"
    },
    {
      id: "p5",
      name: "Vitamin D3 1000 IU",
      category: "vitamins",
      price: 7.99,
      featured: true,
      stock: 50,
      blurb: "Daily vitamin D supplement.",
      image: "assets/products/p5.jpg"
    },
    {
      id: "p6",
      name: "Omega-3 capsules",
      category: "vitamins",
      price: 9.49,
      featured: false,
      stock: 22,
      blurb: "Fish oil supplement for general wellbeing.",
      image: "assets/products/p6.jpg"
    },
    {
      id: "p7",
      name: "Multivitamin (adult)",
      category: "vitamins",
      price: 8.25,
      featured: true,
      stock: 35,
      blurb: "Once-daily complete multivitamin.",
      image: "assets/products/p7.jpg"
    },
    {
      id: "p8",
      name: "Baby nappy cream",
      category: "baby",
      price: 4.75,
      featured: false,
      stock: 40,
      blurb: "Barrier cream for nappy area comfort.",
      image: "assets/products/p8.jpg"
    },
    {
      id: "p9",
      name: "Infant fever sachets",
      category: "baby",
      price: 5.2,
      featured: false,
      stock: 16,
      blurb: "Age-appropriate sachets. Follow the pack instructions.",
      image: "assets/products/p9.jpg"
    },
    {
      id: "p10",
      name: "Gentle baby wash",
      category: "baby",
      price: 3.99,
      featured: false,
      stock: 28,
      blurb: "Tear-free wash for sensitive skin.",
      image: "assets/products/p10.jpg"
    },
    {
      id: "p11",
      name: "Daily moisturiser SPF 30",
      category: "skincare",
      price: 11.5,
      featured: true,
      stock: 20,
      blurb: "Lightweight day cream with sun protection.",
      image: "assets/products/p11.jpg"
    },
    {
      id: "p12",
      name: "Sensitive skin cleanser",
      category: "skincare",
      price: 8.99,
      featured: false,
      stock: 24,
      blurb: "Fragrance-free face wash.",
      image: "assets/products/p12.jpg"
    },
    {
      id: "p13",
      name: "Hand sanitiser 250ml",
      category: "personal",
      price: 3.49,
      featured: false,
      stock: 60,
      blurb: "Alcohol-based gel for on-the-go hygiene.",
      image: "assets/products/p13.jpg"
    },
    {
      id: "p14",
      name: "Toothpaste extra fresh",
      category: "personal",
      price: 2.99,
      featured: false,
      stock: 45,
      blurb: "Everyday fluoride toothpaste.",
      image: "assets/products/p14.jpg"
    },
    {
      id: "p15",
      name: "Family first aid kit",
      category: "first-aid",
      price: 14.99,
      featured: true,
      stock: 12,
      blurb: "Plasters, wipes, bandage and guidance leaflet.",
      image: "assets/products/p15.jpg"
    },
    {
      id: "p16",
      name: "Sterile dressings pack",
      category: "first-aid",
      price: 6.75,
      featured: false,
      stock: 19,
      blurb: "Assorted sterile dressings.",
      image: "assets/products/p16.jpg"
    },
    {
      id: "p17",
      name: "Digital thermometer",
      category: "equipment",
      price: 9.99,
      featured: true,
      stock: 15,
      blurb: "Fast-read home thermometer.",
      image: "assets/products/p17.jpg"
    },
    {
      id: "p18",
      name: "Upper arm blood pressure monitor",
      category: "equipment",
      price: 29.99,
      featured: false,
      stock: 8,
      blurb: "Home BP monitor with easy cuff.",
      image: "assets/products/p18.jpg"
    },
    {
      id: "p19",
      name: "Reusable ice pack",
      category: "first-aid",
      price: 4.5,
      featured: false,
      stock: 21,
      blurb: "For bumps and swelling.",
      image: "assets/products/p19.jpg"
    },
    {
      id: "p20",
      name: "Walking stick (adjustable)",
      category: "equipment",
      price: 18.5,
      featured: false,
      stock: 6,
      blurb: "Height-adjustable mobility aid.",
      image: "assets/products/p20.jpg"
    }
  ],

  /* Beauty Corner — local assets 1–20 (3.mp4 used as site video) */
  beauty: [
    { id: "b1", name: "Engycom B-Complex + Vitamin C", brand: "West-Coast", category: "Wellness", image: "assets/1.jpeg", blurb: "Quick-release capsules for daily energy and immune support." },
    { id: "b2", name: "Anti-ageing cream edit", brand: "L'Oréal · Neutrogena · Olay", category: "Skincare", image: "assets/2.jpeg", blurb: "Day and night regenerating creams from trusted derm brands." },
    { id: "b4", name: "Retinol night trio", brand: "Neutrogena · Olay · Delfanti", category: "Skincare", image: "assets/4.jpeg", blurb: "Wrinkle correctors and collagen duo for overnight renewal." },
    { id: "b5", name: "Body care wall", brand: "Nivea · Vaseline · Dove", category: "Body", image: "assets/5.jpeg", blurb: "Firming, nourishing and intensive moisturisers for every skin type." },
    { id: "b6", name: "Volum' Express mascara", brand: "Maybelline New York", category: "Makeup", image: "assets/6.jpeg", blurb: "Classic volumising mascara — navy tube, gold finish." },
    { id: "b7", name: "Shelf favourites", brand: "Beauty Corner", category: "Featured", image: "assets/7.jpeg", blurb: "Curated picks from our Mutare beauty aisle." },
    { id: "b8", name: "Mascara & brush set", brand: "Maybelline", category: "Makeup", image: "assets/8.jpeg", blurb: "Colossal mascara with professional application brushes." },
    { id: "b9", name: "Glow essentials", brand: "Beauty Corner", category: "Skincare", image: "assets/9.jpeg", blurb: "Hydration and radiance staples for everyday routines." },
    { id: "b10", name: "Colour & care", brand: "Beauty Corner", category: "Makeup", image: "assets/10.jpeg", blurb: "Lips, eyes and complexion — pharmacy-trusted brands." },
    { id: "b11", name: "Cleanse & tone", brand: "Beauty Corner", category: "Skincare", image: "assets/11.jpeg", blurb: "Gentle cleansers for sensitive and combination skin." },
    { id: "b12", name: "Nivea Radiant & Beauty", brand: "Nivea", category: "Body", image: "assets/12.jpeg", blurb: "Even Glow with vitamin C and Advanced Care with five oils." },
    { id: "b13", name: "Hair care edit", brand: "Beauty Corner", category: "Hair", image: "assets/13.jpeg", blurb: "Shampoos, treatments and finishing products in-store." },
    { id: "b14", name: "Fragrance moments", brand: "Beauty Corner", category: "Fragrance", image: "assets/14.jpeg", blurb: "Everyday mists and classics from the beauty counter." },
    { id: "b15", name: "Lip & nail colour", brand: "Beauty Corner", category: "Makeup", image: "assets/15.jpeg", blurb: "Bold and nude shades for day-to-night looks." },
    { id: "b16", name: "Sun & protect", brand: "Beauty Corner", category: "Skincare", image: "assets/16.jpeg", blurb: "SPF and after-sun care for Manicaland weather." },
    { id: "b17", name: "Men's grooming", brand: "Beauty Corner", category: "Grooming", image: "assets/17.jpeg", blurb: "Face wash, balm and deodorant essentials." },
    { id: "b18", name: "Hand & nail care", brand: "Beauty Corner", category: "Body", image: "assets/18.jpeg", blurb: "Creams and treatments for hardworking hands." },
    { id: "b19", name: "Beauty aisle story", brand: "Central Pharmacy", category: "Featured", image: "assets/19.jpeg", blurb: "Walk the corner — new arrivals and staff favourites." },
    { id: "b20", name: "Self-care kit", brand: "Beauty Corner", category: "Featured", image: "assets/20.jpeg", blurb: "Bundle-ready picks for gifting or a weekend reset." }
  ]
};
