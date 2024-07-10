import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, HStack } from "@nycplanning/streetscape";
import { Link, useSearchParams } from "@remix-run/react";
import { setNewSearchParamsString } from "~/utils/utils";

export interface PaginationProps {
  total: number;
}

export const Pagination = ({ total }: PaginationProps) => {
  const [searchParams] = useSearchParams();
  const itemsPerPage = 7;
  const pageParam = searchParams.get("page");
  const page = pageParam === null ? 1 : parseInt(pageParam);
  const canSkipBackward = page > 1;
  const canSkipForward = total === itemsPerPage;

  return (
    <HStack gap={2}>
      <Link
        to={{
          search: setNewSearchParamsString(searchParams, {
            page: page - 1,
          }),
        }}
      >
        <Box
          as="button"
          disabled={!canSkipBackward}
          _disabled={{ color: "grey" }}
          fontSize={"xl"}
          aria-label="left"
        >
          <ChevronLeftIcon />
        </Box>
      </Link>
      <Box
        borderRadius={2}
        height={"2rem"}
        width={"2rem"}
        fontSize="sm"
        aria-label="Page"
        bgColor={"primary.600"}
        textColor={"white"}
        alignContent={"center"}
        textAlign={"center"}
      >
        {page}
      </Box>
      <Link
        to={{
          search: setNewSearchParamsString(searchParams, {
            page: page + 1,
          }),
        }}
      >
        <Box
          as="button"
          disabled={!canSkipForward}
          _disabled={{ color: "grey" }}
          fontSize={"xl"}
          aria-label="right"
        >
          <ChevronRightIcon />
        </Box>
      </Link>
    </HStack>
  );
};
