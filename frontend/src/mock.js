// Mock data for Hibiscus Wellbeing Website

export const recipes = [
  {
    id: '1',
    name: 'Calming Hibiscus Chamomile Blend',
    category: 'Stress Relief',
    ailments: ['stress relief', 'anxiety'],
    ingredients: [
      '2 tsp dried hibiscus flowers',
      '1 tsp chamomile flowers',
      '1/2 tsp lavender buds',
      '1 tsp honey (optional)',
      '2 cups hot water'
    ],
    instructions: [
      'Boil water and let it cool slightly to 200°F',
      'Add hibiscus, chamomile, and lavender to a teapot',
      'Pour hot water over the herbs',
      'Steep for 5-7 minutes',
      'Strain and add honey if desired',
      'Enjoy warm before bedtime'
    ],
    benefits: 'Reduces stress and anxiety, promotes relaxation, improves sleep quality',
    prepTime: '10 minutes',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800'
  },
  {
    id: '2',
    name: 'Immune Boost Hibiscus Ginger Tea',
    category: 'Immunity Boost',
    ailments: ['immunity boost', 'cold', 'flu'],
    ingredients: [
      '2 tsp dried hibiscus flowers',
      '1 inch fresh ginger, sliced',
      '1/2 tsp turmeric powder',
      '1 cinnamon stick',
      '1 tbsp lemon juice',
      '2 cups hot water'
    ],
    instructions: [
      'Bring water to a boil with ginger and cinnamon',
      'Remove from heat and add hibiscus and turmeric',
      'Steep for 8-10 minutes',
      'Strain into a cup',
      'Add fresh lemon juice',
      'Drink 2-3 times daily during cold season'
    ],
    benefits: 'Strengthens immune system, anti-inflammatory properties, rich in vitamin C',
    prepTime: '15 minutes',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800'
  },
  {
    id: '3',
    name: 'Digestive Comfort Hibiscus Mint',
    category: 'Digestive Health',
    ailments: ['digestive health', 'bloating', 'indigestion'],
    ingredients: [
      '2 tsp dried hibiscus flowers',
      '1 tbsp fresh mint leaves',
      '1/2 tsp fennel seeds',
      '1/2 tsp dried rosemary',
      '2 cups hot water'
    ],
    instructions: [
      'Crush fennel seeds lightly',
      'Add all herbs to a teapot',
      'Pour hot water over the mixture',
      'Steep for 6-8 minutes',
      'Strain and serve',
      'Drink after meals for best results'
    ],
    benefits: 'Aids digestion, reduces bloating, soothes stomach discomfort',
    prepTime: '10 minutes',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800'
  },
  {
    id: '4',
    name: 'Heart Health Hibiscus Rose Tea',
    category: 'Heart Health',
    ailments: ['heart health', 'blood pressure', 'cholesterol'],
    ingredients: [
      '2 tsp dried hibiscus flowers',
      '1 tsp dried rose petals',
      '1/2 tsp hawthorn berries',
      '1 tsp green tea leaves',
      '2 cups hot water'
    ],
    instructions: [
      'Heat water to 175°F',
      'Combine all ingredients in a teapot',
      'Pour water over the blend',
      'Steep for 5 minutes',
      'Strain and enjoy',
      'Drink 2 cups daily for heart health'
    ],
    benefits: 'Supports cardiovascular health, helps regulate blood pressure, antioxidant-rich',
    prepTime: '10 minutes',
    image: 'https://images.unsplash.com/photo-1597318122398-7a59e8abe957?w=800'
  },
  {
    id: '5',
    name: 'Sweet Dreams Hibiscus Valerian',
    category: 'Sleep Aid',
    ailments: ['sleep aid', 'insomnia'],
    ingredients: [
      '2 tsp dried hibiscus flowers',
      '1 tsp valerian root',
      '1 tsp passionflower',
      '1/2 tsp lemon balm',
      '2 cups hot water'
    ],
    instructions: [
      'Boil water and let cool to 200°F',
      'Add all herbs to a covered teapot',
      'Steep for 10 minutes',
      'Strain thoroughly',
      'Drink 30-60 minutes before bedtime',
      'Create a calming bedtime ritual'
    ],
    benefits: 'Promotes deep sleep, reduces insomnia, calms nervous system',
    prepTime: '15 minutes',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800'
  },
  {
    id: '6',
    name: 'Energy Revival Hibiscus Citrus',
    category: 'Immunity Boost',
    ailments: ['immunity boost', 'energy', 'fatigue'],
    ingredients: [
      '2 tsp dried hibiscus flowers',
      '1 tsp dried orange peel',
      '1/2 tsp lemongrass',
      '1/4 tsp cayenne pepper',
      '2 cups hot water'
    ],
    instructions: [
      'Combine all ingredients in teapot',
      'Pour boiling water over the blend',
      'Steep for 7 minutes',
      'Strain into cup',
      'Enjoy hot in the morning',
      'Can be served over ice for refreshing version'
    ],
    benefits: 'Boosts energy naturally, rich in antioxidants, metabolism support',
    prepTime: '10 minutes',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800'
  }
];

