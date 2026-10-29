import { galleryImages } from "./galleryData";

export type MenuSection = "MAINS" | "STARTERS" | "DESSERTS" | "DRINKS";
export type DietaryType = "VEG" | "NON_VEG";
export type SpiceLevel = 0 | 1 | 2 | 3;

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  section: MenuSection;
  dietaryType: DietaryType;
  spiceLevel: SpiceLevel;
  tags: string[];
  ingredients: string[];
  allergenAdvice: string;
};

const menuDetails: Record<
  string,
  { ingredients: string[]; allergenAdvice: string }
> = {
  "1": {
    ingredients: ["Fish", "coconut", "tomato", "shallots", "chilli", "curry leaves", "rice appam"],
    allergenAdvice: "Fish. Confirm appam ingredients and cross-contact with the kitchen.",
  },
  "2": {
    ingredients: ["Kerala rice", "seasonal vegetables", "coconut", "pickles", "papadum", "payasam"],
    allergenAdvice: "Sadya sides vary; ask the kitchen about milk, mustard, nuts and gluten.",
  },
  "3": {
    ingredients: ["Rice appam", "coconut milk", "potato", "carrots", "green beans", "whole spices"],
    allergenAdvice: "Ask the kitchen to confirm ingredients and preparation cross-contact.",
  },
  "4": {
    ingredients: ["Beef", "rice puttu", "coconut", "shallots", "black pepper", "curry leaves"],
    allergenAdvice: "Ask whether the puttu is made with rice or wheat flour; confirm cross-contact.",
  },
  "5": {
    ingredients: ["Pearl spot fish", "tomato", "onion", "chilli", "curry leaves", "coconut oil"],
    allergenAdvice: "Fish. Confirm the current recipe and cross-contact with the kitchen.",
  },
  "6": {
    ingredients: ["Wheat parotta", "chicken", "onion", "tomato", "ginger", "Kerala spices"],
    allergenAdvice: "Contains wheat (gluten); curry ingredients may vary, so confirm with the kitchen.",
  },
  "7": {
    ingredients: ["Rice ada", "milk", "sugar", "cardamom", "cashews", "raisins"],
    allergenAdvice: "Contains milk and cashew (tree nut). Confirm cross-contact with the kitchen.",
  },
  "8": {
    ingredients: ["Black tea", "milk", "sugar", "cardamom", "ginger"],
    allergenAdvice: "Contains milk when prepared with dairy; ask about alternatives and cross-contact.",
  },
  "9": {
    ingredients: ["Restaurant dining room"],
    allergenAdvice: "This is a dining-room photo, not a food item.",
  },
  "10": {
    ingredients: ["Chicken", "kaima rice", "onion", "ghee", "whole spices", "cashews", "raisins"],
    allergenAdvice: "May contain milk (ghee) and cashew (tree nut); confirm the recipe and cross-contact.",
  },
  "11": {
    ingredients: ["Rice", "mixed vegetables", "spring onion", "seasoning"],
    allergenAdvice: "Sauces and seasonings vary; ask about soy, wheat (gluten), egg and cross-contact.",
  },
  "12": {
    ingredients: ["Kaima rice", "ghee", "cashews", "raisins", "cardamom", "whole spices"],
    allergenAdvice: "May contain milk (ghee) and cashew (tree nut); confirm cross-contact.",
  },
  "13": {
    ingredients: ["Tapioca", "fish", "chilli", "tamarind", "mustard", "curry leaves"],
    allergenAdvice: "Contains fish; mustard may also be used. Confirm with the kitchen.",
  },
  "14": {
    ingredients: ["Nendran banana", "wheat flour", "rice flour", "sugar", "turmeric"],
    allergenAdvice: "Contains wheat (gluten); ask about the batter recipe and fryer cross-contact.",
  },
  "15": {
    ingredients: ["Onion", "gram flour", "chilli", "coriander", "spices"],
    allergenAdvice: "Ask about the batter, cooking oil and shared-fryer cross-contact.",
  },
  "16": {
    ingredients: ["Gulab jamun", "milk", "wheat flour", "sugar syrup", "vanilla ice cream"],
    allergenAdvice: "Contains milk and wheat (gluten); ice cream may also contain egg. Confirm with staff.",
  },
  "17": {
    ingredients: ["Rice flour", "jaggery", "banana", "coconut", "cardamom"],
    allergenAdvice: "Ask the kitchen to confirm the recipe and cross-contact before ordering.",
  },
  "18": {
    ingredients: ["Carbonated water", "soft-drink flavouring", "ice"],
    allergenAdvice: "Ingredients vary by brand; ask staff to check the bottle or can label.",
  },
  "19": {
    ingredients: ["Lime", "mint", "soda water", "syrup", "ice"],
    allergenAdvice: "Syrup ingredients vary; ask the kitchen to confirm the product label and cross-contact.",
  },
  "20": {
    ingredients: ["Lentils", "shallots", "chilli", "ginger", "curry leaves"],
    allergenAdvice: "Ask the kitchen to confirm ingredients, cooking oil and cross-contact.",
  },
  "21": {
    ingredients: ["Prawns", "shallots", "tomato", "chilli", "curry leaves", "coconut oil"],
    allergenAdvice: "Contains crustaceans (prawns); confirm cross-contact with the kitchen.",
  },
  "22": {
    ingredients: ["Prawns", "coconut milk", "tomato", "onion", "ginger", "Kerala spices"],
    allergenAdvice: "Contains crustaceans (prawns); confirm cross-contact with the kitchen.",
  },
};

