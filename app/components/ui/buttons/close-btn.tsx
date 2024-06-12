import { CloseIcon } from "@chakra-ui/icons";
import { IconButton } from "@nycplanning/streetscape";

export default function CloseWelcomeBtn({ ...props }) {
  return (
    <IconButton variant="outline" width="25px" {...props}>
      <CloseIcon />
    </IconButton>
  );
}
