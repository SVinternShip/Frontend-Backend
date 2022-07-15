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

  export default function Result(props) {

  // 1. 이름(patientName), 날짜(createdDate) 상태 저장
      const [data, setData] = useState({ patientName:'', createdDate:'',});


    // ct_results_id, fileName, 이미지 정보(prediction, studyDate)를 각각 배열의 형태로 상태 저장
    // prediction:  false -> 출혈, true: 정상 => 나중에 렌더하는 함수에다가 적용하기

    // const [data3, setData3] = useState([]);
    const [data4, setData4] = useState({ct_results_id: '', fileName: '', prediction: '', studyDate: ''});


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

      //출력 형태: {ct_results_id: [ 1,2 ], fileName: [fileName1, fileName2], ...}
      var i;
      var CtIdList= [];
      var arr = [];
      var FileNameList = [];
      var arr2 = [];
      var PredList = [];
      var arr3 = [];
      var stdDateList = [];
      var arr4 = [];
      for (i=0; i<Object.keys(result.data.ct_results).length; i++){
        arr[i] = result.data.ct_results[i].id;
        arr2[i] = result.data.ct_results[i].fileName;
        arr3[i] = result.data.ct_results[i].prediction;
        arr4[i] = result.data.ct_results[i].studyDate;
      }
      CtIdList = arr;
      FileNameList = arr2;
      PredList = arr3;
      stdDateList = arr4;

      setData4({ct_results_id: CtIdList, fileName: FileNameList, prediction: PredList, studyDate: stdDateList})
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
              {/*<DrawTableRow2 data={data2}/>*/}
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