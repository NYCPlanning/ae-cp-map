import { Flex, GridItem, Text } from "@nycplanning/streetscape";
import CloseBtn from "../ui/buttons/close-btn";

export type LayoutSetType = "default" | "sparse" | "geographySelector";

export default function WelcomePanelBase({
  layoutSet,
  setLayoutSet,
}: {
  layoutSet: LayoutSetType;
  setLayoutSet: (string: LayoutSetType) => void;
}) {
  return (
    <>
      {layoutSet === "default" ? (
        <GridItem
          zIndex={1}
          gridColumnStart={2}
          gridColumnEnd={16}
          gridRowStart={12}
          gridRowEnd={32}
        >
          <Flex
            background={"white"}
            borderRadius={"base"}
            direction={"column"}
            padding={3}
            width={"100%"}
            height={"100%"}
          >
            <Flex>
              <CloseBtn onClick={() => setLayoutSet("sparse")} />
              Welcome to Gotham
            </Flex>
            <Text>Lorem ipsum</Text>
          </Flex>
        </GridItem>
      ) : (
        <GridItem
          zIndex={1}
          gridColumnStart={2}
          gridColumnEnd={6}
          gridRowStart={30}
          gridRowEnd={32}
        >
          <Flex background="white">
            <CloseBtn onClick={() => setLayoutSet("default")} />
            Help
          </Flex>
        </GridItem>
      )}
    </>
  );
}
