import React, { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import GridLoader from "react-spinners/GridLoader";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Registration } from "./pages/registration/Registration";
import { Login } from "./pages/login/Login";
import { checkAuth } from "./store/slice/user";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const App = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
    setLoading(false);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="loader">
          <GridLoader color="#b8b8b8" loading={loading} size={70} />
        </div>
      ) : (
        <>
          <>
            <Header userInfo={userInfo} />
          </>
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </>
        </>
      )}
    </div>
  );
};

export default App;
