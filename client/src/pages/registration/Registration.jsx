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
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [accessPassword, setAccessPassword] = useState();
  const [errorValidate, setError] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
    if (password !== accessPassword) {
      setError(true);
    }
  }, [password, accessPassword]);

  if(loading) {
    return navigate("/login")
  }

  const setRegistration = () => {
    dispatch(fetchUserRegistration({ fullName, email, phone, password }));
  };

  return (
    <>
      {loading ? (
        <GridLoader color="#b8b8b8" loading={loading} size={70} />
      ) : (
        <div className={Styles.Registration}>
          <Input label={"ФИО"} setState={setFullName} state={fullName} />
          <Input
            label={"Email"}
            type={"email"}
            setState={setEmail}
            state={email}
          />
          <Input label={"Телефон"} setState={setPhone} state={phone} />
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
      )}
    </>
  );
};
