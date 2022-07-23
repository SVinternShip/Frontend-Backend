import React, { useEffect, useState } from "react";
import {
  Spacer,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Box,
  Tr,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import ResultProjectRow from "./ResultProjectRow";
import CtImageInfo from "./CtImageInfo";
import NoteWithButton from "./Note";
import PatientInfoRow from "./PatientInfoRow";
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
    const predict = currentData[2]
    const dateAndTime = currentData[3];

    list.push(
      <ResultProjectRow
        changeClickedImg={props.changeClickedImg}
        ct_result_id={ct_result_id}
        predict={predict}
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
  const hemoNum = props.hemoNum;
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
  const totalCtNum = patientInfoRow[3]
  return (
    <PatientInfoRow
      patientName={patientName}
      createdDate={createdDate}
      createdTime={createdTime}
      totalCtNum={totalCtNum}
      hemoNum={hemoNum}
    />
  );
}

function DrawCurrentImgInfo(props) {
  const patientInfoRow = props.data;

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

let org_images = [];
let lime_images = [];
let ctResultData = [];
let parVar = 0;

export default function Result(props) {
  // 1. 이름(patientName), 날짜(createdDate) 상태 저장 (=> array가 아니라서 문제 발생!
  const [patientInfoData, setPatientInfoData] = useState([]);
  const totalCtNum = React.useRef(0)
  const hemoNum = React.useRef(0)
  // 수정 전: ct_results_id, fileName, 이미지 정보(prediction, studyDate)를 각각 배열의 형태로 상태 저장 (2차원 배열)
  // 수정 후 출력 방식: [ [ct_results_id, fileName, prediction, studyDate], [ct_results_id, fileName, prediction, studyDate], ... ]

  const [currentClickedOrg, setcurrentClickedOrg] = useState(null);
  const [currentClickedLime, setcurrentClickedLime] = useState(null);

  const [currentClickedImgInfo, setcurrentClickedImgInfo] = useState([null]);

  const changeClickedImg = (value) => {
    console.log(org_images.length, lime_images.length)
    setcurrentClickedOrg(org_images[value]);
    setcurrentClickedLime(lime_images[value]);

    setcurrentClickedImgInfo(ctResultData[value]);
  };

  useEffect(() => {
    //현재 url: http://localhost:3000/home/tables/{patient_result_id}
    let para = document.location.pathname.split("/");
    //{patient_result_id}의 값을 parVar에 저장
    parVar = para[3];

    const token = "JWT " + window.localStorage.getItem("token");
    const fetchData = async () => {
      const result = await axios.get("/api/ct/patientResult/" + parVar, {
        headers: {
          Authorization: token,
          //header에 jwt 토큰 포함시킴(unauthorized 오류 방지)
        },
      });

      const ct_data_num = Object.keys(result.data.ct_results).length;

      org_images = new Array(ct_data_num).fill(null);
      lime_images = new Array(ct_data_num).fill(null);

      const patientArr = [
        result.data.patientName,
        result.data.createdDate,
        result.data.note,
        ct_data_num,
      ];
      setPatientInfoData(patientArr);

      let i;

      //출력 형태: [ct_result.id, ct_result_filename, prediction(정상/출혈), studydate]

      for (i = 0; i < ct_data_num; i++) {
        const ct_id = result.data.ct_results[i].id;
        const predict_result = result.data.ct_results[i].prediction;
        ctResultData.push([
          ct_id,
          result.data.ct_results[i].fileName,
          predict_result,
          result.data.ct_results[i].studyDate,
        ]);

        if (predict_result === false) {
          hemoNum.current = hemoNum.current + 1;
        }

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
          console.log("CALL AXIOS");
          const OrgObjectURL = URL.createObjectURL(original_res.data);
          const LimeObjectURL = URL.createObjectURL(lime_res.data);

          org_images[i] = OrgObjectURL;
          lime_images[i] = LimeObjectURL;

          if (i === 0) {
            changeClickedImg(i);
          }
        };
        getCtImgs(i);
      }
    };;
    fetchData();

    return () => {
      org_images = [];
      lime_images = [];
      ctResultData = [];
    };
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
            <DrawPatientInfo data={patientInfoData} hemoNum={hemoNum.current} />
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
