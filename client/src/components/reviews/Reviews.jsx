import React, { useEffect, useState } from "react";
import { Input } from "../input/Input";
import Styles from "./Reviews.module.scss";
import city from "./city.json"

export const Reviews = ({ reviews }) => {
  const [review, setReview] = useState();
  const [nameReview, setNameReview] = useState();
  const [rating, setRating] = useState();
  const [error, setError] = useState(false);
  const [cityName, setCity] = useState("");

  useEffect(() => {
    if (rating > 0 && rating <= 5) {
      setError(false);
    } else {
      setError(true);
    }
  }, [rating]);

  useEffect(() => {
    city.map(item => {
      if(item === cityName) {
        
      }  
    })
  }, [cityName])

  return (
    <div>
      <div className={Styles.FormReview}>
        <Input setState={setNameReview} state={nameReview} label={"Название"} />
        <Input setState={setReview} state={review} label={"Отзыв"} />
        <Input
          type={"number"}
          setState={setRating}
          state={rating}
          label={"Рейтинг"}
          error={error}
        />
        <Input type="file" />
        <button>Добавить отзыв</button>

        <div className={Styles.Form}>
          <Input state={cityName} setState={setCity} label={"Города"} />
        </div>
      </div>
      {reviews.map((item) => {
        return <div className="" key={item._id}></div>;
      })}
    </div>
  );
};
