import { Heading } from "@nycplanning/streetscape";

export function WelcomeHeader() {
  return (
    <Heading
      flex="1"
      textAlign={"left"}
      fontSize="large"
      fontWeight="medium"
      lineHeight={"32px"}
      mb={"1dvh"}
    >
      Welcome
    </Heading>
  );
}
