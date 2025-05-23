import { Flex, IconButton, Text } from "@nycplanning/streetscape";
import { CloseIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";

export interface ProjectAmountMenuProps {
  children: ReactNode;
  showClearButton: boolean;
  onProjectAmountMenuClear?: () => void;
  commitmentTotalInputsAreValid?: boolean;
}
export function ProjectAmountMenu({
  children,
  showClearButton,
  onProjectAmountMenuClear = () => null,
  commitmentTotalInputsAreValid = true,
}: ProjectAmountMenuProps) {
  return (
    <>
      <Flex
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text fontWeight="500" flexGrow={"1"}>
          Project Amount
        </Text>
        {!commitmentTotalInputsAreValid && (
          <Text color={"state.error"} fontSize={"xs"} marginRight={2}>
            Invalid Range
          </Text>
        )}
        {showClearButton && (
          <IconButton
            aria-label={"Clear Project Amounts"}
            variant="ghost"
            _focus={{ borderWidth: "none", borderColor: "teal" }}
            pos={"relative"}
            minH={"unset"}
            minW={"unset"}
            height={"min-content"}
            width={"min-content"}
            cursor={"pointer"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            onClick={() => {
              onProjectAmountMenuClear();
            }}
            icon={
              <CloseIcon
                boxSize={3}
                p={0.5}
                border={"1px solid"}
                borderRadius={16}
              />
            }
          />
        )}
      </Flex>

      <Flex width={"100%"} justifyContent={"space-between"}>
        {children}
      </Flex>
    </>
  );
}
