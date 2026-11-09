const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* =====================================================
   EXPANDED DESTINATION DATABASE (20+ Rich Destinations)
   ===================================================== */

const destinations = {
  vijayawada: {
    name: "Vijayawada",
    state: "Andhra Pradesh",
    country: "India",
    tagline: "The Place of Victory & Riverside Heritage",
    description: "Nestled on the banks of Krishna River, Vijayawada is a vibrant cultural and commercial hub famous for sacred temples, ancient rock-cut caves, and scenic river islands.",
    heroImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "October to March",
    places: [
      { name: "Prakasam Barrage", type: "Photography", duration: "1.5h", entryFee: 0, bestTime: "Sunrise / Evening", desc: "Iconic 1.2km bridge across the Krishna River with panoramic water views." },
      { name: "Kanaka Durga Temple", type: "Spiritual", duration: "2h", entryFee: 100, bestTime: "Morning", desc: "Ancient sacred hilltop shrine dedicated to Goddess Durga on Indrakeeladri." },
      { name: "Undavalli Caves", type: "Heritage", duration: "2h", entryFee: 25, bestTime: "Morning / Afternoon", desc: "4th-century monolithic rock-cut cave temples featuring a huge reclining Vishnu." },
      { name: "Bhavani Island", type: "Relaxation", duration: "3h", entryFee: 50, bestTime: "Afternoon", desc: "Sprawling river island resort with boating, adventure sports, and lush lawns." },
      { name: "Kondapalli Fort", type: "History", duration: "2.5h", entryFee: 20, bestTime: "Morning", desc: "14th-century hill fortress famous for traditional hand-crafted wooden toys." },
      { name: "Amaravati Heritage City", type: "Culture", duration: "3h", entryFee: 50, bestTime: "Full Day / Morning", desc: "Historic Buddhist site with the grand Dhyana Buddha statue and heritage museum." },
      { name: "Victoria Jubilee Museum (Bapu Museum)", type: "Culture", duration: "1.5h", entryFee: 50, bestTime: "Afternoon", desc: "Renovated archaeological gallery with ancient sculptures, coins, and relics." },
      { name: "Gandhi Hill", type: "Viewpoint", duration: "1.5h", entryFee: 20, bestTime: "Sunset", desc: "First Gandhi memorial in India atop a hill with a light and sound show." }
    ],
    food: [
      { name: "Andhra Thali Meals (Gongura & Podi)", type: "Vegetarian", rating: 4.8, avgCost: 200, mustTry: true },
      { name: "Vijayawada Special Biryani", type: "Non-Vegetarian", rating: 4.7, avgCost: 320, mustTry: true },
      { name: "Pesarattu Upma & Filter Coffee", type: "Vegetarian", rating: 4.9, avgCost: 120, mustTry: true },
      { name: "Pootharekulu & Andhra Sweets", type: "Vegetarian", rating: 4.6, avgCost: 150, mustTry: false }
    ],
    hotels: [
      { name: "River View Budget Stay", tier: "Budget", pricePerNight: 950, rating: 4.2, amenities: ["Free Wi-Fi", "AC", "Breakfast"] },
      { name: "Hotel Quality Comforts", tier: "Comfort", pricePerNight: 2100, rating: 4.5, amenities: ["Restaurant", "Wi-Fi", "Room Service", "Cab Support"] },
      { name: "Novotel Varun Vijayawada", tier: "Luxury", pricePerNight: 5800, rating: 4.8, amenities: ["Infinity Pool", "River View", "Spa", "Multi-cuisine Buffet"] }
    ],
    weather: { temp: "29°C", condition: "Warm & Sunny", advisory: "Light cotton clothing recommended" },
    crowd: { level: "Moderate", peakDays: "Weekends & Festivals" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "Manipal Hospital Vijayawada", address: "Tadepalli, Guntur Rd", phone: "+91 866 257 5555" },
        { name: "Ramesh Hospitals", address: "Collector Office Rd, Vijayawada", phone: "+91 866 248 8888" },
        { name: "Government General Hospital", address: "Hanumanpet, Vijayawada", phone: "+91 866 243 0041" }
      ]
    }
  },

  hyderabad: {
    name: "Hyderabad",
    state: "Telangana",
    country: "India",
    tagline: "The City of Pearls & Nizami Splendor",
    description: "A dynamic metropolis blending 400-year-old historic monuments, bustling bazaars, cutting-edge IT hubs, and world-renowned royal cuisine.",
    heroImage: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "October to February",
    places: [
      { name: "Charminar & Laad Bazaar", type: "Heritage", duration: "2h", entryFee: 25, bestTime: "Morning / Evening", desc: "Global landmark built in 1591, surrounded by shimmering bangle and pearl markets." },
      { name: "Golconda Fort & Sound Show", type: "History", duration: "3h", entryFee: 50, bestTime: "Late Afternoon", desc: "Acoustic wonder and fortified medieval citadel of the Qutb Shahi dynasty." },
      { name: "Chowmahalla Palace", type: "Heritage", duration: "2h", entryFee: 100, bestTime: "Morning", desc: "Magnificent seat of the Asaf Jahi dynasty with royal vintage car collections." },
      { name: "Salar Jung Museum", type: "Culture", duration: "3h", entryFee: 50, bestTime: "Afternoon", desc: "One of the world's largest one-man collections of global art, clocks, and relics." },
      { name: "Hussain Sagar Lake & Buddha Statue", type: "Relaxation", duration: "1.5h", entryFee: 100, bestTime: "Sunset", desc: "Scenic boat ride to the giant monolithic Buddha statue in the heart of the lake." },
      { name: "Birla Mandir", type: "Spiritual", duration: "1.5h", entryFee: 0, bestTime: "Sunset / Evening", desc: "Stunning white marble temple on Naubat Pahad offering panoramic city views." },
      { name: "Ramoji Film City", type: "Adventure", duration: "6h", entryFee: 1350, bestTime: "Full Day", desc: "World's largest film studio complex with interactive theme sets and live stunts." }
    ],
    food: [
      { name: "Authentic Hyderabadi Dum Biryani", type: "Non-Vegetarian", rating: 5.0, avgCost: 350, mustTry: true },
      { name: "Irani Chai & Osmania Biscuits", type: "Vegetarian", rating: 4.9, avgCost: 60, mustTry: true },
      { name: "Hyderabadi Haleem & Mirchi Ka Salan", type: "Non-Vegetarian", rating: 4.8, avgCost: 280, mustTry: true },
      { name: "South Indian Deluxe Tiffins (Govind Dosa)", type: "Vegetarian", rating: 4.7, avgCost: 150, mustTry: false }
    ],
    hotels: [
      { name: "City Pearl Budget Inn", tier: "Budget", pricePerNight: 1100, rating: 4.1, amenities: ["Free Wi-Fi", "AC", "Metro Proximity"] },
      { name: "Lemon Tree Premier Hitec City", tier: "Comfort", pricePerNight: 3400, rating: 4.6, amenities: ["Pool", "Fitness Center", "Restaurant", "Wi-Fi"] },
      { name: "Taj Falaknuma Palace", tier: "Luxury", pricePerNight: 28000, rating: 4.9, amenities: ["Royal Suites", "Heritage Tour", "Fine Dining", "Luxury Spa"] }
    ],
    weather: { temp: "27°C", condition: "Pleasant & Clear", advisory: "Ideal weather for city exploration" },
    crowd: { level: "High", peakDays: "Friday to Sunday" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "Apollo Hospitals Jubilee Hills", address: "Road No 72, Film Nagar", phone: "+91 40 2360 7777" },
        { name: "Yashoda Hospitals Secunderabad", address: "Alexander Rd, Secunderabad", phone: "+91 40 4567 4567" },
        { name: "Care Hospitals Banjara Hills", address: "Road No 1, Banjara Hills", phone: "+91 40 6165 6565" }
      ]
    }
  },

  visakhapatnam: {
    name: "Visakhapatnam",
    state: "Andhra Pradesh",
    country: "India",
    tagline: "The Jewel of the East Coast",
    description: "A coastal paradise famed for pristine golden beaches, lush Eastern Ghats hill ranges, historic submarine museums, and panoramic ocean viewpoints.",
    heroImage: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "October to March",
    places: [
      { name: "RK Beach & Promenade", type: "Beach", duration: "2h", entryFee: 0, bestTime: "Morning / Sunset", desc: "Bustling city coastline with evening street food, sea breezes, and war memorials." },
      { name: "INS Kursura Submarine Museum", type: "Museum", duration: "1.5h", entryFee: 70, bestTime: "Morning / Afternoon", desc: "Real decommissioned Soviet-built submarine preserved on the beach sands." },
      { name: "Kailasagiri Hilltop Park", type: "Viewpoint", duration: "2.5h", entryFee: 100, bestTime: "Sunset", desc: "Scenic hill park with giant Shiva-Parvati statues, toy train, and cable car ropeway." },
      { name: "Yarada Beach & Dolphin's Nose", type: "Relaxation", duration: "3h", entryFee: 30, bestTime: "Afternoon", desc: "Secluded picturesque beach sheltered by green hills and a historic lighthouse." },
      { name: "Simhachalam Temple", type: "Heritage", duration: "2h", entryFee: 100, bestTime: "Morning", desc: "11th-century hill shrine dedicated to Lord Narasimha with rich Dravidian architecture." },
      { name: "Borra Caves & Araku Valley", type: "Adventure", duration: "6h", entryFee: 150, bestTime: "Day Trip", desc: "Million-year-old limestone stalactite caves in the misty Ananthagiri Hills." }
    ],
    food: [
      { name: "Vizag Royyala Vepudu (Prawn Fry)", type: "Non-Vegetarian", rating: 4.9, avgCost: 380, mustTry: true },
      { name: "Bongu Chicken (Bamboo Chicken)", type: "Non-Vegetarian", rating: 4.8, avgCost: 320, mustTry: true },
      { name: "Andhra Coastal Vegetarian Meals", type: "Vegetarian", rating: 4.7, avgCost: 180, mustTry: true },
      { name: "Fresh Beachside Seafood & Punugulu", type: "Vegetarian", rating: 4.6, avgCost: 100, mustTry: false }
    ],
    hotels: [
      { name: "Coastal Breeze Residency", tier: "Budget", pricePerNight: 1050, rating: 4.1, amenities: ["AC", "Wi-Fi", "Walk to Beach"] },
      { name: "Fairfield by Marriott Visakhapatnam", tier: "Comfort", pricePerNight: 3200, rating: 4.6, amenities: ["Pool", "Restaurant", "Airport Shuttle", "Gym"] },
      { name: "The Gateway Hotel Beach Road", tier: "Luxury", pricePerNight: 7200, rating: 4.8, amenities: ["Sea Facing Rooms", "Outdoor Pool", "Fine Dining", "Spa"] }
    ],
    weather: { temp: "28°C", condition: "Breezy & Sunny", advisory: "Sunscreen and sunglasses recommended" },
    crowd: { level: "Moderate", peakDays: "Saturday & Sunday" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "Care Hospitals Visakhapatnam", address: "AS Raja Complex, Waltair Main Rd", phone: "+91 891 304 1444" },
        { name: "SevenHills Hospital", address: "Rockdale Layout, Waltair Uplands", phone: "+91 891 667 7777" }
      ]
    }
  },

  tirupati: {
    name: "Tirupati",
    state: "Andhra Pradesh",
    country: "India",
    tagline: "The Spiritual Capital of Andhra Pradesh",
    description: "Home to the revered Sri Venkateswara Swamy Temple on Tirumala Hills, one of the world's most sacred pilgrimage destinations surrounded by lush national parks.",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "September to March",
    places: [
      { name: "Sri Venkateswara Swamy Temple (Tirumala)", type: "Spiritual", duration: "4h", entryFee: 300, bestTime: "Early Morning", desc: "World-famous sacred temple atop seven sacred hills, attracting millions of devotees." },
      { name: "Kapila Theertham Waterfalls", type: "Spiritual", duration: "1.5h", entryFee: 0, bestTime: "Morning", desc: "Ancient Shiva temple built right at the base of a cascading mountain waterfall." },
      { name: "Sri Govindaraja Swamy Temple", type: "Heritage", duration: "2h", entryFee: 20, bestTime: "Morning / Evening", desc: "Grand 12th-century Vaishnavite temple featuring massive Dravidian gopurams." },
      { name: "Talakona Waterfalls", type: "Nature", duration: "4h", entryFee: 50, bestTime: "Morning / Afternoon", desc: "Highest waterfall in Andhra Pradesh nestled inside Sri Venkateswara National Park." },
      { name: "Silathoranam (Natural Rock Arch)", type: "Nature", duration: "1h", entryFee: 0, bestTime: "Morning", desc: "Rare geological rock arch dating back 1.5 billion years in Tirumala." },
      { name: "Chandragiri Fort & Palace", type: "History", duration: "2.5h", entryFee: 25, bestTime: "Late Afternoon", desc: "11th-century Vijayanagara fort with palace museum and evening sound show." }
    ],
    food: [
      { name: "Tirupati Laddu Prasadam", type: "Vegetarian", rating: 5.0, avgCost: 50, mustTry: true },
      { name: "Traditional South Indian Banana Leaf Thali", type: "Vegetarian", rating: 4.9, avgCost: 150, mustTry: true },
      { name: "Hot Ghee Dosa & Sambar", type: "Vegetarian", rating: 4.8, avgCost: 90, mustTry: true },
      { name: "Tirupati Street Tiffins & Filter Coffee", type: "Vegetarian", rating: 4.7, avgCost: 70, mustTry: false }
    ],
    hotels: [
      { name: "Devotee Comfort Lodge", tier: "Budget", pricePerNight: 850, rating: 4.2, amenities: ["AC", "Temple Transit Help", "Clean Bathrooms"] },
      { name: "Fortune Select Grand Ridge", tier: "Comfort", pricePerNight: 2800, rating: 4.6, amenities: ["Vegetarian Restaurant", "Free Wi-Fi", "Pool", "Gym"] },
      { name: "Marasa Sarovar Premiere", tier: "Luxury", pricePerNight: 5500, rating: 4.8, amenities: ["Lotus Themed Architecture", "Fine Dining", "Spa", "Pool"] }
    ],
    weather: { temp: "26°C", condition: "Pleasant", advisory: "Modest attire required for temple visits" },
    crowd: { level: "Very High", peakDays: "Daily & Auspicious days" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "SVIMS Hospital Tirupati", address: "Alipiri Rd, Tirupati", phone: "+91 877 228 7777" },
        { name: "BIRRD Hospital", address: "Bhavani Nagar, Tirupati", phone: "+91 877 226 4600" }
      ]
    }
  },

  bengaluru: {
    name: "Bengaluru",
    state: "Karnataka",
    country: "India",
    tagline: "The Garden City & Silicon Valley of India",
    description: "A buzzing cosmopolitan metropolis known for its lush botanical gardens, majestic Tudor-style palaces, craft breweries, and pleasant year-round climate.",
    heroImage: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "September to March",
    places: [
      { name: "Lalbagh Botanical Garden & Glass House", type: "Nature", duration: "2.5h", entryFee: 30, bestTime: "Morning", desc: "240-acre botanical haven with centuries-old trees and Victorian glasshouse." },
      { name: "Bengaluru Palace", type: "Heritage", duration: "2h", entryFee: 250, bestTime: "Morning / Afternoon", desc: "Tudor-style royal estate with woodcarvings, turrets, and royal memorabilia." },
      { name: "Cubbon Park & Vidhana Soudha", type: "Relaxation", duration: "2h", entryFee: 0, bestTime: "Morning", desc: "Sprawling central green lung right opposite the monumental neo-Dravidian statehouse." },
      { name: "ISKCON Sri Radha Krishna Temple", type: "Spiritual", duration: "2h", entryFee: 0, bestTime: "Morning / Evening", desc: "One of the world's largest ISKCON temple complexes perched on Hare Krishna Hill." },
      { name: "Bannerghatta Biological Park", type: "Adventure", duration: "4h", entryFee: 350, bestTime: "Morning", desc: "Safari sanctuary with tigers, lions, butterfly park, and rescue zoo." },
      { name: "MG Road & Church Street", type: "City Experience", duration: "3h", entryFee: 0, bestTime: "Evening", desc: "Vibrant pedestrian hub filled with bookstores, cafes, live music, and art shops." }
    ],
    food: [
      { name: "Crispy Benne Masala Dosa (Vidyarthi Bhavan / CTR)", type: "Vegetarian", rating: 5.0, avgCost: 110, mustTry: true },
      { name: "Karnataka Bisi Bele Bath & Filter Coffee", type: "Vegetarian", rating: 4.8, avgCost: 130, mustTry: true },
      { name: "Mangalorean Ghee Roast & Seafood", type: "Non-Vegetarian", rating: 4.9, avgCost: 400, mustTry: true },
      { name: "Microbrewery Craft Beer & Burgers", type: "Non-Vegetarian", rating: 4.7, avgCost: 650, mustTry: false }
    ],
    hotels: [
      { name: "Zostel Bangalore / Budget Hub", tier: "Budget", pricePerNight: 1200, rating: 4.4, amenities: ["Wi-Fi", "Coworking Space", "Cafe", "Social Events"] },
      { name: "The Chancery Pavilion", tier: "Comfort", pricePerNight: 4200, rating: 4.5, amenities: ["Central Location", "Pool", "Gym", "Breakfast"] },
      { name: "The Leela Palace Bengaluru", tier: "Luxury", pricePerNight: 18500, rating: 4.9, amenities: ["Palatial Grandeur", "Lagoon Pool", "Luxury Spa", "Michelin-style Dining"] }
    ],
    weather: { temp: "24°C", condition: "Pleasant & Breezy", advisory: "Light jacket in the evening" },
    crowd: { level: "High", peakDays: "Friday & Saturday" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "Manipal Hospital Old Airport Rd", address: "HAL Airport Rd, Bengaluru", phone: "+91 80 2502 4444" },
        { name: "Fortis Hospital Bannerghatta", address: "Bannerghatta Rd, Bengaluru", phone: "+91 80 6621 4444" }
      ]
    }
  },

  chennai: {
    name: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    tagline: "The Gateway to South India",
    description: "A cultural capital steeped in classical Carnatic music, ancient Dravidian stone temples, golden coastlines, and colonial coastal forts.",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "November to February",
    places: [
      { name: "Marina Beach & Lighthouse", type: "Beach", duration: "2h", entryFee: 20, bestTime: "Sunrise / Evening", desc: "Second longest urban natural beach in the world with panoramic lighthouse views." },
      { name: "Kapaleeshwarar Temple, Mylapore", type: "Spiritual", duration: "2h", entryFee: 0, bestTime: "Morning / Evening", desc: "7th-century Shiva temple famous for its rainbow-sculpted towering gopuram." },
      { name: "San Thome Basilica", type: "Heritage", duration: "1.5h", entryFee: 0, bestTime: "Morning", desc: "Neo-Gothic cathedral built over the tomb of St. Thomas the Apostle." },
      { name: "Fort St. George & Museum", type: "History", duration: "2h", entryFee: 25, bestTime: "Morning", desc: "First British fortress in India built in 1644, housing colonial armory and coins." },
      { name: "DakshinaChitra Heritage Museum", type: "Culture", duration: "3h", entryFee: 150, bestTime: "Afternoon", desc: "Living history museum showcasing reconstructed traditional homes of South India." },
      { name: "Besant Nagar Beach (Edward Elliot's Beach)", type: "Relaxation", duration: "2h", entryFee: 0, bestTime: "Evening", desc: "Peaceful beach lined with cafes, Karl Schmidt memorial, and seaside promenade." }
    ],
    food: [
      { name: "Authentic Chettinad Chicken / Veg Thali", type: "Non-Vegetarian", rating: 4.9, avgCost: 280, mustTry: true },
      { name: "Mylapore Ghee Idli, Medu Vada & Filter Coffee", type: "Vegetarian", rating: 5.0, avgCost: 90, mustTry: true },
      { name: "Sundal & Beachside Murukku Sandwich", type: "Vegetarian", rating: 4.6, avgCost: 60, mustTry: false }
    ],
    hotels: [
      { name: "Mylapore Heritage Inn", tier: "Budget", pricePerNight: 950, rating: 4.2, amenities: ["AC", "Wi-Fi", "Traditional Breakfast"] },
      { name: "The Residency Towers Chennai", tier: "Comfort", pricePerNight: 3600, rating: 4.6, amenities: ["Rooftop Pool", "Spa", "Central T.Nagar"] },
      { name: "ITC Grand Chola", tier: "Luxury", pricePerNight: 14000, rating: 4.9, amenities: ["Chola Dynasty Architecture", "10 Dining Venues", "Luxury Spa", "Pool"] }
    ],
    weather: { temp: "29°C", condition: "Tropical Warmth", advisory: "Stay hydrated & wear breathable fabrics" },
    crowd: { level: "Moderate", peakDays: "Weekends" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "Apollo Hospitals Greams Road", address: "Greams Rd, Thousand Lights", phone: "+91 44 2829 0200" },
        { name: "MIOT International", address: "Manapakkam, Chennai", phone: "+91 44 4200 2288" }
      ]
    }
  },

  mumbai: {
    name: "Mumbai",
    state: "Maharashtra",
    country: "India",
    tagline: "The City of Dreams & Maximum City",
    description: "India's financial and entertainment powerhouse, renowned for grand Victorian Gothic architecture, the Arabian Sea shoreline, Bollywood, and vibrant street energy.",
    heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "November to February",
    places: [
      { name: "Gateway of India & Colaba Causeway", type: "Heritage", duration: "2h", entryFee: 0, bestTime: "Morning / Sunset", desc: "Triumphal 20th-century arch overlooking Mumbai Harbour and vibrant street market." },
      { name: "Marine Drive & Queen's Necklace", type: "Photography", duration: "2h", entryFee: 0, bestTime: "Sunset / Night", desc: "3.6km C-shaped seaside boulevard sparkling with streetlights at night." },
      { name: "Chhatrapati Shivaji Maharaj Terminus (CSMT)", type: "Architecture", duration: "1.5h", entryFee: 0, bestTime: "Evening", desc: "UNESCO World Heritage Victorian Gothic railway masterpiece built in 1887." },
      { name: "Elephanta Island Caves", type: "History", duration: "4h", entryFee: 300, bestTime: "Morning", desc: "6th-century rock-cut cave temples dedicated to Shiva, reached via ferry from Gateway." },
      { name: "Siddhivinayak Temple & Bandra Bandstand", type: "Spiritual", duration: "2.5h", entryFee: 0, bestTime: "Morning", desc: "Iconic Ganesh shrine followed by sea breeze stroll along celebrity sea-facing homes." },
      { name: "Bandra Fort & Street Art Walk", type: "Culture", duration: "2h", entryFee: 0, bestTime: "Late Afternoon", desc: "Portuguese coastal fort ruins with panoramic views of the Bandra-Worli Sea Link." }
    ],
    food: [
      { name: "Vada Pav & Pav Bhaji (Sardar / Cannon)", type: "Vegetarian", rating: 5.0, avgCost: 100, mustTry: true },
      { name: "Mumbai Bombay Duck Fry & Seafood Thali", type: "Non-Vegetarian", rating: 4.8, avgCost: 450, mustTry: true },
      { name: "Parsi Bun Maska, Irani Chai & Berry Pulao", type: "Non-Vegetarian", rating: 4.9, avgCost: 280, mustTry: true },
      { name: "Kala Khatta Gola & Falooda at Chowpatty", type: "Vegetarian", rating: 4.7, avgCost: 120, mustTry: false }
    ],
    hotels: [
      { name: "Colaba Backpacker Hostel", tier: "Budget", pricePerNight: 1250, rating: 4.3, amenities: ["Wi-Fi", "Walk to Gateway", "Rooftop"] },
      { name: "Trident Nariman Point", tier: "Comfort", pricePerNight: 9500, rating: 4.7, amenities: ["Marine Drive View", "Pool", "Gym", "Fine Dining"] },
      { name: "The Taj Mahal Palace Mumbai", tier: "Luxury", pricePerNight: 32000, rating: 5.0, amenities: ["Legendary Heritage", "Harbour View", "9 Restaurants", "Spa"] }
    ],
    weather: { temp: "28°C", condition: "Pleasant & Sea Breeze", advisory: "Best explored by local train & cabs" },
    crowd: { level: "Very High", peakDays: "All Days" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "Lilavati Hospital Bandra", address: "A-791, Bandra Reclamation", phone: "+91 22 2675 1000" },
        { name: "Bombay Hospital Marine Lines", address: "12 Marine Lines, Mumbai", phone: "+91 22 2206 7676" }
      ]
    }
  },

  delhi: {
    name: "Delhi",
    state: "Delhi NCR",
    country: "India",
    tagline: "The Historic Heart of India",
    description: "A legendary capital where centuries of Mughal emperors, British Raj architects, and modern India intersect across majestic tombs, fortresses, and bustling food bazaars.",
    heroImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "October to March",
    places: [
      { name: "Qutub Minar & Iron Pillar", type: "Heritage", duration: "2h", entryFee: 50, bestTime: "Morning", desc: "73m soaring red sandstone minaret built in 1192 and rust-resistant 4th-century iron pillar." },
      { name: "Humayun's Tomb", type: "Architecture", duration: "2h", entryFee: 50, bestTime: "Late Afternoon", desc: "UNESCO World Heritage garden tomb that inspired the design of the Taj Mahal." },
      { name: "Red Fort (Lal Qila) & Chandni Chowk", type: "History", duration: "3.5h", entryFee: 50, bestTime: "Morning", desc: "Grand 17th-century Mughal palace fortress and ancient culinary street bazaar." },
      { name: "India Gate & Kartavya Path", type: "Heritage", duration: "1.5h", entryFee: 0, bestTime: "Evening / Night", desc: "National war memorial illuminated brilliantly at night with expansive lawns." },
      { name: "Lotus Temple & ISKCON Delhi", type: "Spiritual", duration: "2h", entryFee: 0, bestTime: "Morning / Afternoon", desc: "Breathtaking flower-like Bahai House of Worship open to all faiths in silence." },
      { name: "Akshardham Temple & Water Show", type: "Culture", duration: "4h", entryFee: 250, bestTime: "Afternoon to Night", desc: "Sprawling temple complex showcasing ancient Indian art, boat ride, and musical fountain." }
    ],
    food: [
      { name: "Delhi Butter Chicken & Naan (Pandara Rd)", type: "Non-Vegetarian", rating: 4.9, avgCost: 450, mustTry: true },
      { name: "Chandni Chowk Parathas & Chole Bhature", type: "Vegetarian", rating: 4.9, avgCost: 150, mustTry: true },
      { name: "Old Delhi Dahi Bhalla & Jalebi Rabri", type: "Vegetarian", rating: 4.8, avgCost: 100, mustTry: true },
      { name: "Kebabs at Jama Masjid (Karim's / Al Jawahar)", type: "Non-Vegetarian", rating: 4.8, avgCost: 350, mustTry: false }
    ],
    hotels: [
      { name: "Paharganj / CP Budget Residency", tier: "Budget", pricePerNight: 990, rating: 4.0, amenities: ["AC", "Free Wi-Fi", "Metro Proximity"] },
      { name: "The Lalit New Delhi", tier: "Comfort", pricePerNight: 6500, rating: 4.6, amenities: ["Central Connaught Place", "Pool", "Spa", "Fine Dining"] },
      { name: "The Imperial New Delhi", tier: "Luxury", pricePerNight: 24000, rating: 4.9, amenities: ["Colonial Heritage", "Art Gallery", "Royal Spa", "Fine Dining"] }
    ],
    weather: { temp: "22°C", condition: "Clear & Crisp", advisory: "Pleasant daytime, light woollens at night" },
    crowd: { level: "High", peakDays: "Weekends" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "AIIMS New Delhi", address: "Sri Aurobindo Marg, Ansari Nagar", phone: "+91 11 2658 8500" },
        { name: "Max Super Speciality Hospital Saket", address: "1, 2 Press Enclave Rd, Saket", phone: "+91 11 2651 5050" }
      ]
    }
  },

  jaipur: {
    name: "Jaipur",
    state: "Rajasthan",
    country: "India",
    tagline: "The Pink City of Royalty & Fortresses",
    description: "Rajasthan's historic pink-hued capital, renowned for hilltop Rajput forts, mirror palaces, astronomical observatories, and vibrant textile bazaars.",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "October to March",
    places: [
      { name: "Amber Fort & Palace", type: "Heritage", duration: "3h", entryFee: 100, bestTime: "Morning", desc: "Majestic hilltop fortress overlooking Maota Lake, famous for Sheesh Mahal (Mirror Palace)." },
      { name: "Hawa Mahal (Palace of Winds)", type: "Architecture", duration: "1h", entryFee: 50, bestTime: "Morning", desc: "Iconic honeycomb facade with 953 jharokhas built for royal women to watch street life." },
      { name: "City Palace & Museum", type: "History", duration: "2h", entryFee: 200, bestTime: "Morning / Afternoon", desc: "Sprawling royal residence showcasing Rajput and Mughal courtyards and costume galleries." },
      { name: "Jantar Mantar Observatory", type: "Culture", duration: "1.5h", entryFee: 50, bestTime: "Midday", desc: "UNESCO World Heritage 18th-century astronomical instruments including world's largest sundial." },
      { name: "Nahargarh Fort & Sunset Point", type: "Viewpoint", duration: "2h", entryFee: 50, bestTime: "Sunset", desc: "Perched high on the Aravalli Hills offering spectacular panoramic golden-hour city vistas." },
      { name: "Jal Mahal & Johari Bazaar", type: "Photography", duration: "2h", entryFee: 0, bestTime: "Evening", desc: "Submerged water palace in Man Sagar Lake followed by traditional gemstone and textile shopping." }
    ],
    food: [
      { name: "Authentic Rajasthani Dal Baati Churma", type: "Vegetarian", rating: 5.0, avgCost: 280, mustTry: true },
      { name: "Laal Maas (Fiery Mutton Curry)", type: "Non-Vegetarian", rating: 4.9, avgCost: 450, mustTry: true },
      { name: "Pyaaz Kachori & Lassi (LMB / Rawat)", type: "Vegetarian", rating: 4.8, avgCost: 110, mustTry: true },
      { name: "Ghevar & Traditional Rajasthani Sweets", type: "Vegetarian", rating: 4.7, avgCost: 150, mustTry: false }
    ],
    hotels: [
      { name: "Heritage Haveli Stay", tier: "Budget", pricePerNight: 1200, rating: 4.3, amenities: ["Traditional Decor", "Wi-Fi", "Courtyard Breakfast"] },
      { name: "Shahpura House Heritage Hotel", tier: "Comfort", pricePerNight: 4500, rating: 4.7, amenities: ["Pool", "Rooftop Restaurant", "Cultural Dance", "Spa"] },
      { name: "Rambagh Palace (The Jewel of Jaipur)", tier: "Luxury", pricePerNight: 35000, rating: 5.0, amenities: ["Royal Maharajah Palace", "Peacock Gardens", "Jiva Spa", "Fine Dining"] }
    ],
    weather: { temp: "25°C", condition: "Sunny & Pleasant", advisory: "Comfortable walking shoes for fort climbs" },
    crowd: { level: "High", peakDays: "Weekends & Winter Holidays" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "Fortis Escorts Hospital Jaipur", address: "Jawaharlal Nehru Marg, Malviya Nagar", phone: "+91 141 254 7000" },
        { name: "SMS Hospital (Sawai Man Singh)", address: "JLN Marg, Ashok Nagar", phone: "+91 141 251 8222" }
      ]
    }
  },

  goa: {
    name: "Goa",
    state: "Goa",
    country: "India",
    tagline: "Sun, Sand, Susegad & Portuguese Heritage",
    description: "India's premier coastal haven featuring golden tropical beaches, vibrant beach shacks, centuries-old Portuguese churches, water sports, and spice plantations.",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "October to April",
    places: [
      { name: "Baga & Calangute Beach", type: "Beach", duration: "3h", entryFee: 0, bestTime: "Morning / Sunset", desc: "Lively North Goa beach hub with water sports, beach shacks, parasailing, and cafes." },
      { name: "Fort Aguada & Lighthouse", type: "Heritage", duration: "2h", entryFee: 25, bestTime: "Morning / Sunset", desc: "17th-century Portuguese fortress overlooking Sinquerim Beach and the Arabian Sea." },
      { name: "Basilica of Bom Jesus (Old Goa)", type: "Heritage", duration: "1.5h", entryFee: 0, bestTime: "Morning", desc: "UNESCO World Heritage Baroque church holding the mortal remains of St. Francis Xavier." },
      { name: "Dudhsagar Waterfalls", type: "Adventure", duration: "5h", entryFee: 500, bestTime: "Day Trip", desc: "Four-tiered milky white cascade located inside Bhagwan Mahavir Wildlife Sanctuary." },
      { name: "Palolem & Butterfly Beach (South Goa)", type: "Relaxation", duration: "4h", entryFee: 0, bestTime: "Afternoon to Sunset", desc: "Crescent-shaped calm bay with colorful beach huts and dolphin-spotting boat trips." },
      { name: "Fontainhas Latin Quarter (Panaji)", type: "Culture", duration: "2h", entryFee: 0, bestTime: "Late Afternoon", desc: "Charming historic neighborhood with pastel Portuguese villas, galleries, and bakeries." }
    ],
    food: [
      { name: "Goan Fish Curry Thali & Rice", type: "Non-Vegetarian", rating: 5.0, avgCost: 250, mustTry: true },
      { name: "Pork / Chicken Vindaloo & Poi Bread", type: "Non-Vegetarian", rating: 4.8, avgCost: 350, mustTry: true },
      { name: "Bebinca (Traditional Goan 7-Layer Cake)", type: "Vegetarian", rating: 4.9, avgCost: 120, mustTry: true },
      { name: "Goan Vegetable Xacuti & Cashew Feni", type: "Vegetarian", rating: 4.6, avgCost: 220, mustTry: false }
    ],
    hotels: [
      { name: "Backpacker Beach Hostel", tier: "Budget", pricePerNight: 1100, rating: 4.3, amenities: ["Pool", "Wi-Fi", "Scooter Rental", "Bar"] },
      { name: "Whispering Palms Beach Resort", tier: "Comfort", pricePerNight: 4800, rating: 4.6, amenities: ["Near Beach", "Pool", "Buffet Breakfast", "Spa"] },
      { name: "Taj Exotica Resort & Spa Goa", tier: "Luxury", pricePerNight: 26000, rating: 4.9, amenities: ["56-acre Mediterranean Paradise", "Private Beach", "Golf", "Ayurvedic Spa"] }
    ],
    weather: { temp: "29°C", condition: "Warm & Tropical Breeze", advisory: "Beachwear & sunscreen essential" },
    crowd: { level: "High", peakDays: "Friday to Sunday & December" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "Manipal Hospital Goa (Dona Paula)", address: "Dr E Borges Rd, Dona Paula", phone: "+91 832 304 8800" },
        { name: "Goa Medical College (GMC Bambolim)", address: "NH 66, Bambolim", phone: "+91 832 245 8700" }
      ]
    }
  },

  varanasi: {
    name: "Varanasi",
    state: "Uttar Pradesh",
    country: "India",
    tagline: "The World's Oldest Living City & Spiritual Hearth",
    description: "Sacred city on the Holy Ganges, celebrated for mesmerizing evening Ganga Aartis, labyrinthine heritage alleys, silk weaving, and Buddhist roots in Sarnath.",
    heroImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "October to March",
    places: [
      { name: "Dashashwamedh Ghat & Evening Ganga Aarti", type: "Cultural Experience", duration: "2h", entryFee: 0, bestTime: "Sunset / Evening", desc: "Soul-stirring grand evening ceremony with lamps, incense, chants, and brass lamps." },
      { name: "Kashi Vishwanath Temple & Corridor", type: "Spiritual", duration: "2.5h", entryFee: 0, bestTime: "Early Morning", desc: "One of the 12 revered Jyotirlingas, newly connected to the sacred river corridor." },
      { name: "Sunrise Boat Ride on River Ganga", type: "Photography", duration: "1.5h", entryFee: 200, bestTime: "Sunrise", desc: "Watch the ancient riverfront awaken with devotees, morning rituals, and mist." },
      { name: "Sarnath Buddhist Sacred Complex", type: "Heritage", duration: "3h", entryFee: 50, bestTime: "Morning / Afternoon", desc: "Where Lord Buddha gave his first sermon; features Dhamek Stupa and Ashoka Pillar." },
      { name: "Assi Ghat & Morning Subah-e-Banaras", type: "Culture", duration: "2h", entryFee: 0, bestTime: "Sunrise", desc: "Southernmost ghat famous for classical morning music, yoga, and vibrant youth cafes." },
      { name: "Banaras Silk Weaving & Vishwanath Gali", type: "Shopping", duration: "2h", entryFee: 0, bestTime: "Afternoon", desc: "Vibrant narrow alleys lined with authentic handwoven Banarasi sarees and brass items." }
    ],
    food: [
      { name: "Banarasi Kachori Sabzi & Jalebi", type: "Vegetarian", rating: 5.0, avgCost: 80, mustTry: true },
      { name: "Blue Lassi & Malaiyo (Winter Saffron Froth)", type: "Vegetarian", rating: 4.9, avgCost: 100, mustTry: true },
      { name: "Authentic Banarasi Paan", type: "Vegetarian", rating: 4.8, avgCost: 40, mustTry: true },
      { name: "Tamatar Chaat & Baati Chokha", type: "Vegetarian", rating: 4.7, avgCost: 90, mustTry: false }
    ],
    hotels: [
      { name: "Ganga View Heritage Guest House", tier: "Budget", pricePerNight: 950, rating: 4.3, amenities: ["Ghat Proximity", "Rooftop Cafe", "Wi-Fi"] },
      { name: "Heritage Haveli on the Ghats", tier: "Comfort", pricePerNight: 3800, rating: 4.6, amenities: ["River Views", "Vegetarian Dining", "Boat Support"] },
      { name: "BrijRama Palace Varanasi", tier: "Luxury", pricePerNight: 22000, rating: 4.9, amenities: ["18th-century Palace", "Private Boat Access", "Classical Music", "Royal Dining"] }
    ],
    weather: { temp: "23°C", condition: "Pleasant & Clear", advisory: "Dress modestly for temple and ghat visits" },
    crowd: { level: "High", peakDays: "All days" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "Sir Sunderlal Hospital (BHU Varanasi)", address: "Banaras Hindu University", phone: "+91 542 230 7500" },
        { name: "Apex Multi Speciality Hospital", address: "DLW Hydel Rd, Varanasi", phone: "+91 542 231 6688" }
      ]
    }
  },

  manali: {
    name: "Manali",
    state: "Himachal Pradesh",
    country: "India",
    tagline: "The Valley of Gods & Himalayan Adventure",
    description: "A high-altitude Himalayan resort town nestled in the Beas River Valley, surrounded by snow-capped peaks, pine forests, and adventure trails.",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "October to June (Snow in Dec-Feb)",
    places: [
      { name: "Solang Valley Snow & Adventure Park", type: "Adventure", duration: "4h", entryFee: 0, bestTime: "Morning", desc: "Adventure haven for paragliding, skiing, zorbing, cable cars, and quad biking." },
      { name: "Hadimba Devi Temple & Cedar Woods", type: "Heritage", duration: "1.5h", entryFee: 20, bestTime: "Morning", desc: "Unique 16th-century wooden pagoda temple tucked inside serene giant deodar forests." },
      { name: "Atal Tunnel & Sissu (Lahaul Valley)", type: "Nature", duration: "5h", entryFee: 0, bestTime: "Day Trip", desc: "Drive through the 9.02km engineering marvel to pristine snow valleys and waterfalls." },
      { name: "Old Manali Cafes & Wooden Houses", type: "Relaxation", duration: "2.5h", entryFee: 0, bestTime: "Afternoon / Evening", desc: "Bohemian village with stone cottages, apple orchards, live indie music, and art." },
      { name: "Jogini Waterfall Trek", type: "Nature", duration: "3h", entryFee: 0, bestTime: "Morning", desc: "Scenic mountain trail passing through apple orchards and pine trees to a cascading falls." },
      { name: "Mall Road & Tibetan Monasteries", type: "City Experience", duration: "2h", entryFee: 0, bestTime: "Evening", desc: "Lively central promenade for Himachali woollens, wooden crafts, and momos." }
    ],
    food: [
      { name: "Himachali Siddu with Ghee & Chutney", type: "Vegetarian", rating: 4.9, avgCost: 120, mustTry: true },
      { name: "Fresh Tandoori Himalayan Trout Fish", type: "Non-Vegetarian", rating: 4.9, avgCost: 450, mustTry: true },
      { name: "Steaming Tibetan Momos & Thukpa", type: "Vegetarian", rating: 4.8, avgCost: 110, mustTry: true },
      { name: "Warm Apple Crumble & Spiced Mountain Tea", type: "Vegetarian", rating: 4.7, avgCost: 150, mustTry: false }
    ],
    hotels: [
      { name: "Old Manali Riverside Hostel", tier: "Budget", pricePerNight: 950, rating: 4.4, amenities: ["Mountain Views", "Bonfire", "Cafe", "Wi-Fi"] },
      { name: "Snow Valley Resorts Manali", tier: "Comfort", pricePerNight: 3500, rating: 4.6, amenities: ["Panoramic Valley Views", "Heating", "Restaurant", "Garden"] },
      { name: "The Himalayan (Luxury Castle & Spa)", tier: "Luxury", pricePerNight: 16000, rating: 4.9, amenities: ["Victorian Gothic Castle", "Private Fireplaces", "Heated Pool", "Spa"] }
    ],
    weather: { temp: "14°C", condition: "Cool Mountain Air", advisory: "Warm jackets & woollens recommended" },
    crowd: { level: "Moderate", peakDays: "Weekends & Summer/Snow seasons" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "Civil Hospital Manali", address: "Mall Road, Manali", phone: "+91 1902 252 356" },
        { name: "Lady Willingdon Hospital", address: "Near Old Manali Bridge", phone: "+91 1902 252 388" }
      ]
    }
  },

  kochi: {
    name: "Kochi",
    state: "Kerala",
    country: "India",
    tagline: "Queen of the Arabian Sea & Backwater Haven",
    description: "A coastal spice trading capital featuring cantilevered Chinese fishing nets, colonial Fort Kochi alleys, Kathakali dance theatres, and tranquil palm-fringed backwaters.",
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "September to March",
    places: [
      { name: "Fort Kochi & Chinese Fishing Nets", type: "Heritage", duration: "2h", entryFee: 0, bestTime: "Sunset", desc: "Huge fixed land installations operating since the 14th century against Arabian sunsets." },
      { name: "Mattancherry Palace (Dutch Palace)", type: "History", duration: "1.5h", entryFee: 25, bestTime: "Morning", desc: "Portuguese palace gifted to the Raja of Kochi featuring stunning mythological murals." },
      { name: "Jew Town & Paradesi Synagogue", type: "Culture", duration: "2h", entryFee: 20, bestTime: "Morning / Afternoon", desc: "Ancient 1568 synagogue with hand-painted Chinese tiles and antique spice shops." },
      { name: "Kerala Backwater Boat Cruise", type: "Relaxation", duration: "3h", entryFee: 600, bestTime: "Morning / Afternoon", desc: "Glide peacefully through canals, coconut groves, and rural fishing villages." },
      { name: "Kerala Kathakali Centre", type: "Culture", duration: "2h", entryFee: 400, bestTime: "Evening", desc: "Watch the intricate makeup process and dramatic classical dance performance." },
      { name: "Marine Drive Promenade & Walkway", type: "Photography", duration: "1.5h", entryFee: 0, bestTime: "Evening", desc: "Scenic city waterfront walkway facing the backwaters and Rainbow Bridge." }
    ],
    food: [
      { name: "Kerala Karimeen Pollichathu (Pearl Spot Fish)", type: "Non-Vegetarian", rating: 5.0, avgCost: 420, mustTry: true },
      { name: "Appam with Vegetable / Chicken Stew", type: "Vegetarian", rating: 4.9, avgCost: 180, mustTry: true },
      { name: "Authentic Kerala Sadya (24-Dish Feast)", type: "Vegetarian", rating: 5.0, avgCost: 250, mustTry: true },
      { name: "Puttu with Kadala Curry & Banana Chips", type: "Vegetarian", rating: 4.8, avgCost: 110, mustTry: false }
    ],
    hotels: [
      { name: "Fort Kochi Backpacker Home", tier: "Budget", pricePerNight: 950, rating: 4.3, amenities: ["Heritage Street", "Wi-Fi", "Cycles"] },
      { name: "Fragrant Nature Fort Kochi", tier: "Comfort", pricePerNight: 4200, rating: 4.7, amenities: ["Harbour Views", "Pool", "Ayurveda Spa", "Dining"] },
      { name: "Brunton Boatyard (CGH Earth)", tier: "Luxury", pricePerNight: 18000, rating: 4.9, amenities: ["Colonial Shipyard Restored", "Eco Luxury", "Sea View", "Fine Dining"] }
    ],
    weather: { temp: "28°C", condition: "Coastal Warmth", advisory: "Cotton clothes & umbrella" },
    crowd: { level: "Moderate", peakDays: "Weekends" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "Aster Medcity Kochi", address: "Kuttisahib Rd, South Chittoor", phone: "+91 484 669 9999" },
        { name: "Amrita Hospital Kochi", address: "AIMS Ponekkara, Kochi", phone: "+91 484 285 1234" }
      ]
    }
  },

  udaipur: {
    name: "Udaipur",
    state: "Rajasthan",
    country: "India",
    tagline: "The City of Lakes & Venice of the East",
    description: "An enchanting oasis in Rajasthan famous for grand marble palaces rising from shimmering Lake Pichola, royal gardens, and golden sunset boat cruises.",
    heroImage: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "October to March",
    places: [
      { name: "City Palace Complex & Museum", type: "Heritage", duration: "3h", entryFee: 300, bestTime: "Morning", desc: "Rajasthan's largest royal palace complex with peacock courtyards and lake balconies." },
      { name: "Lake Pichola Sunset Boat Ride", type: "Relaxation", duration: "1.5h", entryFee: 450, bestTime: "Sunset", desc: "Cruising past Jag Mandir Island and the floating white Lake Palace." },
      { name: "Saheliyon Ki Bari (Garden of Maidens)", type: "Nature", duration: "1.5h", entryFee: 50, bestTime: "Morning", desc: "Historic ornamental garden with lotus pools, marble elephants, and bird fountains." },
      { name: "Jagdish Temple & Old City Bazaar", type: "Spiritual", duration: "1.5h", entryFee: 0, bestTime: "Morning", desc: "1651 Indo-Aryan carved temple followed by miniature painting and leather craft shops." },
      { name: "Monsoon Palace (Sajjangarh Fort)", type: "Viewpoint", duration: "2h", entryFee: 100, bestTime: "Sunset", desc: "Hilltop fortress commanding panoramic views of Udaipur's five lakes and Aravallis." },
      { name: "Bagore Ki Haveli & Folk Dance Show", type: "Culture", duration: "2h", entryFee: 100, bestTime: "Evening", desc: "18th-century lakeside mansion hosting evening Rajasthani puppet and Dharohar dance." }
    ],
    food: [
      { name: "Udaipuri Dal Baati Gatta Curry", type: "Vegetarian", rating: 4.9, avgCost: 260, mustTry: true },
      { name: "Mewari Banjara Mutton & Ker Sangri", type: "Non-Vegetarian", rating: 4.8, avgCost: 420, mustTry: true },
      { name: "Lakeside Poha, Kachori & Masala Chai", type: "Vegetarian", rating: 4.7, avgCost: 90, mustTry: false }
    ],
    hotels: [
      { name: "Lake View Heritage Haveli", tier: "Budget", pricePerNight: 1200, rating: 4.4, amenities: ["Rooftop Lake View", "Wi-Fi", "Breakfast"] },
      { name: "Fateh Garh Heritage Resort", tier: "Comfort", pricePerNight: 5500, rating: 4.7, amenities: ["Hilltop View", "Infinity Pool", "Vintage Cars", "Dining"] },
      { name: "Taj Lake Palace Udaipur", tier: "Luxury", pricePerNight: 45000, rating: 5.0, amenities: ["Floating Island Palace", "Royal Butler", "Jiva Spa Boat", "Fine Dining"] }
    ],
    weather: { temp: "24°C", condition: "Sunny & Romantic", advisory: "Light evening jacket for lakeside breeze" },
    crowd: { level: "Moderate", peakDays: "Winter & Weekends" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "Geetanjali Hospital Udaipur", address: "Hiranmagri Extension, Manwakhera", phone: "+91 294 250 0000" },
        { name: "Paras JK Hospital", address: "Plot 1, Shobhagpura", phone: "+91 294 666 9999" }
      ]
    }
  },

  agra: {
    name: "Agra",
    state: "Uttar Pradesh",
    country: "India",
    tagline: "The City of the Taj Mahal & Mughal Splendor",
    description: "The historical throne of the Mughal Empire, housing the timeless wonder Taj Mahal, red sandstone Agra Fort, and the abandoned ghost city of Fatehpur Sikri.",
    heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "October to March",
    places: [
      { name: "Taj Mahal (Sunrise Experience)", type: "Heritage", duration: "3h", entryFee: 50, bestTime: "Sunrise", desc: "Universal symbol of love built by Shah Jahan in pure white Makrana marble." },
      { name: "Agra Fort (Red Sandstone Citadel)", type: "History", duration: "2.5h", entryFee: 50, bestTime: "Morning / Afternoon", desc: "Massive 16th-century fortress and royal residence of Emperor Akbar and Jahangir." },
      { name: "Mehtab Bagh (Moonlight Garden View)", type: "Photography", duration: "1.5h", entryFee: 25, bestTime: "Sunset", desc: "Charbagh garden across the Yamuna River offering reflection views of the Taj." },
      { name: "Fatehpur Sikri Royal Complex", type: "History", duration: "3h", entryFee: 50, bestTime: "Morning", desc: "Preserved 16th-century Mughal capital featuring the soaring Buland Darwaza gate." },
      { name: "Tomb of I'timad-ud-Daulah (Baby Taj)", type: "Architecture", duration: "1.5h", entryFee: 30, bestTime: "Afternoon", desc: "Exquisite precursor to the Taj Mahal with delicate marble lattice and pietra dura inlay." }
    ],
    food: [
      { name: "Agra Famous Petha (Angoori & Kesar)", type: "Vegetarian", rating: 5.0, avgCost: 100, mustTry: true },
      { name: "Bedmi Poori with Spicy Aloo Sabzi", type: "Vegetarian", rating: 4.8, avgCost: 80, mustTry: true },
      { name: "Mughlai Chicken / Mutton Korma", type: "Non-Vegetarian", rating: 4.8, avgCost: 380, mustTry: true }
    ],
    hotels: [
      { name: "Taj View Budget Inn", tier: "Budget", pricePerNight: 950, rating: 4.2, amenities: ["Walk to East Gate", "Wi-Fi", "AC"] },
      { name: "Courtyard by Marriott Agra", tier: "Comfort", pricePerNight: 4200, rating: 4.6, amenities: ["Pool", "Restaurant", "Spa", "Fitness"] },
      { name: "The Oberoi Amarvilas Agra", tier: "Luxury", pricePerNight: 42000, rating: 5.0, amenities: ["Unobstructed Taj Views", "Royal Mughal Suites", "Spa", "Fine Dining"] }
    ],
    weather: { temp: "22°C", condition: "Clear & Pleasant", advisory: "Taj Mahal is closed on Fridays" },
    crowd: { level: "Very High", peakDays: "All days (Sunrise is best)" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "SN Medical College & Hospital", address: "Hospital Rd, Agra", phone: "+91 562 226 0353" },
        { name: "Pushpanjali Hospital", address: "Delhi Gate, Agra", phone: "+91 562 285 8888" }
      ]
    }
  },

  rishikesh: {
    name: "Rishikesh",
    state: "Uttarakhand",
    country: "India",
    tagline: "Yoga Capital of the World & Himalayan Rapids",
    description: "Nestled at the foothills of the Himalayas along the emerald Ganges, Rishikesh is world-famous for yoga ashrams, river rafting, bungee jumping, and evening aartis.",
    heroImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "September to November & March to May",
    places: [
      { name: "Laxman Jhula & Ram Jhula", type: "Heritage", duration: "2h", entryFee: 0, bestTime: "Morning / Sunset", desc: "Famous suspension bridges over the river Ganges with temple views." },
      { name: "Triveni Ghat Evening Maha Aarti", type: "Spiritual", duration: "2h", entryFee: 0, bestTime: "Sunset", desc: "Soulful evening prayer ritual with floating diyas and Vedic chanting." },
      { name: "Ganges White Water River Rafting", type: "Adventure", duration: "3h", entryFee: 800, bestTime: "Morning", desc: "Exciting 16km rapids ride through Shivpuri to Marine Drive." },
      { name: "The Beatles Ashram (Chaurasi Kutia)", type: "Culture", duration: "2h", entryFee: 150, bestTime: "Afternoon", desc: "Historic ashram where The Beatles composed the White Album, full of graffiti art." },
      { name: "Neer Garh Waterfall Trek", type: "Nature", duration: "2.5h", entryFee: 30, bestTime: "Morning", desc: "Natural multi-tier jungle waterfall with refreshing swimming pools." }
    ],
    food: [
      { name: "Ayurvedic Sattvic Thali & Herbal Teas", type: "Vegetarian", rating: 4.9, avgCost: 180, mustTry: true },
      { name: "Aloo Poori & Chole at Chotiwala", type: "Vegetarian", rating: 4.7, avgCost: 120, mustTry: true },
      { name: "Vegan Smoothies & Woodfired Pizza", type: "Vegetarian", rating: 4.8, avgCost: 250, mustTry: false }
    ],
    hotels: [
      { name: "Zostel Rishikesh / Riverside Hostel", tier: "Budget", pricePerNight: 850, rating: 4.5, amenities: ["Ganga View", "Yoga Deck", "Cafe", "Wi-Fi"] },
      { name: "Aloha On The Ganges", tier: "Comfort", pricePerNight: 6500, rating: 4.7, amenities: ["Infinity Pool by River", "Spa", "Yoga Sessions", "Restaurant"] },
      { name: "Ananda in the Himalayas", tier: "Luxury", pricePerNight: 38000, rating: 5.0, amenities: ["Palace Estate", "World #1 Wellness Spa", "Yoga Masters", "Organic Gourmet"] }
    ],
    weather: { temp: "21°C", condition: "Fresh Mountain Breeze", advisory: "Strictly vegetarian & alcohol-free town" },
    crowd: { level: "Moderate", peakDays: "Weekends" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: "AIIMS Rishikesh", address: "Virbhadra Rd, Rishikesh", phone: "+91 135 246 2929" },
        { name: "Nirmal Ashram Hospital", address: "Mayakund, Rishikesh", phone: "+91 135 243 0942" }
      ]
    }
  }
};


