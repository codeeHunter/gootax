import React, { useEffect, useState } from "react";
import { Input } from "../../components/input/Input";
import Styles from "./Registration.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slice/userSlice";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [accessPassword, setAccessPassword] = useState();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
    if (password !== accessPassword) {
      setError(true);
    }
  }, [password, accessPassword]);

  const setRegistration = () => {
    dispatch(setUser({ fullName, email, phoneNumber }));
  };

  if (userAuth) {
    return navigate("/login");
  }

  return (
    <div className={Styles.Registration}>
      <Input label={"ФИО"} setState={setFullName} state={fullName} />
      <Input label={"Email"} type={"email"} setState={setEmail} state={email} />
      <Input label={"Телефон"} setState={setPhoneNumber} state={phoneNumber} />
      <Input
        label={"Придумайте пароль"}
        type={"password"}
        setState={setPassword}
        state={password}
        error={error}
      />
      <Input
        label={"Потвердите пароль"}
        type={"password"}
        setState={setAccessPassword}
        state={accessPassword}
        error={error}
      />
      <div className={Styles.btn}>
        <button disabled={error} onClick={setRegistration}>
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};
