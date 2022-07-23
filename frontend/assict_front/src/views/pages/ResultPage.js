import React, { useState } from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "../../theme/themeAuth";
import Result from "../../components/Result/Result";
import Sidebar from "../../components/Sidebar/Sidebar";
import dashRoutes from "../../routes";
import Configurator from "../../components/Configurator/Configurator";
import MainPanel from "../../components/Layout/MainPanel";
import PanelContainer from "../../components/Layout/PanelContainer";
import PanelContent from "../../components/Layout/PanelContent";

function ResultPage(props) {
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  const {
    logoText,
    routes,
    variant,
    children,
    secondary,
    brandText,
    onOpen,
    isOpen,
    onClose,
    ...rest
  } = props;
  const mainPanel = React.useRef();

  const navRef = React.useRef();
  const wrapper = React.createRef();

  return (
    <ChakraProvider theme={theme} resetCss={false} w="100%">
      <Sidebar
        routes={dashRoutes}
        logoText={"YOUR PERSONAL ASSICTANT"}
        display="none"
        sidebarVariant={sidebarVariant}
        {...rest}
      />
      <MainPanel
        ref={mainPanel}
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <PanelContent>
          <PanelContainer pt={"16px"}>
            <Box ref={navRef} w="100%">
              <Box w="100%">
                <Box ref={wrapper} w="100%">
                  <Result/>
                </Box>
              </Box>
            </Box>
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
