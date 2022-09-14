import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WeatherService from '../../services/weatherService';
import { CityWeatherDetails } from '../../helper/models';

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
  const [cityWeatherInfo, setCityWeatherInfo] = useState<
    Array<CityWeatherDetails>
  >([]);
  useEffect(() => {
    Promise.all([
      WeatherService(
        citiesMap.Stuttgart.lat,
        citiesMap.Stuttgart.lon,
        'metric'
      ),
      WeatherService(citiesMap.London.lat, citiesMap.London.lon, 'metric'),
    ]).then((values) => {
      let citiesWeatherInfo: Array<CityWeatherDetails> = [];
      values.forEach((v) => {
        let cityWeather: CityWeatherDetails = {
          name: v.data.name,
          temp: v.data.main.temp,
          id: v.data.id,
          humidity: v.data.main.humidity,
          pressure: v.data.main.pressure,
          temp_max: v.data.main.temp_max,
          temp_min: v.data.main.temp_min,
          sun_rise: v.data.sys.sunrise,
          sun_set: v.data.main.sunset,
        };
        citiesWeatherInfo.push(cityWeather);
      });
      setCityWeatherInfo(citiesWeatherInfo);
    });
  }, []);

  return (
    <div className='dashboard-wrapper'>
      {cityWeatherInfo?.map((city) => {
        return (
          <Link
            state={cityWeatherInfo.filter((c) => {
              return c.name === city.name;
            })}
            to={`/${city.name}`}
          >
            <div key={city.id} className='dashboard-wrapper__city'>
              <span>{city.name}</span>
              <span>{city.temp}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Dashboard;
