import { useLocation } from 'react-router-dom';
import { CityWeatherDetails } from '../../helper/models';

const LocationInfo = () => {
  const location = useLocation();
  const state = location.state as { from: CityWeatherDetails };
  return <div>LocationInfo</div>;
};

export default LocationInfo;
