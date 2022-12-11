import React, { useEffect, useState } from "react";
import { Input } from "../input/Input";
import Styles from "./Reviews.module.scss";
import city from "./city.json";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createCity,
  createReviews,
  editReviews,
  getReviews,
} from "./../../store/slice/city";

export const Reviews = ({ reviews, nameCity = "Ижевск" }) => {
  const [review, setReview] = useState();
  const [nameReview, setNameReview] = useState();
  const [rating, setRating] = useState();
  const [error, setError] = useState(false);
  const [cityName, setCity] = useState("");
  const { cityInfo, isCreate } = useSelector((state) => state.city);
  const [choice, setChoice] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { statusAuth } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [reviewRating, setReviewRating] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (rating > 0 && rating <= 5) {
      setError(false);
    } else {
      setError(true);
    }
  }, [rating]);

  let filtersCities = city.filter((city) => {
    return city.name.toLowerCase().includes(cityName.toLowerCase());
  });

  const setCities = (item) => {
    setChoice((prev) => [...prev, item.name]);
  };

  const addReviews = () => {
    cityInfo.map((item) => {
      choice.map((city) => {
        if (city.toLowerCase() !== item.name.toLowerCase()) {
          dispatch(createCity(city));
        }
      });
    });
    choice.map((city) =>
      dispatch(
        createReviews({ selectedImage, nameReview, review, rating, city })
      )
    );
  };

  const setEditReview = ({ _id }) => {
    dispatch(editReviews({ _id, name, text, reviewRating }));
  };

  useEffect(() => {
    dispatch(getReviews(nameCity));
  }, [isCreate]);

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
        <input
          type="file"
          onChange={(e) => {
            setSelectedImage(e.target.files[0]);
          }}
        />
        <button onClick={addReviews}>Добавить отзыв</button>

        <div className={Styles.Form}>
          <Input
            state={cityName}
            setState={setCity}
            label={"Города"}
            onClick={() => setIsOpen(true)}
          />
          <ul className={Styles.Autocomplete}>
            {isOpen &&
              filtersCities.map((item) => {
                return (
                  <li
                    className={Styles.Autocomplete__item}
                    onClick={() => {
                      setCities(item);
                      setCity("");
                    }}
                  >
                    {item.name}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={Styles.SelectedCities}>
          <p>
            Выбранные города:
            {choice.map((item, index) => (
              <span key={item._id}>
                {item}
                {choice.length === index + 1 ? "." : ","}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className={Styles.ListReviews}>
        {reviews.map((item) => {
          let imgSrc = "http://localhost:5000/";
          for (let i = 0; i < item.image.length; i++) {
            if (i === 7) {
              imgSrc += "/";
            } else {
              imgSrc += item.image[i];
            }
          }

          return (
            <div className={Styles.Review} key={item._id}>
              <img src={imgSrc} alt="" />

              <p>
                Название:{" "}
                <input
                  type="text"
                  placeholder={`${item.title}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </p>
              <p>
                Текст:{" "}
                <input
                  type="text"
                  placeholder={`${item.text}`}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </p>
              <p>
                Рейтинг:{" "}
                <input
                  type="number"
                  placeholder={`${item.rating}`}
                  value={reviewRating}
                  onChange={(e) => setReviewRating(e.target.value)}
                />
              </p>
              {statusAuth && (
                <>
                  <p>ФИО: {item.author.fio}</p>
                  <p>Почта: {item.author.email}</p>
                  <p>Номер: {item.author.phone}</p>
                  <button onClick={() => setEditReview(item)}>
                    Редактировать отзыв
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
