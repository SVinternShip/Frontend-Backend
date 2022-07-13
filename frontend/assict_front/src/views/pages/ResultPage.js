import React, {useEffect, useState} from "react";
import {Box, ChakraProvider, Portal} from "@chakra-ui/react";
import theme from "../../theme/themeAuth";
import AuthNavbar from "../../components/Navbars/AuthNavbar";
import Result from "../../components/Result/Result";
import {useParams} from "react-router-dom";
import axios from "axios";

function ResultPage(){

    const navRef = React.useRef();
    const wrapper = React.createRef();

    return(
        <ChakraProvider theme={theme} resetCss={false} w='100%'>
            <Box ref={navRef} w='100%'>
                <Box w='100%'>
                    <Box ref={wrapper} w='100%'>
                        <Result/>
                    </Box>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default ResultPage;