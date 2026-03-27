import { Combobox, MapPinIcon, Text } from "@nycplanning/streetscape";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import {
  ComboboxInputValueChangeDetails,
  ListCollection,
  createListCollection,
} from "@ark-ui/react/combobox";
import type { ComboboxCollectionItemProps } from "@nycplanning/streetscape";
import { useRouteLoaderData } from "react-router";
import { useUpdateSearchParams } from "../../utils/utils";
import { GeosearchFeature } from "~/geosearch";
import type { ComboboxSelectionDetails } from "@ark-ui/react/combobox";
import { FlyToInterpolator, MapViewState } from "@deck.gl/core";

export const AddressSearch = ({
  setViewState,
}: {
  setViewState: (newViewState: MapViewState) => void;
}) => {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const search = searchParams.get("search");
  const { addressSearchResults } = useRouteLoaderData("layouts/MapPage");
  const items: ComboboxCollectionItemProps[] =
    addressSearchResults !== null
      ? addressSearchResults.features.map((feature: GeosearchFeature) => {
          return {
            label: `${feature.properties.name}, ${feature.properties.borough}`,
            value: feature.properties.id,
            coordinates: feature.geometry.coordinates,
          };
        })
      : [];

  const collection = createListCollection({
    items,
    itemToString: (item) => item.title,
    itemToValue: (item) => item.id,
  });

  const handleInputChange = (details: ComboboxInputValueChangeDetails) => {
    if (details.reason === "input-change") {
      updateSearchParams({
        search: details.inputValue.length > 2 ? details.inputValue : undefined,
        radius: undefined,
        pin: undefined,
      });
    } else if (details.reason === "item-select") {
      // do nothing, this is handled by handleselection
    } else if (details.reason === "clear-trigger") {
      updateSearchParams({
        search: undefined,
        radius: undefined,
        pin: undefined,
      });
    }
  };

  const handleSelection = (details: ComboboxSelectionDetails) => {
    const selection = items.find((item) => item.value === details.itemValue);
    if (selection !== undefined) {
      updateSearchParams({
        search: selection.label,
        radius: 400,
        pin: selection.coordinates,
        districtType: undefined,
        districtId: undefined,
        boroughId: undefined,
      });
      setViewState({
        longitude: selection.coordinates[0],
        latitude: selection.coordinates[1],
        zoom: 12,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  };

  return (
    <Combobox.Root
      collection={collection as ListCollection<ComboboxCollectionItemProps>}
      onInputValueChange={handleInputChange}
      onSelect={handleSelection}
      inputBehavior="autohighlight"
      defaultInputValue={search !== null ? search : undefined}
      defaultValue={search !== null ? [search] : []}
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
        <Combobox.Content
          backgroundColor={"white"}
          display={search !== null ? "block" : "none"}
        >
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
          {collection.items.length > 0
            ? collection.items.map((item) => (
                <Combobox.Item key={item.value} item={item}>
                  <MapPinIcon h={4} w={2.5} mr={2} />
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                </Combobox.Item>
              ))
            : search !== null && <Text fontSize={"xs"}>Loading...</Text>}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
};
