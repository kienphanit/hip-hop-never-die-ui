import clsx from "clsx";
import style from "./ListSongs.module.scss";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useEffect } from "react";

const ListSongs = ({ indexSong, showList, setIndexSong, songs }) => {
  //scroll into view
  useEffect(() => {
    const timeScrollIntoView = setTimeout(() => {
      document.getElementsByClassName(clsx(style.active))[0].scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 300);
    return () => clearTimeout(timeScrollIntoView);
  }, [indexSong]);

  return (
    <div
      className={clsx(style.list)}
      style={
        showList
          ? { transform: "translateX(0px)" }
          : { transform: "translateX(330px)" }
      }
    >
      {songs.map((item, index) => {
        return (
          <div
            className={
              indexSong === index
                ? clsx(style.song, style.active)
                : clsx(style.song)
            }
            key={index}
            onClick={() => setIndexSong(index)}
          >
            <div
              className={clsx(style.thumb)}
              style={{ backgroundImage: `url("${item.image}")` }}
            ></div>
            <div className={clsx(style.body)}>
              <h3 className={clsx(style.title)}>{item.name}</h3>
              <p className={clsx(style.author)}>{item.singer}</p>
            </div>
            <div className={clsx(style.option)}>
              <FontAwesomeIcon icon={faEllipsis} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(ListSongs);
