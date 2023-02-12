import clsx from "clsx";
import { Link } from "react-router-dom";
import style from "./Slideshow.module.scss";
import { useEffect, useState } from "react";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Slideshow = () => {
  const list = [
    {
      image:
        "https://i.pinimg.com/564x/18/ef/e4/18efe48c3fe269724e7e43bb38c40df1.jpg",
      path: "/abc",
    },
    {
      image:
        "https://i.pinimg.com/564x/18/ef/e4/18efe48c3fe269724e7e43bb38c40df1.jpg",
      path: "/abc",
    },
    {
      image:
        "https://i.pinimg.com/564x/18/ef/e4/18efe48c3fe269724e7e43bb38c40df1.jpg",
      path: "/abc",
    },
    {
      image:
        "https://i.pinimg.com/564x/18/ef/e4/18efe48c3fe269724e7e43bb38c40df1.jpg",
      path: "/abc",
    },
    {
      image:
        "https://i.pinimg.com/564x/18/ef/e4/18efe48c3fe269724e7e43bb38c40df1.jpg",
      path: "/abc",
    },
    {
      image:
        "https://i.pinimg.com/564x/18/ef/e4/18efe48c3fe269724e7e43bb38c40df1.jpg",
      href: "https://www.instagram.com/kienphanit/",
    },
  ];

  const [slideNumber, setSlideNumber] = useState(0);
  const countImageShow = 3;

  const handleMove = (direction) => {
    if (direction === "left") {
      setSlideNumber(
        slideNumber === 0
          ? () => list.length - countImageShow
          : (prev) => prev - 1
      );
    } else if (direction === "right") {
      setSlideNumber(
        slideNumber < list.length - countImageShow
          ? (prev) => prev + 1
          : () => 0
      );
    }
  };

  useEffect(() => {
    const timeAutoNext = 5000;

    let timerId = setInterval(() => {
      handleMove("right");
    }, timeAutoNext);

    return () => clearInterval(timerId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideNumber]);

  useEffect(() => {
    let classLink = document.getElementsByClassName(clsx(style.link));
    for (let i = 0; i < classLink.length; i++) {
      classLink[i].style.minWidth = `${100 / countImageShow}%`;
    }
  }, []);

  //translateX list
  useEffect(() => {
    document.getElementsByClassName(
      clsx(style.list)
    )[0].style.transform = `translateX(-${
      (slideNumber * 100) / countImageShow
    }%)`;
  }, [slideNumber]);
  return (
    <div className={clsx(style.wrapper)}>
      <FontAwesomeIcon
        className={clsx(style.btn, style.left)}
        icon={faAngleLeft}
        onClick={() => handleMove("left")}
      />

      <div className={clsx(style.list)}>
        {list.map((item, index) => {
          return item.path ? (
            <Link className={clsx(style.link)} key={index} to={item.path}>
              <img src={item.image} alt="Anh cun con" />
            </Link>
          ) : (
            <a
              className={clsx(style.link)}
              key={index}
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              <img src={item.image} alt="Dog" />
            </a>
          );
        })}
      </div>

      <FontAwesomeIcon
        className={clsx(style.btn, style.right)}
        icon={faAngleRight}
        onClick={() => handleMove("right")}
      />
    </div>
  );
};

export default Slideshow;
