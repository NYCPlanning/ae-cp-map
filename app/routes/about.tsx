import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ExternalLinkIcon,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from "@nycplanning/streetscape";

export default function About() {
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      flexShrink={{ lg: 0 }}
      sx={{
        scrollbarWidth: "none",
      }}
    >
      <Heading
        as="h1"
        fontSize={"xl"}
        pb={9}
        borderBottom={"1px solid"}
        borderColor={"gray.200"}
      >
        The{" "}
        <Text as="span" fontWeight={"bold"}>
          Capital Projects Portal (CPP)
        </Text>{" "}
        helps New Yorkers explore where and how the City is investing in capital
        projects and understand community priorities across neighborhoods. CPP
        brings together information from multiple City sources to{" "}
        <Text as="span" fontWeight={"bold"}>
          increase transparency, support planning, and make it easier to explore
          capital investments and community requests in one place.
        </Text>
      </Heading>
      <Heading
        as="h1"
        fontSize={"2xl"}
        pt={9}
        pb={4}
        fontWeight={"bold"}
        alignSelf={"stretch"}
      >
        Capital Projects Data (CPDB)
      </Heading>
      <Text pb={6}>
        The{" "}
        <Text as="span" fontWeight={"bold"}>
          Capital Projects Database (CPDB)
        </Text>{" "}
        shows major City investments in physical improvements such as parks,
        schools, roads, and infrastructure. Projects are compiled from the{" "}
        <Text as="span" fontWeight={"bold"}>
          Capital Commitment Plan
        </Text>{" "}
        and other public sources to give a neighborhood-level view of where
        capital work is planned or underway.
      </Text>
      <Accordion allowMultiple allowToggle width={"100%"}>
        <AccordionItem borderTop={"unset"}>
          <AccordionButton paddingInline={0}>
            <Heading
              as="h2"
              fontSize="md"
              flex="1"
              textAlign="left"
              fontWeight={"bold"}
            >
              What is a capital project?
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            A capital project involves construction, reconstruction, or
            installation of a public improvement worth{" "}
            <Text as="span" fontWeight={"bold"}>
              $50,000 or more
            </Text>{" "}
            and expected to last{" "}
            <Text as="span" fontWeight={"bold"}>
              at least five years
            </Text>
            .
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton paddingInline={0}>
            <Heading
              as="h2"
              fontSize="md"
              flex="1"
              textAlign="left"
              fontWeight={"bold"}
            >
              Where the data comes from:
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            Most information comes from the{" "}
            <Text as="span" fontWeight={"bold"}>
              Office of Management and Budget (OMB) Capital Commitment Plan
            </Text>{" "}
            and is supplemented by data from{" "}
            <Text as="span" fontWeight={"bold"}>
              Checkbook NYC
            </Text>
            , the{" "}
            <Text as="span" fontWeight={"bold"}>
              Department of Design and Construction (DDC)
            </Text>
            ,{" "}
            <Text as="span" fontWeight={"bold"}>
              Parks (DPR)
            </Text>
            ,{" "}
            <Text as="span" fontWeight={"bold"}>
              Emergency Management (OEM)
            </Text>
            , and{" "}
            <Text as="span" fontWeight={"bold"}>
              DCP
            </Text>
            .
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton paddingInline={0}>
            <Heading
              as="h2"
              fontSize="md"
              flex="1"
              textAlign="left"
              fontWeight={"bold"}
            >
              How to use it:
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            Use the{" "}
            <Text as="span" fontWeight={"bold"}>
              map
            </Text>{" "}
            or{" "}
            <Text as="span" fontWeight={"bold"}>
              table
            </Text>{" "}
            to see what projects are happening in a neighborhood, explore by
            agency, and find where multiple projects may overlap.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton paddingInline={0}>
            <Heading
              as="h2"
              fontSize="md"
              flex="1"
              textAlign="left"
              fontWeight={"bold"}
            >
              Example questions you can answer:
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <ul>
              <li>
                What projects are active in a community or council district?
              </li>
              <li>Which agencies have work happening in the same area?</li>
              <li>
                How are capital dollars being invested in growing neighborhoods?
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton paddingInline={0}>
            <Heading
              as="h2"
              fontSize="md"
              flex="1"
              textAlign="left"
              fontWeight={"bold"}
            >
              Limitations:
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <ul>
              <li>
                Data reflects what is published in the Capital Commitment Plan
                and may not always show current timelines or budgets.
              </li>
              <li>
                Not all projects have geographic locations, and map data is
                approximate.
              </li>
              <li>
                This dataset is best used for{" "}
                <Text as="span" fontWeight={"bold"}>
                  planning coordination
                </Text>
                , not detailed analysis. To review, all Capital Projects in
                CPDB, please refer to the tabular version available at{" "}
                <Link
                  href="https://www.nyc.gov/content/planning/pages/resources/datasets/capital-projects-database"
                  isExternal
                >
                  Department of City Plannings Website{" "}
                  <ExternalLinkIcon mx="2px" />
                </Link>
                .
              </li>
              <li>
                Because of these limitations, the{" "}
                <Text as="span" fontWeight={"bold"}>
                  Capital Projects Map
                </Text>{" "}
                is intended for{" "}
                <Text as="span" fontWeight={"bold"}>
                  planning coordination and general information
                </Text>
                , not for detailed or quantitative analysis. Project budgets,
                timelines, or outcomes may not be fully captured, and some
                planned projects may never advance to completion.
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Flex
        width={"100%"}
        flexDirection={{
          base: "column",
          lg: "row",
        }}
        padding={6}
        my={6}
        gap={6}
        justifyContent={{ lg: "space-between" }}
        backgroundColor={"brand.50"}
      >
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>Version</Text>
          <Text>FY26 Executive</Text>
          <Text fontSize={"xs"} textTransform={"uppercase"}>
            APRIL, 2025
          </Text>
        </VStack>
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>Data Dictionary</Text>
          <Link
            href="https://s-media.nyc.gov/agencies/dcp/assets/files/excel/data-tools/bytes/cpdb_data_dictionary.xlsx"
            isExternal
            color={"primary.600"}
            textDecorationLine={"underline"}
          >
            Data Dictionary
          </Link>
          <Text fontSize={"xs"} textTransform={"uppercase"}>
            EXCEL, 103 KB
          </Text>
        </VStack>
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>Related Links</Text>
          <Link
            href="https://data.cityofnewyork.us/City-Government/Capital-Projects-Database-CPDB-Projects/fi59-268w/about_data"
            isExternal
            color={"primary.600"}
            textDecorationLine={"underline"}
          >
            OpenData <ExternalLinkIcon mx="2px" />
          </Link>
          <Link
            href="https://www.nyc.gov/content/planning/pages/resources/datasets/capital-projects-database"
            isExternal
            color={"primary.600"}
            textDecorationLine={"underline"}
          >
            City Planning <ExternalLinkIcon mx="2px" />
          </Link>
        </VStack>
      </Flex>

      <Heading
        as="h1"
        fontSize={"2xl"}
        pt={9}
        pb={4}
        fontWeight={"bold"}
        borderTop={"1px solid"}
        borderColor={"gray.200"}
        alignSelf={"stretch"}
      >
        Community Board Budget Requests (CBBR)
      </Heading>
      <Text pb={6}>
        The{" "}
        <Text as="span" fontWeight={"bold"}>
          Community Board Budget Requests (CBBR)
        </Text>{" "}
        dataset shows priorities submitted annually by each of New York
        City&apos;s{" "}
        <Text as="span" fontWeight={"bold"}>
          59 community boards
        </Text>
        . It includes requests for new programs or capital projects and the
        City&apos;s agency responses.
      </Text>
      <Accordion allowMultiple allowToggle width={"100%"}>
        <AccordionItem borderTop={"unset"}>
          <AccordionButton paddingInline={0}>
            <Heading
              as="h2"
              fontSize="md"
              flex="1"
              textAlign="left"
              fontWeight={"bold"}
            >
              What is a budget request?
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            Each year, community boards submit requests to City agencies for
            funding in the next budget cycle. CPP maps those marked as{" "}
            <Text as="span" fontWeight={"bold"}>
              capital
            </Text>{" "}
            and with{" "}
            <Text as="span" fontWeight={"bold"}>
              location details
            </Text>
            .
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton paddingInline={0}>
            <Heading
              as="h2"
              fontSize="md"
              flex="1"
              textAlign="left"
              fontWeight={"bold"}
            >
              Where the data comes from:
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            Requests are taken from the{" "}
            <Text as="span" fontWeight={"bold"}>
              Community District Needs Statements
            </Text>{" "}
            compiled by community boards and published by DCP in the{" "}
            <Text as="span" fontWeight={"bold"}>
              Community District Needs Summary
            </Text>
            .
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton paddingInline={0}>
            <Heading
              as="h2"
              fontSize="md"
              flex="1"
              textAlign="left"
              fontWeight={"bold"}
            >
              How to use it:
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            Explore the table or map to see what each community board is
            requesting, where those needs are located, and how they align with
            City capital investments.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton paddingInline={0}>
            <Heading
              as="h2"
              fontSize="md"
              flex="1"
              textAlign="left"
              fontWeight={"bold"}
            >
              Example questions you can answer:
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <ul>
              <li>What are the top priorities within each community board?</li>
              <li>
                How do requests in different policy areas intersect within a
                district?
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton paddingInline={0}>
            <Heading
              as="h2"
              fontSize="md"
              flex="1"
              textAlign="left"
              fontWeight={"bold"}
            >
              Limitations:
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <ul>
              <li>Only capital requests with mappable locations are shown.</li>
              <li>
                Requests change annually as boards update their priorities each
                fall.
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Flex
        width={"100%"}
        flexDirection={{
          base: "column",
          lg: "row",
        }}
        padding={6}
        mt={6}
        mb={9}
        gap={6}
        justifyContent={{ lg: "space-between" }}
        backgroundColor={"brand.50"}
      >
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>Version</Text>
          <Text>FY26 Preliminary</Text>
          <Text fontSize={"xs"} textTransform={"uppercase"}>
            JAN, 2025
          </Text>
        </VStack>
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>Data Dictionary</Text>
          <Link
            href="https://s-media.nyc.gov/agencies/dcp/assets/files/excel/data-tools/bytes/cpdb_data_dictionary.xlsx"
            isExternal
            color={"primary.600"}
            textDecorationLine={"underline"}
          >
            CBBR Data Dictionary
          </Link>
          <Text fontSize={"xs"} textTransform={"uppercase"}>
            EXCEL, 000 KB
          </Text>
        </VStack>
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>Related Links</Text>
          <Link
            href="https://data.cityofnewyork.us/City-Government/Register-of-Community-Board-Budget-Requests/vn4m-mk4t/about_data"
            isExternal
            color={"primary.600"}
            textDecorationLine={"underline"}
          >
            OpenData <ExternalLinkIcon mx="2px" />
          </Link>
          <Link
            href="https://communityprofiles.planning.nyc.gov/"
            isExternal
            color={"primary.600"}
            textDecorationLine={"underline"}
          >
            Community Profiles <ExternalLinkIcon mx="2px" />
          </Link>
        </VStack>
      </Flex>
      <Box
        mb={9}
        borderBottom={"1px solid"}
        borderColor={"gray.200"}
        width={"100%"}
      ></Box>
      <VStack p={6} alignSelf={"stretch"} backgroundColor={"gray.50"} gap={3}>
        <Text
          fontSize={"lg"}
          color={"gray.700"}
          alignSelf={"stretch"}
          fontWeight={"bold"}
        >
          Acknowledgements
        </Text>
        <Text>
          The{" "}
          <Text as="span" fontWeight={"bold"}>
            Capital Planning and Support (CAPS)
          </Text>{" "}
          team thanks our partners across{" "}
          <Text as="span" fontWeight={"bold"}>
            Data Engineering
          </Text>
          ,{" "}
          <Text as="span" fontWeight={"bold"}>
            {" "}
            Design & Product
          </Text>
          , and{" "}
          <Text as="span" fontWeight={"bold"}>
            ITD
          </Text>{" "}
          for their collaboration. We are also grateful to the many users who
          have provided feedback—your insights continue to shape CPP&apos;s
          future enhancements and user experience.
        </Text>
        Community Board Budget Requests (CBBR)
      </VStack>
    </Flex>
  );
}
