import { MENU_QUERY } from "./menu";

export const mocks = [
  {
    request: {
      query: MENU_QUERY,
    },
    result: {
      data: {
        menu: [
          { id: 1, name: "Masala Dosa", price: 8.99, image: "/images/dosa.jpg" },
          { id: 2, name: "Biriyani", price: 12.99, image: "/images/biriyani.jpg" },
          { id: 3, name: "Paneer Tikka", price: 10.99, image: "/images/paneer.jpg" },
        ],
      },
    },
  },
];
