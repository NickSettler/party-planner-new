import axios, { AxiosResponse } from "axios";
import { FeatureCollection, Geometry } from "./types";

export type NominatimFeatureProperties = {
  place_id: number;
  osm_id: number;
  osm_type: string;
  place_rank: number;
  category: string;
  type: string;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    house_number: string;
    road: string;
    suburb: string;
    city: string;
    municipality: string;
    country: string;
    state: string;
    postcode: string;
    county: string;
    country_code: string;
  };
};

const getUrl = (lat: string | number, lng: string | number) =>
  `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=geojson`;

export default class Nominatim {
  public static async getCoordinatesInfo(
    lat: string | number,
    lng: string | number
  ): Promise<FeatureCollection<Geometry, NominatimFeatureProperties>> {
    return axios
      .get(getUrl(lat, lng))
      .then(
        (
          res: AxiosResponse<
            FeatureCollection<Geometry, NominatimFeatureProperties>
          >
        ) => res.data
      );
  }
}
