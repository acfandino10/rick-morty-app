import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import CharactersList from "../_components/CharactersList";
import { GET_CHARACTERS } from "../_graphql/queries/GetCharacters";
import "@testing-library/jest-dom";
import { describe, it } from "node:test";

// Mock data
const charactersMock = {
  request: {
    query: GET_CHARACTERS,
  },
  result: {
    data: {
      characters: {
        results: [
          {
            id: "1",
            name: "Rick Sanchez",
            species: "Human",
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          },
          {
            id: "2",
            name: "Morty Smith",
            species: "Human",
            image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
          },
        ],
      },
    },
  },
};

// Mock error
const errorMock = {
  request: {
    query: GET_CHARACTERS,
  },
  error: new Error("An error occurred"),
};

describe("CharactersList", () => {
  it("renders loading state initially", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CharactersList title="Rick and Morty list" />
      </MockedProvider>
    );
    expect(screen.getByText("Loading characters list...")).toBeInTheDocument();
  });

  it("renders list of characters", async () => {
    render(
      <MockedProvider mocks={[charactersMock]} addTypename={false}>
        <CharactersList title="Rick and Morty list" />
      </MockedProvider>
    );

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    });

    expect(screen.getByText("CHARACTERS (2)")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <CharactersList title="Rick and Morty list" />
      </MockedProvider>
    );

    // Wait for the error to be displayed
    await waitFor(() => {
      expect(screen.getByText("Error: An error occurred")).toBeInTheDocument();
    });
  });

  it("renders the correct title", () => {
    render(
      <MockedProvider mocks={[charactersMock]} addTypename={false}>
        <CharactersList title="Rick and Morty list" />
      </MockedProvider>
    );

    expect(screen.getByText("Rick and Morty list")).toBeInTheDocument();
  });
});
