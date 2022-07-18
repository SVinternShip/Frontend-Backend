import React, {useEffect, useState} from "react";
import {
  Button, ButtonGroup,
  ChakraProvider, Editable, EditableInput, EditablePreview,
  Flex,
  FormControl, FormHelperText,
  FormLabel, IconButton, Input,
  Portal,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr, useEditableControls
} from "@chakra-ui/react";
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
import ResultProjectRow from "./ResultProjectRow";
import PatientInfoRow from "./PatientInfoRow";
import {CheckIcon, CloseIcon, EditIcon} from "@chakra-ui/icons";


//메모장 function 만들장


// fileName - prediction, studyDate( split 필요! )
//ct_result json
//ResultProjectRow.js와 이어짐 (filename 목록 만들고 '선택' 버튼 누르면 무언가를 호출하게끔!)

//<DrawRow ct_data={ctResultData} current_clicked_imgs={currentClickedImg} changeClickedImg={changeClickedImg}/>
function DrawRow(props){
  const tableRowData = props.ct_data
  const list = []
  if (tableRowData === undefined){
    return
  }
  for(let i=0; i<tableRowData.length;i++){
    let currentData = tableRowData[i]
    const ct_result_id = currentData[0] //fileName - ct_result_id
    const fileName = currentData[1]

    //이미지 정보
    const prediction = currentData[2]
    const date = currentData[3].split('T')[0]
    const time = currentData[3].split('T')[1]

    //여기서 setState 걸어주기 가능?

    list.push(<ResultProjectRow
        changeClickedImg={props.changeClickedImg}
        ct_result_id={ct_result_id}
        data={props}
        fileName={fileName}
        prediction={prediction}
        date={date}
        time={time}
        index={i}
    />)
  }

  return (list)
}


// patientName, createdDate(data)를 props로 받는 함수 (patientResult json)
function DrawPatientInfo(props){
  const patientInfoRow = props.data
  const list1 = []

  const patientName = patientInfoRow[0]
// const createdDate = patientInfoRow[1]
//   const createdTime = patientInfoRow[1]
//   const createdDate = patientInfoRow[1].split('T')[0]
//   const createdTime = patientInfoRow[1].split('T')[1].split('.')[0]
//   console.log(createdTime)

    list1.push(<PatientInfoRow
        patientName={patientName}
        // createdDate={createdDate}
        // createdTime = {createdTime}
    />)

  return (list1)
}



//props로 받는 data4:  [ [ct_results_id, fileName, prediction, studyDate], [ct_results_id, fileName, prediction, ...] , ... ]
function DrawFileList(props){
  const list= []
  // var apiVar
  // for(let i=0; i<props.data.length;i++){
  //   let fileList = props.data[i][1];
  //   // console.log(apiVar) //i값 가져오기
  //   // // 어차피 return 못하면 가져올 필요x
  //
  //
  //   let ct_result_id = props.data[i][0];
  //
  //   //더 추가해야하가ㅣㄴ 핮지만.. token이며 뭐며...ㅇㅇ => 이걸 밑에 result 함수 속 useEffect에 넣을 수 있나?
  //   const original_res = await axios.get('http://localhost:8000/api/ct/ctResult/' + apiVar + 'original');
  //   const lime_res = await axios.get('http://localhost:8000/api/ct/ctResult/' + apiVar + 'lime');
  //
  //
  //   const [img, setImg] = useState([]);

    //   // 출력 형태: [fileName1, fileName2, ...]
    //   var ListData = [];
    //   var tableArr = [];
    //   for (let i=0; i<Object.keys(result.data.ct_results).length; i++){
    //     tableArr[i] = result.data.ct_results[i].fileName;
    //   }
    //   ListData = tableArr;
    //   setData2(ListData);
    //   console.log(data2)
    //
    // console.log(fileList)
    //
    // list.push(<ResultProjectRow
    //     ct_result_id={}
    //     fileName{}/>);
  return (list)

}



// function DrawTableRow(props){
//   const list = [];
//   var i, prediction, studyDate;
//   const file = props.data[i][0];
//   console.log(file)
//   console.log(props.data)
//   for(let i=0; i<props.length;i++){
//     if (file == props[i][0])
//     {
//       var prediction = props.data[i][2];
//       var studyDate = props.data[i][3];
//     }
//     list.push(<TablesProjectRow
//         prediction={prediction}
//         studyDate={studyDate}/>)
//     console.log(list)
//   }
//
//   return list
//   console.log(list)

