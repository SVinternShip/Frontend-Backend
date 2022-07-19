import React, {useEffect, useState} from "react";
import {Box, ChakraProvider, Portal} from "@chakra-ui/react";
import theme from "../../theme/themeAuth";
import AuthNavbar from "../../components/Navbars/AuthNavbar";
import Result from "../../components/Result/Result";
import {useParams} from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import dashRoutes from "../../routes";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import Configurator from "../../components/Configurator/Configurator";
import MainPanel from "../../components/Layout/MainPanel";
import PanelContainer from "../../components/Layout/PanelContainer";
import PanelContent from "../../components/Layout/PanelContent";

function ResultPage(props){

    const [sidebarVariant, setSidebarVariant] = useState("transparent");
    const [fixed, setFixed] = useState(false);
    const { logoText, routes, variant, children, secondary, brandText, onOpen, isOpen, onClose, ...rest} = props;
    const mainPanel = React.useRef();

    const navRef = React.useRef();
    const wrapper = React.createRef();

    return(
        <ChakraProvider theme={theme} resetCss={false} w='100%'>
            <Sidebar
              routes={dashRoutes}
              logoText={"YOUR PERSONAL ASSISTANT"}
              display='none'
              sidebarVariant={sidebarVariant}
              {...rest}
          />
          <MainPanel ref={mainPanel}
            w={{
              base: "100%",
              xl: "calc(100% - 275px)",
            }}>
               <Portal>
              <AdminNavbar
                onOpen={onOpen}
                logoText={"YOUR PERSONAL ASSISTANT"}
                brandText={'Results'} //제목 들어갈 부분
                secondary={false}
                fixed={fixed}
                {...rest}
              />
            </Portal>
              <PanelContent>
                <PanelContainer>
                    <PanelContainer>
                        <PanelContainer>
            <Box ref={navRef} w='100%'>
                <Box w='100%'>
                    <Box ref={wrapper} w='100%'>
                        <Result/>
                    </Box>
                </Box>
            </Box>
                            </PanelContainer>
                            </PanelContainer>
                    </PanelContainer>
                    </PanelContent>

            <Configurator
              secondary={false} //
              isOpen={isOpen}
              onClose={onClose}
              isChecked={fixed}
              onSwitch={(value) => {
                setFixed(value);
              }}
              onOpaque={() => setSidebarVariant("opaque")}
              onTransparent={() => setSidebarVariant("transparent")}
            />
          </MainPanel>
        </ChakraProvider>
    );
}

export default ResultPage;