import {
  Combobox,
  useListCollection,
  MapPinIcon,
  Text,
} from "@nycplanning/streetscape";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { useFilter } from "@ark-ui/react/locale";
import {
  ComboboxInputValueChangeDetails,
  ListCollection,
} from "@ark-ui/react/combobox";
import type { ComboboxCollectionItemProps } from "@nycplanning/streetscape";

const geoSearchResults = [
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-73.958537, 40.809706],
    },
    properties: {
      id: "288546",
      gid: "nycpad:venue:288546",
      layer: "venue",
      source: "nycpad",
      source_id: "288546",
      country_code: "US",
      name: "1231 AMSTERDAM AVENUE",
      housenumber: "1231",
      street: "AMSTERDAM AVENUE",
      postalcode: "10027",
      accuracy: "point",
      country: "United States",
      country_gid: "whosonfirst:country:85633793",
      country_a: "USA",
      region: "New York",
      region_gid: "whosonfirst:region:85688543",
      region_a: "NY",
      county: "New York County",
      county_gid: "whosonfirst:county:102081863",
      locality: "New York",
      locality_gid: "whosonfirst:locality:85977539",
      locality_a: "NYC",
      borough: "Manhattan",
      borough_gid: "whosonfirst:borough:421205771",
      neighbourhood: "Morningside Heights",
      neighbourhood_gid: "whosonfirst:neighbourhood:85869509",
      label: "1231 AMSTERDAM AVENUE, New York, NY, USA",
      addendum: {
        pad: {
          bbl: "1019630030",
          bin: "1059521",
          version: "25d",
        },
      },
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-73.958537, 40.809706],
    },
    properties: {
      id: "288547",
      gid: "nycpad:venue:288547",
      layer: "venue",
      source: "nycpad",
      source_id: "288547",
      country_code: "US",
      name: "1233 AMSTERDAM AVENUE",
      housenumber: "1233",
      street: "AMSTERDAM AVENUE",
      postalcode: "10027",
      accuracy: "point",
      country: "United States",
      country_gid: "whosonfirst:country:85633793",
      country_a: "USA",
      region: "New York",
      region_gid: "whosonfirst:region:85688543",
      region_a: "NY",
      county: "New York County",
      county_gid: "whosonfirst:county:102081863",
      locality: "New York",
      locality_gid: "whosonfirst:locality:85977539",
      locality_a: "NYC",
      borough: "Manhattan",
      borough_gid: "whosonfirst:borough:421205771",
      neighbourhood: "Morningside Heights",
      neighbourhood_gid: "whosonfirst:neighbourhood:85869509",
      label: "1233 AMSTERDAM AVENUE, New York, NY, USA",
      addendum: {
        pad: {
          bbl: "1019630030",
          bin: "1059521",
          version: "25d",
        },
      },
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-73.956094, 40.810811],
    },
    properties: {
      id: "288908",
      gid: "nycpad:venue:288908",
      layer: "venue",
      source: "nycpad",
      source_id: "288908",
      country_code: "US",
      name: "413 WEST 123 STREET",
      housenumber: "413",
      street: "WEST 123 STREET",
      postalcode: "10027",
      accuracy: "point",
      country: "United States",
      country_gid: "whosonfirst:country:85633793",
      country_a: "USA",
      region: "New York",
      region_gid: "whosonfirst:region:85688543",
      region_a: "NY",
      county: "New York County",
      county_gid: "whosonfirst:county:102081863",
      locality: "New York",
      locality_gid: "whosonfirst:locality:85977539",
      locality_a: "NYC",
      borough: "Manhattan",
      borough_gid: "whosonfirst:borough:421205771",
      neighbourhood: "Morningside Heights",
      neighbourhood_gid: "whosonfirst:neighbourhood:85869509",
      label: "413 WEST 123 STREET, New York, NY, USA",
      addendum: {
        pad: {
          bbl: "1019640012",
          bin: "1059526",
          version: "25d",
        },
      },
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-73.956094, 40.810811],
    },
    properties: {
      id: "288912",
      gid: "nycpad:venue:288912",
      layer: "venue",
      source: "nycpad",
      source_id: "288912",
      country_code: "US",
      name: "421 WEST 123 STREET",
      housenumber: "421",
      street: "WEST 123 STREET",
      postalcode: "10027",
      accuracy: "point",
      country: "United States",
      country_gid: "whosonfirst:country:85633793",
      country_a: "USA",
      region: "New York",
      region_gid: "whosonfirst:region:85688543",
      region_a: "NY",
      county: "New York County",
      county_gid: "whosonfirst:county:102081863",
      locality: "New York",
      locality_gid: "whosonfirst:locality:85977539",
      locality_a: "NYC",
      borough: "Manhattan",
      borough_gid: "whosonfirst:borough:421205771",
      neighbourhood: "Morningside Heights",
      neighbourhood_gid: "whosonfirst:neighbourhood:85869509",
      label: "421 WEST 123 STREET, New York, NY, USA",
      addendum: {
        pad: {
          bbl: "1019640012",
          bin: "1059526",
          version: "25d",
        },
      },
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-73.959272, 40.809759],
    },
    properties: {
      id: "290661",
      gid: "nycpad:venue:290661",
      layer: "venue",
      source: "nycpad",
      source_id: "290661",
      country_code: "US",
      name: "1234 AMSTERDAM AVENUE",
      housenumber: "1234",
      street: "AMSTERDAM AVENUE",
      postalcode: "10027",
      accuracy: "point",
      country: "United States",
      country_gid: "whosonfirst:country:85633793",
      country_a: "USA",
      region: "New York",
      region_gid: "whosonfirst:region:85688543",
      region_a: "NY",
      county: "New York County",
      county_gid: "whosonfirst:county:102081863",
      locality: "New York",
      locality_gid: "whosonfirst:locality:85977539",
      locality_a: "NYC",
      borough: "Manhattan",
      borough_gid: "whosonfirst:borough:421205771",
      neighbourhood: "Morningside Heights",
      neighbourhood_gid: "whosonfirst:neighbourhood:85869509",
      label: "1234 AMSTERDAM AVENUE, New York, NY, USA",
      addendum: {
        pad: {
          bbl: "1019750029",
          bin: "1059647",
          version: "25d",
        },
      },
    },
  },
];

