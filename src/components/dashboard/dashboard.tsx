import React, { useEffect, useState } from 'react';
import { promises } from 'stream';
import WeatherService from '../../services/weatherService';

const citiesMap = {
  Stuttgart: {
    lat: 48.783333,
    lon: 9.183333,
  },
  London: {
    lat: 51.5072,
    lon: 0.1276,
  },
};
const Dashboard = () => {
  const [citiesData, setCitiesData] = useState([]);
  useEffect(() => {
    Promise.all([
      WeatherService(citiesMap.Stuttgart.lat, citiesMap.Stuttgart.lon),
      WeatherService(citiesMap.London.lat, citiesMap.London.lon),
    ]).then((values) => {
      values.forEach((v) => {
        console.log(v.data);
      });
    });
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
