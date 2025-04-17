import { compareAsc, format, getMonth, getYear } from "date-fns";
import {
  SearchParamChanges,
  CommitmentsTotalMin,
  CommitmentsTotalMax,
  CommitmentsTotalMinInputValue,
  CommitmentsTotalMaxInputValue,
  CommitmentsTotalMinSelectValue,
  CommitmentsTotalMaxSelectValue,
} from "./types";

const getFiscalYearForDate = (date: Date): number => {
  const year = getYear(date);
  const month = getMonth(date);
  return month <= 6 ? year : year + 1;
};

export const formatFiscalYearRange = (minDate: Date, maxDate: Date) => {
  return compareAsc(minDate, maxDate) === 0
    ? `FY${getFiscalYearForDate(minDate)}`
    : `FY${getFiscalYearForDate(minDate)}-FY${getFiscalYearForDate(maxDate)}`;
};

export const currentDate = () => {
  return `${format(new Date(), "MM/dd/yyyy")}`;
};

export const handleCommitmentTotalsInputs = (
  commitmentsTotalMin: CommitmentsTotalMin,
  commitmentsTotalMax: CommitmentsTotalMax,
) => {
  let commitmentsTotalMinInputValue = "" as CommitmentsTotalMinInputValue;
  let commitmentsTotalMaxInputValue = "" as CommitmentsTotalMaxInputValue;
  let commitmentsTotalMinSelectValue = "K" as CommitmentsTotalMinSelectValue;
  let commitmentsTotalMaxSelectValue = "K" as CommitmentsTotalMaxSelectValue;
  if (commitmentsTotalMin && parseFloat(commitmentsTotalMin)) {
    if (Math.abs(parseFloat(commitmentsTotalMin)) >= 1000000000) {
      commitmentsTotalMinInputValue = (
        parseFloat(commitmentsTotalMin) / 1000000000
      ).toString();
      commitmentsTotalMinSelectValue = "B";
    } else if (Math.abs(parseFloat(commitmentsTotalMin)) >= 1000000) {
      commitmentsTotalMinInputValue = (
        parseFloat(commitmentsTotalMin) / 1000000
      ).toString();
      commitmentsTotalMinSelectValue = "M";
    } else if (Math.abs(parseFloat(commitmentsTotalMin)) >= 1000) {
      commitmentsTotalMinInputValue = (
        parseFloat(commitmentsTotalMin) / 1000
      ).toString();
    }
  }
  if (commitmentsTotalMax && parseFloat(commitmentsTotalMax)) {
    if (Math.abs(parseFloat(commitmentsTotalMax)) >= 1000000000) {
      commitmentsTotalMaxInputValue = (
        parseFloat(commitmentsTotalMax) / 1000000000
      ).toString();
      commitmentsTotalMaxSelectValue = "B";
    } else if (Math.abs(parseFloat(commitmentsTotalMax)) >= 1000000) {
      commitmentsTotalMaxInputValue = (
        parseFloat(commitmentsTotalMax) / 1000000
      ).toString();
      commitmentsTotalMaxSelectValue = "M";
    } else if (Math.abs(parseFloat(commitmentsTotalMax)) >= 1000) {
      commitmentsTotalMaxInputValue = (
        parseFloat(commitmentsTotalMax) / 1000
      ).toString();
    }
  }

  return {
    commitmentsTotalMinInputValue,
    commitmentsTotalMinSelectValue,
    commitmentsTotalMaxInputValue,
    commitmentsTotalMaxSelectValue,
  };
};

export function getMultiplier(multiplier: string) {
  switch (multiplier) {
    case "B":
      return 1000000000;
    case "M":
      return 1000000;
    case "K":
      return 1000;
    default:
      return 1;
  }
}

export interface CheckCommitmentTotalInputsAreValidProps {
  commitmentsTotalMinInputValue: CommitmentsTotalMinInputValue;
  commitmentsTotalMaxInputValue: CommitmentsTotalMaxInputValue;
  commitmentsTotalMinSelectValue: CommitmentsTotalMinSelectValue;
  commitmentsTotalMaxSelectValue: CommitmentsTotalMaxSelectValue;
}

export const checkCommitmentTotalInputsAreValid = ({
  commitmentsTotalMinInputValue,
  commitmentsTotalMaxInputValue,
  commitmentsTotalMinSelectValue,
  commitmentsTotalMaxSelectValue,
}: CheckCommitmentTotalInputsAreValidProps) => {
  if (!commitmentsTotalMinInputValue || !commitmentsTotalMaxInputValue)
    return true;
  const min =
    parseFloat(commitmentsTotalMinInputValue) *
    getMultiplier(commitmentsTotalMinSelectValue);
  const max =
    parseFloat(commitmentsTotalMaxInputValue) *
    getMultiplier(commitmentsTotalMaxSelectValue);
  if (min <= max) return true;
  return false;
};

// from https://www.jacobparis.com/content/remix-pagination
export function setNewSearchParams(
  searchParams: URLSearchParams,
  changes: SearchParamChanges,
) {
  const newSearchParams = new URLSearchParams(searchParams);

  for (const [key, value] of Object.entries(changes)) {
    if (value === undefined || value === null) {
      newSearchParams.delete(key);
      continue;
    }
    newSearchParams.set(key, String(value));
  }

  return newSearchParams;
}
