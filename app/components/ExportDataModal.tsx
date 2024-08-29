import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"; // TODO: Remove before flight

import { Button, Text } from "@nycplanning/streetscape";
import { useState } from "react";
import { LinkBtn } from "./LinkBtn";

export function ExportDataModal() {
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
        <ModalContent>
          <ModalHeader>Data Export</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Geography</Text>
          </ModalBody>
          <ModalFooter>
            <LinkBtn isExternal>Export Data</LinkBtn>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
