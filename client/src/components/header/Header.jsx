import React from "react";
import Styles from "./Header.module.scss";
import { Link } from "react-router-dom";

export const Header = ({ userInfo }) => {
  return (
    <div className={Styles.Header}>
      <div className={Styles.logo}>
        <h2>
          <Link to="/">Города</Link>
        </h2>
      </div>
      <div className={Styles.Navbar}>
        <ul>
          <li>
            {!userInfo.isActivated ? (
              <>
                <Link to="/registration">Регистрация</Link>
                <Link to="/login">Авторизация</Link>
              </>
            ) : (
              userInfo.email
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
