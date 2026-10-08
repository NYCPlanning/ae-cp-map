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
import { env } from "~/utils/env";

const { stateOfGoodRepair } = env;

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
            $50,000 or more and a &quot;useful&quot; life of at least 5 years.
            CPP maps this dataset based on projects with geographical
            information, thus capital projects such as the purchase of
            firetrucks or spending on programs are not included.
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
                spatial location - on average less than 40% of Capital Projects
                in the plan are mapped in the web map on display. To review all
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
          <Text>FY27 Preliminary</Text>
          <Text fontSize={"xs"} textTransform={"uppercase"}>
            FEB, 2026
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
            <Text>
              The data points captured within CBBR comes from the Community
              District Needs statement, which is prepared by each community
              board identifying their major concerns and funding priorities.
              These statements are then compiled into the{" "}
              <Link
                href="https://www.nyc.gov/assets/planning/downloads/pdf/planning/capital-planning/FY2027-summary-deck.pdf"
                isExternal
                color={"primary.600"}
                textDecorationLine={"underline"}
              >
                Community District Needs Summary deck (PDF)
              </Link>{" "}
              which is published by the DCP.
            </Text>
            <Text pt={4}>
              All Community Board Budget Request content is created and
              submitted by community boards. Geographic locations are assigned
              by City Planning to match the location information provided by the
              community board for each budget request; City Planning does not
              amend or correct any location information submitted by the boards.
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
          <Text>FY27 Preliminary</Text>
          <Text fontSize={"xs"} textTransform={"uppercase"}>
            FEB, 2026
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
        Facilities Database (FacDB)
      </Heading>
      <Text pb={6}>
        The New York City Department of City Planning (DCP) aggregates
        information about facilities and program sites that are owned, operated,
        funded, licensed or certified by a City, State, or Federal agency in the
        City of New York into a central database called the Facilities Database
        (FacDB). These facilities generally help to shape quality of life in the
        city&apos;s neighborhoods, and this dataset is the basis for a series of
        planning activities. This database is a successor to City
        Planning&apos;s decades-old work on the Selected Facilities and Program
        Sites Database.
      </Text>
      {stateOfGoodRepair === "ON" && (
        <>
          <Heading
            as="h2"
            fontSize={"2xl"}
            pt={9}
            pb={4}
            fontWeight={"bold"}
            alignSelf={"stretch"}
          >
            New in FacDB: State of Good Repair Data
          </Heading>
          <Text pb={6}>
            As of 2026, and in accordance with the 2024 Charter Revision to{" "}
            <Link
              href="https://codelibrary.amlegal.com/codes/newyorkcity/latest/NYCcharter/0-0-0-899"
              isExternal
              textDecorationLine={"underline"}
              color={"primary.600"}
            >
              Section 204
              <ExternalLinkIcon marginLeft={0.5} />
            </Link>{" "}
            of the NYC Charter, the Facilities Database now includes additional
            column information related to State of Good Repair (SGR) data for a
            select number of New York City&apos;s owned and leased facilities.
            SGR scores are gathered and scored using a standardized methodology
            developed by the Office of Management and Budget (OMB), Department
            of Design and Construction (DDC) and DCP and sourced from OMB&apos;s{" "}
            <Link
              href="https://www.nyc.gov/content/omb/pages/publications"
              isExternal
              textDecorationLine={"underline"}
              color={"primary.600"}
            >
              Asset Information Management System
              <ExternalLinkIcon marginLeft={0.5} />
            </Link>
            . Each score reflects the physical condition of a facility at the
            time of its most recent assessment. Scores convey a general sense of
            asset condition and should not be interpreted as an estimate of
            capital investment needs or a prioritization of repairs.
          </Text>
          <Text pb={6}>
            Not all facilities in FacDB have an associated SGR score; coverage
            varies depending on whether a facility has been assessed and meets
            the associated criteria under OMB&apos;s AIMS mandate. Users should
            account for both the point-in-time nature of the scores and gaps in
            coverage when drawing conclusions from this data.
          </Text>
        </>
      )}
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
              What facilities are included on the map and where does the data
              come from?
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text>
              The City Planning Facilities Database aggregates approximately
              30,000+ records from 43 different public data sources provided by
              City, State, and Federal agencies. While each source agency
              classifies its facilities according to their own naming systems,
              we have grouped all facilities and program sites into the
              following seven categories to help planners navigate the data more
              easily:
            </Text>
            <UnorderedList py={3}>
              <ListItem>Health and Human Services</ListItem>
              <ListItem>Education, Child Welfare, and Youth</ListItem>
              <ListItem>Parks, Gardens, and Historical Sites</ListItem>
              <ListItem>Libraries and Cultural Programs</ListItem>
              <ListItem>
                Public Safety, Emergency Services, and Administration of Justice
              </ListItem>
              <ListItem>Core Infrastructure and Transportation</ListItem>
              <ListItem>Administration of Government</ListItem>
            </UnorderedList>
            <Text>
              Within each of these domains, each record is further categorized
              into a set of facility groups, subgroups, and types that are
              intended to make the data easy to navigate and more useful for
              specific planning purposes. Facility types and names appear as
              they do in source datasets, wherever possible. A full listing of
              the facility categories is provided in the{" "}
              <Link
                href="https://nycplanning.github.io/db-facilities/#/"
                isExternal
                color={"primary.600"}
                textDecorationLine={"underline"}
              >
                Contents and Classification
                <ExternalLinkIcon marginLeft={0.5} />
              </Link>{" "}
              section of the metadata.
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
              How can you use it?
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text pb={6}>
              The Capital Projects Portal is designed to make this expansive
              dataset more accessible to planners and city-builders across the
              five boroughs, and to help all New Yorkers understand the breadth
              of government resources in their neighborhoods. Specifically, this
              portal and dataset can be used to inform the siting or realignment
              of certain government and community facilities and programs,
              certain environmental impact assessments, community planning and
              engagement, infrastructure planning, and a range of other planning
              and community-building activities.
            </Text>
            {stateOfGoodRepair === "ON" && (
              <>
                <Text>
                  With the addition of SGR data to the Facilities Database in
                  2026, users can access a high-level, directional indicator of
                  a facility&apos;s overall physical condition. These scores are
                  a useful starting point for advocacy, funding conversations,
                  or comparative analysis, but should not be treated as a
                  substitute for formal assessment or capital planning. Any
                  formal analysis or decision-making requires additional data
                  and investigation beyond what the SGR score alone can provide.
                </Text>
              </>
            )}
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
            <Text>
              The City Planning Facilities Database (FacDB) is only as good as
              the source data it aggregates, and the Department of City Planning
              cannot verify the accuracy of all records. We strongly encourage
              users to{" "}
              <Link
                href="https://nycplanning.github.io/db-facilities/#/"
                isExternal
                color={"primary.600"}
                textDecorationLine={"underline"}
              >
                read the metadata
                <ExternalLinkIcon marginLeft={0.5} />
              </Link>{" "}
              before using this product for planning purposes.
            </Text>
            <UnorderedList pt={3}>
              <ListItem>
                <span style={{ fontWeight: "bold" }}>
                  Analysis Limitations -{" "}
                </span>
                Largely as a result of the limitations and inconsistencies
                described below, users should be careful in their use of this
                database not to develop analyses that may be suspect. For
                example, a comparison of the density or accessibility of
                facilities across neighborhoods should recognize that due to the
                structure of the database and the prevalence of duplicate
                records, a &apos;count&apos; of facilities and program sites may
                not be an accurate reflection of facility concentration; that
                some of the facilities included are organizational headquarters
                or mailing addresses rather than service sites; and that this
                database is not authoritatively comprehensive. In addition, we
                rely on source data from other agencies to populate the
                explorer, and some of these sources may fall out-of-date - users
                can find the date of each source dataset&apos;s latest update
                within each facility detail page.
              </ListItem>
              <ListItem>
                <span style={{ fontWeight: "bold" }}>Missing Records - </span>
                Currently, FacDB is the most comprehensive, spatial data
                resource available of facilities run by public and non-public
                entities in NYC, but it does not claim to capture every facility
                within the specified domains. Some facilities are deliberately
                excluded in the data that source agencies provide in order to
                protect the safety and privacy of their clients. Many records
                also could not be geocoded.
              </ListItem>
              <ListItem>
                <span style={{ fontWeight: "bold" }}>Duplicates - </span>Please
                be aware that this version of the database may include cases of
                duplicate records for the same facility. This is because several
                of the source datasets have content that overlaps with other
                datasets.
              </ListItem>
              <ListItem>
                <span style={{ fontWeight: "bold" }}>
                  Administrative Addresses -{" "}
                </span>
                There are known to be cases when the address provided in the
                source data is for a headquarters or central office rather than
                the facility site location. Unfortunately, these cannot be
                systematically verified. We hope to resolve as many of these
                limitations as possible over time and seek feedback from the
                user community on potential approaches to improving the data.
                For more detailed information on a specific facility please
                reach out to the respective oversight agency.
              </ListItem>
              <ListItem>
                <span style={{ fontWeight: "bold" }}>
                  Public Accessibility of Sites -{" "}
                </span>
                DCP is unable to verify the public accessibility of all sites.
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
          <Text>25v2</Text>
          <Text fontSize={"xs"} textTransform={"uppercase"}>
            OCT, 2025
          </Text>
        </VStack>
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>Data Dictionary</Text>
          <Text color={"primary.600"}>
            <Link
              href="https://data.cityofnewyork.us/api/views/ji82-xba5/files/924bbe94-9a71-46f1-a04d-001b340b6cf8?download=true&filename=facilities_data_dictionary.xlsx"
              isExternal
              textDecorationLine={"underline"}
            >
              FacDB Data Dictionary
            </Link>{" "}
            <DownloadIcon mx="2px" />
          </Text>
          <Text fontSize={"xs"} textTransform={"uppercase"}>
            EXCEL, 110 KB
          </Text>
        </VStack>
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>Related Links</Text>
          <Text color={"primary.600"}>
            <Link
              href="https://data.cityofnewyork.us/City-Government/Facilities-Database/ji82-xba5/about_data"
              isExternal
              textDecorationLine={"underline"}
            >
              OpenData
            </Link>{" "}
            <ExternalLinkIcon mx="2px" />
          </Text>
          <Text color={"primary.600"}>
            <Link
              href="https://www.nyc.gov/content/planning/pages/resources/datasets/facilities"
              isExternal
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
        Housing Growth Data
      </Heading>
      <Text pb={6}>
        This map shows summaries of the past, latest, and projected Class A
        residential units in New York City using datasets produced by NYC
        Department of City Planning (DCP) and the United States Census Bureau.
        It helps users see where housing growth has occurred over the past 10
        years, the latest estimates of total housing units, and a projection of
        potential housing unit growth over the next 10 years, aggregated at the
        Neighborhood Tabulation Area (NTA), Community District Tabulation Area
        (CDTA), and borough levels.
      </Text>
      <Heading
        as="h2"
        fontSize={"2xl"}
        pb={4}
        fontWeight={"bold"}
        alignSelf={"stretch"}
      >
        About the Unit Estimates
      </Heading>
      <Heading
        as="h3"
        fontSize={"xl"}
        pb={4}
        fontWeight={"bold"}
        alignSelf={"stretch"}
      >
        Net Units Added (Past 10 Years)
      </Heading>
      <Text pb={4}>
        This layer shows the net change in &quot;Class A&quot; residential units
        in the Housing Database (HDB) over a full 10-year period which equates
        to newly completed units minus demolitions and alterations/conversions.
        Where housing losses outpace new construction, the value can be negative
        or zero. An example of the temporal component of the data point, the
        2016–2025 value represents the net Class A units added between January
        1, 2016 and December 31, 2025.
      </Text>
      <Text w={"100%"}>Example Formula:</Text>
      <Text
        w={"100%"}
        fontStyle={"italic"}
        borderLeft={"2px solid"}
        borderColor={"planning.500"}
        paddingLeft={"8"}
        paddingRight={"6"}
        paddingY={"6"}
        justifyContent={"center"}
        alignItems={"center"}
        marginY={"4"}
      >
        new Class A completions - demolitions and alterations/conversions = net
        units added
      </Text>

      <Heading
        as="h3"
        fontSize={"xl"}
        pb={4}
        fontWeight={"bold"}
        alignSelf={"stretch"}
      >
        Latest Estimated Units (through 2025)
      </Heading>
      <Text pb={4}>
        The total estimated number of Class A residential units as of the latest
        Housing Database vintage (currently through the end of 2025). It is
        calculated by taking the Class A unit counts from the 2020 Census and
        adding the net Class A units added since the Census (April 1, 2020), as
        recorded in the HDB summary change files.
      </Text>
      <Text w={"100%"}>Example Formula:</Text>
      <Text
        w={"100%"}
        fontStyle={"italic"}
        borderLeft={"2px solid"}
        borderColor={"planning.500"}
        paddingLeft={"8"}
        paddingRight={"6"}
        paddingY={"6"}
        justifyContent={"center"}
        alignItems={"center"}
        marginY={"4"}
      >
        2020 Census base + net change since = latest estimated units total
      </Text>

      <Heading
        as="h3"
        fontSize={"xl"}
        pb={4}
        fontWeight={"bold"}
        alignSelf={"stretch"}
      >
        Projected Units Added (Next 10 Years)
      </Heading>
      <Text pb={4}>
        The projected number of Class A residential units added over the ten
        years from the current vintage. It reflects projected Class A
        completions drawn from the Known Projects Database (KPDB). This figure
        does not model all potential or predicted future growth, nor does it
        account for demolitions or removals, but rather reflects only the known
        housing pipeline as tracked by DCP.
      </Text>
      <Text w={"100%"}>Example Formula:</Text>
      <Text
        w={"100%"}
        fontStyle={"italic"}
        borderLeft={"2px solid"}
        borderColor={"planning.500"}
        paddingLeft={"8"}
        paddingRight={"6"}
        paddingY={"6"}
        justifyContent={"center"}
        alignItems={"center"}
        marginY={"4"}
      >
        projected completions (next 10 yrs) = projected units added
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
              What is a Class A Housing Unit?
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text>
              A &quot;Class A&quot; Housing unit is a legal, permanent
              residential dwelling unit that is occupied or intended to be
              occupied for permanent living. These units are tracked to measure
              net changes in the city&apos;s permanent housing stock and is what
              is reported in the housing growth data shown here. DCP also tracks
              the net changes in Class B units which include transient dwelling
              units for single-room occupancies, hotels or dormitories but these
              are not included in our housing growth data aggregates but are
              summarized in DCP&apos;s Housing Database.
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
              Where does the data come from?
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text fontWeight={"bold"} py={"4"}>
              Housing Database
            </Text>
            <Text pb={"4"}>
              <Link
                href="https://www.nyc.gov/content/planning/pages/resources/datasets/housing-project-level"
                isExternal
                color={"primary.600"}
                textDecorationLine={"underline"}
              >
                Housing Database (HDB)
                <ExternalLinkIcon marginLeft={0.5} />
              </Link>{" "}
              contains all NYC Department of Buildings (DOB)-approved housing
              construction and demolition jobs filed or completed in NYC since
              January 1, 2010. It includes the three primary construction job
              types that add or remove residential units: new buildings, major
              alterations, and demolitions, and can be used to determine the
              change in legal housing units across time and space.
            </Text>
            <Text>
              HDB is used to show past housing production (Net Units Added) in
              the past 10 years, to estimate the City&apos;s current housing
              stock (Latest Estimated Units) as of the latest calendar year, and
              to use as a baseline for projecting units added (Projected Units
              Added) over the next 10 years.
            </Text>
            <Text fontWeight={"bold"} py={"4"}>
              2020 Decennial Census
            </Text>
            <Text>
              The 2020 Census variable Total housing units (H1_001N) serves as
              the baseline for the Latest Estimated Units count. The layer then
              adds the net change recorded since April 2020, drawn from the
              summary change files in the DCP Housing Database.
            </Text>
            <Text fontWeight={"bold"} py={"4"}>
              Known Projects Database
            </Text>
            <Text pb={"4"}>
              The Known Projects Database (KPDB) is a compilation of potential
              future residential projects that are seeking actions or permit
              approvals with certain City agencies (DOB, DCP, and the NYC
              Economic Development Corporation [EDC], and Housing Preservation
              and Development [HPD]). This can be used for estimates of
              medium-term housing construction for planning purposes.
            </Text>
            <Text>
              The Projected Units Added layer reflects expected completions from
              KPDB. DCP expects to publish KPDB in the near future.
            </Text>
            <Text fontWeight={"bold"} py={"4"}>
              What is the difference between the KPDB and the HDB?
            </Text>
            <Text>
              The HDB is the largest, most comprehensive, source of location
              information on past residential unit completions and short-term
              future growth. It feeds into KPDB, which also uses additional
              sources to estimate units further into the future, but not at the
              same geographic specificity.
            </Text>
            <Text fontWeight={"bold"} py={"4"}>
              How can you use this data?
            </Text>
            <Text>
              To explore the data, start by choosing which time period you want
              to see: past growth over the last 10 years (Net Units Added), the
              latest estimate of total units (Latest Estimated Units), or
              projected additions over the next 10 years (Projected Units
              Added). Each area on the map is shaded by how much growth it falls
              into, with darker colors indicating more units; use the legend to
              read the ranges for the selected metric. Switch between the
              Neighborhood Tabulation Area (NTA), Community District Tabulation
              Area (CDTA), and borough levels to see where growth concentrates
              at different scales.
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
              Limitations/Disclaimer
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text pb={4}>
              The housing growth data DCP provided on this web map are for
              informational purposes only. DCP makes no representations or
              warranties, express or implied, as to the data&apos;s
              completeness, accuracy, reliability, or fitness for any particular
              purpose.
            </Text>
            <Text pb={4}>
              You may use this information for general reference and planning
              but verify it independently before relying on it for any decision
              or official use. The data may contain errors or omissions and may
              change without notice.
            </Text>
            <Text pb={4}>
              DCP and the City of New York are not liable for any damages or
              losses arising from use of or reliance on the data, including
              direct, indirect, incidental, or consequential damages.
            </Text>
            <Text>
              Data from third parties is provided &quot;as is.&quot; DCP and the
              City of New York disclaim any responsibility for its completeness,
              accuracy, content, or fitness for any particular purpose.
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
              Contact
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text>
              For questions and comments, please reach out to{" "}
              <Link
                href="mailto:PopulationProjections_DL@planning.nyc.gov"
                color={"primary.600"}
                textDecorationLine={"underline"}
              >
                PopulationProjections_DL@planning.nyc.gov
              </Link>
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
        mt={6}
        mb={9}
        gap={6}
        justifyContent={{ lg: "space-between" }}
        backgroundColor={"brand.50"}
      >
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>Version</Text>
          <Text>Housing_Growth_2025</Text>
        </VStack>
        <VStack alignItems={"flex-start"}>
          <Text fontWeight={"bold"}>Related Links</Text>
          <Text color={"primary.600"}>
            <Link
              href="https://www.nyc.gov/content/planning/pages/resources/datasets/housing-project-level"
              isExternal
              textDecorationLine={"underline"}
            >
              Housing Database
            </Link>{" "}
            <ExternalLinkIcon mx="2px" />
          </Text>
          <Text color={"primary.600"}>
            <Link
              href="https://popfactfinder.planning.nyc.gov/"
              isExternal
              textDecorationLine={"underline"}
            >
              Population FactFinder
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
          invaluable in shaping the portal&apos;s features, functionality, and
          user experience.
        </Text>
      </VStack>
    </Flex>
  );
}