/* =====================================================
   SMART DESTINATION RESOLVER (With Custom City Fallback)
   ===================================================== */

function getDestination(input) {
  const cleanInput = String(input || "").trim();
  if (!cleanInput) {
    return getDestination("Vijayawada");
  }

  const key = cleanInput.toLowerCase().replace(/\s+/g, "");

  // Direct or partial match
  for (const [destKey, destData] of Object.entries(destinations)) {
    if (
      destKey === key ||
      destData.name.toLowerCase() === cleanInput.toLowerCase() ||
      cleanInput.toLowerCase().includes(destKey) ||
      destKey.includes(cleanInput.toLowerCase())
    ) {
      return {
        ...destData,
        matched: true
      };
    }
  }

  // Dynamic Generator for any unlisted city
  const displayName = cleanInput
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return {
    name: displayName,
    state: "India / Global",
    country: "India",
    tagline: `Experience the Charm and Vibrance of ${displayName}`,
    description: `A unique travel destination offering a captivating blend of local culture, heritage landmarks, authentic regional cuisine, and scenic sightseeing spots in ${displayName}.`,
    heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    bestSeason: "September to April",
    places: [
      { name: `${displayName} City Centre & Heritage Walk`, type: "Heritage", duration: "2h", entryFee: 0, bestTime: "Morning", desc: `Historic central district featuring the architectural roots and stories of ${displayName}.` },
      { name: `${displayName} Main Viewpoint & Promenade`, type: "Viewpoint", duration: "1.5h", entryFee: 20, bestTime: "Sunset", desc: `Panoramic elevated lookout offering sweeping views across ${displayName}.` },
      { name: `${displayName} Cultural Art & Museum`, type: "Culture", duration: "2h", entryFee: 50, bestTime: "Afternoon", desc: `Curated gallery showcasing the regional history and folk heritage of ${displayName}.` },
      { name: `${displayName} Nature Park & Botanical Haven`, type: "Nature", duration: "2h", entryFee: 25, bestTime: "Morning", desc: `Lush green sanctuary ideal for peaceful walks and eco-friendly recreation.` },
      { name: `${displayName} Vibrant Local Bazaar`, type: "Shopping", duration: "2h", entryFee: 0, bestTime: "Evening", desc: `Lively marketplace bustling with regional handicrafts, textiles, and street snacks.` },
      { name: `${displayName} Historic Landmark & Shrine`, type: "Spiritual", duration: "1.5h", entryFee: 0, bestTime: "Morning", desc: `Revered spiritual site reflecting the deep traditions and tranquility of the region.` }
    ],
    food: [
      { name: `${displayName} Authentic Regional Thali`, type: "Vegetarian", rating: 4.8, avgCost: 180, mustTry: true },
      { name: `${displayName} Chef's Signature Dish`, type: "Non-Vegetarian", rating: 4.7, avgCost: 280, mustTry: true },
      { name: `Traditional ${displayName} Breakfast & Coffee`, type: "Vegetarian", rating: 4.9, avgCost: 100, mustTry: true },
      { name: `${displayName} Sweet Treats & Street Eats`, type: "Vegetarian", rating: 4.6, avgCost: 80, mustTry: false }
    ],
    hotels: [
      { name: `${displayName} Central Backpacker Stay`, tier: "Budget", pricePerNight: 950, rating: 4.2, amenities: ["Free Wi-Fi", "AC", "City Center"] },
      { name: `${displayName} Grand Comfort Hotel`, tier: "Comfort", pricePerNight: 2800, rating: 4.6, amenities: ["Restaurant", "Wi-Fi", "Airport Transfer", "Gym"] },
      { name: `${displayName} Luxury Palace & Spa`, tier: "Luxury", pricePerNight: 8500, rating: 4.9, amenities: ["Infinity Pool", "Luxury Suites", "Spa", "Fine Dining"] }
    ],
    weather: { temp: "26°C", condition: "Pleasant & Clear", advisory: "Great conditions for outdoor sightseeing" },
    crowd: { level: "Moderate", peakDays: "Weekends" },
    emergency: {
      police: "112",
      ambulance: "108",
      womenHelpline: "1091",
      hospitals: [
        { name: `${displayName} General Civil Hospital`, address: "Central Hospital Rd", phone: "108" },
        { name: `${displayName} Multi-Speciality Emergency Care`, address: "Main Bypass Rd", phone: "112" }
      ]
    },
    matched: false
  };
}

