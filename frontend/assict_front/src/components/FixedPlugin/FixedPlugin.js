/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra Imports
import { Button, useColorModeValue } from "@chakra-ui/react";
// Custom Icons
import { SettingsIcon } from "../Icons/Icons";
import PropTypes from "prop-types";
import React from "react";

export default function FixedPlugin(props) {
  const { secondary, onChange, onSwitch, fixed, ...rest } = props;
  // Chakra Color Mode
  let navbarIcon = "white";
  let bgButton = "brand.200";
  // if (props.secondary) {
  //   fixedDisplay = "none";
  // }

  const settingsRef = React.useRef();
  return (
    <>
      
    </>
  );
}

FixedPlugin.propTypes = {
  fixed: PropTypes.bool,
  onChange: PropTypes.func,
  onSwitch: PropTypes.func,
};
