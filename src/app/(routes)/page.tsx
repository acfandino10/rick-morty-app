"use client";

import { useEffect } from "react";
import CharactersList from "components/CharactersList";
import { withApollo } from "lib/withApollo";

function Home() {


  useEffect(() => {
    document.title = "Rick and Morty";
  }, []);

  return (
    <main className="flex max-h-screen flex-col justify-flex-start h-lvh">
      <CharactersList title="Rick and Morty list" />
    </main>
  );
}

export default withApollo(Home);
