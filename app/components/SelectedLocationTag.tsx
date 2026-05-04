import { Box, CloseIcon, Tag } from "@nycplanning/streetscape";
import type { ReactNode } from "react";

export const SelectedLocationTag = ({
  id,
  label,
  clearTag,
}: {
  id: string;
  label: ReactNode;
  clearTag: (tagId: string) => void;
}) => {
  return (
    <Tag
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={"4px"}
      fontSize={"11px"}
      borderRadius={"4px"}
      background={"primary.100"}
      color={"teal.700"}
      _hover={{
        backgroundColor: "#81E6D9", // primary.200, token does not exist
      }}
    >
      <Box>{label}</Box>
      <Box>
        <CloseIcon
          color={"teal.700"}
          width={"8px"}
          height={"8px"}
          onClick={() => clearTag(id)}
          aria-label={"closeIcon"}
          verticalAlign={"middle"}
          sx={{
            cursor: "pointer",
          }}
        />
      </Box>
    </Tag>
  );
};
