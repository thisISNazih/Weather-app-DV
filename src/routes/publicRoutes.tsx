
import { routeConstants } from '../constants/routeConstants';
import Dashboard from '../components/dashboard/dashboard';
import LocationInfo from '../components/locationInfo/locationInfo';

const publicRoutes = [
  {
    path: routeConstants.DASHBOARD,
    component: <Dashboard />,
  },
  {
    path: routeConstants.CITY,
    component: <LocationInfo />,
  },
]

export default publicRoutes;