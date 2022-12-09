import React, { useEffect, useState } from "react";
import { Input } from "../../components/input/Input";
import Styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAuthorization } from "../../store/slice/user";
import { useNavigate } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { userInfo, status } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const setAuth = () => {
    dispatch(fetchUserAuthorization({ email, password }));
  };

  if (!userInfo.isActivated) {
    return;
  }

  return (
    <>
      {status ? (
        <GridLoader color="#b8b8b8" loading={status} size={70} />
      ) : (
        <div className={Styles.Login}>
          <Input
            type={email}
            state={email}
            setState={setEmail}
            label={"Email"}
          />
          <Input
            type={"password"}
            state={password}
            setState={setPassword}
            label={"Пароль"}
          />
          <div className={Styles.btn}>
            <button onClick={setAuth}>Войти</button>
          </div>
        </div>
      )}
    </>
  );
};