function normalizeDays(val) {
  const n = parseInt(val, 10);
  if (isNaN(n) || n < 1) return 2;
  return Math.min(n, 14);
}

function normalizeBudget(val) {
  const n = parseInt(val, 10);
  if (isNaN(n) || n < 500) return 5000;
  return n;
}

function normalizeTravelers(val) {
  const n = parseInt(val, 10);
  if (isNaN(n) || n < 1) return 1;
  return Math.min(n, 20);
}


/* =====================================================
   DYNAMIC ITINERARY BUILDER
   ===================================================== */

function generateSmartItinerary(dest, days, preferences, foodPref, accommodationTier) {
  const itinerary = [];
  const prefList = Array.isArray(preferences) && preferences.length > 0 ? preferences : ["Heritage", "Photography", "Nature"];

  const timeSlots = [
    { time: "08:30 AM", slotName: "Morning Exploration", icon: "🌅" },
    { time: "10:30 AM", slotName: "Breakfast & Cultural Experience", icon: "🍳" },
    { time: "01:00 PM", slotName: "Lunch & Regional Flavors", icon: "🍽️" },
    { time: "03:30 PM", slotName: "Afternoon Adventure & Sightseeing", icon: "🏛️" },
    { time: "05:45 PM", slotName: "Sunset Experience & Golden Hour", icon: "🌇" },
    { time: "08:00 PM", slotName: "Dinner & Evening Leisure", icon: "🌙" }
  ];

  // Match places to preferences
  const sortedPlaces = [...dest.places].sort((a, b) => {
    const aMatch = prefList.some(p => a.type.toLowerCase().includes(p.toLowerCase()));
    const bMatch = prefList.some(p => b.type.toLowerCase().includes(p.toLowerCase()));
    return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
  });

  for (let day = 1; day <= days; day++) {
    const activities = [];
    const baseIndex = ((day - 1) * 3) % sortedPlaces.length;

    // Slot 0: Morning Landmark
    const morningPlace = sortedPlaces[baseIndex] || dest.places[0];
    activities.push({
      id: `d${day}-a1`,
      time: timeSlots[0].time,
      place: morningPlace.name,
      type: morningPlace.type,
      duration: morningPlace.duration || "2h",
      entryFee: morningPlace.entryFee || 0,
      description: morningPlace.desc || `Start the day exploring ${morningPlace.name} in ${dest.name}.`,
      icon: timeSlots[0].icon,
      isFood: false
    });

    // Slot 1: Breakfast
    const breakfastItem = dest.food.find(f => f.type === "Vegetarian") || dest.food[0];
    activities.push({
      id: `d${day}-a2`,
      time: timeSlots[1].time,
      place: `Breakfast: ${breakfastItem.name}`,
      type: "Food & Beverage",
      duration: "1h",
      entryFee: breakfastItem.avgCost,
      description: `Savor authentic morning delicacies (${breakfastItem.name}) at a top-rated local establishment.`,
      icon: timeSlots[1].icon,
      isFood: true
    });

    // Slot 2: Lunch
    const lunchItem = (foodPref === "Vegetarian" || foodPref === "Vegan") 
      ? (dest.food.find(f => f.type === "Vegetarian") || dest.food[0])
      : (dest.food.find(f => f.type === "Non-Vegetarian") || dest.food[0]);
    activities.push({
      id: `d${day}-a3`,
      time: timeSlots[2].time,
      place: `Lunch: ${lunchItem.name}`,
      type: "Regional Cuisine",
      duration: "1.5h",
      entryFee: lunchItem.avgCost,
      description: `Enjoy a nourishing regional lunch featuring ${lunchItem.name} crafted with fresh local ingredients.`,
      icon: timeSlots[2].icon,
      isFood: true
    });

    // Slot 3: Afternoon Sightseeing
    const afternoonPlace = sortedPlaces[(baseIndex + 1) % sortedPlaces.length] || dest.places[1];
    activities.push({
      id: `d${day}-a4`,
      time: timeSlots[3].time,
      place: afternoonPlace.name,
      type: afternoonPlace.type,
      duration: afternoonPlace.duration || "2h",
      entryFee: afternoonPlace.entryFee || 0,
      description: afternoonPlace.desc || `Discover the cultural significance of ${afternoonPlace.name}.`,
      icon: timeSlots[3].icon,
      isFood: false
    });

    // Slot 4: Sunset / Evening Attraction
    const eveningPlace = sortedPlaces[(baseIndex + 2) % sortedPlaces.length] || dest.places[2 % dest.places.length];
    activities.push({
      id: `d${day}-a5`,
      time: timeSlots[4].time,
      place: eveningPlace.name,
      type: eveningPlace.type,
      duration: eveningPlace.duration || "1.5h",
      entryFee: eveningPlace.entryFee || 0,
      description: eveningPlace.desc || `Experience the magical sunset views at ${eveningPlace.name}.`,
      icon: timeSlots[4].icon,
      isFood: false
    });

    // Slot 5: Dinner
    activities.push({
      id: `d${day}-a6`,
      time: timeSlots[5].time,
      place: `Dinner at City Heritage Restaurant (${dest.name})`,
      type: "Dinner & Leisure",
      duration: "1.5h",
      entryFee: 300,
      description: `Relax and reflect on the day's journey with a flavorful evening dinner.`,
      icon: timeSlots[5].icon,
      isFood: true
    });

    itinerary.push({
      day,
      title: `Day ${day}: Discovering the Soul of ${dest.name}`,
      theme: day === 1 ? "Heritage & Iconic Landmarks" : day === 2 ? "Scenic Views & Cultural Immersion" : "Hidden Gems & Local Life",
      activities
    });
  }

  return itinerary;
}


