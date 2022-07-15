import React, {useEffect, useState} from "react";
import {ChakraProvider, Flex, Portal, Table, Tbody, Text, Th, Thead, Tr} from "@chakra-ui/react";
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
import Card from "../Card/Card";
import {useStyles} from "@chakra-ui/react";
import CardBody from "../Card/CardBody";
import TablesProjectRow from "../Tables/TablesProjectRow";
import CardHeader from "../Card/CardHeader";
import {toVarReference} from "@chakra-ui/system";




  export default function Result(props) {

  // 1. 이름(patientName), 날짜(createdDate) 상태 저장
      const [data, setData] = useState({ patientName:'', createdDate:'',});


    // 수정 전: ct_results_id, fileName, 이미지 정보(prediction, studyDate)를 각각 배열의 형태로 상태 저장 (2차원 배열)
    // 수정 후 출력 방식: [ [ct_results_id, fileName, prediction, studyDate], [ct_results_id, fileName, prediction, studyDate], ... ]
    const [data4, setData4] = useState([]);

  useEffect(() => {
      //현재 url: http://localhost:3000/home/tables/{patient_result_id}
    let para = document.location.pathname.split('/');
    // pathname: /home/tables/{patient_result_id}
    //{patient_result_id}의 값을 parVar에 저장
    const parVar = para[3];


    const token = 'JWT ' + localStorage.getItem('token')
    const fetchData = async () => {
      const result = await axios.get('http://localhost:8000/api/ct/patientResult/' + parVar, {
        "headers": {
          "Authorization": token
            //header에 jwt 토큰 포함시킴(unauthorized 오류 방지)
        }
      })
      // console.log(result)
      setData({patientName: result.data.patientName, createdDate: result.data.createdDate});
      // console.log(data)
      // const getValues = Object.values(data); //key없이 값(value)만 출력됨
      // console.log(getValues)
      console.log(Object.keys(result.data.ct_results).length) //ct_results 배열 길이 구하고 확인

      //출력 형태: [fileName1, fileName2, ...]
      // var ListData = [];
      // var tableArr = [];
      // for (i=0; i<Object.keys(result.data.ct_results).length; i++){
      //   tableArr[i] = result.data.ct_results[i].fileName;
      // }
      // ListData = tableArr;
      // setData2(ListData);
      // console.log(data2)


      var i;
      var arr=[];

      //출력 형태: [ct_result.id, ct_result_filename, prediction(정상/출혈), studydate]
      var predArr = [];
      for (i=0; i<Object.keys(result.data.ct_results).length; i++){
        predArr[i] = result.data.ct_results[i].prediction;
        if (predArr[i]==true)
            predArr[i]="정상";
        else
          predArr[i]="출혈";
      }
      console.log(predArr)

      for (i=0; i<Object.keys(result.data.ct_results).length; i++) {
        arr[i] = [result.data.ct_results[i].id, result.data.ct_results[i].fileName, predArr[i], result.data.ct_results[i].studyDate];
      }
      console.log(arr)
      setData4(arr)
      console.log(data4)

    };
    fetchData();
  }, []);


      const [sidebarVariant, setSidebarVariant] = useState("transparent");
      const [fixed, setFixed] = useState(false);
      const {logoText, routes, variant, children, secondary, brandText, onOpen, isOpen, onClose, ...rest} = props;
      const mainPanel = React.useRef();

      return (
          // <ChakraProvider theme={theme} resetCss={false}>
          //     <Sidebar
          //         routes={dashRoutes}
          //         logoText={"YOUR PERSONAL ASSISTANT"}
          //         display='none'
          //         sidebarVariant={sidebarVariant}
          //         {...rest}
          //     />
          //     <MainPanel ref={mainPanel}
          //                w={{
          //                    base: "100%",
          //                    xl: "calc(100% - 275px)",
          //                }}>
          //         <Portal>
          //             <AdminNavbar
          //                 onOpen={onOpen}
          //                 logoText={"YOUR PERSONAL ASSISTANT"}
          //                 brandText={'Patient Result'} //제목 들어갈 부분
          //                 secondary={false}
          //                 fixed={fixed}
          //                 {...rest}
          //             />
          //         </Portal>
          //         <PanelContent>
          //             <PanelContainer>
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {/* Previous Results Table */}
      {/* Projects Table */}
      <Card my='22px' overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        <CardHeader p='6px 0px 22px 0px'>
          <Flex direction='column'>
            <Text fontSize='lg' color='#fff' fontWeight='bold' mb='.5rem'>
              CT Result
            </Text>
            <Flex align='center'>

            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant='simple' color='#fff'>
            <Thead>
              <Tr my='.8rem' ps='0px'>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Patient Name
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Date
                </Th>
                <Th
                    color='gray.400'
                    fontFamily='Plus Jakarta Display'
                    borderBottomColor='#56577A'>
                  Time
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Status
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Analysis Progress
                </Th>
                <Th borderBottomColor='#56577A'/>
              </Tr>
            </Thead>
            <Tbody>
              {/*<DrawTableRow data={data4}/>*/}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
      //                 </PanelContainer>
      //             </PanelContent>
      //             <Configurator
      //                 secondary={false} //
      //                 isOpen={isOpen}
      //                 onClose={onClose}
      //                 isChecked={fixed}
      //                 onSwitch={(value) => {
      //                     setFixed(value);
      //                 }}
      //                 onOpaque={() => setSidebarVariant("opaque")}
      //                 onTransparent={() => setSidebarVariant("transparent")}
      //             />
      //         </MainPanel>
      //     </ChakraProvider>
      );

  }