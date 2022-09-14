import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WeatherService from '../../services/weatherService';
import { CityWeatherDetails } from '../../helper/models';
import { Coordinates } from '../../helper/models';

const citiesMap = {
  Stuttgart: {
    lat: 48.783333,
    lon: 9.183333,
  },
  London: {
    lat: 51.509865,
    lon: -0.118092,
  },
};

const Dashboard = () => {
  const userTempUnit = localStorage.getItem('temperatureUnit');
  const [cityWeatherInfo, setCityWeatherInfo] = useState<
    Array<CityWeatherDetails>
  >([]);
  const [currentLocation, setCurrentLocation] = useState<Coordinates>();
  const [tempUnit, setTempUnit] = useState<string>(
    userTempUnit ? userTempUnit : 'metric'
  );

  const getBrowserLocation = () => {
    if (!navigator.geolocation) {
      alert('Location is not supported by the browser');
      return {
        lat: null,
        lon: null,
      };
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          return true;
        },
        () => {
          alert(`Something went wrong..,couldn't retrieve your location`);
          return false;
        }
      );
    }
  };

  const onSwitchUnitHandler = () => {
    if (tempUnit === 'metric') {
      setTempUnit('imperial');
      localStorage.setItem('temperatureUnit', 'imperial');
    } else {
      setTempUnit('metric');
      localStorage.setItem('temperatureUnit', 'metric');
    }
  };

  useEffect(() => {
    if (!currentLocation) {
      getBrowserLocation();
    }
    Promise.all([
      WeatherService(
        citiesMap.Stuttgart.lat,
        citiesMap.Stuttgart.lon,
        tempUnit
      ),
      WeatherService(citiesMap.London.lat, citiesMap.London.lon, tempUnit),
      currentLocation &&
        WeatherService(currentLocation?.lat!, currentLocation?.lon!, tempUnit),
    ]).then((values) => {
      mapWeatherValues(values);
    });
  }, [currentLocation, tempUnit]);

  const mapWeatherValues = (values: any) => {
    let citiesWeatherInfo: Array<CityWeatherDetails> = [];
    values.forEach((v: any) => {
      if (v) {
        let cityWeather: CityWeatherDetails = {
          name: v.data.name,
          temp: v.data.main.temp,
          id: v.data.id,
          humidity: v.data.main.humidity,
          pressure: v.data.main.pressure,
          temp_max: v.data.main.temp_max,
          temp_min: v.data.main.temp_min,
          sun_rise: v.data.sys.sunrise,
          sun_set: v.data.sys.sunset,
          description: v.data.weather[0].description,
        };
        citiesWeatherInfo.push(cityWeather);
      }
    });
    setCityWeatherInfo(citiesWeatherInfo);
  };

  return (
    <div className='dashboard-wrapper'>
      <button onClick={onSwitchUnitHandler}>
        switch to {tempUnit === 'metric' ? '°F' : '°C'}
      </button>
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
              <span>
                {city.temp} {tempUnit === 'metric' ? '°C' : '°F'}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Dashboard;
