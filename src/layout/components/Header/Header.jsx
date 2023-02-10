import {
  faArrowLeft,
  faArrowRight,
  faArrowUpFromBracket,
  faGear,
  faMagnifyingGlass,
  faShirt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect, useState } from "react";
import style from "./Header.module.scss";

const Header = ({ isScrolled }) => {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const backHistory = () => {
    window.history.back();
  };

  const forwardHistory = () => {
    window.history.forward();
  };

  const clearInput = () => {
    setInput("");
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "455e2c45edmshbf733020c7390ebp1e3526jsn1a1dc365378f",
        "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
      },
    };
    setLoading(()=>true);
    fetch(
      `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${input}&per_page=8&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setList(response.hits);
        setLoading(()=>false);
      })
      .catch((err) => console.error(err));
  }, [input]);

  return (
    <div
      className={
        isScrolled ? clsx(style.wrapper, style.scroll) : clsx(style.wrapper)
      }
    >
      {/* ------------------LEFT--------------------- */}
      <div className={clsx(style.left)}>
        <div className={clsx(style.historyBtn)} onClick={backHistory}>
          <FontAwesomeIcon icon={faArrowLeft} className={clsx(style.icon)} />
        </div>
        <div className={clsx(style.historyBtn)} onClick={forwardHistory}>
          <FontAwesomeIcon icon={faArrowRight} className={clsx(style.icon)} />
        </div>
        <div className={input.trim() !== "" ?clsx(style.search,style.searchActive):clsx(style.search)}>
          <div className={clsx(style.inputSearch)}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={clsx(style.icon)}
            />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck="false"
              placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát,..."
            />
            <FontAwesomeIcon
              icon={faXmark}
              className={clsx(style.icon)}
              onClick={clearInput}
            />
          </div>
          {input.trim() !== "" && (
            <div className={clsx(style.suggestion)}>
              <div className={clsx(style.list)}>
                {list.map((item, index) => {
                  return (
                    <div key={index} className={clsx(style.item)}>
                      {loading && (
                        <div className={clsx(style.loadingImg)}></div>
                      )}
                      {!loading && (
                        <img src={item.result.header_image_url} alt="" />
                      )}

                      <div className={clsx(style.info)}>
                        {loading && (
                          <div className={clsx(style.loadingText)}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        )}
                        {!loading && <h1>{item.result.title}</h1>}
                        {!loading && <p>{item.result.artist_names}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --------------------RIGHT----------------------- */}
      <div className={clsx(style.right)}>
        <div className={clsx(style.btn)}>
          <FontAwesomeIcon icon={faShirt} />
        </div>
        <div className={clsx(style.btn)}>
          <FontAwesomeIcon icon={faArrowUpFromBracket} />
        </div>
        <div className={clsx(style.btn)}>
          <FontAwesomeIcon icon={faGear} />
        </div>
        <div className={clsx(style.avatar)}>
          <img
            src="https://i.pinimg.com/564x/f8/fa/d2/f8fad2b691d51fe8514f0bb5f4b2e53f.jpg"
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
