import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";

import {
  ArtistOwnershipTabPanel,
  ChooseMusicTabPanel,
  CreateTokensTabPanel,
  DistributeTokensTabPanel,
  PageWrapper,
  SellTokensTabPanel,
} from "src/components";
import { MusicMetadata } from "src/types";
import { uploadFiles } from "src/utils";

const MusicAddPage: NextPage = () => {
  const [musicMetadata, setMusicMetadata] = useState<MusicMetadata>({});

  const tabTitles = [
    "Choose Music (ISRC)",
    "Describe Rights",
    "Create Tokens",
    "Sell Tokens",
    "Distribute Tokens",
  ];

  const [tabIndex, setTabIndex] = useState(0);

  const stepPrevious = () => {
    if (tabIndex > 0) {
      setTabIndex(tabIndex - 1);
    }
  };

  const stepNext = () => {
    if (tabIndex < tabTitles.length - 1) {
      setTabIndex(tabIndex + 1);
    }
  };

  const uploadMetadata = () => {
    const blob = new Blob([JSON.stringify(musicMetadata)], {
      type: "application/json",
    });
    const data = new FormData();
    data.append("file", blob);
    uploadFiles(data);
  };

  const getTabStyles = (currentTabIndex: number) =>
    tabIndex === currentTabIndex
      ? "blue"
      : tabIndex > currentTabIndex
      ? "green"
      : "gray";

  return (
    <PageWrapper pageTitle="Add Music">
      <Container maxW="container.sm">
        <VStack>
          <Tabs index={tabIndex} variant="unstyled" isFitted>
            <TabList>
              {tabTitles.map((tabTitle, index) => (
                <Tab key={tabTitle} bg={getTabStyles(index)}>
                  {tabTitle}
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              <TabPanel>
                <ChooseMusicTabPanel
                  stepNext={stepNext}
                  musicMetadata={musicMetadata}
                  setMusicMetadata={setMusicMetadata}
                />
              </TabPanel>
              <TabPanel>
                <ArtistOwnershipTabPanel
                  stepPrevious={stepPrevious}
                  stepNext={stepNext}
                  musicMetadata={musicMetadata}
                  setMusicMetadata={setMusicMetadata}
                />
              </TabPanel>
              <TabPanel>
                <CreateTokensTabPanel
                  stepPrevious={stepPrevious}
                  stepNext={stepNext}
                  musicMetadata={musicMetadata}
                  setMusicMetadata={setMusicMetadata}
                />
              </TabPanel>
              <TabPanel>
                <SellTokensTabPanel
                  stepPrevious={stepPrevious}
                  stepNext={uploadMetadata}
                  musicMetadata={musicMetadata}
                  setMusicMetadata={setMusicMetadata}
                />
              </TabPanel>
              <TabPanel>
                <DistributeTokensTabPanel
                  stepPrevious={stepPrevious}
                  stepNext={uploadMetadata}
                  musicMetadata={musicMetadata}
                  setMusicMetadata={setMusicMetadata}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </PageWrapper>
  );
};

export default MusicAddPage;
