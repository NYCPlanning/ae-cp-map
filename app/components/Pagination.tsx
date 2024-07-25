import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, HStack } from "@nycplanning/streetscape";
import { Link } from "@remix-run/react";

export interface PaginationProps {
  limit?: number;
  offset?: number;
  total: number;
  getNextPageParams: (
    params: Record<string, string | number | undefined>,
  ) => string;
}

export const Pagination = ({
  limit = 7,
  offset = 0,
  total,
  getNextPageParams,
}: PaginationProps) => {
  const currentPage = offset / limit + 1;
  const canSkipBackward = offset > 0;
  const canSkipForward = total === limit;

  return (
    <HStack gap={2}>
      <Link
        to={{
          search: getNextPageParams({
            offset: offset - 7,
          }),
        }}
      >
        <Box
          as="button"
          disabled={!canSkipBackward}
          _disabled={{ color: "grey" }}
          fontSize={"xl"}
        >
          <ChevronLeftIcon />
        </Box>
      </Link>
      <Box borderRadius={3} fontSize="sm" aria-label="Page">
        {currentPage}
      </Box>
      <Link
        to={{
          search: getNextPageParams({
            offset: currentPage * 7,
          }),
        }}
      >
        <Box
          as="button"
          disabled={!canSkipForward}
          _disabled={{ color: "grey" }}
          fontSize={"xl"}
        >
          <ChevronRightIcon />
        </Box>
      </Link>
    </HStack>
  );
};
