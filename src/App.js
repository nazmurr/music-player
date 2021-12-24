import { useState } from "react";
import MusicPlayer from "./MusicPlayer/index";
import "./App.css";
import { songs } from "./playList.json";
import PlayList from "./PlayList/index";

function App() {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const selectSongHandler = (index) => {
    setCurrentSongIndex(index);
    setCurrentSong(songs[index]);
  };

  const selectPreviousSongHandler = () => {
    let songIndex = currentSongIndex;
    songIndex = songIndex === 0 ? songIndex : songIndex - 1;
    setCurrentSong(songs[songIndex]);
    setCurrentSongIndex(songIndex);
  };

  const selectNextSongHandler = () => {
    let songIndex = currentSongIndex;
    songIndex = songs.length - 1 === songIndex ? songIndex : songIndex + 1;
    setCurrentSong(songs[songIndex]);
    setCurrentSongIndex(songIndex);
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <MusicPlayer
        song={currentSong}
        selectPreviousSongHandler={selectPreviousSongHandler}
        selectNextSongHandler={selectNextSongHandler}
      />
      <PlayList
        songs={songs}
        selectSongHandler={selectSongHandler}
        currentSongIndex={currentSongIndex}
      />
    </div>
  );
}

export default App;
