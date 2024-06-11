import { ChevronLeftIcon } from "@chakra-ui/icons";
import { IconButton } from "@nycplanning/streetscape";
import { LinkRemix } from "../ui";

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
