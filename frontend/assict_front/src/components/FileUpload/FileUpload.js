import React, {useState} from "react";

// Chakra imports
import {
  ChakraProvider,
    Portal,
} from "@chakra-ui/react";

// Custom components
import Sidebar from "../../components/Sidebar/Sidebar.js";
import MainPanel from "../../components/Layout/MainPanel";
import PanelContainer from "../../components/Layout/PanelContainer";
import PanelContent from "../../components/Layout/PanelContent";
import SelectFile from "./SelectFiles"

import theme from "../../theme/themeAdmin";

import dashRoutes from "../../routes";
import Configurator from "../Configurator/Configurator";
import AdminNavbar from "../Navbars/AdminNavbar";

function FileUpload(props) {
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  const { logoText, routes, variant, children, secondary, brandText, onOpen, isOpen, onClose, ...rest} = props;
  const mainPanel = React.useRef();
  return (
    <ChakraProvider theme={theme} resetCss={false}>
        <Sidebar
            routes={dashRoutes}
            logoText={"YOUR PERSONAL ASSICTANT"}
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
                logoText={"YOUR PERSONAL ASSICTANT"}
                brandText={'File Upload'} //제목 들어갈 부분
                secondary={false}
                fixed={fixed}
                {...rest}
              />
            </Portal>

            <PanelContent>
                <PanelContainer>
                    <SelectFile/>
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

export default FileUpload;
