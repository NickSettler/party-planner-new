import {
  EventDetailsCardHook,
  EventDetailsCardProps,
} from "./EventDetailsCard.types";
import { useEffect, useState } from "react";
import MapboxHelper from "../../../helpers/geo/mapbox";
import { useParams } from "react-router-dom";
import { EventModel } from "../../../helpers/api/model";
import Nominatim, {
  NominatimFeatureProperties,
} from "../../../helpers/geo/nominatim";
import { Feature, Geometry } from "../../../helpers/geo/types";

const useEventDetailsCard = ({
  events,
}: EventDetailsCardProps): EventDetailsCardHook => {
  const params = useParams<{
    id: string;
  }>();

  const [currentEvent, setCurrentEvent] = useState<EventModel>(
    events.find((event: EventModel) => `${event.id}` === `${params.id!}`)!
  );

  const [mapImageUrl, setMapImageUrl] = useState<false | string>(false);
  const [addressInfo, setAddressInfo] = useState<
    false | Feature<Geometry, NominatimFeatureProperties>
  >(false);

  useEffect(() => {
    setCurrentEvent(
      events.find((event: EventModel) => `${event.id}` === `${params.id!}`)!
    );
  }, [events, params.id]);

  useEffect(() => {
    if (!mapImageUrl && currentEvent?.location) {
      const url = MapboxHelper.getInstance()
        .staticClient.getStaticImage({
          ownerId: "nicksettler",
          styleId: "ckytdjqxk000d14lcmq0ib37y",
          width: 600,
          height: 300,
          position: {
            coordinates: [
              currentEvent.location.coordinates[0],
              currentEvent.location.coordinates[1],
            ],
            zoom: 16,
          },
          overlays: [
            {
              marker: {
                coordinates: currentEvent.location.coordinates,
                color: "#FF0000",
              },
            },
          ],
        })
        .url();

      setMapImageUrl(url);
    }
  }, [mapImageUrl, currentEvent]);

  useEffect(() => {
    if (!addressInfo && currentEvent?.location)
      Nominatim.getCoordinatesInfo(
        currentEvent.location.coordinates[1],
        currentEvent.location.coordinates[0]
      ).then((d) => setAddressInfo(d.features[0]));
  }, [addressInfo, currentEvent]);

  return {
    mapImageUrl,
    addressInfo,
    currentEvent,
  };
};

export default useEventDetailsCard;
