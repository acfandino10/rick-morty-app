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
import {
  FavoriteBorderOutlined,
  FavoriteBorderRounded,
  FavoriteRounded,
} from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../_graphql/queries/GetCharacters";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  IconButton,
  InputBase,
  Popover,
} from "@mui/material";
import styled from "styled-components";
import SearchSvg from "../_assets/search.svg";
import FilterSvg from "../_assets/filter.svg";

interface CharactersListProps {
  title: string;
  onSelected: (character: Character) => void;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  "&:hover": {
    // backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  borderRadius: "8px",
  padding: "9px 0px 9px 20px",
  marginBottom: "40px",
  gap: "8px",
  // marginLeft: 10,
  backgroundColor: "#F3F4F6",
  height: "52px",
  width: "343px",
  alignContent: "center",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: 10,
  border: "1px solid #6B7280",
  borderRadius: "5px",
  width: "100px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  position: "absolute",
  left: 10,
  top: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const FilterIconWrapper = styled("div")(({ theme }) => ({
  // padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 30,
  top: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    // padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: 45,
    // transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   width: "12ch",
    //   "&:focus": {
    //     width: "20ch",
    //   },
    // },
  },
}));

export default function CharactersList({
  title,
  onSelected,
}: CharactersListProps) {
  const [characters, setCharacters] = useState<Character[]>();
  const [openFilter, setOpenFilter] = useState(false);
  const [starredIds, setStarredIds] = useState<number[]>([]); // [1, 2, 3
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

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
  };

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
        {!loading && (
          <>
            <Search>
              <SearchIconWrapper>
                <SearchSvg />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search or filter results"
                inputProps={{ "aria-label": "search" }}
                color="success"
              />
              <FilterIconWrapper>
                <IconButton
                  aria-label="filter"
                  sx={{ zIndex: 10 }}
                  onClick={() => setOpenFilter(!openFilter)}
                >
                  <FilterSvg />
                </IconButton>
                <Popover
                  open={openFilter}
                  anchorEl={anchorEl}
                  onClose={() => setOpenFilter(false)}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Card>
                    <Box sx={{ p: 2 }}>
                      <Typography
                          variant="body2"
                          sx={{
                            color: "#6B7280",
                            fontSize: "16px",
                          }}
                        >
                          Character
                        </Typography>
                      <ButtonGroup
                        variant="outlined"
                        aria-label="Basic button group"
                      >
                        <StyledButton>All</StyledButton>
                        <StyledButton>Starred</StyledButton>
                        <StyledButton>Others</StyledButton>
                      </ButtonGroup><Typography
                          variant="body2"
                          sx={{
                            color: "#6B7280",
                            fontSize: "16px",
                          }}
                        >
                          Specie
                        </Typography>
                      <ButtonGroup
                        variant="outlined"
                        aria-label="Basic button group"
                      >
                        <StyledButton>All</StyledButton>
                        <StyledButton>Human</StyledButton>
                        <StyledButton>Alien</StyledButton>
                      </ButtonGroup>
                      <Button fullWidth>Filter</Button>
                    </Box>
                  </Card>
                </Popover>
              </FilterIconWrapper>
            </Search>
          </>
        )}
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
            {characters
              ?.filter((el) => starredIds.includes(el.id))
              ?.map((character) => (
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
                    <FavoriteRounded
                      sx={{ zIndex: 10 }}
                      color="primary"
                      onClick={() => selectFavorite(character.id)}
                    />
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
            {characters
              ?.filter((el) => !starredIds.includes(el.id))
              ?.map((character) => (
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
                    {!starredIds.includes(character.id) && (
                      <FavoriteBorderOutlined
                        sx={{ zIndex: 10 }}
                        htmlColor="#D1D5DB"
                        onClick={() => selectFavorite(character.id)}
                      />
                    )}
                    {starredIds.includes(character.id) && (
                      <FavoriteBorderRounded
                        sx={{ zIndex: 10 }}
                        color="primary"
                        onClick={() => selectFavorite(character.id)}
                      />
                    )}
                  </ListItem>
                </Fragment>
              ))}
          </>
        )}
      </List>
    </Suspense>
  );
}
