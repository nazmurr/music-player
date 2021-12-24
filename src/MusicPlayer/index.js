import { React, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import SkipNextRounded from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRounded from "@mui/icons-material/SkipPreviousRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import { WallPaper, Widget, CoverImage, TinyText } from "./playerComponents";

export default function MusicPlayer({
  song,
  selectPreviousSongHandler,
  selectNextSongHandler,
}) {
  const theme = useTheme();
  const [music] = useState(new Audio(song.songUrl));
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(true);
  const [volume, setVolume] = useState(30);
  const [userInteract, setUserInteract] = useState(false);

  const playPauseMusic = () => {
    if (paused) {
      setUserInteract(true);
      music.play();
      setPaused(false);
    } else {
      music.pause();
      setPaused(true);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    music.volume = newValue / 100;
    setVolume(newValue);
  };

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  music.addEventListener("canplay", (event) => {
    /* the audio is now playable; play it if permissions allow */
    setDuration(music.duration);
  });

  music.addEventListener("timeupdate", (event) => {
    setPosition(Math.floor(music.currentTime));
  });

  useEffect(() => {
    if (userInteract) setPaused(false);
    music.setAttribute("src", song.songUrl); //change the source
    music.load(); //load the new source
    if (userInteract) music.play(); //play
  }, [song, music, userInteract]);

  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Widget>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CoverImage>
            <img alt={song.title} src={song.coverImage} />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {song.artist}
            </Typography>
            <Typography noWrap>
              <b>{song.title}</b>
            </Typography>
            <Typography noWrap letterSpacing={-0.25}>
              {song.album}
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => {
            music.currentTime = value;
            setPosition(value);
          }}
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === "dark"
                    ? "rgb(255 255 255 / 16%)"
                    : "rgb(0 0 0 / 16%)"
                }`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <IconButton
            aria-label="previous song"
            onClick={selectPreviousSongHandler}
          >
            <SkipPreviousRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            aria-label={paused ? "play" : "pause"}
            onClick={playPauseMusic}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton aria-label="next song" onClick={selectNextSongHandler}>
            <SkipNextRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, px: 1 }}
          alignItems="center"
        >
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            value={volume}
            onChange={handleVolumeChange}
            sx={{
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                width: 24,
                height: 24,
                backgroundColor: "#fff",
                "&:before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
              },
            }}
          />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack>
      </Widget>
      <WallPaper />
    </Box>
  );
}