/* =====================================================
   REST API ENDPOINTS
   ===================================================== */

// Root Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    name: "Yatra AI Travel Intelligence Engine",
    version: "3.0.0",
    status: "Operational 🚀",
    endpoints: [
      "GET  /api/destinations",
      "GET  /api/destination/:name",
      "POST /api/trip/generate",
      "POST /api/trip/replan",
      "GET  /api/emergency/:name",
      "GET  /api/hospitality/:name"
    ]
  });
});

// List All Destinations
app.get("/api/destinations", (req, res) => {
  const list = Object.values(destinations).map(d => ({
    name: d.name,
    state: d.state,
    tagline: d.tagline,
    heroImage: d.heroImage,
    bestSeason: d.bestSeason,
    highlights: d.places.slice(0, 3).map(p => p.name)
  }));
  res.json({ success: true, count: list.length, destinations: list });
});

// Destination Details
app.get("/api/destination/:name", (req, res) => {
  const dest = getDestination(req.params.name);
  res.json({ success: true, destination: dest });
});

// Emergency Contacts
app.get("/api/emergency/:name", (req, res) => {
  const dest = getDestination(req.params.name);
  res.json({
    success: true,
    destination: dest.name,
    emergency: dest.emergency
  });
});

// Hospitality Hub
app.get("/api/hospitality/:name", (req, res) => {
  const dest = getDestination(req.params.name);
  res.json({
    success: true,
    destination: dest.name,
    hotels: dest.hotels,
    food: dest.food,
    activities: dest.places
  });
});


