import React, { useEffect, useState } from "react";
import {
  Tr,
  Td,
  Flex,
  Text,
  Progress,
  Icon,
  Button,
  Box,
  useColorModeValue,
  Badge,
  Img,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Th,
  Tbody,
} from "@chakra-ui/react";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import Card from "../Card/Card";

function PatientInfo(props) {
  const { patientName, createdDate, createdTime, totalCtNum, hemoNum } = props;

  return (
    <Card>
      <CardHeader p="6px 0px 22px 0px">
        <Flex direction="column">
          <Text fontSize="lg" color="#fff" fontWeight="bold" mb=".5rem">
            Patient Information
          </Text>
          <Flex align="center"></Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Box>
          <Text
            mt="1"
            color="#fff"
            fontWeight="bold"
            lineHeight="tight"
          >
            환자명 : {patientName} / 날짜 : {createdDate} {createdTime}
          </Text>
          <Flex mt="1" color="#fff" fontWeight="bold">
            <Text color="red"> {hemoNum} </Text>
            <Text>  /{totalCtNum} ( </Text>
            <Text color="red"> 출혈 의심 </Text>
            <Text> /전체)</Text>
          </Flex>
        </Box>
      </CardBody>
    </Card>
  );
}

export default PatientInfo;
