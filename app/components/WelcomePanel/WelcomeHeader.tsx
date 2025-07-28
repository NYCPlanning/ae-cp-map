import { Heading } from "@nycplanning/streetscape";
import { showRedesign } from "../../utils/envFlags";

export function WelcomeHeader() {
  if (showRedesign) {
    return (
      <Heading
        flex="1"
        textAlign={"left"}
        fontSize="large"
        fontWeight="medium"
        lineHeight={"32px"}
      >
        Welcome
      </Heading>
    );
  }

  return (
    <>
      <Heading
        flex="1"
        textAlign={"left"}
        fontSize="large"
        fontWeight="medium"
        lineHeight={"32px"}
      >
        Capital Projects Portal
      </Heading>
    </>
  );
}
