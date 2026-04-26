import mongoose from 'mongoose';
import User from './models/User.js';
import Product from './models/Product.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const products = [
  // Vegetables
  {
    name: 'Fresh Red Tomatoes',
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Juicy, vine-ripened red tomatoes perfect for salads, sauces, and sandwiches. Locally sourced from organic farms.',
    brand: 'FarmFresh',
    category: 'Vegetables',
    price: 45,
    stock: 50,
    unit: '1 kg',
    rating: 4.8,
  },
  {
    name: 'Organic Red Onions',
    image: 'https://images.pexels.com/photos/4197364/pexels-photo-4197364.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Crisp and pungent red onions, essential for everyday cooking. Adds great flavor to curries and stir-fries.',
    brand: 'NatureHarvest',
    category: 'Vegetables',
    price: 30,
    stock: 100,
    unit: '1 kg',
    rating: 4.5,
  },
  {
    name: 'Fresh Potatoes',
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Versatile, high-quality potatoes perfect for mashing, roasting, or frying. An absolute kitchen staple.',
    brand: 'EarthRoots',
    category: 'Vegetables',
    price: 25,
    stock: 200,
    unit: '1 kg',
    rating: 4.6,
  },
  {
    name: 'Crunchy Carrots',
    image: 'https://images.pexels.com/photos/6682607/pexels-photo-6682607.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sweet, healthy, and crunchy carrots. Excellent source of Vitamin A, great for snacking or cooking.',
    brand: 'NatureHarvest',
    category: 'Vegetables',
    price: 50,
    stock: 60,
    unit: '500 g',
    rating: 4.7,
  },
  // Fruits
  {
    name: 'Del Monte Bananas',
    image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sweet and nutritious yellow bananas, naturally ripened. Grab a bunch for a quick energy boost.',
    brand: 'Del Monte',
    category: 'Fruits',
    price: 60,
    stock: 40,
    unit: '1 Dozen',
    rating: 4.9,
  },
  {
    name: 'Kashmiri Apples',
    image: 'https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium quality red apples imported straight from the orchards. Crisp, sweet, and bursting with flavor.',
    brand: 'OrchardBest',
    category: 'Fruits',
    price: 180,
    stock: 25,
    unit: '1 kg',
    rating: 4.8,
  },
  {
    name: 'Green Seedless Grapes',
    image: 'https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sweet, juicy, and completely seedless green grapes. A refreshing, healthy snack for any time of the day.',
    brand: 'FruitVine',
    category: 'Fruits',
    price: 120,
    stock: 35,
    unit: '500 g',
    rating: 4.6,
  },
  {
    name: 'Fresh Pomegranate',
    image: 'https://images.pexels.com/photos/5609384/pexels-photo-5609384.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Packed with antioxidants, these hand-picked pomegranates offer juicy ruby-red arils.',
    brand: 'OrchardBest',
    category: 'Fruits',
    price: 150,
    stock: 40,
    unit: '1 kg',
    rating: 4.7,
  },
  // Dairy
  {
    name: 'Amul Full Cream Milk',
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Rich and creamy pure cow milk. Homogenized and pasteurized to give you the freshest taste every morning.',
    brand: 'Amul',
    category: 'Dairy',
    price: 33,
    stock: 80,
    unit: '500 ml',
    rating: 4.9,
  },
  {
    name: 'Farm Fresh Eggs',
    image: 'https://images.pexels.com/photos/162712/egg-white-food-healthy-162712.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'High-quality, antibiotic-free farm white eggs. Excellent source of daily protein.',
    brand: 'HealthyHens',
    category: 'Dairy',
    price: 75,
    stock: 50,
    unit: '6 Pieces',
    rating: 4.5,
  },
  {
    name: 'Amul Butter',
    image: 'https://images.pexels.com/photos/1966205/pexels-photo-1966205.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Utterly butterly delicious! The classic Amul butter that makes every bread slice taste heavenly.',
    brand: 'Amul',
    category: 'Dairy',
    price: 55,
    stock: 30,
    unit: '100 g',
    rating: 4.9,
  },
  // Bakery
  {
    name: 'Whole Wheat Bread',
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Freshly baked whole wheat bread loaf. Rich in fiber and perfect for a healthy breakfast sandwich.',
    brand: 'Britannia',
    category: 'Bakery',
    price: 50,
    stock: 20,
    unit: '400 g',
    rating: 4.4,
  },
  // Snacks
  {
    name: 'Choco Chip Cookies',
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Crumbly, buttery cookies loaded with rich chocolate chips. The perfect accompaniment to your evening tea.',
    brand: 'Sunfeast',
    category: 'Snacks',
    price: 80,
    stock: 60,
    unit: '200 g',
    rating: 4.7,
  },
  {
    name: 'Potato Chips - Salted',
    image: 'https://images.pexels.com/photos/5216398/pexels-photo-5216398.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Classic lightly salted crispy potato chips. Your go-to snack for movie nights and parties.',
    brand: 'Lays',
    category: 'Snacks',
    price: 20,
    stock: 120,
    unit: '50 g',
    rating: 4.5,
  },
  // Beverages
  {
    name: '100% Orange Juice',
    image: 'https://images.pexels.com/photos/158053/fresh-orange-juice-squeezed-refreshing-citrus-158053.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Pure, squeezed orange juice with no added sugar. Rich in Vitamin C and naturally sweet.',
    brand: 'Tropicana',
    category: 'Beverages',
    price: 110,
    stock: 35,
    unit: '1 L',
    rating: 4.8,
  },
  {
    name: 'Coca Cola Soft Drink',
    image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'The classic, refreshing, and fizzy cola drink. Served best when chilled.',
    brand: 'Coca Cola',
    category: 'Beverages',
    price: 40,
    stock: 150,
    unit: '750 ml',
    rating: 4.6,
  }
];

export const seedDatabase = async () => {
  try {
    // Only seed if not already seeded
    const productCount = await Product.countDocuments();
    if (productCount > 0) {
      console.log('Database already seeded with products.');
      return;
    }

    // Clear existing (failsafe if only partially seeded)
    await Product.deleteMany();
    await User.deleteMany();

    // Seed Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);
    
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      isAdmin: true,
    });

    console.log('Dummy admin user seeded: admin@example.com / 123456');

    // Seed Products
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} dummy products.`);

  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
