import { gql } from "@apollo/client";

// GraphQL queries
export const GET_CHARACTERS = gql`
    query GetCharacters {
        characters(page: 1) {   
            results {
                id
                name
                species
                status
                gender
                image
           }
           }
    }
`;