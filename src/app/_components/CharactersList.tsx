import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

interface CharactersListProps {
  title: string;
  size: number;
}

const characterData = [
  {
    id: 1,
    name: 'Brunch this weekend?',
    avatar: '/static/images/avatar/1.jpg',
    author: 'Ali Connors',
    message: "I'll be in your neighborhood doing errands this…",
  },
  {
    id: 2,
    name: 'Summer BBQ',
    avatar: '/static/images/avatar/2.jpg',
    author: 'to Scott, Alex, Jennifer',
    message: "Wish I could come, but I'm out of town this…",
  },
  {
    id: 3,
    name: 'Oui Oui',
    avatar: '/static/images/avatar/3.jpg',
    author: 'Sandra Adams',
    message: 'Do you have Paris recommendations? Have you ever…',
  },
];

export default function CharactersList({ title, size }: CharactersListProps) {
  return (
    <List sx={{ maxWidth: 360, height: '100%', bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        CHARACTERS ({size})
      </Typography>
      {characterData.map((character) => (
        <React.Fragment key={character.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={character.name} src={character.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={character.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {character.author}
                  </Typography>
                  {` — ${character.message}`}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}