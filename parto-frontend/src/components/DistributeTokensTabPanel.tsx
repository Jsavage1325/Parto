import { Input } from "@chakra-ui/react";

import { StepTabPanel } from "src/components";
import type { MusicTabPanelProps } from "src/types";

const DistributeTokensTabPanel: React.FC<MusicTabPanelProps> = ({
  musicMetadata,
  setMusicMetadata,
  ...props
}) => (
  <StepTabPanel title="Distribute Tokens" {...props}>
    <Input
      placeholder="Number of Tokens"
      value={musicMetadata.numTokensToDistribute || ""}
      onChange={({ target: { value } }) =>
        setMusicMetadata({
          ...musicMetadata,
          numTokensToDistribute: parseFloat(value),
        })
      }
    />
  </StepTabPanel>
);

export { DistributeTokensTabPanel };
