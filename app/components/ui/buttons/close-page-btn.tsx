import { CloseIcon } from "@chakra-ui/icons";
import { LinkRemix } from "..";
import CloseBtn from "./close-btn";

export function ClosePageBtn() {
  return (
    <CloseBtn as={LinkRemix} to="/">
      <CloseIcon />
    </CloseBtn>
  );
}
