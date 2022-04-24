import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    500: "#000000",
  },
  secondary: {
    500: "#FFFFFF",
  },
};

const theme = extendTheme({ colors });

export { theme };
