import {
  Box,
  HStack,
  Heading,
  VStack,
  Text,
  Flex,
} from "@nycplanning/streetscape";
import { Link, useLocation, useSearchParams } from "react-router";
import { CapitalProjectBudgeted } from "~/gen";
import { analytics } from "~/utils/analytics";

export interface CapitalProjectsListItemProps {
  capitalProject: CapitalProjectBudgeted;
  agency: string | undefined;
  yearRange: string;
}

export const CapitalProjectsListItem = ({
  capitalProject,
  agency,
  yearRange,
}: CapitalProjectsListItemProps) => {
  const [searchParams] = useSearchParams();
  const location = useLocation().pathname;
  return (
    <Box w={"full"}>
      <Link
        to={{
          search: `?${searchParams.toString()}`,
          pathname:
            location + `/${capitalProject.managingCode}/${capitalProject.id}`,
        }}
        onClick={() =>
          analytics({
            category: "Capital Project",
            action: "Click",
            name:
              location + `/${capitalProject.managingCode}/${capitalProject.id}`,
          })
        }
      >
        <Flex
          height={{ lg: "auto" }}
          direction={"column"}
          transition={"height 0.5s ease-in-out"}
          gap={4}
        >
          <Box
            backgroundColor="gray.50"
            paddingY={3}
            paddingX={2}
            borderRadius={"base"}
            width={"100%"}
          >
            <HStack align={"start"}>
              <Flex flex={3}>
                <VStack align="start">
                  <Heading color="gray.600" fontWeight={"medium"}>
                    {capitalProject.description}
                  </Heading>
                  <Text textStyle="micro">{agency}</Text>
                </VStack>
              </Flex>
              <Flex flex={1}>
                <Text textStyle="micro">{yearRange}</Text>
              </Flex>
            </HStack>
          </Box>
        </Flex>
      </Link>
    </Box>
  );
};
