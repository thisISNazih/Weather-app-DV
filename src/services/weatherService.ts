import axios from 'axios';
import { API } from '../constants/api';

 const WeatherService =  (lat:number,lon:number,unit:string) => {
        return axios.get(`${API.GET_LOCATION_WEATHER}`,{ params: {units:unit, lat: lat,lon:lon,appid:process.env.REACT_APP_API_ID } })
}

export default WeatherService;