import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HStack, IconButton } from "@nycplanning/streetscape";
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

    const currentPage = Math.floor(offset / limit) + 1;
    const canSkipBackward = offset > 0;
    const canSkipForward = total === limit;

    // const skip
    return (
        <HStack>
            
                <Link
                    to={{
                        search: {},
                      }}
                >
                    <IconButton disable={!canSkipBackward} size="s" aria-label="Add" icon={<ChevronLeftIcon />}/>
                </Link>
            <Button size="sm" aria-label="Page">{currentPage}</Button>
            <IconButton  disable={!canSkipBackward} size="s" aria-label="Add" icon={<ChevronRightIcon />} />
        </HStack>
    );
}