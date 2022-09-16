import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import WeatherService from '../../services/weatherService';
import { CityWeatherDetails } from '../../helper/models';
import { Coordinates } from '../../helper/models';
import { convertUnixToTime } from '../../helper/general';
import Loader from '../../sharedComponents/Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import './dashboard.scss';

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
  const userEnteredLocation = localStorage.getItem(`user'sLocation`);
  const [userStoredLocation, setUserStoredLocation] = useState<Coordinates>(
    userEnteredLocation ? JSON.parse(userEnteredLocation) : {}
  );
  const [cityWeatherInfo, setCityWeatherInfo] = useState<
    Array<CityWeatherDetails>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  const [showBrowserLocationMessage, setShowBrowserLocationMessage] =
    useState<boolean>(false);
  const [tempUnit, setTempUnit] = useState<string>(
    userTempUnit ? userTempUnit : 'metric'
  );

  const getBrowserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let locCordinates = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setUserStoredLocation(locCordinates);
        localStorage.setItem(`user'sLocation`, JSON.stringify(locCordinates));
        setShowBrowserLocationMessage(false);
      },
      () => {
        setShowBrowserLocationMessage(true);
        return false;
      }
    );
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
    if (userStoredLocation && Object.keys(userStoredLocation).length === 0) {
      toast(
        'Please allow the browser to access your location to get your weather data',
        {
          autoClose: false,
        }
      );
      setShowBrowserLocationMessage(true);
      getBrowserLocation();
    } else {
      setShowBrowserLocationMessage(false);
    }
    Promise.all([
      userStoredLocation &&
        Object.keys(userStoredLocation).length != 0 &&
        WeatherService(
          userStoredLocation?.lat!,
          userStoredLocation?.lon!,
          tempUnit
        ),
      WeatherService(
        citiesMap.Stuttgart.lat,
        citiesMap.Stuttgart.lon,
        tempUnit
      ),
      WeatherService(citiesMap.London.lat, citiesMap.London.lon, tempUnit),
    ])
      .then((values) => {
        mapWeatherValues(values);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(true);
        toast('Network error occured or unauthorized', {
          type: toast.TYPE.ERROR,
        });
      });
  }, [userStoredLocation, tempUnit, showBrowserLocationMessage]);

  const mapWeatherValues = (values: any) => {
    let citiesWeatherInfo: Array<CityWeatherDetails> = [];
    values.forEach((v: any) => {
      if (v) {
        let cityWeather: CityWeatherDetails = {
          name: v.data.name,
          temp: Math.round(v.data.main.temp),
          id: v.data.id,
          humidity: v.data.main.humidity,
          temp_unit: tempUnit === 'metric' ? '°C' : '°F',
          temp_max: Math.round(v.data.main.temp_max),
          temp_min: Math.round(v.data.main.temp_min),
          sun_rise: convertUnixToTime(v.data.sys.sunrise),
          sun_set: convertUnixToTime(v.data.sys.sunset),
          description: v.data.weather[0].description,
          visibility: v.data.visibility / 1000,
          icon: v.data.weather[0].icon,
        };
        citiesWeatherInfo.push(cityWeather);
      }
    });
    setCityWeatherInfo(citiesWeatherInfo);
  };

  return (
    <div className='dashboard-container'>
      <div className='unitSwitcher'>
        <button onClick={onSwitchUnitHandler}>
          switch to {tempUnit === 'metric' ? '°F' : '°C'}
        </button>
      </div>
      <div className='dashboard-container__cities' data-testid='cities'>
        {isLoading && <Loader />}
        {(showBrowserLocationMessage || isError) && (
          <ToastContainer limit={1} />
        )}
        {cityWeatherInfo?.map((city) => {
          return (
            city && (
              <Link
                state={cityWeatherInfo.filter((c) => {
                  return c.name === city.name;
                })}
                to={`/${city.name.replace(/\s/g, '-')}`}
                data-testid='cityData'
                key={city.id}
              >
                <div className='placeholder'>
                  <div className='details' key={city.id}>
                    <span className='cityname'>{city.name}</span>
                    <span className='currentTemp'>
                      {city.temp} {tempUnit === 'metric' ? '°C' : '°F'}
                    </span>
                    <img
                      src={`http://openweathermap.org/img/w/${city.icon}.png`}
                    />
                  </div>
                </div>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
