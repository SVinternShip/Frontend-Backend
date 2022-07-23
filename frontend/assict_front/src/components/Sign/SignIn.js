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
  Heading,
  Input,
  Link,
  Link as ReachLink,
  Text,
  useToast,
} from "@chakra-ui/react";

// Assets
import { useNavigate } from 'react-router-dom';
import signInImage from "../../assets/img/signInImage.jpg";

// Custom Components
import GradientBorder from "../GradientBorder/GradientBorder";


import axios from "axios";


export default function SignIn() {
  const toast = useToast()
  const navigate = useNavigate();
  function checkToken(){
    if (window.localStorage.getItem('token') !== null) //token값이 존재하면 로그인이 되었다고 판단
    {
      console.log("@@@@")
      navigate("/home/tables");
    }
  }

  checkToken()
  async function LogIn(username, password) {
    try {
      //응답 성공
      const response = await axios.post('/api/user/login',
          {
            //보내고자 하는 데이터
            username: username,
            password: password
          },
      );
      window.localStorage.clear();
      window.localStorage.setItem('token', response.data.token); //response로 받은 data중에 token값
      checkToken()

    } catch (error) {
      toast({
        title: '로그인 실패',
        position: 'top',
        description: "ID, Password를 다시 확인해 주세요",
        status: "error",
        isClosable: true,
      })
    }
  }

  const titleColor = "white";
  const textColor = "gray.400";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameOnChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value)
  }

  const handleEnterPress = e => {
    if(e.key === 'Enter') {
      LogIn(username, password)
    }
  }

  return (
    <Flex position='relative'
          onKeyPress={handleEnterPress}>
      <Flex
        minH='100vh'
        h={{ base: "120vh", lg: "fit-content" }}
        w='100%'
        maxW='1300px'
        mx='auto'
        pt={{ sm: "100px", md: "0px" }}
        flexDirection='column'
        me={{ base: "auto", lg: "50px", xl: "auto" }}>
        <Flex
          alignItems='center'
          justifyContent='center'
          style={{ userSelect: "none" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          w={{ base: "100%", md: "50%", lg: "450px" }}
          px='50px'>
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            mt={{ base: "50px", md: "150px", lg: "160px", xl: "245px" }}
            mb={{ base: "60px", lg: "95px" }}>
            <Heading color={titleColor} fontSize='45px' mb='10px'>
              Nice to see you!
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='18px'>
              Enter your ID and password to sign in
            </Text>
            <FormControl>
              <FormLabel
                ms='4px'
                fontSize='lg'
                fontWeight='normal'
                color='white'>
                User ID
              </FormLabel>
              <GradientBorder
                mb='24px'
                w={{ base: "100%", lg: "fit-content" }}
                borderRadius='20px'>
                <Input id='username'
                  color='white'
                  bg='rgb(19,21,54)'
                  border='transparent'
                  borderRadius='20px'
                  fontSize='md'
                  size='lg'
                  w={{ base: "100%", md: "346px" }}
                  maxW='100%'
                  h='46px'
                  type='Text'
                       name="username"
                       onChange={handleUsernameOnChange}
                  value={username}
                  placeholder='Your user ID'
                />
              </GradientBorder>
            </FormControl>
            <FormControl>
              <FormLabel
                ms='4px'
                fontSize='lg'
                fontWeight='normal'
                color='white'>
                Password
              </FormLabel>
              <GradientBorder
                mb='24px'
                w={{ base: "100%", lg: "fit-content" }}
                borderRadius='20px'>
                <Input id='password'
                  color='white'
                  bg='rgb(19,21,54)'
                  border='transparent'
                  borderRadius='20px'
                  fontSize='md'
                  size='lg'
                  w={{ base: "100%", md: "346px" }}
                  maxW='100%'
                  type='password'
                       name="password"
                       value={password}
                       onChange={handlePasswordOnChange}
                  placeholder='Your password'
                />
              </GradientBorder>
            </FormControl>

            <Button
                onClick={()=>LogIn(username, password)}
              variant='brand'
              fontSize='18px'
              type='submit'
              w='100%'
              maxW='350px'
              h='45'
              mb='20px'
              mt='20px'>
              SIGN IN
            </Button>

            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                Don't have an account?
                <Link color={titleColor} as='span' ms='5px' fontWeight='bold' as={ReachLink} href='/signup'>
                  Sign Up
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          w={{ base: "335px", md: "450px" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          mb='80px'>
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
            bgImage={signInImage}
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
              fontSize='30px'
              fontWeight='500'>
              YOUR PERSONAL ASSISTANT
            </Text>
            <Text
              textAlign='center'
              color='transparent'
              letterSpacing='8px'
              fontSize='45px'
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