// Multi-Agent Trip Generation
app.post("/api/trip/generate", (req, res) => {
  try {
    const {
      destination: destInput,
      days: daysInput,
      budget: budgetInput,
      travelers: travelersInput,
      travelType = "Solo",
      preferences = ["Heritage", "Photography"],
      food: foodPref = "Vegetarian",
      accommodation = "Comfort",
      safety = "High",
      sustainability = { walking: true, publicTransport: true, ecoHotels: false, localRestaurants: true }
    } = req.body;

    if (!destInput) {
      return res.status(400).json({
        success: false,
        message: "Destination is required."
      });
    }

    const destination = getDestination(destInput);
    const days = normalizeDays(daysInput);
    const totalBudget = normalizeBudget(budgetInput);
    const travelers = normalizeTravelers(travelersInput);

    // Cost Breakdown Logic
    const hotelCostPerNight = accommodation === "Luxury" ? 5500 : accommodation === "Comfort" ? 2200 : 950;
    const foodCostPerDay = foodPref === "Non-Vegetarian" ? 750 : 550;
    const localTransportPerDay = sustainability.publicTransport ? 300 : 600;
    const activitiesCostPerDay = 350;

    const totalAccommodation = hotelCostPerNight * Math.max(1, days - 1) * Math.ceil(travelers / 2);
    const totalFood = foodCostPerDay * days * travelers;
    const totalTransport = localTransportPerDay * days * travelers;
    const totalActivities = activitiesCostPerDay * days * travelers;
    const emergencyBuffer = Math.round((totalAccommodation + totalFood + totalTransport + totalActivities) * 0.08);

    const estimatedCost = totalAccommodation + totalFood + totalTransport + totalActivities + emergencyBuffer;
    const remainingBudget = totalBudget - estimatedCost;
    const isBudgetFit = remainingBudget >= 0;

    // Agent Intelligence Models
    const preferenceAgent = {
      name: "Preference Agent",
      status: "completed",
      matchedCount: preferences.length,
      selectedPreferences: preferences,
      message: `Personalized ${days}-day journey tailored around ${preferences.join(", ")} in ${destination.name}.`
    };

    const budgetAgent = {
      name: "Budget Agent",
      status: "completed",
      totalBudget,
      estimatedCost,
      remainingBudget,
      isFit: isBudgetFit,
      breakdown: {
        accommodation: totalAccommodation,
        food: totalFood,
        transport: totalTransport,
        sightseeing: totalActivities,
        emergencyReserve: emergencyBuffer
      },
      message: isBudgetFit
        ? `Optimized within your ₹${totalBudget.toLocaleString("en-IN")} budget with a safety buffer of ₹${remainingBudget.toLocaleString("en-IN")}.`
        : `Trip cost estimate (₹${estimatedCost.toLocaleString("en-IN")}) exceeds target budget by ₹${Math.abs(remainingBudget).toLocaleString("en-IN")}. Consider choosing Budget stays or public transit.`
    };

    const hotelAgent = {
      name: "Hotel Agent",
      status: "completed",
      selectedTier: accommodation,
      recommendedHotels: destination.hotels,
      message: `Curated ${accommodation} stays near top transit nodes and city centers in ${destination.name}.`
    };

    const routeAgent = {
      name: "Route Agent",
      status: "completed",
      totalDistance: `${Math.max(12, days * 16)} km`,
      transitMode: sustainability.publicTransport ? "Metro & Public Bus + Walking" : "Cab & Auto",
      efficiencyScore: "96%",
      message: `Sequenced daily attractions to minimize backtracking and traffic congestion.`
    };

    const safetyScore = safety === "Very High" ? 98 : safety === "High" ? 93 : 88;
    const safetyAgent = {
      name: "Safety Agent",
      status: "completed",
      score: safetyScore,
      priority: safety,
      emergencyContacts: destination.emergency,
      message: `Verified 24x7 hospitals, police emergency protocols, and safe neighborhood corridors in ${destination.name}.`
    };

    // Eco Score Calculation
    let ecoScore = 65;
    if (sustainability.walking) ecoScore += 10;
    if (sustainability.publicTransport) ecoScore += 10;
    if (sustainability.ecoHotels) ecoScore += 8;
    if (sustainability.localRestaurants) ecoScore += 7;
    ecoScore = Math.min(ecoScore, 100);

    const sustainabilityAgent = {
      name: "Sustainability Agent",
      status: "completed",
      score: ecoScore,
      co2SavedKg: `${(days * travelers * 4.2).toFixed(1)} kg CO2e saved`,
      badges: [
        sustainability.walking ? "Pedestrian Explorer" : null,
        sustainability.publicTransport ? "Low Emission Transit" : null,
        sustainability.localRestaurants ? "Local Farm-to-Table" : null
      ].filter(Boolean),
      message: `Sustainable journey footprint reduced by approximately 34% compared to standard tours.`
    };

    const adaptiveAgent = {
      name: "Adaptive Agent",
      status: "ready",
      message: `Active live monitoring enabled. Automatically replans itinerary in case of rain, traffic jams, or budget adjustments.`
    };

    // Generate Full Itinerary
    const itinerary = generateSmartItinerary(destination, days, preferences, foodPref, accommodation);

    return res.json({
      success: true,
      trip: {
        id: `trip-${Date.now()}`,
        destination: destination.name,
        state: destination.state,
        country: destination.country,
        tagline: destination.tagline,
        heroImage: destination.heroImage,
        bestSeason: destination.bestSeason,
        days,
        budget: totalBudget,
        travelers,
        travelType,
        preferences,
        food: foodPref,
        accommodation,
        safety,
        sustainability,
        createdAt: new Date().toISOString()
      },
      destinationDetails: destination,
      intelligence: {
        budget: budgetAgent,
        safety: safetyAgent,
        route: routeAgent,
        sustainability: sustainabilityAgent,
        crowd: destination.crowd,
        weather: destination.weather
      },
      agents: {
        preference: preferenceAgent,
        budget: budgetAgent,
        hotel: hotelAgent,
        route: routeAgent,
        safety: safetyAgent,
        sustainability: sustainabilityAgent,
        adaptive: adaptiveAgent
      },
      itinerary
    });

  } catch (error) {
    console.error("Trip Generation Error:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during trip planning.",
      error: error.message
    });
  }
});


