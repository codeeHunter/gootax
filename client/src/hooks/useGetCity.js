import axios from "axios";
import React, { useEffect, useState } from "react";

export const useGetCity = () => {
  const [city, setCity] = useState("");

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setCity(res.data.city);
  };

  useEffect(() => {
    getData();
  }, []);

  return city;
};
