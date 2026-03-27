export type GeosearchResult = {
  geocoding: {
    version: string;
    attribution: string;
    query: {
      text: string;
      parser: string;
      parsed_text: {
        subject: string;
      };
      size: number;
      private: boolean;
      lang: {
        name: string;
        iso6391: string;
        iso6393: string;
        via: string;
        defaulted: boolean;
      };
      querySize: number;
    };
    engine: {
      name: string;
      author: string;
      version: string;
    };
    timestamp: number;
  };
  type: string;
  features: GeosearchFeature[];
  bbox: number[];
};

export type GeosearchFeature = {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    id: string;
    gid: string;
    layer: string;
    source: string;
    source_id: string;
    country_code: string;
    name: string;
    housenumber: string;
    street: string;
    postalcode: string;
    accuracy: string;
    country: string;
    country_gid: string;
    country_a: string;
    region: string;
    region_gid: string;
    region_a: string;
    county: string;
    county_gid: string;
    locality: string;
    locality_gid: string;
    locality_a: string;
    borough: string;
    borough_gid: string;
    neighbourhood: string;
    neighbourhood_gid: string;
    label: string;
    addendum: {
      pad: {
        bbl: string;
        bin: string;
        version: string;
      };
    };
  };
};
