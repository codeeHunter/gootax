import React, { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import GridLoader from "react-spinners/GridLoader";
import { Routes, Route } from "react-router-dom";
import { City } from "./pages/city/City";
import { Registration } from "./pages/registration/Registration";
import { Login } from "./pages/login/Login";

const preloader = {
  display: "flex",
  height: "90vh",
  alignItems: "center",
  margin: "0 auto",
  borderColor: "red",
};

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <GridLoader
          color="#b8b8b8"
          cssOverride={preloader}
          loading={loading}
          size={70}
        />
      ) : (
        <>
          <>
            <Header />
          </>
          <>
            <Routes>
              <Route path="/city" element={<City />} />
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