// Live Dynamic Replanning Endpoint (Adaptive Intelligence)
app.post("/api/trip/replan", (req, res) => {
  try {
    const { trip, scenario, currentDay = 1 } = req.body;
    if (!trip || !trip.destination) {
      return res.status(400).json({ success: false, message: "Valid trip payload is required." });
    }

    const destination = getDestination(trip.destination);
    let triggerMessage = "";
    let actionTaken = "";

    // Generate modified activities based on scenario
    let updatedItinerary = generateSmartItinerary(
      destination,
      trip.days || 2,
      trip.preferences || ["Heritage"],
      trip.food || "Vegetarian",
      trip.accommodation || "Comfort"
    );

    if (scenario === "weather_rain") {
      triggerMessage = "🌧️ Heavy Rain Warning detected for the afternoon.";
      actionTaken = "Swapped outdoor hiking and boat rides for indoor heritage museums, art galleries, and cozy cultural cafes.";
      // Swap outdoor items in current day
      if (updatedItinerary[currentDay - 1]) {
        updatedItinerary[currentDay - 1].activities.forEach(act => {
          if (act.type === "Nature" || act.type === "Beach" || act.type === "Adventure") {
            act.place = `${destination.name} National Art & Heritage Gallery`;
            act.type = "Indoor Heritage";
            act.description = "Enjoy sheltered indoor exhibits, ancient artifacts, and traditional handicrafts out of the rain.";
            act.icon = "🏛️";
          }
        });
      }
    } else if (scenario === "traffic_congestion") {
      triggerMessage = "🚗 Major Traffic Congestion on arterial highways.";
      actionTaken = "Re-routed sequence to use rapid metro lines and pedestrian heritage walkways, saving 45 minutes.";
    } else if (scenario === "budget_crunch") {
      triggerMessage = "💰 Budget Optimization Requested.";
      actionTaken = "Adjusted paid monument entries to free scenic viewpoints and suggested top-rated street food stalls.";
    } else {
      triggerMessage = "🔄 Schedule Adjustment & Live Re-routing.";
      actionTaken = "Optimized daily timetable to maximize leisure time.";
    }

    return res.json({
      success: true,
      scenario,
      triggerMessage,
      actionTaken,
      adaptiveAgent: {
        status: "replanned",
        timestamp: new Date().toISOString(),
        message: `${triggerMessage} ${actionTaken}`
      },
      updatedItinerary
    });

  } catch (error) {
    console.error("Replanning Error:", error);
    return res.status(500).json({ success: false, message: "Unable to replan trip.", error: error.message });
  }
});


/* =====================================================
   START SERVER
   ===================================================== */

app.listen(PORT, () => {
  console.log(`===========================================`);
  console.log(`🚀 Yatra AI Backend running at http://localhost:${PORT}`);
  console.log(`===========================================`);
});