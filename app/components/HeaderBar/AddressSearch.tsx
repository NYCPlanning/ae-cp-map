import { Combobox, MapPinIcon, Text } from "@nycplanning/streetscape";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import type {
  ListCollection,
  UseComboboxReturn,
} from "@nycplanning/streetscape";

export const ADDRESS_SEARCH_RADIUS = {
  DEFAULT: 400,
  MIN: 50,
  MAX: 7920,
};

export const AddressSearch = ({
  combobox,
  addressSearchQuery,
  addressSearchResults,
  isLoading,
}: {
  combobox: UseComboboxReturn;
  addressSearchQuery: string | null;
  addressSearchResults: ListCollection;
  isLoading: boolean;
}) => {
  return (
    <Combobox.RootProvider value={combobox}>
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
          display={
            addressSearchQuery !== null && addressSearchQuery.length > 2
              ? "block"
              : "none"
          }
        >
          <Text
            paddingTop={2}
            fontSize={"sm"}
            fontWeight={"700"}
            color={"gray.700"}
          >
            Add Map Pin
          </Text>
          {addressSearchResults.items.length > 0 ? (
            addressSearchResults.items.map((item) => (
              <Combobox.Item key={item.value} item={item}>
                <MapPinIcon h={4} w={2.5} mr={2} />
                <Combobox.ItemText>{item.label}</Combobox.ItemText>
              </Combobox.Item>
            ))
          ) : isLoading && addressSearchQuery !== null ? (
            <Text fontSize={"xs"}>Loading...</Text>
          ) : (
            <Text fontSize={"xs"}>No results found.</Text>
          )}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.RootProvider>
  );
};
