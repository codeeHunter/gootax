import React from "react";
import { useDispatch } from "react-redux";
import { getReviews } from "../../store/slice/city";
import Styles from "./City.module.scss";

export const City = ({ name, id, setChoice }) => {
  const dispatch = useDispatch();

  const setCity = () => {
    dispatch(getReviews(id));
    setChoice(name);
  };

  return (
    <div className={Styles.City} onClick={setCity}>
      <h3>{name}</h3>
    </div>
  );
};
