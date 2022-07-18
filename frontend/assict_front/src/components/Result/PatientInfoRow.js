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
    useColorModeValue, Badge, Img, FormControl, FormLabel,
} from "@chakra-ui/react";

function PatientInfo(props) {
    const { prediction, fileName, studyDate } = props;

    return(
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Box p='6'>
                <Box display='flex' alignItems='baseline'>
                </Box>
                <Box
                    mt='1'
                    color='#fff'
                    fontWeight='bold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                >
                    {fileName}
                </Box>
                <Box display='flex' mt='2' alignItems='center'>
                    <Box as='span' color='#fff' fontWeight='bold' fontSize='sm'>
                        촬영 날짜 : {studyDate}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default PatientInfo;
