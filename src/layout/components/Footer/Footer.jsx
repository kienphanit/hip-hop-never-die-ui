import {
  faBackwardStep,
  faEllipsis,
  faForwardStep,
  faHeart,
  faListCheck,
  faMicrophone,
  faPause,
  faPlay,
  faRotateRight,
  faShuffle,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { songs } from "./Songs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import style from "./Footer.module.scss";
import Lyrics from "./components/Lyrics/Lyrics";
import ListSongs from "./components/ListSongs/ListSongs";

const Footer = () => {
  const [play, setPlay] = useState(false);
  const [indexSong, setIndexSong] = useState(0);
  const [loopSong, setLoopSong] = useState(false);
  const [listsong, setListsong] = useState(songs);
  const [showList, setShowList] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [time, setTime] = useState(0);
  const [showLyrics, setShowLyrics] = useState(0);

  const audioRef = useRef();
  const durationRef = useRef();
  const volumeRef = useRef();

  const handleNextSong = () => {
    setIndexSong(indexSong === songs.length - 1 ? 0 : indexSong + 1);
  };

  const handlePrevSong = () => {
    setIndexSong(indexSong === 0 ? songs.length - 1 : indexSong - 1);
  };

  const handleLoopSong = () => {
    setLoopSong((prev) => !prev);
  };

  const handleRandomSong = () => {
    setListsong((prev) => {
      for (let i = 0; i < prev.length - 1; i++) {
        let numberRandom = Math.floor(Math.random(prev.length) * prev.length);
        let temp = prev[i];
        prev[i] = prev[numberRandom];
        prev[numberRandom] = temp;
      }
      return [...prev];
    });
  };

  const handleSetWidth = (e) => {
    let width = durationRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    let progress = offset / width;
    audioRef.current.currentTime = progress * audioRef.current.duration;
  };

  const handleVolume = (e) => {
    let width = volumeRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    let progress = offset / width;
    audioRef.current.volume = progress;
    document.getElementsByClassName(
      clsx(style.volumeNumber)
    )[0].style.width = `${audioRef.current.volume * 100}%`;
    console.log(volumeRef.current.volume);
  };

  //Auto next song and loop song
  useEffect(() => {
    const timerId = setInterval(() => {
      if (
        Math.floor(audioRef.current.currentTime) ===
        Math.floor(audioRef.current.duration)
      ) {
        if (loopSong) {
          audioRef.current.currentTime = 0;
        } else {
          handleNextSong();
        }
      }
    }, 200);

    return () => clearInterval(timerId);
  }, [play, indexSong, loopSong]);

  useEffect(() => {
    if (play) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [play, indexSong, listsong, loopSong]);

  useEffect(() => {
    const timeSetWidth = setInterval(() => {
      document.getElementsByClassName(clsx(style.duration))[0].style.width = `${
        (Math.floor(audioRef.current.currentTime) /
          Math.floor(audioRef.current.duration)) *
        100
      }%`;
    }, 200);
    return () => clearInterval(timeSetWidth);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(audioRef.current?.currentTime ?? 0);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <>
      <div className={clsx(style.wrapper)}>
        {listsong.map((item, index) => {
          return (
            indexSong === index && (
              <audio key={index} src={item.src} ref={audioRef} />
            )
          );
        })}

        <div className={clsx(style.left)}>
          <img
            src="https://i.pinimg.com/564x/a3/20/2b/a3202b100e1bedd77c2aa2e4ac538390.jpg"
            alt=""
          />
          <div className={clsx(style.info)}>
            <h1 className={clsx(style.namesong)}>Dandelions</h1>
            <p className={clsx(style.namesinger)}>Ruth B.</p>
          </div>
          <FontAwesomeIcon icon={faHeart} className={clsx(style.icon)} />
          <FontAwesomeIcon icon={faEllipsis} className={clsx(style.icon)} />
        </div>

        <div className={clsx(style.menu)}>
          <div className={clsx(style.listMenu)}>
            <div className={clsx(style.item)}>
              <FontAwesomeIcon
                icon={faShuffle}
                className={clsx(style.icon)}
                onClick={handleRandomSong}
              />
            </div>
            <div className={clsx(style.item)}>
              <FontAwesomeIcon
                icon={faBackwardStep}
                className={clsx(style.icon)}
                onClick={handlePrevSong}
              />
            </div>
            <div className={clsx(style.item)}>
              {!play && (
                <FontAwesomeIcon
                  icon={faPlay}
                  className={clsx(style.icon)}
                  onClick={() => setPlay(true)}
                />
              )}
              {play && (
                <FontAwesomeIcon
                  icon={faPause}
                  className={clsx(style.icon)}
                  onClick={() => setPlay(false)}
                />
              )}
            </div>
            <div className={clsx(style.item)}>
              <FontAwesomeIcon
                icon={faForwardStep}
                className={clsx(style.icon)}
                onClick={handleNextSong}
              />
            </div>
            <div className={clsx(style.item)}>
              <FontAwesomeIcon
                icon={faRotateRight}
                className={clsx(style.icon)}
                onClick={handleLoopSong}
              />
            </div>
          </div>

          <div className={clsx(style.timer)}>
            <p className={clsx(style.time)}>
              {Math.floor(time / 60)}:
              {Math.floor(time % 60) < 10
                ? "0" + Math.floor(time % 60)
                : Math.floor(time % 60)}
            </p>
            <div
              className={clsx(style.progress)}
              ref={durationRef}
              onClick={handleSetWidth}
            >
              <div className={clsx(style.duration)}></div>
            </div>

            <p className={clsx(style.time)}>4:20</p>
          </div>
        </div>

        <div className={clsx(style.right)}>
          <FontAwesomeIcon
            icon={faMicrophone}
            className={clsx(style.icon)}
            onClick={() => setShowLyrics(!showLyrics)}
          />
          <FontAwesomeIcon icon={faVolumeHigh} className={clsx(style.icon)} />
          <div
            className={clsx(style.volume)}
            ref={volumeRef}
            onClick={handleVolume}
          >
            <div className={clsx(style.volumeNumber)}></div>
          </div>
          <FontAwesomeIcon
            icon={faListCheck}
            style={showList ? { backgroundColor: "pink" } : {}}
            className={clsx(style.icon)}
            onClick={() => setShowList(!showList)}
          />
        </div>

        <ListSongs
          indexSong={indexSong}
          showList={showList}
          setIndexSong={setIndexSong}
          songs={songs}
        />
      </div>

      <Lyrics
        songs={songs}
        indexSong={indexSong}
        highlighted={highlighted}
        showLyrics={showLyrics}
        setHighlighted={setHighlighted}
        audioRef={audioRef}
      />
    </>
  );
};

export default Footer;
