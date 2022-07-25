
// Chakra Imports
import {
  Button,
  Flex,
  InputGroup,
  Text,
} from "@chakra-ui/react";
// Custom Icons
import { ProfileIcon } from "../Icons/Icons";
// Custom Components
import { SidebarResponsive } from "../Sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
import routes from "../../routes.js";

function SignOut(){
    window.localStorage.clear();

    if (window.localStorage.getItem('token') == null){
           window.location.replace("/signin")
    } }

export default function HeaderLinks(props) {


  const { variant, children, fixed, secondary, onOpen, ...rest } = props;


  // Chakra Color Mode
  let inputBg = "#0F1535";
  let navbarIcon = "white";

  if (secondary) {
    navbarIcon = "white";
  }

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems='center'
      flexDirection='row'>
      <InputGroup
        cursor='pointer'
        bg={inputBg}
        borderRadius='15px'
        borderColor='rgba(226, 232, 240, 0.3)'
        w={{
          sm: "128px",
          md: "200px",
        }}
        me={{ sm: "auto", md: "20px" }}>


      </InputGroup>
        <Button
          ms='0px'
          px='0px'
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant='transparent-with-icon'
          rightIcon={
            document.documentElement.dir ? (
              ""
            ) : (
              <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' />
            )
          }
          leftIcon={
            document.documentElement.dir ? (
              <ProfileIcon color={navbarIcon} w='22px' h='22px' me='0px' />
            ) : (
              ""
            )
          }>
          <Text onClick={()=>SignOut()}
                display={"flex"}>Sign Out</Text>
        </Button>
      <SidebarResponsive
        iconColor='gray.500'
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
