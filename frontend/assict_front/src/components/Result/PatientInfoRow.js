import React, {useEffect, useState} from "react";
import {
    Tr,
    Td,
    Flex,
    Text,
    Progress,
    Icon,
    Button,
    Box,
    useColorModeValue, Badge, Img, FormControl, FormLabel, Table, Thead, Th, Tbody,
} from "@chakra-ui/react";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import Card from "../Card/Card";

function PatientInfo(props) {
    const {patientName, createdDate, createdTime } = props;

    return(
        <Flex direction='column'>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
                <CardHeader p='6px 0px 22px 0px'>
                    <Flex direction='column'>
                        <Text fontSize='lg' color='#fff' fontWeight='bold' mb='.5rem'>
                            Patient Information
                        </Text>
                        <Flex align='center'>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Box mt='1' color='#fff' fontWeight='bold' lineHeight='tight' noOfLines={1}>
                        환자명 : {patientName}
                    </Box>
                </CardBody>
                <Box mt='1' color='#fff' fontWeight='bold' lineHeight='tight' noOfLines={1}>
                    날짜 : {createdDate} / {createdTime}
                </Box>
            </Card>
        </Flex>
    )
}

export default PatientInfo;
