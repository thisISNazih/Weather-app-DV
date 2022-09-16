import { useLocation } from 'react-router-dom';
import { CityWeatherDetails } from '../../helper/models';
import { Link } from 'react-router-dom';
import './locationInfo.scss';

const LocationInfo = () => {
  const location = useLocation();
  const state = location.state as Array<CityWeatherDetails>;
  return (
    <div className='locationInfo'>
      <Link to={'/'} className='back-button'>
        Back
      </Link>
      <h3 className='locationInfo__name'>{state?.[0].name}</h3>

      <div data-testid='non-empty' className='locationInfo__weatherDetails'>
        <div className='locationInfo__weatherDetails__main-info'>
          <span
            className='locationInfo__weatherDetails__main-info__description'
            data-testid='non-emptyDescription'
          >
            {state?.[0].description}
            <img
              src={`http://openweathermap.org/img/w/${state?.[0].icon}.png`}
            />
          </span>
          <span className='locationInfo__weatherDetails__main-info__main-temp'>
            {state?.[0].temp} {state?.[0].temp_unit}
          </span>
          <div className='locationInfo__weatherDetails__main-info__high-low'>
            <span className='locationInfo__weatherDetails__main-info__high-low__high-temp'>
              H: {state?.[0].temp_max}
              {state?.[0].temp_unit}
            </span>
            <span>
              L: {state?.[0].temp_min}
              {state?.[0].temp_unit}
            </span>
          </div>
        </div>
        <div className='locationInfo__weatherDetails__secondary-info'>
          <div className='locationInfo__weatherDetails__secondary-info__sun-set-rise'>
            <span>Sunrise: {state?.[0].sun_rise}</span>
            <span>Sunset: {state?.[0].sun_set}</span>
          </div>
          <div className='locationInfo__weatherDetails__secondary-info__hum-vis'>
            <span>Humidity: {state?.[0].humidity}%</span>
            <span>visibility: {state?.[0].visibility}km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
