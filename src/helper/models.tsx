export interface CityWeatherDetails {
  name: string;
  temp: number;
  id: number;
  humidity: number;
  temp_unit: string;
  temp_max: number;
  temp_min: number;
  sun_rise: string;
  sun_set: string;
  description: string;
  icon: string;
  visibility: number;
}
export interface Coordinates {
  lat: number;
  lon: number;
}
