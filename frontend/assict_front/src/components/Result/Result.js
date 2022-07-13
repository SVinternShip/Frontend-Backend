import React, {useEffect, useState} from "react";
import {ChakraProvider, Portal} from "@chakra-ui/react";
import theme from "../../theme/themeAdmin";
import Sidebar from "../Sidebar/Sidebar";
import dashRoutes from "../../routes";
import MainPanel from "../Layout/MainPanel";
import AdminNavbar from "../Navbars/AdminNavbar";
import PanelContent from "../Layout/PanelContent";
import PanelContainer from "../Layout/PanelContainer";
import Configurator from "../Configurator/Configurator";
// import {useParams} from "react-router-dom";
import axios from "axios";

async function Result(props) {
    //현재 url: http://localhost:3000/home/tables/{patient_result_id}
    let para = document.location.pathname.split('/');
    // pathname: /home/tables/{patient_result_id}

    // console.log(para[3])
    //{patient_result_id}의 값을 parVar에 저장
    const parVar = para[3];

    const token = 'JWT ' + localStorage.getItem('token')
    // console.log(token)
    let prURL = {
    "method": 'get',
        //요청 주소: http://localhost:8000/api/ct/patientResult/{patient_result_id}
    "url": 'http://localhost:8000/api/ct/patientResult/' + parVar,
    "headers": {
      'Authorization': token
        //header에 jwt 토큰 포함시킴(unauthorized 오류 방지)
    }
  };

  try{
    const response = await axios(prURL)
    console.log(response)
  }catch (err) {
  }

  // const [data, setData] = useState({ hits: [] });
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
