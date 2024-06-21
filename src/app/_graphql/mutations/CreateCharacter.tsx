import { gql } from "@apollo/client";

export const CREATE_CHARACTER = gql`
    mutation CreateCharacter($input: CharacterInput!) {
        createCharacter(input: $input) {
            id
            name
            status
            gender
            species
        }
    }
`;