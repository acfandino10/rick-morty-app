import { gql } from "@apollo/client";

export const UPDATE_CHARACTER = gql`
    mutation UpdateCharacter($id: ID!, $input: CharacterInput!) {
        updateCharacter(id: $id, input: $input) {
            id
            name
            status
            species
        }
    }
`;