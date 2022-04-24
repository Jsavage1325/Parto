import { Heading, Input } from "@chakra-ui/react";

import { StepTabPanel } from "src/components";
import type { MusicTabPanelProps } from "src/types";

const CreateTokensTabPanel: React.FC<MusicTabPanelProps> = ({
  musicMetadata,
  setMusicMetadata,
  ...props
}) => (
  <StepTabPanel title="Create Tokens" {...props}>
    <Heading size="sm">When do you want this revenue stream to expire?</Heading>
    <Input
      type="date"
      value={musicMetadata.expirationDate || ""}
      onChange={({ target: { value } }) =>
        setMusicMetadata({
          ...musicMetadata,
          expirationDate:
            new Date(value).toISOString().split("T")[0] || undefined,
        })
      }
    />
  </StepTabPanel>
);

export { CreateTokensTabPanel };
