import ss from "./Rating.module.scss";
import { Api } from "@/utils/api";
import React from "react";

interface RatingProps {
  id: number;
  rating: number;
}

export const Rating: React.FC<RatingProps> = ({ id, rating: ratingValue }) => {
  const [rating, setRating] = React.useState(ratingValue);
  const [ratedUp, setRatedUp] = React.useState(true);
  const [ratedDown, setRatedDown] = React.useState(true);
  const [lastVote, setLastVote] = React.useState<string | null>(null);

  console.log(lastVote);

  // React.useEffect(() => {
  //   const ratedUpLocal = localStorage.getItem("ratedUp");
  //   const ratedDownLocal = localStorage.getItem("ratedDown");
  //   if (ratedUpLocal === "true") {
  //     setRatedUp(true);
  //   }
  //   if (ratedDownLocal === "true") {
  //     setRatedDown(true);
  //   }
  // }, []);

  const onChangeRating = async (type: string) => {
    if (type === "+") {
      if (lastVote !== "upvote") {
        setRating(rating + 1);
        setLastVote("upvote");
      } else {
        setRating(rating - 1);
        setLastVote(null);
      }
    } else if (type === "-") {
      if (lastVote !== "downvote") {
        setRating(rating - 1);
        setLastVote("downvote");
      } else {
        setRating(rating + 1);
        setLastVote(null);
      }
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        // await Api().answer.update(id, { rating });
      } catch (err) {
        console.warn(err);
        alert("Ошибка при изменении рейтинга");
      }
    })();
  }, [rating]);

  React.useEffect(() => {
    // if (lastVote) {
    //   localStorage.setItem(`lastVote`, lastVote);
    // }
  }, [lastVote]);

  React.useEffect(() => {
    // const storedLastVote = localStorage.getItem(`lastVote`);
    // if (storedLastVote) {
    //   setLastVote(storedLastVote);
    // }
  }, []);

  return (
    <div className={ss.rating}>
      <svg
        onClick={() => onChangeRating("+")}
        className={ss.arrow}
        width="20"
        height="20"
      >
        <use xlinkHref="../img/icons/icons.svg#arrow-up" />
      </svg>
      <div className={ss.number}>{rating}</div>
      <svg
        onClick={() => onChangeRating("-")}
        className={ss.arrow}
        width="20"
        height="20"
      >
        <use xlinkHref="../img/icons/icons.svg#arrow-down" />
      </svg>
    </div>
  );
};
