

import React from "react";
import {Box, ChakraProvider} from "@chakra-ui/react";
import theme from "../../theme/themeAuth";
import FileUpload from "../../components/FileUpload/FileUpload";

function FileUploadPage(){
    const navRef = React.useRef();
    const wrapper = React.createRef();
    return(
        <ChakraProvider theme={theme} resetCss={false} w='100%'>
            <Box ref={navRef} w='100%'>
                <Box w='100%'>
                    <Box ref={wrapper} w='100%'>
                        <FileUpload/>
                    </Box>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default FileUploadPage;