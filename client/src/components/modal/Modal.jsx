import React, { useEffect } from "react";
import Styles from "./Modal.module.scss";

export const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={
        active ? [Styles.Modal, Styles.Modal__active].join(" ") : Styles.Modal
      }
      onClick={() => setActive(false)}
    >
      <div
        className={
          active
            ? [Styles.Modal__content, Styles.Modal__content__active].join(" ")
            : Styles.Modal__content
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
