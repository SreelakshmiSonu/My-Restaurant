export type Category =
  | "FOOD"
  | "STARTERS"
  | "DESSERTS"
  | "DRINKS"
  | "INTERIOR"
  | "CHEF_SPECIALS";

export type GalleryImage = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: Category;
  alt: string;
  tags: string[];
};
