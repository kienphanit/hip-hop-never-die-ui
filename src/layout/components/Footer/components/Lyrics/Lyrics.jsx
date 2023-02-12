import clsx from "clsx";
import style from "./Lyrics.module.scss";
import { memo, useEffect } from "react";

const Lyrics = ({
  songs,
  indexSong,
  highlighted,
  showLyrics,
  setHighlighted,
  audioRef,
}) => {
  //highlighted lyrics
  useEffect(() => {
    document.getElementsByClassName(clsx(style.highlighted))[0].scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, [highlighted]);

  //set higlight lyrics
  useEffect(() => {
    const timerId = setInterval(() => {
      setHighlighted(() => {
        for (let i = 0; i < songs[indexSong].lyrics.length; i++) {
          //time : end
          if (
            Math.floor(audioRef.current?.currentTime) <=
            songs[indexSong].lyrics[i].time
          ) {
            return i;
          }
        }
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div
      className={clsx(style.lyrics)}
      style={
        showLyrics
          ? { transform: "translateY(0px)" }
          : { transform: "translateY(calc(100vh - 90px))" }
      }
    >
      <div className={clsx(style.header_lyrics)}></div>
      <div className={clsx(style.content_lyrics)}>
        <div className={clsx(style.logo)}>
          <img
            src="https://i.pinimg.com/564x/57/24/d2/5724d2e9834bedff7e8366e27d5a8f14.jpg"
            alt="Logo Ag"
          />
        </div>
        <div className={clsx(style.list_lyrics)}>
          {songs[indexSong].lyrics.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  highlighted === index
                    ? clsx(style.item_lyrics, style.highlighted)
                    : clsx(style.item_lyrics)
                }
              >
                {item?.line === "" ? "•••" : item?.line}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(Lyrics);
