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
      <Flex width={"100%"} justifyContent={"space-between"}>
        <h2 style={{ width: "100%", fontWeight: "500" }}>Project Amount</h2>
        {!commitmentTotalInputsAreValid && (
          <Text
            color={"state.error"}
            fontSize={"xs"}
            style={{
              width: "100%",
              textAlign: "right",
              marginRight: "0.5rem",
              paddingTop: "0.25rem",
            }}
          >
            Invalid Range
          </Text>
        )}
        {showClearButton && (
          <IconButton
            aria-label={"Clear Project Amounts"}
            variant="ghost"
            _focus={{ borderWidth: 3, borderColor: "teal" }}
            pos={"relative"}
            minH={"unset"}
            minW={"unset"}
            height={"min-content"}
            width={"min-content"}
            top={-0.5}
            cursor={"pointer"}
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
