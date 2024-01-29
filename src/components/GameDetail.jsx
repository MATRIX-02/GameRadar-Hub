/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { smallImage } from "../../util";
// IMAGES
import playstation from "../img/playstation.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import steam from "../img/steam.svg";
import gamepad from "../img/gamepad.svg";
import apple from "../img/apple.svg";
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";

const GameDetail = ({ pathId }) => {
  const history = useNavigate();

  // Data
  const { screen, game, isLoading } = useSelector((state) => state.detail);
  // Exit Detail
  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      history("/GameRadar-Hub");
    }
  };

  // GET PLATFORM IMAGES
  const getPlatform = (platform) => {
    switch (platform) {
      case "PlayStation 4":
      case "PlayStation 5":
        return playstation;
      case "Xbox One":
      case "Xbox Series S/X":
        return xbox;
      case "PC":
      case "Linux":
        return steam;
      case "Nintendo Switch":
      case "Wii U":
      case "Wii":
        return nintendo;
      case "macOS":
      case "iOS":
        return apple;
      default:
        return gamepad;
    }
  };

  // Get Stars
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull} />);
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty} />);
      }
    }
    return stars;
  };

  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailHandler}>
          <Detail layoutId={pathId}>
            <Stats>
              <Rating className="rating">
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                <p>Rating: {game.rating}</p>
                {getStars()}
              </Rating>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.platforms?.map((data) => (
                    <img
                      key={data.platform.id}
                      src={getPlatform(data.platform.name)}
                    ></img>
                  ))}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img
                layoutId={`image ${pathId}`}
                src={smallImage(game.background_image, 1280)}
                alt="image"
              />
            </Media>
            <Gallery className="gallery">
              {screen.results?.map((screen) => (
                <img
                  src={smallImage(screen.image, 1280)}
                  alt={game.name}
                  key={screen.id}
                />
              ))}
            </Gallery>
            <Description>
              <p>{game.description_raw}</p>
            </Description>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 10;
  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;

    img[alt="star"] {
      width: 1rem;
      height: 1rem;
    }
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;

    @media (max-width: 769px) {
      height: 1.5rem;
      width: 1.75rem;
    }
  }

  @media (max-width: 769px) {
    flex-direction: column;
  }
`;

const Info = styled(motion.div)`
  text-align: center;

  @media (max-width: 769px) {
    h3 {
      padding: 0.5rem;
    }
  }
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
    @media (max-width: 768px) {
      margin-left: 0.5rem;
    }
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const Rating = styled(motion.div)`
  @media (max-width: 768px) {
    h3 {
      padding: 0px;
      font-size: 11px;
      text-align: center;
      width: 100%;
    }
    p {
      margin-top: 5px;
    }
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;

  @media (max-width: 768px) {
    margin: 0.75rem 0rem;
  }
`;

const Gallery = styled(motion.div)`
  @media (max-width: 768px) {
    img {
      margin-top: 0.55rem;
    }
  }
`;

export default GameDetail;
