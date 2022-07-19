import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  ChakraProvider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Portal,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Grid,
  Box,
  GridItem,
  Tr,
  useEditableControls,
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
import { useStyles } from "@chakra-ui/react";
import CardBody from "../Card/CardBody";
import TablesProjectRow from "../Tables/TablesProjectRow";
import CardHeader from "../Card/CardHeader";
import { toVarReference } from "@chakra-ui/system";
import ResultProjectRow from "./ResultProjectRow";
import CtImageInfo from "./CtImageInfo";
import NoteWithButton from "./Note";
import PatientInfoRow from "./PatientInfoRow";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Separator } from "../Separator/Separator";
import CtImageBox from "./CtImageBox";

function DrawRow(props) {
  const tableRowData = props.ct_data;
  const list = [];
  if (tableRowData === undefined) {
    return;
  }
  for (let i = 0; i < tableRowData.length; i++) {
    let currentData = tableRowData[i];
    const ct_result_id = currentData[0];
    const fileName = currentData[1];

    const prediction = currentData[2];
    const date = currentData[3].split("T")[0];
    const time = currentData[3].split("T")[1];

    list.push(
      <ResultProjectRow
        changeClickedImg={props.changeClickedImg}
        ct_result_id={ct_result_id}
        data={props}
        fileName={fileName}
        prediction={prediction}
        date={date}
        time={time}
        index={i}
      />
    );
  }

  return list;
}

// patientName, createdDate(data)를 props로 받는 함수 (patientResult json)
function DrawPatientInfo(props) {
  const patientInfoRow = props.data;
  if (patientInfoRow.length === 0) {
    return (
      <PatientInfoRow
        patientName={null}
        createdDate={null}
        createdTime={null}
      />
    );
  }
  const patientName = patientInfoRow[0];
  const createdDateTime = patientInfoRow[1].split("T");
  const createdDate = createdDateTime[0];
  const createdTime = createdDateTime[1].split(".")[0];

  return (
    <PatientInfoRow
      patientName={patientName}
      createdDate={createdDate}
      createdTime={createdTime}
    />
  );
}

function DrawCurrentImgInfo(props) {
  const patientInfoRow = props.data;

  console.log(patientInfoRow);

  return (
    <CtImageInfo
      prediction={patientInfoRow[2]}
      //fileName={patientInfoRow[1]}
      studyDate={patientInfoRow[3]}
    />
  );
}

function DrawImage(props) {
  const orgData = props.org;
  const limeData = props.lime;
  return (
    <CtImageBox
      changeClickedImg={props.changeClickedImg}
      original_image={orgData}
      lime_image={limeData}
    />
  );
}

const ct_images = [];
const org_images = [];
const lime_images = [];
let note = "";
export default function Result(props) {
  // 1. 이름(patientName), 날짜(createdDate) 상태 저장 (=> array가 아니라서 문제 발생!
  const [patientInfoData, setPatientInfoData] = useState([]);

  // 수정 전: ct_results_id, fileName, 이미지 정보(prediction, studyDate)를 각각 배열의 형태로 상태 저장 (2차원 배열)
  // 수정 후 출력 방식: [ [ct_results_id, fileName, prediction, studyDate], [ct_results_id, fileName, prediction, studyDate], ... ]
  const [ctResultData, setCtResultData] = useState([]);

  const [currentClickedOrg, setcurrentClickedOrg] = useState(null);
  const [currentClickedLime, setcurrentClickedLime] = useState(null);

  const [currentClickedImgInfo, setcurrentClickedImgInfo] = useState([null]);

  const changeClickedImg = (value) => {
    console.log(org_images[value]);
    console.log(lime_images[value]);

    setcurrentClickedOrg(org_images[value]);
    setcurrentClickedLime(lime_images[value]);

    setcurrentClickedImgInfo(ctResultData[value]);
  };

  useEffect(() => {
    //현재 url: http://localhost:3000/home/tables/{patient_result_id}
    let para = document.location.pathname.split("/");
    //{patient_result_id}의 값을 parVar에 저장
    const parVar = para[3];

    const token = "JWT " + localStorage.getItem("token");
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:8000/api/ct/patientResult/" + parVar,
        {
          headers: {
            Authorization: token,
            //header에 jwt 토큰 포함시킴(unauthorized 오류 방지)
          },
        }
      );
      var patientArr;
      patientArr = [result.data.patientName, result.data.createdDate];
      note = result.data.note;
      setPatientInfoData(patientArr);

      var i;
      var arr = [];

      //출력 형태: [ct_result.id, ct_result_filename, prediction(정상/출혈), studydate]
      var predArr = [];
      for (i = 0; i < Object.keys(result.data.ct_results).length; i++) {
        predArr[i] = result.data.ct_results[i].prediction;
      }

      for (i = 0; i < Object.keys(result.data.ct_results).length; i++) {
        arr[i] = [
          result.data.ct_results[i].id,
          result.data.ct_results[i].fileName,
          predArr[i],
          result.data.ct_results[i].studyDate,
        ];
        let ct_id = result.data.ct_results[i].id;
        const getCtImgs = async () => {
          const original_res = await axios.get(
            "http://localhost:8000/api/ct/ctResult/" + ct_id + "/original",
            {
              // responseType: 'arraybuffer',
              responseType: "blob", //blob으로 받기
              headers: {
                Authorization: token,
              },
            }
          );

          const lime_res = await axios.get(
            "http://localhost:8000/api/ct/ctResult/" + ct_id + "/lime",
            {
              responseType: "blob",
              headers: {
                Authorization: token,
              },
            }
          );
          //이미지 출력용 setState
          const OrgObjectURL = URL.createObjectURL(original_res.data);
          const LimeObjectURL = URL.createObjectURL(lime_res.data);

          const orgImage = OrgObjectURL;
          const limeImage = LimeObjectURL;
          org_images.push(orgImage);
          lime_images.push(limeImage);

          const newImage = {
            original_img: OrgObjectURL,
            lime_img: LimeObjectURL,
          };
          ct_images.push(newImage);
        };
        getCtImgs();
      }
      setCtResultData(arr);
    };
    fetchData();
  }, []);

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

  return (
    <PanelContainer>
      <PanelContainer>
        <Box w={"100%"}>
          <Grid templateColumns="repeat(5, 1fr)" gap={4}>
            <GridItem colSpan={2} h="10">
              <DrawPatientInfo data={patientInfoData} />
            </GridItem>
            <GridItem colStart={4} colEnd={6} h="10">
              <DrawCurrentImgInfo data={currentClickedImgInfo} />
            </GridItem>
          </Grid>
        </Box>

        <Box>
          <GridItem colSpan={2} h="15" rowSpan={5} area={"nav"}>
            <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
              <CardHeader p="6px 0px 22px 0px">
                <Flex direction="column">
                  <Text fontSize="lg" color="#fff" fontWeight="bold" mb=".5rem">
                    CT Result
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <Table size="sm" variant="simple" color="#fff">
                  <Thead>
                    <Tr my="0.5rem" ps="0px">
                      <Th
                        ps="0px"
                        color="gray.400"
                        fontFamily="Plus Jakarta Display"
                        borderBottomColor="#56577A"
                      >
                        FILENAME
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <DrawRow
                      ct_data={ctResultData}
                      changeClickedImg={changeClickedImg}
                    />
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          </GridItem>
        </Box>
        {/*<DrawImage org={currentClickedOrg} lime={currentClickedLime} />*/}

        {/*<NoteWithButton note={note} />*/}
      </PanelContainer>
    </PanelContainer>
  );
}
