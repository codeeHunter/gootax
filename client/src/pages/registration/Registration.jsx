import React, { useEffect, useState } from "react";
import { Input } from "../../components/input/Input";
import Styles from "./Registration.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserRegistration } from "../../store/slice/user";
import GridLoader from "react-spinners/GridLoader";

export const Registration = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [accessPassword, setAccessPassword] = useState();
  const [errorValidate, setError] = useState(false);
  const dispatch = useDispatch();
  const { status, error, statusAuth } = useSelector((state) => state.user);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
    if (password !== accessPassword) {
      setError(true);
    }
  }, [password, accessPassword]);

  useEffect(() => {
    if (statusAuth) {
      return navigate("/login");
    }
  }, [statusAuth]);

  const setRegistration = () => {
    dispatch(fetchUserRegistration({ fullName, email, phoneNumber, password }));
  };

  return (
    <>
      {!status ? (
        <div className={Styles.Registration}>
          <Input label={"ФИО"} setState={setFullName} state={fullName} />
          <Input
            label={"Email"}
            type={"email"}
            setState={setEmail}
            state={email}
          />
          <Input
            label={"Телефон"}
            setState={setPhoneNumber}
            state={phoneNumber}
          />
          <Input
            label={"Придумайте пароль"}
            type={"password"}
            setState={setPassword}
            state={password}
            error={errorValidate}
          />
          <Input
            label={"Потвердите пароль"}
            type={"password"}
            setState={setAccessPassword}
            state={accessPassword}
            error={errorValidate}
          />
          <div className={Styles.btn}>
            <button disabled={errorValidate} onClick={setRegistration}>
              Зарегистрироваться
            </button>
          </div>
        </div>
      ) : (
        <>
          <GridLoader color="#b8b8b8" loading={status} size={70} />
        </>
      )}
    </>
  );
};
