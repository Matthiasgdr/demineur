import React from "react";
import PropTypes from "prop-types";
import { ChakraProvider } from "@chakra-ui/react";

const Providers = ({ children }) => {
  return <ChakraProvider> {children}</ChakraProvider>;
};

Providers.propTypes = {};

export default Providers;
