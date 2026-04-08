import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Button,
  Text,
  ChevronDownIcon,
  HStack,
  Box,
  Tooltip,
  Hide,
} from "@nycplanning/streetscape";
import { useUpdateSearchParams } from "~/utils/utils";
import { ADDRESS_SEARCH_RADIUS } from "~/components/HeaderBar/AddressSearch";

export const RadiusDropdown = ({
  addressSearchSliderValue,
  setAddressSearchSliderValue,
}: {
  addressSearchSliderValue: number | undefined;
  setAddressSearchSliderValue: (v: number | undefined) => void | undefined;
}) => {
  const [searchParams, updateSearchParams] = useUpdateSearchParams();
  const pin = searchParams.get("pin");

  const sliderValue =
    addressSearchSliderValue === undefined
      ? ADDRESS_SEARCH_RADIUS.DEFAULT
      : addressSearchSliderValue;

  if (pin === null) {
    return (
      <Tooltip label="Search by an address to use radius filtering">
        <Button
          variant={"secondary"}
          isDisabled={true}
          maxH={10}
          display={"flex"}
          px={6}
          py={3}
          justifyContent={"center"}
          alignItems={"center"}
          border={"1px solid"}
          borderRadius={"md"}
          color={"gray.600"}
          fontSize={"sm"}
          outlineOffset={0}
          lineHeight={"regular"}
          textOverflow={"clip"}
          minHeight={10}
          _before={{ width: "0px" }}
        >
          <Hide below="sm">Filter by </Hide>Radius <ChevronDownIcon />
        </Button>
      </Tooltip>
    );
  }

  return (
    <Popover
      placement="bottom-start"
      onOpen={() => {
        if (addressSearchSliderValue === undefined) {
          setAddressSearchSliderValue(ADDRESS_SEARCH_RADIUS.DEFAULT);
          updateSearchParams({ radius: ADDRESS_SEARCH_RADIUS.DEFAULT });
        }
      }}
    >
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              variant={"secondary"}
              maxH={10}
              display={"flex"}
              px={6}
              py={3}
              justifyContent={"center"}
              alignItems={"center"}
              border={"1px solid"}
              borderColor={"gray.400"}
              borderRadius={"md"}
              color={"gray.600"}
              fontSize={"sm"}
              outlineOffset={0}
              lineHeight={"regular"}
              textOverflow={"clip"}
              minHeight={10}
              _before={{ width: "0px" }}
              _focus={{ borderColor: "primary.600" }}
              _hover={{ borderColor: "primary.600", fontWeight: "regular" }}
            >
              <Hide below="sm">Filter by </Hide>Radius <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent width={"300px"}>
            <Box
              borderBottom={"1px solid #CBD5E0"}
              width={"100%"}
              fontSize={"0.875rem"}
            >
              <PopoverCloseButton />
              <PopoverHeader>Filter Results</PopoverHeader>
            </Box>
            <PopoverBody fontSize={"sm"} width={"100%"}>
              <Text pb={3}>
                Radius: {`${sliderValue} ft. `}
                <span
                  style={{ fontSize: "0.75rem" }}
                >{`(${new Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(sliderValue / 5280)} mi.)`}</span>
              </Text>
              <Slider
                aria-label="slider-radius"
                value={addressSearchSliderValue}
                min={ADDRESS_SEARCH_RADIUS.MIN}
                max={ADDRESS_SEARCH_RADIUS.MAX}
                onChange={(v) => setAddressSearchSliderValue(v)}
                onChangeEnd={(v) => {
                  updateSearchParams({ radius: v });
                }}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderMark value={sliderValue}>
                  <SliderThumb />
                </SliderMark>
              </Slider>
              <HStack
                justifyContent={"space-between"}
                width={"100%"}
                pt={3}
                fontWeight={400}
              >
                <Button
                  variant={"tertiary"}
                  fontSize={"sm"}
                  onClick={() => {
                    setAddressSearchSliderValue(ADDRESS_SEARCH_RADIUS.DEFAULT);
                    updateSearchParams({
                      radius: ADDRESS_SEARCH_RADIUS.DEFAULT,
                    });
                  }}
                >
                  Reset
                </Button>
                <Button
                  size={"sm"}
                  variant={"secondary"}
                  borderWidth={"1px"}
                  onClick={() => {
                    setAddressSearchSliderValue(undefined);
                    updateSearchParams({ radius: undefined });
                    onClose();
                  }}
                >
                  Clear Filter
                </Button>
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};