const items: ComboboxCollectionItemProps[] = geoSearchResults.map((feature) => {
  return {
    label: feature.properties.label,
    value: feature.properties.id,
    coordinates: feature.geometry.coordinates,
  };
});

export const AddressSearch = () => {
  const { contains } = useFilter({
    sensitivity: "base",
  });

  const { collection, filter } = useListCollection({
    initialItems: items,
    filter: contains,
  });

  const handleInputChange = (details: ComboboxInputValueChangeDetails) => {
    filter(details.inputValue);
  };

  return (
    <Combobox.Root
      collection={collection as ListCollection<ComboboxCollectionItemProps>}
      onInputValueChange={handleInputChange}
      inputBehavior="autohighlight"
      maxWidth={{ base: "224px", md: "376px" }}
    >
      <Combobox.Control>
        <SearchIcon
          color="primary.600"
          h={5}
          w={5}
          position="absolute"
          left="0.375rem"
          pointerEvents="none"
        />

        <Combobox.Input placeholder="Search by Address..." autoComplete="off" />

        <Combobox.ClearTrigger bg="white">
          <CloseIcon w={3} h={3} />
        </Combobox.ClearTrigger>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content backgroundColor={"white"}>
          <Text
            style={{
              paddingTop: 2,
              fontSize: "sm",
              fontWeight: "700",
              color: "gray.700",
            }}
          >
            Add Map Pin
          </Text>
          {collection.items.map((item) => (
            <Combobox.Item key={item.value} item={item}>
              <MapPinIcon h={4} w={2.5} mr={2} />
              <Combobox.ItemText>{item.label}</Combobox.ItemText>
            </Combobox.Item>
          ))}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
};
