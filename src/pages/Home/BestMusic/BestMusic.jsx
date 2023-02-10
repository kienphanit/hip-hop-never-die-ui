import clsx from "clsx";
import style from "./BestMusic.module.scss";

const BestMusic = () => {
  const list = [
    {
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/b/a/d/0/bad05d20e4d804ec53592da82b73f8d6.jpg",
    },
    {
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/b/f/e/3/bfe38a668289c6fac1b6659457a3ad49.jpg",
    },
    {
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/f/f/8/4/ff849b97aec21619cb10f522a480f14c.jpg",
    },
    {
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/0/2/8/9/0289857b5e5da497cef2cc590c713fc3.jpg",
    },
  ];
  return (
    <div className={clsx(style.wrapper)}>
      <h1 className={clsx(style.header)}>Nhạc hay ho của năm 2023</h1>
      <div className={clsx(style.list)}>
      {list.map((x, index) => {
        return (
          <div key={index} className={clsx(style.image)}>
            <img src={x.image} alt="Anh noi bat" />
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default BestMusic;
