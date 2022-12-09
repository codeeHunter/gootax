import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Styles from "./Modal.module.scss";

export const Modal = (props) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className={Styles.modal} onClick={props.onClose}>
        <div
          className={Styles.modal_content}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={Styles.modal_header}>
            <h4 className={Styles.modal_title}>{props.title}</h4>
          </div>
          <div className={Styles.modal_body}>{props.children}</div>
          <div className={Styles.modal_footer}>
            <button onClick={props.onClose} className={Styles.button}>
              Close
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
