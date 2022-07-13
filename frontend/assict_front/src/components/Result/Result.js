import React, {useState} from "react";
import {ChakraProvider, Portal} from "@chakra-ui/react";
import theme from "../../theme/themeAdmin";
import Sidebar from "../Sidebar/Sidebar";
import dashRoutes from "../../routes";
import MainPanel from "../Layout/MainPanel";
import AdminNavbar from "../Navbars/AdminNavbar";
import PanelContent from "../Layout/PanelContent";
import PanelContainer from "../Layout/PanelContainer";
import SelectFile from "../FileUpload/SelectFiles";
import Configurator from "../Configurator/Configurator";

function Result(props) {
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  const { logoText, routes, variant, children, secondary, brandText, onOpen, isOpen, onClose, ...rest} = props;
  const mainPanel = React.useRef();
  return (
    <ChakraProvider theme={theme} resetCss={false}>
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
                brandText={'Patient Result'} //제목 들어갈 부분
                secondary={false}
                fixed={fixed}
                {...rest}
              />
            </Portal>
            <PanelContent>
                <PanelContainer>

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

export default Result;
