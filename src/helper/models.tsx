export interface CityWeatherDetails {
  name: string;
  temp: number;
  id: number;
  humidity: number;
  pressure: number;
  temp_max: number;
  temp_min: number;
  sun_rise: string;
  sun_set: string;
  description: string;
}
export interface Coordinates {
  lat: number;
  lon: number;
}
