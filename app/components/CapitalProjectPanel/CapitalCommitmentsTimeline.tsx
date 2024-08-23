import { Flex } from "@nycplanning/streetscape";
import numbro from "numbro";
import { CapitalCommitment } from "~/gen";

export interface CapitalCommitmentsTimelineProps {
  capitalCommitments: Array<CapitalCommitment>;
}

export const getDisplayYear = (
  minYear: number | null,
  maxYear: number | null,
) => {
  // If there were no commitments in a year, then the min and max year will both be null
  if (minYear !== maxYear) return `${minYear} - ${maxYear}`;
  // Only one of the variables need to be checked to know there were no commitments
  if (maxYear === null) return "";
  // Through deduction, we know there was at least one commitment but they were all from the same year.
  return `${maxYear}`;
};

export function CapitalCommitmentsTimeline({
  capitalCommitments,
}: CapitalCommitmentsTimelineProps) {
  const currentYear = new Date().getFullYear();
  const commitmentsCount = capitalCommitments.length;
  let maxPastYear = null;
  let minPastYear = null;
  let maxFutureYear = null;
  let minFutureYear = null;
  let pastCommitmentsTotal = 0;
  let futureCommitmentsTotal = 0;
  let currentCommitmentsTotal = 0;
  for (let i = commitmentsCount; i--; ) {
    const commitment = capitalCommitments[i];
    const commitmentYear = new Date(commitment.plannedDate).getFullYear();

    if (commitmentYear < currentYear) {
      pastCommitmentsTotal += commitment.totalValue;
      maxPastYear =
        maxPastYear === null
          ? commitmentYear
          : commitmentYear > maxPastYear
            ? commitmentYear
            : maxPastYear;

      minPastYear =
        minPastYear === null
          ? commitmentYear
          : commitmentYear < minPastYear
            ? commitmentYear
            : minPastYear;
    } else if (commitmentYear > currentYear) {
      futureCommitmentsTotal += commitment.totalValue;
      maxFutureYear =
        maxFutureYear === null
          ? commitmentYear
          : commitmentYear > maxFutureYear
            ? commitmentYear
            : maxFutureYear;

      minFutureYear =
        minFutureYear === null
          ? commitmentYear
          : commitmentYear < minFutureYear
            ? commitmentYear
            : minFutureYear;
    } else if (commitmentYear === currentYear) {
      currentCommitmentsTotal += commitment.totalValue;
    }
  }

  return (
    <Flex maxWidth={"350px"} margin={"auto"}>
      <svg
        viewBox="0 0 300 75"
        width="300"
        height="75"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <g>
          <line
            x1="50"
            y1="30"
            x2="250"
            y2="30"
            stroke="var(--dcp-colors-teal-500)"
          />
          <circle cx="50" cy="30" r="2" fill="var(--dcp-colors-gray-500)" />
          <circle cx="150" cy="30" r="3" fill="var(--dcp-colors-teal-500)" />
          <circle cx="250" cy="30" r="2" fill="var(--dcp-colors-gray-500)" />
        </g>
        <g>
          <text
            x="50"
            y="20"
            fill="var(--dcp-colors-gray-500)"
            fontSize="var(--dcp-fontSizes-sm)"
            fontWeight={"bold"}
            textAnchor="middle"
          >
            {numbro(pastCommitmentsTotal)
              .format({
                average: true,
                output: "currency",
                mantissa: 2,
              })
              .toUpperCase()}
          </text>
          <text
            x="50"
            y="45"
            fill="var(--dcp-colors-gray-500)"
            fontSize="var(--dcp-fontSizes-xs)"
            textAnchor="middle"
          >
            Past
          </text>
          <text
            x="50"
            y="60"
            fill="var(--dcp-colors-gray-500)"
            fontSize="var(--dcp-fontSizes-xs)"
            textAnchor="middle"
          >
            {getDisplayYear(minPastYear, maxPastYear)}
          </text>
          <text
            x="150"
            y="20"
            fill="var(--dcp-colors-gray-500)"
            fontSize="var(--dcp-fontSizes-sm)"
            fontWeight={"bold"}
            textAnchor="middle"
          >
            {numbro(currentCommitmentsTotal)
              .format({
                average: true,
                output: "currency",
                mantissa: 2,
              })
              .toUpperCase()}
          </text>
          <text
            x="150"
            y="45"
            fill="var(--dcp-colors-gray-600)"
            fontSize="var(--dcp-fontSizes-xs)"
            textAnchor="middle"
          >
            Current
          </text>
          <text
            x="150"
            y="60"
            fill="var(--dcp-colors-gray-600)"
            fontSize="var(--dcp-fontSizes-xs)"
            textAnchor="middle"
          >
            {currentYear}
          </text>
          <text
            x="250"
            y="20"
            fill="var(--dcp-colors-gray-700)"
            fontSize="var(--dcp-fontSizes-sm)"
            fontWeight={"bold"}
            textAnchor="middle"
          >
            {numbro(futureCommitmentsTotal)
              .format({
                average: true,
                output: "currency",
                mantissa: 2,
              })
              .toUpperCase()}
          </text>
          <text
            x="250"
            y="45"
            fill="var(--dcp-colors-gray-700)"
            fontSize={"var(--dcp-fontSizes-xs)"}
            textAnchor="middle"
          >
            Future
          </text>
          <text
            x="250"
            y="60"
            fill="var(--dcp-colors-gray-700)"
            fontSize={"var(--dcp-fontSizes-xs)"}
            textAnchor="middle"
          >
            {getDisplayYear(minFutureYear, maxFutureYear)}
          </text>
        </g>
      </svg>
    </Flex>
  );
}
