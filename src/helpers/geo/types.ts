// GeoJson 7946.0
// Project: https://geojson.org/

/**
 * https://tools.ietf.org/html/rfc7946#section-1.4
 */
export type GeoJsonGeometryTypes = Geometry["type"];

/**
 * https://tools.ietf.org/html/rfc7946#section-1.4
 */
export type GeoJsonTypes = GeoJSON["type"];

/**
 * https://tools.ietf.org/html/rfc7946#section-5
 */
export type BBox =
  | [number, number, number, number]
  | [number, number, number, number, number, number];

/**
 * https://tools.ietf.org/html/rfc7946#section-3.1.1
 */
export type Position = number[];

/**
 * https://tools.ietf.org/html/rfc7946#section-3
 * (https://tools.ietf.org/html/rfc7946#section-6.1)
 */
export interface GeoJsonObject {
  type: GeoJsonTypes;
  /**
   * https://tools.ietf.org/html/rfc7946#section-5
   */
  bbox?: BBox | undefined;
}

export type GeoJSON = Geometry | Feature | FeatureCollection;

/**
 * https://tools.ietf.org/html/rfc7946#section-3
 */
export type Geometry =
  | Point
  | MultiPoint
  | LineString
  | MultiLineString
  | Polygon
  | MultiPolygon
  | GeometryCollection;
export type GeometryObject = Geometry;

/**
 * https://tools.ietf.org/html/rfc7946#section-3.1.2
 */
export interface Point extends GeoJsonObject {
  type: "Point";
  coordinates: Position;
}

/**
 *  https://tools.ietf.org/html/rfc7946#section-3.1.3
 */
export interface MultiPoint extends GeoJsonObject {
  type: "MultiPoint";
  coordinates: Position[];
}

/**
 * https://tools.ietf.org/html/rfc7946#section-3.1.4
 */
export interface LineString extends GeoJsonObject {
  type: "LineString";
  coordinates: Position[];
}

/**
 * https://tools.ietf.org/html/rfc7946#section-3.1.5
 */
export interface MultiLineString extends GeoJsonObject {
  type: "MultiLineString";
  coordinates: Position[][];
}

/**
 * https://tools.ietf.org/html/rfc7946#section-3.1.6
 */
export interface Polygon extends GeoJsonObject {
  type: "Polygon";
  coordinates: Position[][];
}

/**
 * https://tools.ietf.org/html/rfc7946#section-3.1.7
 */
export interface MultiPolygon extends GeoJsonObject {
  type: "MultiPolygon";
  coordinates: Position[][][];
}

/**
 * https://tools.ietf.org/html/rfc7946#section-3.1.8
 */
export interface GeometryCollection extends GeoJsonObject {
  type: "GeometryCollection";
  geometries: Geometry[];
}

export type GeoJsonProperties = { [name: string]: any } | null;

/**
 * https://tools.ietf.org/html/rfc7946#section-3.2
 */
export interface Feature<
  G extends Geometry | null = Geometry,
  P = GeoJsonProperties
> extends GeoJsonObject {
  type: "Feature";
  geometry: G;
  /**
   * https://tools.ietf.org/html/rfc7946#section-3.2.
   */
  id?: string | number | undefined;
  properties: P;
}

/**
 *  https://tools.ietf.org/html/rfc7946#section-3.3
 */
export interface FeatureCollection<
  G extends Geometry | null = Geometry,
  P = GeoJsonProperties
> extends GeoJsonObject {
  type: "FeatureCollection";
  features: Array<Feature<G, P>>;
}
