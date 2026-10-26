export type GalleryCategory =
  | "FOOD"
  | "DRINKS"
  | "INTERIOR"
  | "CHEF_SPECIALS";

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: GalleryCategory;
  alt: string;
}