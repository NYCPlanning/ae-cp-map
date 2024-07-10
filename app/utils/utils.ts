import { compareAsc, format, getMonth, getYear } from "date-fns";

const getFiscalYearForDate = (date: Date): number => {
  const year = getYear(date);
  const month = getMonth(date);
  return month <= 6 ? year : year + 1;
};

export const formatFiscalYearRange = (minDate: Date, maxDate: Date) => {
  return compareAsc(minDate, maxDate) === 0
    ? `FY${getFiscalYearForDate(minDate)}`
    : `FY${getFiscalYearForDate(minDate)} - FY${getFiscalYearForDate(maxDate)}`;
};

export const currentDate = () => {
  return `${format(new Date(), "MM/dd/yyyy")}`;
};

// from https://www.jacobparis.com/content/remix-pagination
export function setNewSearchParamsString(
  searchParams: URLSearchParams,
  changes: Record<string, string | number | undefined>,
) {
  const newSearchParams = new URLSearchParams(searchParams);
  for (const [key, value] of Object.entries(changes)) {
    if (value === undefined) {
      newSearchParams.delete(key);
      continue;
    }
    newSearchParams.set(key, String(value));
  }

  return newSearchParams.toString();
}
