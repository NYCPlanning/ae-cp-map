import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  DownloadIcon,
  ExternalLinkIcon,
  Flex,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
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
        The Capital Projects Portal has been designed to help users explore
        where and how the city is investing its capital money across NYC and
        highlight community board priorities across these unique neighborhoods.
        The application currently includes data from multiple sources to improve
        transparency, guide engagement, and support planning decisions.
      </Heading>
      <Heading
        as="h1"
        fontSize={"4xl"}
        pt={9}
        fontWeight={"bold"}
        alignSelf={"stretch"}
      >
        Capital Projects Portal Data
      </Heading>
      <Heading
        as="h1"
        fontSize={"3xl"}
        pt={9}
        pb={4}
        fontWeight={"bold"}
        alignSelf={"stretch"}
      >
        Capital Projects Data (CPDB)
      </Heading>
      <Text pb={6}>
        The NYC Capital Project Database (CPDB), shown in the Capital Projects
        layer of the Capital Projects Portal, is a resource provided by
        Department of City Planning (DCP) primarily created from data published
        by other City agencies. The main purpose of this tool is to be a
        starting point for exploring capital projects to better understand and
        communicate New York City&apos;s capital project portfolio within and
        across particular agencies. This integrated view provides a broad
        understanding of what projects are taking place within a certain area,
        and opportunities for strategic neighborhood planning. The CPDB reports
        information at the project level on discrete capital investments of
        current, future and planned Capital Projects available from the Capital
        Commitment Plan.
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
            Capital projects involve construction, reconstruction, acquisition,
            or installation of a physical public improvement with a value of
            $50,000 or more and a “useful” life of at least 5 years. CPP maps
            this dataset based on projects with geographical information, thus
            capital projects such as the purchase of firetrucks or spending on
            programs are not included.
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
              Where does the data come from?
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            The majority of data points captured within DCP&apos;s Capital
            Projects Database are derived from the{" "}
            <Link
              href="https://www.nyc.gov/site/omb/publications/publications.page"
              isExternal
              color={"primary.600"}
              textDecorationLine={"underline"}
            >
              Capital Commitment Plan
            </Link>{" "}
            published by OMB, which contains planned commitments to ongoing or
            potential future capital projects. Supporting data are obtained from{" "}
            <Link
              href="https://www.checkbooknyc.com/spending_landing/category/3/yeartype/B/year/118?expandBottomCont=true"
              isExternal
              color={"primary.600"}
              textDecorationLine={"underline"}
            >
              Checkbook NYC
            </Link>
            , a resource provided by the Comptroller. Spatial data are derived
            from, but not limited to, data created and published by the
            Department of Design and Construction (
            <Link
              href="https://experience.arcgis.com/experience/d826b115c87841d491c2b41fcb175305"
              isExternal
              color={"primary.600"}
              textDecorationLine={"underline"}
            >
              DDC
            </Link>
            ), the Department of Parks and Recreation (
            <Link
              href="https://www.nycgovparks.org/planning-and-building/capital-project-tracker"
              isExternal
              color={"primary.600"}
              textDecorationLine={"underline"}
            >
              DPR
            </Link>
            ), the Office of Emergency Management (
            <Link
              href="https://nyc-oem.maps.arcgis.com/apps/webappviewer/index.html?id=890b63ba07b049049510ffe6b4719a01"
              isExternal
              color={"primary.600"}
              textDecorationLine={"underline"}
            >
              OEM
            </Link>
            ), and DCP.
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
              How can you use it?
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            The tabular view of Capital Projects Database can reliably be used
            to quickly and easily explore and learn about capital projects
            published in the Capital Commitment Plan. The map view of the
            Capital Projects Database can be used as a starting point for
            knowing and reporting what capital projects are taking place and
            where, and identifying any synergies or (potential) conflicts among
            projects. These resources can be used as a starting point to answer
            questions such as:
            <UnorderedList pt={4}>
              <ListItem>
                What projects are happening in a neighborhood or council
                district?
              </ListItem>
              <ListItem>
                What other agencies&apos; projects might impact another project?
              </ListItem>
              <ListItem>
                What capital investments are being made in growing
                neighborhoods?
              </ListItem>
            </UnorderedList>
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
              Limitations
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <UnorderedList>
              <ListItem>
                The data represented here is a reflection of the published
                Capital Commitment Plan; some data may not always reflect the
                actual managing agency
              </ListItem>
              <ListItem>
                This is not a project management system, so data on project
                timeline or budget may be incorrect
              </ListItem>
              <ListItem>
                All monies committed to or spent on a project are not captured
              </ListItem>
              <ListItem>
                Planned projects that may never come to fruition are captured
              </ListItem>
              <ListItem>
                The spatial data are not 100% reliable, accurate, or exhaustive
              </ListItem>
              <ListItem>
                Not all Capital Projects in the Capital Commitment plan have a
                spatial location – on average less than 40% of Capital Projects
                in the plan are mapped in the web map on display. To review, all
                Capital Projects in CPDB, please refer to the tabular version
                available at{" "}
                <Link
                  href="https://www.nyc.gov/content/planning/pages/resources/datasets/capital-projects-database"
                  isExternal
                  color={"primary.600"}
                  textDecorationLine={"underline"}
                >
                  Department of City Plannings Website
                </Link>{" "}
              </ListItem>
            </UnorderedList>
            <Text pt={4}>
              As a result of these limitations and inconsistencies, the Capital
              Projects Map is not an analysis tool, it does not report any
              metrics, and the data should not be exclusively used for
              quantitative analyses - it is built for planning coordination and
              information purposes only.
            </Text>
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
          <Text color={"primary.600"}>
            <Link
              href="https://s-media.nyc.gov/agencies/dcp/assets/files/excel/data-tools/bytes/cpdb_data_dictionary.xlsx"
              isExternal
              textDecorationLine={"underline"}
            >
              Data Dictionary
            </Link>{" "}
            <DownloadIcon mx="2px" />
          </Text>

          <Text fontSize={"xs"} textTransform={"uppercase"}>
            EXCEL, 103 KB
          </Text>
        </VStack>
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>Related Links</Text>
          <Text color={"primary.600"}>
            <Link
              href="https://data.cityofnewyork.us/City-Government/Capital-Projects-Database-CPDB-Projects/fi59-268w/about_data"
              isExternal
              color={"primary.600"}
              textDecorationLine={"underline"}
            >
              OpenData
            </Link>{" "}
            <ExternalLinkIcon mx="2px" />
          </Text>
          <Text color={"primary.600"}>
            <Link
              href="https://www.nyc.gov/content/planning/pages/resources/datasets/capital-projects-database"
              isExternal
              color={"primary.600"}
              textDecorationLine={"underline"}
            >
              City Planning
            </Link>{" "}
            <ExternalLinkIcon mx="2px" />
          </Text>
        </VStack>
      </Flex>

      <Heading
        as="h1"
        fontSize={"3xl"}
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
        The Community Board Budget Requests (CBBR) reports each of the projects
        and programs requested by the City&apos;s 59 community boards through
        their annual Community District Statements of Need. The main purpose of
        this tool is to be a starting point for exploring budget requests put
        forward by each community board and the subsequent agency response. This
        view allows for understanding what types of request by policy area is
        being asked from each community board.
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
            <Text>
              A budget request is a proposal put together by the community
              boards after assessing local needs to suggest new city programs or
              capital projects. Community boards consult with agencies on the
              capital and expense needs for each district, and from that, submit
              CBBRs for agencies to evaluate for inclusion in their next Fiscal
              Year budget. To learn more about capital projects and community
              board resources, visit the{" "}
              <Link
                href="https://www.nyc.gov/content/planning/pages/planning/capital-planning#fund"
                isExternal
                color={"primary.600"}
                textDecorationLine={"underline"}
              >
                DCP website
              </Link>
              .
            </Text>
            <Text pt={4}>
              The CPP contains all requests that are marked as capital in nature
              and maps the requests with geographical information. Although some
              requests may not be mapped, they are all associated with a
              community board, thus they will appear in the data table. Within
              this data are a subset of CBBR capital requests indicate Continued
              Support which are requests that have received some degree of
              funding or approval, where the board is requesting that the agency
              continue its support of that ongoing item.
            </Text>
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
              Where does this data come from?
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            The data points captured within CBBR comes from the Community
            District Needs statement, which is prepared by each community board
            identifying their major concerns and funding priorities. These
            statements are then compiled into the{" "}
            <Link
              href="https://www.nyc.gov/assets/planning/downloads/pdf/planning/capital-planning/FY2026-summary-deck.pdf"
              isExternal
              color={"primary.600"}
              textDecorationLine={"underline"}
            >
              Community District Needs Summary deck (PDF)
            </Link>{" "}
            which is published by the DCP.
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
              How can you use it?
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text>
              The table view of CBBR can be used to easily see all requests that
              are capital in nature put forward by the 59 community boards. The
              map view of the CBBRs can be used as a starting point for
              understanding what requests are taking place and where within each
              community board to help identify gaps in needs.
            </Text>
            <Text py={4}>
              These resources can be used as a starting point to answer
              questions such as:
            </Text>
            <UnorderedList>
              <ListItem>
                What are top concerns within each community board?
              </ListItem>
              <ListItem>
                How might requests in different policy area within the same
                community board intersect?
              </ListItem>
            </UnorderedList>
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
              Limitations
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <UnorderedList>
              <ListItem>
                The population of CBBRs displayed on the Capital Projects Portal
                map represent only requests that were both categorized as
                Capital budget requests and included relevant geographic details
                that allowed their location to be identified. Requests for
                expense budgeting, requests that were not specific to individual
                locations, or requests where location information was
                insufficient to be displayed, are not included on the map.
              </ListItem>
              <ListItem>
                The CBBRs featured on the Capital Projects Portal represent the
                most recent annual submission by community boards. Community
                boards submit new lists of budget requests every Fall for
                inclusion in the subsequent Fiscal Year&apos;s budget (ex. CBBRs
                submitted in Fall 2025, will be relevant to the Fiscal Year 2027
                budget, which will be adopted the following July.)
              </ListItem>
            </UnorderedList>
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
          <Text color={"primary.600"}>
            <Link
              href="https://data.cityofnewyork.us/api/views/vn4m-mk4t/files/36cbdeec-6846-4706-8117-702ef916bc9f?download=true&filename=Register_of_Community_Board_Budget_Requests_Data_Dictionary.xlsx"
              isExternal
              textDecorationLine={"underline"}
            >
              CBBR Data Dictionary
            </Link>{" "}
            <DownloadIcon mx="2px" />
          </Text>
          <Text fontSize={"xs"} textTransform={"uppercase"}>
            EXCEL, 13 KB
          </Text>
        </VStack>
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>Related Links</Text>
          <Text color={"primary.600"}>
            <Link
              href="https://data.cityofnewyork.us/City-Government/Register-of-Community-Board-Budget-Requests/vn4m-mk4t/about_data"
              isExternal
              textDecorationLine={"underline"}
            >
              OpenData
            </Link>{" "}
            <ExternalLinkIcon mx="2px" />
          </Text>
          <Text color={"primary.600"}>
            <Link
              href="https://communityprofiles.planning.nyc.gov/"
              isExternal
              textDecorationLine={"underline"}
            >
              Community Profiles
            </Link>{" "}
            <ExternalLinkIcon mx="2px" />
          </Text>
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
          The Capital Planning and Support (CAPS) team extends our sincere
          gratitude to our partners in Geographic Data and Engineering, the
          Design and Product team, and our colleagues across ITD for their
          unwavering dedication to developing the Capital Projects Portal. Their
          commitment to transparency and innovation has helped make critical
          capital project data accessible to the public through this modern and
          dynamic digital tool and we are excited for future, planned
          enhancements.
        </Text>
        <Text>
          We would also like to thank the many users who have shared their
          feedback throughout the development process. Your insights have been
          invaluable in shaping the portal’s features, functionality, and user
          experience.
        </Text>
      </VStack>
    </Flex>
  );
}
