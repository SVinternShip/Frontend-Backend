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

function get_prediction_result(prediction){
    if (prediction === true){
        return(
            <Box
                color='#fff'
                fontWeight='bold'
                letterSpacing='wide'
                fontSize='xl'
                textTransform='uppercase'
            >
                정상
            </Box>
        )
    }
    return (
        <Box
            borderColor='red.700'
            color='red.400'
            fontWeight='bold'
            letterSpacing='wide'
            fontSize='xl'
            textTransform='uppercase'
        >
            출혈 위험
        </Box>
    )
}
function CtImageInfo(props) {
    const { prediction, fileName, studyDate } = props;

    return(
        <Flex direction='column'>
            <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Box p='6'>
                    <Box display='flex' alignItems='baseline'>
                        {get_prediction_result(prediction)}
                    </Box>
                    <Box display='flex' mt='2' alignItems='center'>
                        <Box as='span' color='#fff' fontWeight='bold' fontSize='sm'>
                            촬영 날짜 : {studyDate}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Flex>
    )
}

export default CtImageInfo;
