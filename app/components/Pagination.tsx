import { useSearchParams } from "@remix-run/react";

export interface PaginationProps{
    total: number;
};

export const Pagination = ({total}: PaginationProps) => {
    const [searchParams] = useSearchParams();
    console.log(searchParams);
    console.log("total", total);
    return (
        <></>
    );
}