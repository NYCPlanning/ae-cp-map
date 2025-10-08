import { Heading } from "@nycplanning/streetscape";

export function WelcomeHeader() {
  return (
    <Heading
      flex="1"
      textAlign={"left"}
      fontSize="md"
      fontWeight="bold"
      lineHeight={"32px"}
      pt={"1dvh"}
      pb={"1dvh"}
      borderBottom={"2px solid"}
      borderColor={"gray.200"}
    >
      Welcome
    </Heading>
  );
}
