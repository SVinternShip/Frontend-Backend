//새로 만든 페이지!

import { ChakraProvider, Portal} from "@chakra-ui/react";
import Configurator from "../../components/Configurator/Configurator";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import React, { useState } from "react";
// Custom Chakra theme
import theme from "../../theme/themeAdmin.js";
// Custom components
import MainPanel from "../../components/Layout/MainPanel";
import PanelContainer from "../../components/Layout/PanelContainer";
import PanelContent from "../../components/Layout/PanelContent";
import Tables from "../Dashboard/Tables";


import dashRoutes from "../../routes.js";


function TablesPage(props){
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
                brandText={'Tables'} //제목 들어갈 부분
                secondary={false}
                fixed={fixed}
                {...rest}
              />
            </Portal>
              <PanelContent>
                <PanelContainer>
                    <Tables/>
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

export default TablesPage;