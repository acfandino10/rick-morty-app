import { Suspense, Fragment, useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Character } from "types/character";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../_graphql/queries/GetCharacters";
import { Box } from "@mui/material";

interface CharactersListProps {
  title: string;
}

export default function CharactersList({ title }: CharactersListProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  useEffect(() => {
    document.title = "Rick and Morty";
    if (data) {
      setCharacters(data.characters.results);
    }
  }, [data]);
  return (
    <List
      sx={{
        width: "375px",
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
        {characters.length}
        <span style={{ fontFamily: "Roboto" }}>{")"}</span>
      </Box>
      <Suspense fallback={<div>Loading characters list...</div>}>
        {characters?.map((character) => (
          <Fragment key={character.id}>
            <Divider component="li" sx={{ marginLeft: 2, marginRight: 2 }} />
            <ListItem alignItems="center">
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
                      fontWeight: 400,
                      fontFamily: "GreyCliff",
                    }}
                  >
                    {character.species}
                  </Typography>
                }
              />
              <FavoriteBorderOutlined htmlColor={"#D1D5DB"} />
            </ListItem>
          </Fragment>
        ))}
      </Suspense>
    </List>
  );
}