const galleryItem = (id: string) => {
  const image = galleryImages.find((item) => item.id === id);
  if (!image) throw new Error(`Missing gallery image for menu item ${id}`);
  return image;
};

function menuItem(
  galleryId: string,
  section: MenuSection,
  dietaryType: DietaryType,
  spiceLevel: SpiceLevel,
  tags: string[] = [],
): MenuItem {
  const image = galleryItem(galleryId);
  const details = menuDetails[galleryId];
  if (!details) throw new Error(`Missing ingredients for menu item ${galleryId}`);

  return {
    id: galleryId,
    name: image.title,
    description: image.description,
    image: image.imageUrl,
    imageAlt: image.alt,
    section,
    dietaryType,
    spiceLevel,
    tags: [...image.tags, ...tags],
    ...details,
  };
}

export const menuItems: MenuItem[] = [
  menuItem("14", "STARTERS", "VEG", 0, ["banana", "pazham pori"]),
  menuItem("15", "STARTERS", "VEG", 2, ["onion bhaji", "pakora"]),
  menuItem("20", "STARTERS", "VEG", 2, ["parippu vada", "lentil fritter"]),
  menuItem("1", "MAINS", "NON_VEG", 3, ["fish", "curry"]),
  menuItem("2", "MAINS", "VEG", 1, ["sadya", "banana leaf"]),
  menuItem("3", "MAINS", "VEG", 1, ["appam", "stew"]),
  menuItem("4", "MAINS", "NON_VEG", 3, ["beef", "puttu"]),
  menuItem("5", "MAINS", "NON_VEG", 3, ["fish", "chef special"]),
  menuItem("6", "MAINS", "NON_VEG", 2, ["chicken", "parotta"]),
  menuItem("10", "MAINS", "NON_VEG", 2, ["chicken", "biriyani"]),
  menuItem("11", "MAINS", "VEG", 1, ["fried rice", "vegetarian"]),
  menuItem("12", "MAINS", "VEG", 0, ["ghee rice", "ney choru"]),
  menuItem("13", "MAINS", "NON_VEG", 3, ["kappa", "meen curry"]),
  menuItem("21", "MAINS", "NON_VEG", 3, ["prawn", "chemmeen roast"]),
  menuItem("22", "MAINS", "NON_VEG", 2, ["prawn", "curry"]),
  menuItem("7", "DESSERTS", "VEG", 0, ["payasam", "pudding"]),
  menuItem("16", "DESSERTS", "VEG", 0, ["ice cream", "gulab jamun"]),
  menuItem("17", "DESSERTS", "VEG", 0, ["unniyappam", "jaggery"]),
  menuItem("8", "DRINKS", "VEG", 0, ["chai", "tea"]),
  menuItem("18", "DRINKS", "VEG", 0, ["soft drink", "soda"]),
  menuItem("19", "DRINKS", "VEG", 0, ["mocktail", "mint", "lime"]),
];

export const menuSections: { label: string; value: MenuSection | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Starters", value: "STARTERS" },
  { label: "Kerala Mains", value: "MAINS" },
  { label: "Desserts", value: "DESSERTS" },
  { label: "Drinks", value: "DRINKS" },
];

export const spiceLabels = ["No heat", "Mild", "Medium", "Hot"] as const;
