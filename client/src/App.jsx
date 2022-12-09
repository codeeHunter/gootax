import React, { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import GridLoader from "react-spinners/GridLoader";
import { Routes, Route, useNavigate } from "react-router-dom";
import { City } from "./pages/city/City";
import { Registration } from "./pages/registration/Registration";
import { Login } from "./pages/login/Login";
import { checkAuth } from "./store/slice/user";
import { useSelector } from "react-redux";
import { useGetCity } from "./hooks/useGetCity";

const App = () => {
  const [loading, setLoading] = useState(false);
  const { statusAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("token")) {
      checkAuth();
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
            <Header />
          </>
          <>
            <Routes>
              <Route path="/" element={<City />} />
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
