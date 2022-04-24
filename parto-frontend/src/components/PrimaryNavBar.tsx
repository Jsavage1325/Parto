import { Heading, HStack, Spacer } from "@chakra-ui/react";

import { PartoIcon } from "src/icons";

interface PrimaryNavBarProps {
  pageTitle?: string;
}

const PrimaryNavBar: React.FC<PrimaryNavBarProps> = ({ pageTitle }) => (
  <HStack>
    <HStack spacing="0.2em">
      <Heading>Part</Heading>
      <PartoIcon boxSize="1.4em" />
    </HStack>
    <Spacer />
    <Heading>{pageTitle}</Heading>
    <Spacer />
    <Spacer />
  </HStack>
);

export { PrimaryNavBar };
