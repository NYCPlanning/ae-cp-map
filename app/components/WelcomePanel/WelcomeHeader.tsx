import { Heading } from "@nycplanning/streetscape";

export function WelcomeHeader() {
  return (
    <Heading
      flex="1"
      textAlign={"left"}
      fontSize="md"
      fontWeight="bold"
      lineHeight={"32px"}
      pb={0}
    >
      Welcome
    </Heading>
  );
}
