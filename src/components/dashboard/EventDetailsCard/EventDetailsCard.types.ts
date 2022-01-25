import { EventModel } from "../../../helpers/api/model";
import { Feature, Geometry } from "../../../helpers/geo/types";
import { NominatimFeatureProperties } from "../../../helpers/geo/nominatim";

export type EventDetailsCardProps = {
  events: Array<EventModel>;
};

export type EventDetailsCardHook = {
  mapImageUrl: string | false;
  addressInfo: Feature<Geometry, NominatimFeatureProperties> | false;
  currentEvent: EventModel;
};
