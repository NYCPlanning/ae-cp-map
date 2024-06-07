import { CloseIcon } from "@chakra-ui/icons";
import { IconButton } from "@nycplanning/streetscape";
import { Link as LinkRemix } from "@remix-run/react";

export function ClosePageBtn() {
  return (
    <IconButton variant="outline" as={LinkRemix} width="25px" to="/">
      <CloseIcon />
    </IconButton>
  );
}
