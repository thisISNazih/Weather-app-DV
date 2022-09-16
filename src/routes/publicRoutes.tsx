import { routeConstants } from '../constants/routes';
import Dashboard from '../components/Dashboard/Dashboard';
import LocationInfo from '../components/LocationInfo/LocationInfo';

const publicRoutes = [
  {
    path: routeConstants.DASHBOARD,
    component: <Dashboard />,
  },
  {
    path: routeConstants.CITY,
    component: <LocationInfo />,
  },
];

export default publicRoutes;
