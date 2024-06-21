"use client";
import CharactersList from "../_components/CharactersList";
// className="flex min-h-screen flex-col items-center justify-between p-24"
export default function Home() {
  return (
    <main className="flex max-h-screen flex-col justify-flex-start h-lvh">
      <CharactersList title="Rick and Morty list" size={4} />
    </main>
  );
}
