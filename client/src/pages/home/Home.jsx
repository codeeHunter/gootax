import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { City } from "../../components/city/City";
import { Input } from "../../components/input/Input";
import { Modal } from "../../components/modal/Modal";
import { Reviews } from "../../components/reviews/Reviews";
import { useGetCity } from "../../hooks/useGetCity";
import { createCity, fetchCities } from "../../store/slice/city";
import Styles from "./Home.module.scss";

export const Home = () => {
  const [show, setShow] = useState(true);
  const city = useGetCity();
  const { statusAuth, choiceCity } = useSelector((state) => state.user);
  const { status, cityInfo, reviewsInfo } = useSelector((state) => state.city);
  const [truthCity, setTruthCity] = useState();
  const [choice, setChoice] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!truthCity) {
      dispatch(fetchCities());
    }
  }, [truthCity]);

  return (
    <div>
      {city && statusAuth && (
        <Modal title="Город" active={show} setActive={setShow}>
          <div className={Styles.ModalInfo}>
            <p>Ваш город Izhevsk?</p>
          </div>
          <div className={Styles.SubModal}>
            <button
              onClick={() => {
                setTruthCity(true);
                setShow(false);
              }}
            >
              Да
            </button>
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
      {!choice ? (
        <>
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
        </>
      ) : (
        <Reviews reviews={reviewsInfo} />
      )}
    </div>
  );
};
