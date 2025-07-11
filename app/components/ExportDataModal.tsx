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

import { useEffect, useState } from "react";
import { LinkBtn } from "./LinkBtn";
import axios from "axios";

export interface ExportDataModalProps {
  geography: string;
  fileName: string;
}

// fileName = filters
export function ExportDataModal({ geography, fileName }: ExportDataModalProps) {
  const domain = "capital-projects/csv";
  const [allDistricts, setAllDistricts] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>();

  useEffect(() => {
    console.debug("file name", fileName);
  }, [fileName]);
  useEffect(() => {
    (async () => {
      setDownloadUrl(undefined);
      if (isOpen) {
        const lookup = `${import.meta.env.VITE_ZONING_API_URL}/api/${domain}${allDistricts ? "" : "?" + fileName}`;
        console.debug("lookup", lookup);
        const response = await axios.get(lookup);
        let { url } = (await response.data) as { url: string | null };
        console.debug("url", url);
        if (url === null) {
          const putResponse = await axios.put(lookup);
          const { url: pUrl } = (await putResponse.data) as { url: string };
          url = pUrl;
        }
        setDownloadUrl(`http://${url}`);
      }
    })();
  }, [isOpen, allDistricts, fileName]);

  const onOpen = async () => setIsOpen(true);
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
              // href={`${import.meta.env.VITE_CPDB_DATA_URL}/${allDistricts ? "projects_in_geographies.zip" : fileName}`}
              href={downloadUrl}
              width={"full"}
              textAlign={"center"}
            >
              {downloadUrl === undefined ? "Loading..." : "Export Data"}
            </LinkBtn>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
