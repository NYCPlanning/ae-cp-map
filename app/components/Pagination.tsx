import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack } from "@nycplanning/streetscape";
import { useSearchParams } from "@remix-run/react";
import { Button } from "@chakra-ui/button";
import { Link } from "@remix-run/react";
import { IconButton } from "@chakra-ui/react";

export interface PaginationProps{
    total: number;
    path: string,
};

export const Pagination = ({total, path}: PaginationProps) => {
    // where do we want to limit to only having 7 as limit
    const [searchParams, setSearchParams] = useSearchParams();
    const limit = 7; // Number(searchParams.get("limit"));
    const offset = Number(searchParams.get("offset"));

    const currentPage = offset === 0 ? 1 : offset / limit + 1;
    const canSkipBackward = offset > 0;
    const canSkipForward = total === limit;

    // from https://www.jacobparis.com/content/remix-pagination
    function setSearchParamsString(
        searchParams: URLSearchParams,
        changes: Record<string, string | number | undefined>,
      ) {
        const newSearchParams = new URLSearchParams(searchParams)
        for (const [key, value] of Object.entries(changes)) {
          if (value === undefined) {
            newSearchParams.delete(key)
            continue
          }
          newSearchParams.set(key, String(value))
        }
        // Print string manually to avoid over-encoding the URL
        // Browsers are ok with $ nowadays
        // optional: return newSearchParams.toString()
        return Array.from(newSearchParams.entries())
          .map(([key, value]) =>
            value ? `${key}=${encodeURIComponent(value)}` : key,
          )
          .join("&")
      }

    return (
        <HStack gap={2}>
        <Link
            to={{ search: setSearchParamsString(searchParams, {
                    offset: offset - 7
                })
            }}
        >
            <Box as="button" disabled={!canSkipBackward}  _disabled={{ color: 'grey' }} fontSize={"xl"}><ChevronLeftIcon /></Box>
        </Link>
        <Box borderRadius={3} fontSize="sm" aria-label="Page">{currentPage}</Box>
        <Link
            to={{ search: setSearchParamsString(searchParams, {
                    offset: currentPage * 7
                })
            }}
        >
            <Box as="button" disabled={!canSkipForward} _disabled={{ color: 'grey' }} fontSize={"xl"}><ChevronRightIcon /></Box>
        </Link>
        </HStack>
    );
}