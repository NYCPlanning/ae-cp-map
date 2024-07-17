import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, HStack, IconButton } from "@nycplanning/streetscape";
import { useSearchParams } from "@remix-run/react";
import { Button } from "@chakra-ui/button";
import { Link } from "@remix-run/react";

export interface PaginationProps{
    total: number;
    path: string,
};

export const Pagination = ({total, path}: PaginationProps) => {
    const [searchParams] = useSearchParams();
    console.log(searchParams);
    console.log("total", total);
    const limit = Number(searchParams.get("limit"));
    const offset = Number(searchParams.get("offset"));

    const currentPage = offset === 0 ? 1 : offset / limit + 1;
    console.log(currentPage);
    const canSkipBackward = offset > 0;
    const canSkipForward = total === limit;

    const search = `?limit=7&offset=`; 
    return (
        <Flex
            paddingTop="16px"
        >
            <HStack>
            <Link
                to={{search: search + `${offset - 7}`}}
            >
                <IconButton disable={!canSkipBackward} size="s" aria-label="Add" icon={<ChevronLeftIcon />}/>
            </Link>
            <Button borderRadius={0} size="sm" aria-label="Page">{currentPage}</Button>
            <Link
                to={{search: search + `${currentPage * 7}`}}
            >
                <IconButton  disable={!canSkipBackward} size="s" aria-label="Add" icon={<ChevronRightIcon />} />
            </Link>
            </HStack>
        </Flex>
    );
}