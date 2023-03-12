import ss from "./Rating.module.scss";
import React from "react";

interface RatingProps {
  rating: number;
}

export const Rating: React.FC<RatingProps> = ({ rating: ratingValue }) => {
  const [rating, setRating] = React.useState(ratingValue);
  const [ratedUp, setRatedUp] = React.useState(false);
  const [ratedDown, setRatedDown] = React.useState(false);

  React.useEffect(() => {
    const ratedUpLocal = localStorage.getItem("ratedUp");
    const ratedDownLocal = localStorage.getItem("ratedDown");
    if (ratedUpLocal === "true") {
      setRatedUp(true);
    }
    if (ratedDownLocal === "true") {
      setRatedDown(true);
    }
  }, []);

  const onChangeRating = async (type: string) => {
    try {
      if (type === "+") {
        // await Api().answer.update(id, { rating: rating + 1 });
        if (!ratedUp) {
          setRating(rating + 1);
          setRatedUp(true);
          localStorage.setItem("ratedUp", "true");
        }
        if (ratedDown) {
          setRating(rating + 1);
          setRatedUp(true);
          setRatedDown(false);
          localStorage.setItem("ratedDown", "false");
          localStorage.setItem("ratedUp", "true");
        }
      } else if (type === "-") {
        // await Api().answer.update(id, { rating: rating - 1 });
        if (!ratedDown) {
          setRating(rating - 1);
          setRatedDown(true);
          localStorage.setItem("ratedDown", "true");
        }
        if (ratedUp) {
          setRating(rating - 1);
          setRatedDown(true);
          setRatedUp(false);
          localStorage.setItem("ratedUp", "false");
          localStorage.setItem("ratedDown", "true");
        }
      }
    } catch (err) {
      console.warn(err);
      alert("Ошибка при изменении рейтинга");
    }
  };

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
