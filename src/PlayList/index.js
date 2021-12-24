import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const PlayList = ({ songs, selectSongHandler, currentSongIndex }) => {
  const [selectedSongIndex, setSelectedSongIndex] = useState(currentSongIndex);

  useEffect(() => {
    setSelectedSongIndex(currentSongIndex);
  }, [currentSongIndex]);

  return (
    <Box
      sx={{
        width: "93%",
        bgcolor: "background.paper",
        margin: "0 auto",
        marginTop: "10px",
      }}
    >
      <nav aria-label="secondary mailbox folders">
        <List>
          {songs.map((song, index) => (
            <div key={index}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    selectSongHandler(index);
                    setSelectedSongIndex(index);
                  }}
                  selected={selectedSongIndex === index ? true : false}
                >
                  <ListItemText primary={song.title} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default PlayList;
