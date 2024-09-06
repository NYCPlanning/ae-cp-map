import { Link, LinkProps } from "@nycplanning/streetscape";

export type LinkBtnProps = LinkProps;
export function LinkBtn(props: LinkBtnProps) {
  return (
    <Link
      borderRadius={"base"}
      paddingX={6}
      paddingY={3}
      backgroundColor={"primary.600"}
      color={"white"}
      boxShadow="0 1.5 1.5 0 rgba(35, 78, 82, 0.08)"
      minH={11}
      minW={11}
      fontSize={"sm"}
      _disabled={{
        backgroundColor: "primary.500",
        color: "white",
        opacity: 0.64,
        pointerEvents: "none",
      }}
      _hover={{
        backgroundColor: "brand.50",
        border: "1px solid",
        borderColor: "brand.800",
        boxShadow: "0 1 1.5 0 rgba(217, 107, 39, 0.18)",
        color: "gray.700",
        fontWeight: "medium",
      }}
      _active={{
        backgroundColor: "primary.500",
        border: "none",
        boxShadow:
          "0px 4px 4px 0px rgba(0, 0, 0, 0.08) inset, 0px -4px 4px 0px rgba(0, 0, 0, 0.08) inset, 4px 0px 4px 0px rgba(0, 0, 0, 0.08) inset, -4px 0px 4px 0px rgba(0, 0, 0, 0.08) inset;",
        color: "white",
        fontWeight: "medium",
        textDecorationLine: "underline",
      }}
      {...props}
    >
      {props.children}
    </Link>
  );
}
