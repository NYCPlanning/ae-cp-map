import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, HStack, Heading, IconButton, Stack } from "@nycplanning/streetscape"
import { Agency, CapitalProject } from "~/gen";
import { CapitalProjectsList } from "./CapitalProjectsList";

export interface CapitalProjectsAccordionPanelProps {
    capitalProjects: Array<CapitalProject>;
    district: string;
    limit: number;
    path: string;
    offset: number;
    total: number;
    agencies: Agency[];
}

export const CapitalProjectsAccordionPanel = ({
    capitalProjects, district, limit, offset, total, path, agencies,
}: CapitalProjectsAccordionPanelProps) => {
    return (
        <Flex
        borderRadius={"base"}
        padding={{ base: 3, lg: 4 }}
        background={"white"}
        direction={"column"}
        width={{ base: "full", lg: "21.25rem" }}
        maxW={{ base: "21.25rem", lg: "unset" }}
        boxShadow={"0px 8px 4px 0px rgba(0, 0, 0, 0.08)"}
        gap={4}
    >
<Accordion defaultIndex={[0]} allowToggle>
            <AccordionItem border="none">
                <h2>
                <AccordionButton padding="0px">
               <Box as='span' flex='1' textAlign='left'>
                   <Heading color="gray.600" fontWeight={"bold"} fontSize={"lg"} paddingBottom={"8px"}>
                   {district}
                   </Heading>
                  
               </Box>
               <AccordionIcon size="lg" />
               </AccordionButton>
                </h2>
 
                <AccordionPanel padding={"0px"}>
                    <CapitalProjectsList
                        capitalProjects={capitalProjects}
                        limit={limit}
                        offset={offset}
                        path={path}
                        total={total}
                        agencies={agencies}
                    />                 
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    </Flex>
        
    )
}