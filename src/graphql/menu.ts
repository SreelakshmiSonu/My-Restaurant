import { gql } from "@apollo/client";

export const MENU_QUERY = gql`
  query GetMenu {
    menu {
      id
      name
      price
      image
    }
  }
`;
