import { ChevronLeftIcon } from "@chakra-ui/icons";
import { IconButton } from "@nycplanning/streetscape";
import { Link as LinkRemix } from "@remix-run/react";

export function PreviousPageBtn() {
  return (
    <IconButton
      variant="outline"
      as={LinkRemix}
      to=".."
      icon={<ChevronLeftIcon />}
      width="25px"
    />
  );
}
