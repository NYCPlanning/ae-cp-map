import { CloseIcon } from "@chakra-ui/icons";
import { IconButton } from "@nycplanning/streetscape";
import { LinkRemix } from "../ui";

export function ClosePageBtn() {
  return (
    <IconButton variant="outline" as={LinkRemix} width="25px" to="/">
      <CloseIcon />
    </IconButton>
  );
}
