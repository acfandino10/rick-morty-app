import React, { FC, Fragment } from "react";
import { Character } from "../_types/character";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

interface DetailViewProps {
  character: Character;
}

const DetailView: FC<DetailViewProps> = ({ character }) => {
  const { name, species, status, gender, image } = character;

  return (
    <Box sx={{ width: '100%'}}>
      <Avatar
        alt={character.name}
        src={character.image}
        sx={{ width: 80, height: 80 }}
      />

      <List
        sx={{
          width: { md: "375px", sm: "100%" },
          paddingTop: "42px",
          fontFamily: "GreyCliff",
          paddingRight: "13px",
          paddingLeft: "19px",
          maxWidth: "sm",
          maxHeight: "100vh",
          background: "transparent",
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
          {name}
        </Typography>
        {!character && <p>Loading character detail...</p>}
        {character && (
          <>
            <Fragment key={character.id}>
              <ListItem alignItems="center">
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
                      Specie
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
                {/* <FavoriteBorderOutlined htmlColor="#D1D5DB" /> */}
              </ListItem>
              <Divider component="li" sx={{ marginLeft: 2, marginRight: 2 }} />
              <ListItem alignItems="center">
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
                      Status
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
                      {character.status}
                    </Typography>
                  }
                />
                {/* <FavoriteBorderOutlined htmlColor="#D1D5DB" /> */}
              </ListItem>
              <Divider component="li" sx={{ marginLeft: 2, marginRight: 2 }} />
              <ListItem alignItems="center">
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
                      Gender
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
                      {character.gender}
                    </Typography>
                  }
                />
                {/* <FavoriteBorderOutlined htmlColor="#D1D5DB" /> */}
              </ListItem>
            </Fragment>
          </>
        )}
      </List>
    </Box>
  );
};

export default DetailView;
