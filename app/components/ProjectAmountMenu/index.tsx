import { CloseIcon, Flex, IconButton, Text } from "@nycplanning/streetscape";
import { useState, useEffect } from "react";
import {
  CommitmentsTotalMin,
  CommitmentsTotalMax,
  QueryParams,
} from "../../utils/types";
import {
  handleCommitmentTotalsInputs,
  checkCommitmentTotalInputsAreValid,
  getMultiplier,
} from "~/utils/utils";
import { ProjectAmountMenuInput } from "./ProjectAmountMenuInput";

export type ProjectAmountMenuValues = {
  commitmentsTotalMinInputValue: string;
  commitmentsTotalMinSelectValue: string;
  commitmentsTotalMaxInputValue: string;
  commitmentsTotalMaxSelectValue: string;
};

export interface ProjectAmountMenuProps {
  commitmentsTotalMin: CommitmentsTotalMin;
  commitmentsTotalMax: CommitmentsTotalMax;
  onValidChange: (changes: QueryParams) => void;
}
export function ProjectAmountMenu({
  commitmentsTotalMin,
  commitmentsTotalMax,
  onValidChange,
}: ProjectAmountMenuProps) {
  const [projectAmountMenuParams, setProjectAmountMenuParams] =
    useState<ProjectAmountMenuValues>(
      handleCommitmentTotalsInputs(commitmentsTotalMin, commitmentsTotalMax),
    );

  useEffect(() => {
    setProjectAmountMenuParams(
      handleCommitmentTotalsInputs(commitmentsTotalMin, commitmentsTotalMax),
    );
  }, [commitmentsTotalMin, commitmentsTotalMax]);

  const {
    commitmentsTotalMinInputValue,
    commitmentsTotalMinSelectValue,
    commitmentsTotalMaxInputValue,
    commitmentsTotalMaxSelectValue,
  } = projectAmountMenuParams;

  const commitmentTotalInputsAreValid = checkCommitmentTotalInputsAreValid(
    projectAmountMenuParams,
  );
  const showClearButton =
    commitmentsTotalMinInputValue !== "" ||
    commitmentsTotalMaxInputValue !== "" ||
    commitmentsTotalMinSelectValue !== "K" ||
    commitmentsTotalMaxSelectValue !== "K";

  useEffect(() => {
    const newCommitmentTotalInputsAreValid = checkCommitmentTotalInputsAreValid(
      {
        commitmentsTotalMinInputValue,
        commitmentsTotalMaxInputValue,
        commitmentsTotalMinSelectValue,
        commitmentsTotalMaxSelectValue,
      },
    );
    if (newCommitmentTotalInputsAreValid) {
      onValidChange({
        commitmentsTotalMin:
          commitmentsTotalMinInputValue !== "" &&
          parseFloat(commitmentsTotalMinInputValue)
            ? (
                parseFloat(commitmentsTotalMinInputValue) *
                getMultiplier(commitmentsTotalMinSelectValue)
              ).toString()
            : null,
        commitmentsTotalMax:
          commitmentsTotalMaxInputValue !== "" &&
          parseFloat(commitmentsTotalMaxInputValue)
            ? (
                parseFloat(commitmentsTotalMaxInputValue) *
                getMultiplier(commitmentsTotalMaxSelectValue)
              ).toString()
            : null,
      });
    }
  }, [
    commitmentsTotalMinInputValue,
    commitmentsTotalMaxInputValue,
    commitmentsTotalMinSelectValue,
    commitmentsTotalMaxSelectValue,
  ]);

  return (
    <>
      <Flex
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text fontWeight="500" flexGrow={"1"} pb={1} fontSize={"xs"}>
          Project Amount
        </Text>
        {!commitmentTotalInputsAreValid && (
          <Text color={"state.error"} fontSize={"xs"} marginRight={2} pb={1}>
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
              setProjectAmountMenuParams({
                commitmentsTotalMinInputValue: "",
                commitmentsTotalMaxInputValue: "",
                commitmentsTotalMinSelectValue: "K",
                commitmentsTotalMaxSelectValue: "K",
              });
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
        <ProjectAmountMenuInput
          label={"Minimum"}
          commitmentTotalInputsAreValid={commitmentTotalInputsAreValid}
          inputValue={commitmentsTotalMinInputValue}
          selectValue={commitmentsTotalMinSelectValue}
          onInputValueChange={(value) => {
            setProjectAmountMenuParams({
              ...projectAmountMenuParams,
              commitmentsTotalMinInputValue: value ? value : "",
            });
          }}
          onSelectValueChange={(value) => {
            setProjectAmountMenuParams({
              ...projectAmountMenuParams,
              commitmentsTotalMinSelectValue: value,
            });
          }}
        />

        <Flex grow={1} justifyContent={"center"} alignItems={"end"} mb={"1rem"}>
          <hr
            style={{
              width: "75%",
              color: "var(--dcp-colors-gray-500)",
            }}
          />
        </Flex>

        <ProjectAmountMenuInput
          label={"Maximum"}
          commitmentTotalInputsAreValid={commitmentTotalInputsAreValid}
          inputValue={commitmentsTotalMaxInputValue}
          selectValue={commitmentsTotalMaxSelectValue}
          onInputValueChange={(value) => {
            setProjectAmountMenuParams({
              ...projectAmountMenuParams,
              commitmentsTotalMaxInputValue: value ? value : "",
            });
          }}
          onSelectValueChange={(value) => {
            setProjectAmountMenuParams({
              ...projectAmountMenuParams,
              commitmentsTotalMaxSelectValue: value,
            });
          }}
        />
      </Flex>
    </>
  );
}
