import { AccordionPanel, Card, CardBody, Icon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@nycplanning/streetscape";
import { Pagination } from "../Pagination";
import {
  EducationIcon,
  HealthIcon,
  HousingIcon,
  InfrastructureIcon,
  ParksIcon,
  PeopleIcon,
  SafetyIcon,
  TransportationIcon,
} from "~/icons";
import { useState } from "react";

export const policyAreaIcons = [
  <Icon key={0} boxSize={8} fill={"none"} />,
  <InfrastructureIcon key={1} boxSize={8} fill={"none"} />,
  <HealthIcon key={2} boxSize={8} fill={"none"} />,
  <HousingIcon key={3} boxSize={8} fill={"none"} />,
  <PeopleIcon key={4} boxSize={8} fill={"none"} />,
  <ParksIcon key={5} boxSize={8} fill={"none"} />,
  <SafetyIcon key={6} boxSize={8} fill={"none"} />,
  <TransportationIcon key={7} boxSize={8} fill={"none"} />,
  <EducationIcon key={8} boxSize={8} fill={"none"} />,
];

export interface ResultsPanelLayoutProps {
  totalResults: number;
  budgetRequests: Array<{
    id: string;
    cbbrPolicyAreaId: number;
    title: string;
    communityBoardId: string;
    isMapped: boolean;
    isContinuedSupport: boolean;
  }>;
}

export function ResultsPanelLayout({
  totalResults,
  budgetRequests,
}: ResultsPanelLayoutProps) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => setTabIndex(index);

  return (
    <Accordion width={"100%"} maxHeight={"100%"} defaultIndex={[0]} allowToggle>
      <AccordionItem borderTop={"none"}>
        <AccordionButton aria-label="Toggle results panel" p={0}>
          <Heading
            flex="1"
            textAlign="left"
            fontSize="medium"
            fontWeight="bold"
            lineHeight="32px"
          >
            {totalResults} Results
          </Heading>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          padding={"0px"}
          overflowY={"hidden"}
          overflow={"scroll"}
        >
          <Tabs index={tabIndex} onChange={handleTabsChange}>
            <TabList>
              <Tab>Capital Projects</Tab>
              <Tab>Community Board Budget Requests</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>Capital Projects</TabPanel>
              <TabPanel>
                <Flex justifyContent={"space-between"}>
                  <h2>Filters</h2>
                  <h2>Selected</h2>
                </Flex>
                <VStack align={"start"}>
                  {budgetRequests.map((budgetRequest) => {
                    return (
                      <Card key={budgetRequest.id} direction={"row"}>
                        {policyAreaIcons[budgetRequest.cbbrPolicyAreaId]}
                        <CardBody>
                          <Heading size={"md"} fontWeight={"bold"}>
                            {budgetRequest.title}
                          </Heading>
                          <Text>
                            Communty Board {budgetRequest.communityBoardId}
                          </Text>
                        </CardBody>
                      </Card>
                    );
                  })}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Flex
            paddingTop={4}
            alignItems="center"
            justifyContent={"space-between"}
            marginTop={"auto"}
            marginBottom={{ base: "1rem", md: "0rem" }}
          >
            <Pagination total={totalResults} />
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
