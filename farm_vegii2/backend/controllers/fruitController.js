const Fruit = require("../models/Fruit");

// Provide default fruits/vegetables so first-time users see 10 cards immediately.
const defaultFruits = [
  {
    name: "Alphonso Mango",
    image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=900&q=80",
    price: 180,
    quantity: 45,
    origin: "Malappuram, Kerala",
    category: "fruit",
    farmerName: "Aneesh K",
  },
  {
    name: "Banana Nendran",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=80",
    price: 60,
    quantity: 80,
    origin: "Kozhikode, Kerala",
    category: "fruit",
    farmerName: "Faisal P",
  },
  {
    name: "Papaya",
    image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=900&q=80",
    price: 55,
    quantity: 35,
    origin: "Wayanad, Kerala",
    category: "fruit",
    farmerName: "Binu V",
  },
  {
    name: "Guava",
    image: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?auto=format&fit=crop&w=900&q=80",
    price: 70,
    quantity: 29,
    origin: "Kannur, Kerala",
    category: "fruit",
    farmerName: "Roshan M",
  },
  {
    name: "Dragon Fruit",
    image: "https://images.unsplash.com/photo-1528821128474-25f373fb4442?auto=format&fit=crop&w=900&q=80",
    price: 240,
    quantity: 18,
    origin: "Palakkad, Kerala",
    category: "fruit",
    farmerName: "Dhanya C",
  },
  {
    name: "Tomato",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80",
    price: 40,
    quantity: 120,
    origin: "Thrissur, Kerala",
    category: "vegetable",
    farmerName: "Sijith R",
  },
  {
    name: "Carrot",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=900&q=80",
    price: 65,
    quantity: 54,
    origin: "Idukki, Kerala",
    category: "vegetable",
    farmerName: "Nisha K",
  },
  {
    name: "Cucumber",
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=900&q=80",
    price: 30,
    quantity: 100,
    origin: "Kottayam, Kerala",
    category: "vegetable",
    farmerName: "Rafeeq T",
  },
  {
    name: "Spinach",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80",
    price: 28,
    quantity: 75,
    origin: "Ernakulam, Kerala",
    category: "vegetable",
    farmerName: "Shilpa S",
  },
  {
    name: "Pumpkin",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80",
    price: 50,
    quantity: 26,
    origin: "Kasaragod, Kerala",
    category: "vegetable",
    farmerName: "Navaf A",
  },
];

// Seed fruits only if the collection is empty.
const ensureSeedFruits = async () => {
  const count = await Fruit.countDocuments();

  if (count === 0) {
    await Fruit.insertMany(defaultFruits);
    console.log("Default fruit data inserted");
  }
};

// Get all fruits/vegetables to show in the cards section.
const getFruits = async (req, res) => {
  try {
    const fruits = await Fruit.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: fruits.length,
      fruits,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch fruits",
      error: error.message,
    });
  }
};

module.exports = {
  getFruits,
  ensureSeedFruits,
};
