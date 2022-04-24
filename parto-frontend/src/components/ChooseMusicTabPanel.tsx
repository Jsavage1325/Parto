import { Input, Link, Text } from "@chakra-ui/react";

import { StepTabPanel } from "src/components";
import type { MusicTabPanelProps } from "src/types";

const ChooseMusicTabPanel: React.FC<MusicTabPanelProps> = ({
  musicMetadata,
  setMusicMetadata,
  ...props
}) => (
  <StepTabPanel title="Choose Music" {...props}>
    <Text>
      Choose music by its ISRC (International Standard Recording Code). If you
      do not have an ISRC, <Link href="/">click here</Link>.
    </Text>
    <Input
      placeholder="Enter ISRC"
      value={musicMetadata.isrc || ""}
      onChange={({ target: { value } }) =>
        setMusicMetadata({ ...musicMetadata, isrc: value })
      }
    />
  </StepTabPanel>
);

export { ChooseMusicTabPanel };
