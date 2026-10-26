import type { GalleryImage } from "./galleryTypes";

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    title: "Grilled Salmon",
    description: "Fresh salmon with herbs, seasonal vegetables and lemon butter sauce.",
    imageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85",
    category: "FOOD",
    alt: "Grilled salmon served with fresh herbs",
    tags: ["salmon", "fish", "healthy", "lemon", "main course"],
  },
  {
    id: "2",
    title: "Restaurant Interior",
    description: "A cozy and elegant space for your special moments.",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85",
    category: "INTERIOR",
    alt: "Warmly lit restaurant dining room",
    tags: ["interior", "cozy", "romantic", "dining", "ambience"],
  },
  {
    id: "3",
    title: "Truffle Pasta",
    description: "Creamy pasta with black truffle and parmesan cheese.",
    imageUrl:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
    category: "FOOD",
    alt: "Fresh pasta served on a ceramic plate",
    tags: ["pasta", "truffle", "vegetarian", "creamy", "Italian"],
  },
  {
    id: "4",
    title: "Signature Cocktails",
    description: "Refreshing drinks crafted with premium ingredients.",
    imageUrl:
      "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=900&q=85",
    category: "DRINKS",
    alt: "Colourful cocktails served in elegant glasses",
    tags: ["cocktails", "drinks", "refreshing", "fruit", "bar"],
  },
  {
    id: "5",
    title: "Outdoor Seating",
    description: "Enjoy a relaxed meal in our beautiful dining area.",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85",
    category: "INTERIOR",
    alt: "Restaurant seating surrounded by greenery",
    tags: ["outdoor", "garden", "seating", "relaxing", "nature"],
  },
  {
    id: "6",
    title: "Chocolate Dessert",
    description: "A rich chocolate treat finished with seasonal berries.",
    imageUrl:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
    category: "FOOD",
    alt: "Decadent chocolate dessert",
    tags: ["chocolate", "dessert", "sweet", "berries", "cake"],
  },
  {
    id: "7",
    title: "Coffee & Moments",
    description: "Freshly brewed coffee for a perfect little break.",
    imageUrl:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85",
    category: "DRINKS",
    alt: "Freshly prepared coffee in a cup",
    tags: ["coffee", "cappuccino", "hot drink", "breakfast"],
  },
  {
    id: "8",
    title: "Chef's Special",
    description: "A seasonal creation prepared by our talented kitchen team.",
    imageUrl:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    category: "CHEF_SPECIALS",
    alt: "A beautifully plated chef's special",
    tags: ["chef special", "seasonal", "signature", "gourmet"],
  },
];

export const categories = [
  { label: "All", value: "ALL" },
  { label: "Food", value: "FOOD" },
  { label: "Drinks", value: "DRINKS" },
  { label: "Interior", value: "INTERIOR" },
  { label: "Chef's Specials", value: "CHEF_SPECIALS" },
] as const;