export const products = [
  {
    id: 'p1',
    name: 'Organic Hibiscus Flowers',
    category: 'Dried Herbs',
    price: 14.99,
    description: 'Premium organic dried hibiscus flowers, hand-selected for quality and flavor',
    weight: '100g',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800',
    inStock: true
  },
  {
    id: 'p2',
    name: 'Stress Relief Blend',
    category: 'Tea Blends',
    price: 18.99,
    description: 'Pre-mixed blend of hibiscus, chamomile, and lavender for ultimate relaxation',
    weight: '75g',
    image: 'https://images.unsplash.com/photo-1597318122398-7a59e8abe957?w=800',
    inStock: true
  },
  {
    id: 'p3',
    name: 'Immunity Boost Bundle',
    category: 'Tea Blends',
    price: 24.99,
    description: 'Complete blend with hibiscus, ginger, turmeric, and citrus for immune support',
    weight: '100g',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800',
    inStock: true
  },
  {
    id: 'p4',
    name: 'Heart Health Tea Collection',
    category: 'Tea Blends',
    price: 29.99,
    description: 'Specially formulated blend for cardiovascular wellness',
    weight: '120g',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800',
    inStock: true
  },
  {
    id: 'p5',
    name: 'Glass Tea Infuser',
    category: 'Accessories',
    price: 12.99,
    description: 'Premium borosilicate glass infuser bottle for brewing on-the-go',
    weight: '300ml',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800',
    inStock: true
  },
  {
    id: 'p6',
    name: 'Ceramic Tea Set',
    category: 'Accessories',
    price: 45.99,
    description: 'Handcrafted ceramic teapot and cup set, perfect for tea ceremonies',
    weight: '4-piece set',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800',
    inStock: true
  }
];

export const blogPosts = [
  {
    id: 'b1',
    title: 'The Ancient History of Hibiscus in Traditional Medicine',
    excerpt: 'Discover how hibiscus has been used for centuries across different cultures for healing and wellness.',
    category: 'History',
    author: 'Dr. Sarah Chen',
    date: '2025-01-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1597318122398-7a59e8abe957?w=800'
  },
  {
    id: 'b2',
    title: 'Scientific Benefits of Hibiscus for Heart Health',
    excerpt: 'Recent studies show promising results for hibiscus tea in supporting cardiovascular wellness.',
    category: 'Health',
    author: 'Dr. Michael Roberts',
    date: '2025-01-10',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800'
  },
  {
    id: 'b3',
    title: 'How to Grow Your Own Hibiscus Plant at Home',
    excerpt: 'A complete guide to cultivating hibiscus in your garden or indoor space.',
    category: 'Gardening',
    author: 'Emma Thompson',
    date: '2025-01-05',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800'
  },
  {
    id: 'b4',
    title: 'Hibiscus Tea vs. Coffee: A Healthier Morning Ritual',
    excerpt: 'Exploring the benefits of switching your morning routine to hibiscus-based beverages.',
    category: 'Lifestyle',
    author: 'James Wilson',
    date: '2024-12-28',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800'
  }
];

export const categories = [
  { id: 'digestive', name: 'Digestive Health', icon: '🌿' },
  { id: 'immunity', name: 'Immunity Boost', icon: '🛡️' },
  { id: 'sleep', name: 'Sleep Aid', icon: '🌙' },
  { id: 'stress', name: 'Stress Relief', icon: '☮️' },
  { id: 'heart', name: 'Heart Health', icon: '❤️' }
];

export const hibiscusBenefits = [
  {
    title: 'Rich in Antioxidants',
    description: 'Hibiscus is loaded with powerful antioxidants that may help prevent damage caused by free radicals.',
    icon: 'shield'
  },
  {
    title: 'Supports Heart Health',
    description: 'Studies suggest hibiscus tea may help lower blood pressure and support cardiovascular wellness.',
    icon: 'heart'
  },
  {
    title: 'Natural Vitamin C',
    description: 'High in vitamin C, hibiscus strengthens the immune system and promotes healthy skin.',
    icon: 'sparkles'
  },
  {
    title: 'Digestive Support',
    description: 'The natural compounds in hibiscus can aid digestion and support a healthy gut.',
    icon: 'leaf'
  },
  {
    title: 'Weight Management',
    description: 'May help with metabolism and support healthy weight management when combined with a balanced diet.',
    icon: 'activity'
  },
  {
    title: 'Anti-inflammatory',
    description: 'Contains compounds with anti-inflammatory properties that support overall wellness.',
    icon: 'zap'
  }
];