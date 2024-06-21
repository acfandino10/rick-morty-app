"use client";

import { useEffect } from "react";
import CharactersList from "components/CharactersList";
import { withApollo } from "lib/withApollo";
import localFont from "next/font/local";

const myFont = localFont({ src: "../_fonts/GreyCliff.otf" });

function Home() {
  useEffect(() => {
    document.title = "Rick and Morty";
  }, []);

  return (
    <main className={["flex max-h-screen flex-col justify-flex-start h-lvh", myFont.className].join(" ")}>
      <CharactersList title="Rick and Morty list" />
    </main>
  );
}

export default withApollo(Home);
