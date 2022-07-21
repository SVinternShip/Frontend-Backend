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
  Spacer,
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
  WrapItem,
  Wrap,
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

    const dateAndTime = currentData[3];

    list.push(
      <ResultProjectRow
        changeClickedImg={props.changeClickedImg}
        ct_result_id={ct_result_id}
        data={props}
        fileName={fileName}
        index={i}
        dateAndTime={dateAndTime}
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
      fileName={patientInfoRow[1]}
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

const org_images = [];
const lime_images = [];
const ctResultData = []
let parVar = 0;
export default function Result(props) {
  // 1. 이름(patientName), 날짜(createdDate) 상태 저장 (=> array가 아니라서 문제 발생!
  const [patientInfoData, setPatientInfoData] = useState([]);

  // 수정 전: ct_results_id, fileName, 이미지 정보(prediction, studyDate)를 각각 배열의 형태로 상태 저장 (2차원 배열)
  // 수정 후 출력 방식: [ [ct_results_id, fileName, prediction, studyDate], [ct_results_id, fileName, prediction, studyDate], ... ]

  const [currentClickedOrg, setcurrentClickedOrg] = useState(null);
  const [currentClickedLime, setcurrentClickedLime] = useState(null);

  const [currentClickedImgInfo, setcurrentClickedImgInfo] = useState([null]);

  const changeClickedImg = (value) => {
    console.log("Current Clicked : " +value)
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
    parVar = para[3];

    const token = "JWT " + localStorage.getItem("token");
    const fetchData = async () => {
      const result = await axios.get("/api/ct/patientResult/" + parVar, {
        headers: {
          Authorization: token,
          //header에 jwt 토큰 포함시킴(unauthorized 오류 방지)
        },
      });
      var patientArr;
      patientArr = [
        result.data.patientName,
        result.data.createdDate,
        result.data.note,
      ];
      setPatientInfoData(patientArr);

      var i;

      //출력 형태: [ct_result.id, ct_result_filename, prediction(정상/출혈), studydate]
      var predArr = [];
      for (i = 0; i < Object.keys(result.data.ct_results).length; i++) {
        predArr[i] = result.data.ct_results[i].prediction;
      }

      for (i = 0; i < Object.keys(result.data.ct_results).length; i++) {
        ctResultData.push([
          result.data.ct_results[i].id,
          result.data.ct_results[i].fileName,
          predArr[i],
          result.data.ct_results[i].studyDate,
        ])
        let ct_id = result.data.ct_results[i].id;
        const getCtImgs = async (i) => {
          const original_res = await axios.get(
            "/api/ct/ctResult/" + ct_id + "/original",
            {
              // responseType: 'arraybuffer',
              responseType: "blob", //blob으로 받기
              headers: {
                Authorization: token,
              },
            }
          );

          const lime_res = await axios.get(
            "/api/ct/ctResult/" + ct_id + "/lime",
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

          if(i===0){
            changeClickedImg(i)
          }
        };
        getCtImgs(i);
      }
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
    <Box>
      <Wrap
        justify={{ base: "center" }}
        pl={{ base: "0", lg: "40px" }}
        pr={{ base: "0", lg: "40px" }}
      >
        <WrapItem>
          <Box minWidth={{ sm: "350px", lg: "600px" }}>
            <DrawPatientInfo data={patientInfoData} />
          </Box>
        </WrapItem>
        <Spacer display={{ base: "none", lg: "block" }} />
        <WrapItem>
          <Box alignItems="stretch" minWidth={{ sm: "350px", lg: "534px" }}>
            <DrawCurrentImgInfo data={currentClickedImgInfo} />
          </Box>
        </WrapItem>
      </Wrap>

      <Wrap
        justify={{ base: "center" }}
        mt={{ sm: "3", lg: "0" }}
        pl={{ base: "0", lg: "40px" }}
        pr={{ base: "0", lg: "40px" }}
      >
        <WrapItem>
          <Box maxWidth={"600px"} minWidth={{ lg: "600px" }}>
            <Card my={{ base: "0px", md: "27px" }} pb="0px" overflowX={"auto"}>
              <CardHeader p="6px 0px 22px 0px">
                <Text fontSize="lg" color="#fff" fontWeight="bold" mb=".5rem">
                  CT Result
                </Text>
              </CardHeader>
              <CardBody maxHeight={"450px"}>
                <Table variant="simple" color="#fff">
                  <Thead position={"sticky"} top={0} bg={"#241451"}>
                    <Tr my="0.5rem" ps="0px">
                      <Th
                        ps="0px"
                        color="gray.400"
                        fontSize={"md"}
                        fontFamily="Plus Jakarta Display"
                      >
                        FILENAME
                      </Th>
                      <Th
                        ps="0px"
                        color="gray.400"
                        fontSize={"md"}
                        fontFamily="Plus Jakarta Display"
                      >
                        촬영 날짜(DATE)
                      </Th>
                      <Th
                        ps="0px"
                        color="gray.400"
                        fontSize={"md"}
                        fontFamily="Plus Jakarta Display"
                      >
                        촬영 시각(TIME)
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
          </Box>
        </WrapItem>
        <Spacer display={{ base: "none", lg: "block" }} />
        <WrapItem>
          <Box>
            <DrawImage org={currentClickedOrg} lime={currentClickedLime} />
          </Box>
        </WrapItem>
      </Wrap>
      <NoteWithButton note={patientInfoData[2]} patient_result_id={parVar} />
    </Box>
  );
}
