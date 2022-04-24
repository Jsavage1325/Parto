import { Center, VStack } from "@chakra-ui/react";
import Head from "next/head";

import { PrimaryNavBar } from "src/components";

interface PageWrapperProps {
  pageTitle?: string;
  children?: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ pageTitle, children }) => (
  <>
    <Head>
      <title>{pageTitle ? `Parto | ${pageTitle}` : "Parto"}</title>
    </Head>

    <VStack align="stretch" spacing={0} h="100vh">
      <PrimaryNavBar pageTitle={pageTitle} />
      <Center>{children}</Center>
    </VStack>
  </>
);

export { PageWrapper };
