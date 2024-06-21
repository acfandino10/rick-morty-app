import React from "react";
import { Suspense, Fragment, useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Character } from "types/character";
import { FavoriteBorderOutlined, FavoriteBorderRounded, FavoriteRounded } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../_graphql/queries/GetCharacters";
import { Box } from "@mui/material";

interface CharactersListProps {
  title: string;
  onSelected: (character: Character) => void;
}

export default function CharactersList({
  title,
  onSelected,
}: CharactersListProps) {
  const [characters, setCharacters] = useState<Character[]>();
  const [starredIds, setStarredIds] = useState<number[]>([]); // [1, 2, 3
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  const selectCharacter = (character: Character) => {
    // TODO. Also change selection color
    if (character) {
      onSelected(character);
    }
  };
  const selectFavorite = (id: number) => {
    // TODO. Also change selection color
    if (!starredIds.includes(id)) {
      setStarredIds([...starredIds, id]);
    } else {
      const newStarredIds = starredIds.filter((starredId) => starredId !== id);
      setStarredIds(newStarredIds);
    }
  }

  useEffect(() => {
    document.title = "Rick and Morty";
    if (data) {
      setCharacters(data.characters.results);
    }
  }, [data]);

  return (
    <Suspense fallback={<div>Loading characters list...</div>}>
      <List
        sx={{
          width: { md: "375px", sm: "100%" },
          paddingTop: "42px",
          fontFamily: "GreyCliff",
          paddingRight: "13px",
          paddingLeft: "19px",
          maxWidth: "sm",
          maxHeight: "100vh",
          background: "linear-gradient(to right, white, #FBFBFB)",
          overflow: "auto",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          pb={"25px"}
          sx={{
            color: "#1F2937",
            fontSize: "24px",
            fontWeight: 400,
            marginLeft: 2,
            fontFamily: "GreyCliff",
          }}
        >
          {title}
        </Typography>
        {loading && <p>Loading characters list...</p>}
        {!loading && starredIds.length > 0 && (
          <>
            <Box
              sx={{
                pb: "22px",
                color: "#6B7280",
                fontSize: "12px",
                fontWeight: 600,
                marginLeft: 2,
                fontFamily: "GreyCliff",
              }}
            >
              STARRED CHARACTERS
              <span style={{ fontFamily: "Roboto" }}>{" ("}</span>
              {characters?.length}
              <span style={{ fontFamily: "Roboto" }}>{")"}</span>
            </Box>
            {characters?.filter(el => starredIds.includes(el.id))?.map((character) => (
              <Fragment key={character.id}>
                <Divider
                  component="li"
                  sx={{ marginLeft: 2, marginRight: 2 }}
                />
                <ListItem
                  alignItems="center"
                  onClick={() => selectCharacter(character)}
                >
                  <ListItemAvatar>
                    <Avatar alt={character.name} src={character.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#1F2937",
                          fontSize: "16px",
                          fontWeight: 600,
                          fontFamily: "GreyCliff",
                        }}
                      >
                        {character.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                          fontSize: "16px",
                        }}
                      >
                        {character.species}
                      </Typography>
                    }
                  />
                  <FavoriteRounded sx={{ zIndex: 10 }} color="primary" onClick={()=>selectFavorite(character.id)} />

                </ListItem>
              </Fragment>
            ))}
          </>
        )}
        {!loading && (
          <>
            <Box
              sx={{
                pb: "22px",
                color: "#6B7280",
                fontSize: "12px",
                fontWeight: 600,
                marginLeft: 2,
                fontFamily: "GreyCliff",
              }}
            >
              CHARACTERS
              <span style={{ fontFamily: "Roboto" }}>{" ("}</span>
              {characters?.length}
              <span style={{ fontFamily: "Roboto" }}>{")"}</span>
            </Box>
            {characters?.filter(el => !starredIds.includes(el.id))?.map((character) => (
              <Fragment key={character.id}>
                <Divider
                  component="li"
                  sx={{ marginLeft: 2, marginRight: 2 }}
                />
                <ListItem
                  alignItems="center"
                  onClick={() => selectCharacter(character)}
                >
                  <ListItemAvatar>
                    <Avatar alt={character.name} src={character.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#1F2937",
                          fontSize: "16px",
                          fontWeight: 600,
                          fontFamily: "GreyCliff",
                        }}
                      >
                        {character.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                          fontSize: "16px",
                        }}
                      >
                        {character.species}
                      </Typography>
                    }
                  />
                  {!starredIds.includes(character.id) &&<FavoriteBorderOutlined sx={{ zIndex: 10 }} htmlColor="#D1D5DB" onClick={()=>selectFavorite(character.id)} />}
                  {starredIds.includes(character.id) && <FavoriteBorderRounded sx={{ zIndex: 10 }} color="primary" onClick={()=>selectFavorite(character.id)} />}

                </ListItem>
              </Fragment>
            ))}
          </>
        )}
      </List>
    </Suspense>
  );
}
