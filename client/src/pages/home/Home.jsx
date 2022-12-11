import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { City } from "../../components/city/City";
import { Modal } from "../../components/modal/Modal";
import { Reviews } from "../../components/reviews/Reviews";
import { useGetCity } from "../../hooks/useGetCity";
import { fetchCities } from "../../store/slice/city";
import Styles from "./Home.module.scss";
import { getReviews } from "./../../store/slice/city";
import { GridLoader } from "react-spinners/GridLoader";

export const Home = () => {
  const [show, setShow] = useState(true);
  const city = useGetCity();
  const { statusAuth } = useSelector((state) => state.user);
  const { cityInfo, reviewsInfo, check, status } = useSelector(
    (state) => state.city
  );
  const [truthCity, setTruthCity] = useState();
  const [choice, setChoice] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!statusAuth && city) {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("checkChoice") == false) {
      setTruthCity(false);
    } else {
      getCity();
    }

    if (!truthCity) {
      dispatch(fetchCities());
    }
  }, [truthCity, show]);

  const getCity = () => {
    let cityId = "";
    cityInfo.map((item) => {
      if (item.name.toLowerCase() === "ижевск") {
        cityId = item._id;
      }
    });

    dispatch(getReviews(cityId));
    localStorage.setItem("checkChoice", true);
    setTruthCity(true);
    setShow(false);
  };

  return (
    <>
      <div>
        {check && (
          <Modal title="Город" active={show} setActive={setShow}>
            <div className={Styles.ModalInfo}>
              <p>Ваш город Izhevsk?</p>
            </div>
            <div className={Styles.SubModal}>
              <button onClick={getCity}>Да</button>
              <button
                onClick={() => {
                  setTruthCity(false);
                  setShow(false);
                }}
              >
                Нет
              </button>
            </div>
          </Modal>
        )}
        {choice.length == 0 ? (
          <div className={Styles.Input}>
            <div className={Styles.Cities}>
              {cityInfo &&
                cityInfo.map((item) => (
                  <City
                    name={item.name}
                    id={item._id}
                    key={item._id}
                    setChoice={setChoice}
                  />
                ))}
            </div>
          </div>
        ) : (
          <Reviews reviews={reviewsInfo} nameCity={choice} />
        )}
      </div>
    </>
  );
};