//props=data4 [ , , , , ]
  //fileName이 i번째에 있으면.. 마찬가지로 data4[i]를 구하고
  //거기서 prediction: data4[i][2]
  // studyDate: data4[i][3]

  //ct_result_id: data4[i][0]
  //let ct_result_id=data4[i][0]

  //여기서 ct_result_id 를 parvar로 넘겨서 api 호출!!
  //response로 받는 originalimgUrl이랑 limeimgUrl

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton type='submit' icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }

  const ct_images = []

  export default function Result(props) {

  // 1. 이름(patientName), 날짜(createdDate) 상태 저장 (=> array가 아니라서 문제 발생!
    const [patientInfoData, setPatientInfoData] = useState([]);


    // 수정 전: ct_results_id, fileName, 이미지 정보(prediction, studyDate)를 각각 배열의 형태로 상태 저장 (2차원 배열)
    // 수정 후 출력 방식: [ [ct_results_id, fileName, prediction, studyDate], [ct_results_id, fileName, prediction, studyDate], ... ]
    const [ctResultData, setCtResultData] = useState([]);
    const [currentClickedImg, setcurrentClickedImg] = useState(null);

    const changeClickedImg = (value) => {
      console.log(ct_images[value])
      setcurrentClickedImg(ct_images[value]);
    };

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
        console.log(result)
        var patientArr;
        patientArr = [result.data.patientName, result.data.createdDate];
        setPatientInfoData(patientArr);
        console.log(patientInfoData)
        // setData({patientName: result.data.patientName, createdDate: result.data.createdDate});

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

        for (i=0; i<Object.keys(result.data.ct_results).length; i++) {
          arr[i] = [result.data.ct_results[i].id, result.data.ct_results[i].fileName, predArr[i], result.data.ct_results[i].studyDate];
          let ct_id = result.data.ct_results[i].id
          const getCtImgs = async () => {
            const original_res = await axios.get('http://localhost:8000/api/ct/ctResult/' + ct_id + '/original', {
                // responseType: 'arraybuffer',
                responseType: 'blob', //blob으로 받기
              "headers": {
                "Authorization": token
              }
            })

              const lime_res = await axios.get('http://localhost:8000/api/ct/ctResult/' + ct_id + '/lime', {
                  responseType: 'blob',
              "headers": {
                "Authorization": token
              }
            })

            //이미지 출력용 setState
            const OrgObjectURL = URL.createObjectURL(original_res.data);
            const LimeObjectURL = URL.createObjectURL(lime_res.data);

            const newImage = {"original_img":OrgObjectURL, "lime_img":LimeObjectURL}
            ct_images.push(newImage)
          };
          getCtImgs();
        }
        setCtResultData(arr)
        console.log(ctResultData)
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
                  <PanelContent>
                      <PanelContainer>
                                <Card>
        <CardHeader p='6px 0px 22px 0px'>
          <Flex direction='column'>
            <Text fontSize='lg' color='#fff' fontWeight='bold' mb='.5rem'>
              Patient Information
            </Text>
            <Flex align='center'>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table>
            <Thead>

              <Tr>
                <Th>
                  patient name
                </Th>
                <Th>
                  created Date
                </Th>
                <Th>
                  created time
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* 여기 해결해야함! */}
              <DrawPatientInfo data={patientInfoData}></DrawPatientInfo>
              {/* DrawPatientInfo 문제...! 인줄 알았으나 split의 문제였음! */}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

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
                  FILENAME
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Prediction
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
                  Image
                </Th>
                <Th borderBottomColor='#56577A'/>
              </Tr>
            </Thead>
            <Tbody>
              <DrawRow ct_data={ctResultData} current_clicked_imgs={currentClickedImg} changeClickedImg={changeClickedImg}/>

    
              {/*<Editable defaultValue='환자 관련 정보를 메모하세요.'>*/}
              {/*  <EditablePreview></EditablePreview>*/}
              {/*  <EditableInput></EditableInput>*/}
    
              {/*</Editable>*/}
        {/*      <FormControl>*/}
        {/*    <FormLabel>*/}
        {/*        <input placeholder='Memo'>*/}
        {/*        </input>*/}
        {/*      <FormHelperText>환자 관련 정보를 메모하세요.</FormHelperText>*/}
        {/*    </FormLabel>*/}
        {/*</FormControl>*/}
        {/*      <Button type='submit'>저장</Button>*/}
    
              {/*<ImgInfoRow data={data4}></ImgInfoRow>*/}
            </Tbody>

          </Table>
        </CardBody>
      </Card>
    </Flex>
                        <Flex>
                        <Card>
                          <CardBody>
                           <Editable
      textAlign='center'
      defaultValue='환자 정보 메모'
      fontSize='2xl'
      isPreviewFocusable={false}>
      <EditablePreview />
      {/* Here is the custom input */}
      <Input as={EditableInput} />
      <EditableControls />
    </Editable>
                            </CardBody>
                        </Card>
                          </Flex>
      </PanelContainer>
      </PanelContent>
      //
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