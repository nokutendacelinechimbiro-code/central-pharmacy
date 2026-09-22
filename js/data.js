/**
 * data.js
 * --------
 * Demo content only. Nothing here is a real patient, prescription, or payment.
 * Change product names, prices, or opening hours here and the pages will update.
 */

const CP_DATA = {
  pharmacy: {
    name: "Central Pharmacy",
    tagline: "Trusted care for your community",
    // Central Pharmacy contact details
phone: "020 206 2664 / +263 7 8374 4458",
email: "centralpharma.mutare@gmail.com",

address: "Cuthberts Building, 69 Herbert Chitepo Street, Mutare, Manicaland, Zimbabwe",
hours: [
  { day: "Monday - Saturday", time: "08:00 - 19:00" },
  { day: "Sunday", time: "08:00 - 15:00" }
]
  },

  categories: [
    { id: "medicines", name: "Medicines",  blurb: "Everyday relief, pharmacist advice" },
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

  // Demo catalogue. Prices are sample figures for the prototype.
  products: [
    { id: "p1", name: "Paracetamol 500mg tablets", category: "medicines", price: 2.49, featured: true, stock: 42, blurb: "For mild to moderate pain and fever. Always read the label." },
    { id: "p2", name: "Ibuprofen 200mg tablets", category: "medicines", price: 3.15, featured: true, stock: 30, blurb: "Anti-inflammatory pain relief. Ask a pharmacist if unsure." },
    { id: "p3", name: "Cough & cold syrup (demo)", category: "medicines", price: 5.99, featured: false, stock: 18, blurb: "Soothing syrup for tickly coughs. Not a prescription medicine." },
    { id: "p4", name: "Allergy relief tablets", category: "medicines", price: 6.5, featured: false, stock: 25, blurb: "Non-drowsy daytime hay fever support." },
    { id: "p5", name: "Vitamin D3 1000 IU", category: "vitamins", price: 7.99, featured: true, stock: 50, blurb: "Daily vitamin D supplement." },
    { id: "p6", name: "Omega-3 capsules", category: "vitamins", price: 9.49, featured: false, stock: 22, blurb: "Fish oil supplement for general wellbeing." },
    { id: "p7", name: "Multivitamin (adult)", category: "vitamins", price: 8.25, featured: true, stock: 35, blurb: "Once-daily complete multivitamin." },
    { id: "p8", name: "Baby nappy cream", category: "baby", price: 4.75, featured: false, stock: 40, blurb: "Barrier cream for nappy area comfort." },
    { id: "p9", name: "Infant fever sachets", category: "baby", price: 5.2, featured: false, stock: 16, blurb: "Age-appropriate sachets. Follow the pack instructions." },
    { id: "p10", name: "Gentle baby wash", category: "baby", price: 3.99, featured: false, stock: 28, blurb: "Tear-free wash for sensitive skin." },
    { id: "p11", name: "Daily moisturiser SPF 30", category: "skincare", price: 11.5, featured: true, stock: 20, blurb: "Lightweight day cream with sun protection." },
    { id: "p12", name: "Sensitive skin cleanser", category: "skincare", price: 8.99, featured: false, stock: 24, blurb: "Fragrance-free face wash." },
    { id: "p13", name: "Hand sanitiser 250ml", category: "personal", price: 3.49, featured: false, stock: 60, blurb: "Alcohol-based gel for on-the-go hygiene." },
    { id: "p14", name: "Toothpaste extra fresh", category: "personal", price: 2.99, featured: false, stock: 45, blurb: "Everyday fluoride toothpaste." },
    { id: "p15", name: "Family first aid kit", category: "first-aid", price: 14.99, featured: true, stock: 12, blurb: "Plasters, wipes, bandage and guidance leaflet." },
    { id: "p16", name: "Sterile dressings pack", category: "first-aid", price: 6.75, featured: false, stock: 19, blurb: "Assorted sterile dressings." },
    { id: "p17", name: "Digital thermometer", category: "equipment", price: 9.99, featured: true, stock: 15, blurb: "Fast-read home thermometer." },
    { id: "p18", name: "Upper arm blood pressure monitor", category: "equipment", price: 29.99, featured: false, stock: 8, blurb: "Home BP monitor with easy cuff." },
    { id: "p19", name: "Reusable ice pack", category: "first-aid", price: 4.5, featured: false, stock: 21, blurb: "For bumps and swelling." },
    { id: "p20", name: "Walking stick (adjustable)", category: "equipment", price: 18.5, featured: false, stock: 6, blurb: "Height-adjustable mobility aid." }
  ]
};
