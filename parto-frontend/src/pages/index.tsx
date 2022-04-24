import {
  Button,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { ADAPTER_EVENTS, SafeEventEmitterProvider } from "@web3auth/base";
import type { Web3Auth, Web3AuthOptions } from "@web3auth/web3auth";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Web3 from "web3";

import {
  ArtistOwnershipTabPanel,
  ChooseMusicTabPanel,
  CreateTokensTabPanel,
  PageWrapper,
  SellTokensTabPanel,
  DistributeTokensTabPanel,
} from "src/components";
import { MusicMetadata } from "src/types";
import { EthereumRpc, uploadFiles } from "src/utils";

const Home: NextPage = () => {
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

  const [web3AuthInstance, setWeb3AuthInstance] = useState<Web3Auth | null>(
    null
  );

  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  const [address, setAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const web3AuthCtorParams = {
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
          chainConfig: { chainNamespace: "eip155", chainId: "0x1" },
        };

        const { Web3Auth } = await import("@web3auth/web3auth");
        const web3AuthInstanceLocal = new Web3Auth(
          web3AuthCtorParams as Web3AuthOptions
        );
        subscribeAuthEvents(web3AuthInstanceLocal);
        setWeb3AuthInstance(web3AuthInstanceLocal);
        await web3AuthInstanceLocal.initModal();

        if (provider) {
          const rpc = new EthereumRpc(provider);
          const userAccounts = await rpc.getAccounts();

          console.log(userAccounts[0]);

          setAddress(userAccounts[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const subscribeAuthEvents = (web3AuthInstanceLocal: Web3Auth) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3AuthInstanceLocal.on(
        ADAPTER_EVENTS.CONNECTED,
        async (data: unknown) => {
          console.log("Yeah!, you are successfully logged in", data);

          if (!provider) {
            console.log("provider not initialized yet");
            return;
          }
          const rpc = new EthereumRpc(provider);
          const userAccounts = await rpc.getAccounts();

          console.log(userAccounts[0]);

          setAddress(userAccounts[0]);
        }
      );

      web3AuthInstanceLocal.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });

      web3AuthInstanceLocal.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
      });

      web3AuthInstanceLocal.on(ADAPTER_EVENTS.ERRORED, (error) => {
        console.error("some error or user has cancelled login request", error);
      });
    };

    init();
  }, []);

  const createTokens = async (sourceAddress, targetAddress) => {
    const partoken = [
      {
        inputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "contract ISuperToken",
            name: "cashToken",
            type: "address",
          },
          {
            internalType: "contract ISuperToken",
            name: "daiToken",
            type: "address",
          },
          {
            internalType: "contract ISuperfluid",
            name: "host",
            type: "address",
          },
          {
            internalType: "contract IInstantDistributionAgreementV1",
            name: "ida",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
        signature:
          "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
        signature:
          "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
        signature:
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      },
      {
        inputs: [],
        name: "INDEX_ID",
        outputs: [
          {
            internalType: "uint32",
            name: "",
            type: "uint32",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x8c7f0959",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0xdd62ed3e",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x095ea7b3",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x70a08231",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x313ce567",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "subtractedValue",
            type: "uint256",
          },
        ],
        name: "decreaseAllowance",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0xa457c2d7",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "addedValue",
            type: "uint256",
          },
        ],
        name: "increaseAllowance",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x39509351",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "isSubscribing",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x915e3364",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x06fdde03",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x8da5cb5b",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x715018a6",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x95d89b41",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
        constant: true,
        signature: "0x18160ddd",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0xa9059cbb",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x23b872dd",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0xf2fde38b",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "beneficiary",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "issue",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x867904b4",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "cashAmount",
            type: "uint256",
          },
        ],
        name: "distribute",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x91c05b0b",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "cashAmount",
            type: "uint256",
          },
        ],
        name: "distributeDAI",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x99e41b53",
      },
    ];

    const ethNode =
      "https://kovan.infura.io/v3/dd072c9e29824ccf93bea07c71ee2697";
    const web3Provider = new Web3.providers.HttpProvider(ethNode);
    const web3 = new Web3(provider as any);

    const brainContractAddress = "0x4E4C66A261ae312083A2BB56f56634bB98c83F44";
    const BrainContract = new web3.eth.Contract(
      partoken as any,
      brainContractAddress
    );
    await BrainContract.methods
      .issue(targetAddress, "100000000000000000")
      .send({ from: sourceAddress })
      .on("receipt", (err, transactionHash) => {
        if (err) {
          console.log(err);
        } else {
          console.log(transactionHash);
        }
      });
  };

  const login = async () => {
    if (!web3AuthInstance) {
      console.log("web3auth not initialized yet");
      return;
    }
    const providerLocal = await web3AuthInstance.connect();
    setProvider(providerLocal);
  };

  const getUserInfo = async () => {
    if (!web3AuthInstance) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3AuthInstance.getUserInfo();
    console.log("User info", user);
  };

  const logout = async () => {
    if (!web3AuthInstance) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3AuthInstance.logout();
    setProvider(null);
  };

  const onGetAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new EthereumRpc(provider);
    const userAccount = await rpc.getAccounts();
    console.log("User account", userAccount);
  };

  const loggedInView = (
    <>
      <Button onClick={getUserInfo} className="card">
        Get User Info
      </Button>
      <Button onClick={onGetAccounts} className="card">
        Get Accounts
      </Button>
      <Button onClick={logout} className="card">
        Log Out
      </Button>
    </>
  );

  const unloggedInView = (
    <Button onClick={login} className="card">
      Login
    </Button>
  );

  return (
    <PageWrapper pageTitle="Add Music">
      <Container maxW="container.sm">
        <VStack>
          <div className="grid">{provider ? loggedInView : unloggedInView}</div>
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
                  stepNext={async () => {
                    if (!provider) {
                      console.log("provider not initialized yet");
                      return;
                    }
                    const rpc = new EthereumRpc(provider);
                    const userAccounts = await rpc.getAccounts();

                    console.log(userAccounts[0]);

                    setAddress(userAccounts[0]);
                    createTokens(address, address);

                    stepNext();
                  }}
                  musicMetadata={musicMetadata}
                  setMusicMetadata={setMusicMetadata}
                />
              </TabPanel>
              <TabPanel>
                <SellTokensTabPanel
                  stepPrevious={stepPrevious}
                  stepNext={stepNext}
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

export default Home;
