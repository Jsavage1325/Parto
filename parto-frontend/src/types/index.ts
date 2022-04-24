import type { StepTabPanelProps } from "src/components";

interface MusicMetadata {
  isrc?: string;
  ownershipPercent?: number;
  expirationDate?: string;
  numTokensToSell?: number;
  numTokensToDistribute?: number;
  totalSalePrice?: number;
}

interface MusicTabPanelProps
  extends Omit<StepTabPanelProps, "children" | "title"> {
  musicMetadata: MusicMetadata;
  setMusicMetadata: (musicMetadata: MusicMetadata) => void;
}

export type { MusicMetadata, MusicTabPanelProps };
