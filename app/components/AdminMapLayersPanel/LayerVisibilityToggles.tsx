import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Switch,
} from "@chakra-ui/react";

export type LayerVisibilityTogglesProps = {
  capitalProjectsOn: boolean;
  onCapitalProjectsToggle: (next: boolean) => void;
};

export function LayerVisibilityToggles({
  capitalProjectsOn,
  onCapitalProjectsToggle,
}: LayerVisibilityTogglesProps) {
  return (
    <>
      <Box mb={4}>
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={3}
        >
          <HStack spacing={3}>
            <Switch
              id="capital-projects-toggle"
              isChecked={capitalProjectsOn}
              onChange={(e) => onCapitalProjectsToggle(e.target.checked)}
            />
            <FormLabel htmlFor="capital-projects-toggle" mb="0" width={"12dvw"}>
              <Heading
                as="h2"
                fontWeight="medium"
                fontSize="md"
                color="gray.600"
              >
                Capital Projects
              </Heading>
            </FormLabel>
          </HStack>

          <IconButton
            aria-label="information about the capital planning portal"
            icon={<InfoIcon boxSize={5} />}
            borderColor={"white"}
            borderStyle="solid"
            borderWidth="5px"
            borderRadius={"100%"}
            color={"gray.600"}
            minHeight="auto"
            minWidth="auto"
            height="fit-content"
            width="fit-content"
            backgroundColor={"white"}
            _hover={{
              border: "none",
              backgroundColor: "blackAlpha.100",
            }}
            onClick={() => console.log("hello")}
          />
        </FormControl>
      </Box>

      <Box>
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={3}
        >
          <HStack>
            <Switch id="cb-capital-budget-requests" />
            <FormLabel
              htmlFor="cb-capital-budget-requests"
              mb="0"
              width={"12dvw"}
            >
              <Heading
                as="h2"
                fontWeight="medium"
                fontSize="md"
                color="gray.600"
              >
                Community Board Capital Budget Requests
              </Heading>
            </FormLabel>
          </HStack>

          <IconButton
            aria-label="information about the capital planning portal"
            icon={<InfoIcon boxSize={5} />}
            borderColor={"white"}
            borderStyle="solid"
            borderWidth="5px"
            borderRadius={"100%"}
            color={"gray.600"}
            minHeight="auto"
            minWidth="auto"
            height="fit-content"
            width="fit-content"
            backgroundColor={"white"}
            _hover={{
              border: "none",
              backgroundColor: "blackAlpha.100",
            }}
            onClick={() => console.log("hello")}
          />
        </FormControl>
      </Box>
    </>
  );
}
