import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  Text,
  Switch,
  Heading,
  FormControl,
  FormLabel,
  Box,
} from "@nycplanning/streetscape";

import { useState } from "react";
import { LinkBtn } from "./LinkBtn";

export interface ExportDataModalProps {
  geography: string;
  fileName: string;
}

export function ExportDataModal({ geography, fileName }: ExportDataModalProps) {
  const [allDistricts, setAllDistricts] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Button size="xs" onClick={onOpen}>
        Export Data
      </Button>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent
          height={"min-content"}
          width={{ base: "100vw", md: "400px" }}
        >
          <Box
            fontWeight={"bold"}
            borderBottom={"1px"}
            borderColor={"gray.200"}
            borderStyle={"solid"}
            margin={"1rem"}
          >
            <ModalHeader padding={"0.5rem"}>Data Export</ModalHeader>
            <ModalCloseButton />
          </Box>
          <ModalBody>
            <Box marginBottom={"1rem"}>
              <Heading
                as={"h2"}
                fontWeight={"bold"}
                fontSize={"xs"}
                color={"primary.600"}
                textTransform={"uppercase"}
              >
                Geography
              </Heading>
              <Text>{geography}</Text>
            </Box>
            <Box>
              <FormControl>
                <FormLabel htmlFor="export-all-districts">
                  <Heading
                    as={"h2"}
                    fontWeight={"bold"}
                    fontSize={"xs"}
                    color={"primary.600"}
                    textTransform={"uppercase"}
                  >
                    Include all districts?
                  </Heading>
                </FormLabel>
                <Switch
                  id="export-all-districts"
                  isChecked={allDistricts}
                  onChange={() =>
                    setAllDistricts((allDistricts) => !allDistricts)
                  }
                />
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <LinkBtn
              isExternal
              href={`${import.meta.env.VITE_CPDB_DATA_URL}/${allDistricts ? "projects_in_geographies.zip" : fileName}`}
              width={"full"}
              textAlign={"center"}
            >
              Export Data
            </LinkBtn>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
