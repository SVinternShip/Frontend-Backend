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

import React, {useState} from "react";

// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Link as ReachLink,
  Switch,
  Text,
  Icon,
  DarkMode,
} from "@chakra-ui/react";

// Icons
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
// Custom Components
import AuthFooter from "../Footer/AuthFooter";
import GradientBorder from "../GradientBorder/GradientBorder";

// Assets
import signUpImage from "../../assets/img/signUpImage.png";
import axios from "axios";



async function signUp(hospital, username, last_name, first_name, password) {
  try {
  //응답 성공
  const response = await axios.post('http://localhost:8000/api/user/signup',
    {
    //보내고자 하는 데이터
      hospital: hospital,
      username: username,
      last_name: last_name,
      first_name: first_name,
      password: password,
  },
      );
  console.log(response);
  window.location.replace('http://localhost:3000/home/signin');
  //회원가입 완료 후 signin 페이지로 redirect

    } catch (error) {
    //응답 실패
    if (error.response){
      console.log('error response');
    }
    else if(error.request){
      console.log('error request');
    }
    else if (error.message){
      console.log('error message');
    }
  }
}



export default function SignUp() {
  const titleColor = "white";
  const textColor = "gray.400";

  const [hospital, setHospital] = useState("");
  const [username, setUserName] = useState("");
  const [last_name, setLastName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [password, setPassWord] = useState("");

  const handleHospitalOnChange = (e) => {
    setHospital(e.target.value)
  }

  const handleUserNameOnChange = (e) => {
    setUserName(e.target.value)
  }

  const handleLastNameOnChange = (e) => {
    setLastName(e.target.value)
  }

  const handleFirstNameOnChange = (e) => {
    setFirstName(e.target.value)
  }

  const handlePassWordOnChange = (e) => {
    setPassWord(e.target.value)
  }

  return (
    <Flex position='relative' overflow={{ lg: "hidden" }}>
      <Flex
        minH='100vh'
        h={{ base: "120vh", lg: "fit-content" }}
        w='100%'
        maxW='1500px'
        mx='auto'
        pt={{ sm: "100px", md: "0px" }}
        flexDirection='column'
        me={{ base: "auto", lg: "50px", xl: "auto" }}>
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          flexDirection='column'
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          mb='50px'

          w={{ base: "100%", md: "50%", lg: "450px" }}>
          <Flex
            direction='column'
            textAlign='center'
            justifyContent='center'
            align='center'
            mt={{ base: "60px", md: "140px", lg: "200px" }}
            mb='50px'>
            <Text
              fontSize='4xl'
              lineHeight='39px'
              color='white'
              fontWeight='bold'>
              Welcome to AssiCT!
            </Text>
            <Text
              fontSize='md'
              color='white'
              fontWeight='normal'
              mt='10px'
              w={{ base: "100%", md: "90%", lg: "90%", xl: "80%" }}>
              Create new account
            </Text>
          </Flex>
          <GradientBorder p='2px' me={{ base: "none", lg: "30px", xl: "none" }}>
            <Flex
              background='transparent'
              borderRadius='30px'
              direction='column'
              p='40px'
              minW={{ base: "unset", md: "430px", xl: "450px" }}
              w='100%'
              mx={{ base: "0px" }}
              bg={{
                base: "rgb(19,21,56)",
              }}>

              <HStack spacing='15px' justify='center' mb='22px'>
              </HStack>

              <FormControl>
                <FormLabel
                  color={titleColor}
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'>
                  Hospital Code
                </FormLabel>

                <GradientBorder
                  mb='24px'
                  h='50px'
                  w={{ base: "100%", lg: "fit-content" }}
                  borderRadius='20px'>
                  <Input id='hospital'
                    color={titleColor}
                    bg={{
                      base: "rgb(19,21,54)",
                    }}
                    border='transparent'
                    borderRadius='20px'
                    fontSize='sm'
                    size='lg'
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    h='46px'
                    type='text'
                    name="hospital"
                    value={hospital}
                    onChange={handleHospitalOnChange}
                    placeholder='Your hospital code'
                  />
                </GradientBorder>
                <FormLabel
                  color={titleColor}
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'>
                  ID
                </FormLabel>
                <GradientBorder
                  mb='24px'
                  h='50px'
                  w={{ base: "100%", lg: "fit-content" }}
                  borderRadius='20px'>
                  <Input
                      id='username'
                    color={titleColor}
                    bg={{
                      base: "rgb(19,21,54)",
                    }}
                    border='transparent'
                    borderRadius='20px'
                    fontSize='sm'
                    size='lg'
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    h='46px'
                    type='Text'
                    name='username'
                    onChange={handleUserNameOnChange}
                    value={username}
                    placeholder='Your ID'
                  />
                </GradientBorder>
                <FormLabel
                  color={titleColor}
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'>
                  Last name
                </FormLabel>
                <GradientBorder
                  mb='24px'
                  h='50px'
                  w={{ base: "100%", lg: "fit-content" }}
                  borderRadius='20px'>
                  <Input
                      id='last_name'
                    color={titleColor}
                    bg={{
                      base: "rgb(19,21,54)",
                    }}
                    border='transparent'
                    borderRadius='20px'
                    fontSize='sm'
                    size='lg'
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    h='46px'
                    type='Text'
                    name='last_name'
                    onChange={handleLastNameOnChange}
                    value={last_name}
                    placeholder='Your Last name'
                  />
                </GradientBorder>
                <FormLabel
                  color={titleColor}
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'>
                  First name
                </FormLabel>
                <GradientBorder
                  mb='24px'
                  h='50px'
                  w={{ base: "100%", lg: "fit-content" }}
                  borderRadius='20px'>
                  <Input
                      id='first_name'
                    color={titleColor}
                    bg={{
                      base: "rgb(19,21,54)",
                    }}
                    border='transparent'
                    borderRadius='20px'
                    fontSize='sm'
                    size='lg'
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    h='46px'
                    type='Text'
                    name='first_name'
                    onChange={handleFirstNameOnChange}
                    value={first_name}
                    placeholder='Your First name'
                  />
                </GradientBorder>
                <FormLabel
                  color={titleColor}
                  ms='4px'
                  fontSize='sm'
                  fontWeight='normal'>
                  Password
                </FormLabel>
                <GradientBorder
                  mb='24px'
                  h='50px'
                  w={{ base: "100%", lg: "fit-content" }}
                  borderRadius='20px'>
                  <Input
                      id='password'
                    color={titleColor}
                    bg={{
                      base: "rgb(19,21,54)",
                    }}
                    border='transparent'
                    borderRadius='20px'
                    fontSize='sm'
                    size='lg'
                    w={{ base: "100%", md: "346px" }}
                    maxW='100%'
                    h='46px'
                    type='password'
                    value={password}
                      onChange={handlePassWordOnChange}
                    placeholder='Your password'
                  />
                </GradientBorder>
                <Button onClick={()=>signUp(hospital, username, last_name, first_name, password)}
                  variant='brand'
                  fontSize='10px'
                  type='submit'
                  w='100%'
                  maxW='350px'
                  h='45'
                  mb='20px'
                  mt='20px'>
                  SIGN UP
                </Button>
              </FormControl>
              <Flex
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                maxW='100%'
                mt='0px'>
                <Text color={textColor} fontWeight='medium'>
                  Already have an account?
                  <Link
                    color={titleColor}
                    as='span'
                    ms='5px'
                    as={ReachLink}
                    href='/home/signin'
                    fontWeight='bold'>
                    Sign In
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </GradientBorder>
        </Flex>
        <Box
          w={{ base: "335px", md: "450px" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          mb='90px'>
          {/*<AuthFooter />*/}
        </Box>
        <Box
          display={{ base: "none", lg: "block" }}
          overflowX='hidden'
          h='100%'
          maxW={{ md: "50vw", lg: "50vw" }}
          minH='100vh'
          w='960px'
          position='absolute'
          left='0px'>
          <Box
            bgImage={signUpImage}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            position='absolute'>
            <Text
              textAlign='center'
              color='white'
              letterSpacing='8px'
              fontSize='20px'
              fontWeight='500'>
              YOUR PERSONAL ASSISTANT
            </Text>
            <Text
              textAlign='center'
              color='transparent'
              letterSpacing='8px'
              fontSize='36px'
              fontWeight='bold'
              bgClip='text !important'
              bg='linear-gradient(94.56deg, #FFFFFF 79.99%, #21242F 102.65%)'>
              AssiCT
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
