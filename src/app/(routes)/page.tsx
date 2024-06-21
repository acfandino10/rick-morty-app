"use client";

import { useEffect, useState } from "react";
import CharactersList from "components/CharactersList";
import { withApollo } from "lib/withApollo";
import localFont from "next/font/local";
import DetailView from "components/DetailView";
import { Character } from "../_types/character";
import { Grid } from "@mui/material";

const myFont = localFont({ src: "../_fonts/GreyCliff.otf" });

function Home() {

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const onSelected = (character: Character) => {
    setSelectedCharacter(character)
  };
  useEffect(() => {
    document.title = "Rick and Morty";
  }, []);

  return (
      <main className={["flex max-h-scr</div>een flex-col h-lvh", myFont.className].join(" ")}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CharactersList title="Rick and Morty list" onSelected={onSelected} />
            </Grid>
            <Grid item xs={12} md={6}>
              {selectedCharacter && <DetailView character={selectedCharacter} />}
            </Grid>
          </Grid>
        </main>
  );
}

export default withApollo(Home);
