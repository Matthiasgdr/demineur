import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

const Providers = ({ children }) => {
  return <ChakraProvider> {children}</ChakraProvider>;
};

Providers.propTypes = {};

export default Providers;
