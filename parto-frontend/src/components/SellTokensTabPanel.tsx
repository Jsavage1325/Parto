import { Heading, Input } from "@chakra-ui/react";

import { StepTabPanel } from "src/components";
import type { MusicTabPanelProps } from "src/types";

const SellTokensTabPanel: React.FC<MusicTabPanelProps> = ({
  musicMetadata,
  setMusicMetadata,
  ...props
}) => (
  <StepTabPanel title="Sell Tokens" {...props}>
    <Heading size="sm">
      How many of your 100 tokens do you want to sell?
    </Heading>
    <Input
      placeholder="Number of Tokens"
      value={musicMetadata.numTokensToSell || ""}
      onChange={({ target: { value } }) =>
        setMusicMetadata({
          ...musicMetadata,
          numTokensToSell: parseFloat(value),
        })
      }
    />
    <Heading size="sm">
      How much do you want to sell these tokens for in total?
    </Heading>
    <Input
      placeholder="Total Price"
      value={musicMetadata.totalSalePrice || ""}
      onChange={({ target: { value } }) =>
        setMusicMetadata({
          ...musicMetadata,
          totalSalePrice: parseFloat(value),
        })
      }
    />
  </StepTabPanel>
);

export { SellTokensTabPanel };
