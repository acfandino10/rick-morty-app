import { gql } from "@apollo/client";

// GraphQL queries
export const GET_CHARACTERS = gql`
    query GetCharacters {
        characters(page: 1) {   
            results {
                id
                name
                species
                image
           }
           }
    }
`;

export const GET_CHARACTER_DATA = gql`
  query {
    characters(page: 1) {
      info {
        count
      }
      results {
        id
        name
        species
        image
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`;
