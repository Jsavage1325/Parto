import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Heading, HStack, IconButton, VStack } from "@chakra-ui/react";

interface StepTabPanelProps {
  stepPrevious?: () => void;
  stepNext?: () => void;
  title: string;
  children: React.ReactNode;
}

const StepTabPanel: React.FC<StepTabPanelProps> = ({
  stepPrevious,
  stepNext,
  title,
  children,
}) => (
  <VStack align="start">
    <Heading>{title}</Heading>
    {children}
    <HStack width="100%">
      <IconButton
        disabled={!stepPrevious}
        aria-label="Back"
        icon={<ArrowBackIcon />}
        onClick={stepPrevious}
      />
      <Button disabled={!stepNext} onClick={stepNext} isFullWidth>
        Next
      </Button>
    </HStack>
  </VStack>
);

export { StepTabPanel };
export type { StepTabPanelProps };
