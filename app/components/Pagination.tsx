import {
  Box,
  ChevronLeftIcon,
  ChevronRightIcon,
  HStack,
  Text,
  Skeleton,
  VStack,
} from "@nycplanning/streetscape";
import { Link, useNavigation, useSearchParams } from "react-router";
import { setNewSearchParams } from "~/utils/utils";
import { analytics } from "~/utils/analytics";
import { PageParamKey } from "~/utils/types";
import { useEffect, useState } from "react";

export interface PaginationProps {
  total: number;
  pageParamKey: PageParamKey;
}

export const Pagination = ({ total, pageParamKey }: PaginationProps) => {
  const [searchParams] = useSearchParams();
  const itemsPerPage = 7;
  const pageParam = searchParams.get(pageParamKey);
  const page = pageParam === null ? 1 : parseInt(pageParam);
  const canSkipBackward = page > 1;
  const totalPages = Math.ceil(total / itemsPerPage);
  const canSkipForward = page < totalPages;

  const firstItem = (page - 1) * itemsPerPage + 1;
  const lastItem = Math.min(page * itemsPerPage, total);

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  const [pageLoaderIncrement, setPageLoaderIncrement] = useState(0);

  useEffect(() => {
    if (!isNavigating) setPageLoaderIncrement(0);
  }, [isNavigating]);

  return (
    <VStack>
      <HStack gap={1} alignContent={"baseline"}>
        <Link
          to={{
            search: setNewSearchParams(searchParams, {
              [pageParamKey]: page - 1,
            }).toString(),
          }}
          onClick={() => {
            setPageLoaderIncrement(-1);
            analytics({
              category: "Pagination",
              action: "Click",
              name: "Back",
              value: page - 1,
            });
          }}
        >
          <Box
            as="button"
            disabled={!canSkipBackward}
            _disabled={{ color: "gray.400", cursor: "default" }}
            fontSize={"xl"}
            aria-label="left"
          >
            <ChevronLeftIcon />
          </Box>
        </Link>
        <Skeleton isLoaded={!(isNavigating && pageLoaderIncrement === 0)}>
          <Text
            fontSize="xs"
            aria-label={`Page ${page} of ${totalPages}`}
            textColor={"gray.600"}
            fontWeight={700}
            paddingTop={1}
          >
            {isNavigating ? page + pageLoaderIncrement : page} of {totalPages}
          </Text>
        </Skeleton>
        <Link
          to={{
            search: setNewSearchParams(searchParams, {
              [pageParamKey]: page + 1,
            }).toString(),
          }}
          onClick={() => {
            setPageLoaderIncrement(1);
            analytics({
              category: "Pagination",
              action: "Click",
              name: "Next",
              value: page + 1,
            });
          }}
        >
          <Box
            as="button"
            disabled={!canSkipForward}
            _disabled={{ color: "gray.400", cursor: "default" }}
            fontSize={"xl"}
            aria-label="right"
          >
            <ChevronRightIcon />
          </Box>
        </Link>
      </HStack>
      <Skeleton isLoaded={!(isNavigating && pageLoaderIncrement === 0)}>
        <Text color={"gray.600"} fontSize={"xs"}>
          Results:{" "}
          {isNavigating
            ? firstItem + pageLoaderIncrement * itemsPerPage
            : firstItem}
          -
          {isNavigating
            ? pageLoaderIncrement === -1
              ? firstItem - 1
              : Math.min(lastItem + pageLoaderIncrement * itemsPerPage, total)
            : lastItem}{" "}
          of {total}
        </Text>
      </Skeleton>
    </VStack>
  );
};
