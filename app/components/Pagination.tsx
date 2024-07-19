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
    const [searchParams] = useSearchParams();
    const limit = Number(searchParams.get("limit"));
    const offset = Number(searchParams.get("offset"));

    const currentPage = offset === 0 ? 1 : offset / limit + 1;
    const canSkipBackward = offset > 0;
    const canSkipForward = total === limit || limit === 0;

    const search = `?limit=7&offset=`; 
    return (
            <HStack gap={2}>
            <Link
                to={{search: search + `${offset - 7}`}}
            >
                <Box as="button" disabled={!canSkipBackward}  _disabled={{ color: 'grey' }} fontSize={"xl"}><ChevronLeftIcon /></Box>
            </Link>
            <Box borderRadius={3} fontSize="sm" aria-label="Page">{currentPage}</Box>
            <Link
                to={{search: search + `${currentPage * 7}`}}
            >
                <Box as="button" disabled={!canSkipForward} _disabled={{ color: 'grey' }} fontSize={"xl"}><ChevronRightIcon /></Box>
            </Link>
            </HStack>
    );
}