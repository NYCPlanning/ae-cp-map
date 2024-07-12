import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, HStack, Heading, IconButton } from "@nycplanning/streetscape"
import { CapitalProject } from "~/gen";
import { CapitalProjectsList } from "./CapitalProjectsList";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export interface CapitalProjectsAccordionPanelProps {
    capitalProjects: Array<CapitalProject>;
    district: string;
    limit: number;
    offset: number;
    total: number;
}

export const CapitalProjectsAccordionPanel = ({
    capitalProjects, district, limit, offset, total
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
<Accordion allowToggle>
            <AccordionItem>
                <h2>
                <AccordionButton>
               
               <HStack justify="space-between">
                   <Heading color="gray.600" fontWeight={"bold"} fontSize={"lg"}>
                   {district}
                   </Heading>
                   <AccordionIcon />
               </HStack>
               </AccordionButton>
                </h2>
                
        
                
                <AccordionPanel>
                <CapitalProjectsList
                    capitalProjects={capitalProjects}
                    limit={limit}
                    offset={offset}
                    total={total}
                /> 
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    </Flex>
        
    )
}