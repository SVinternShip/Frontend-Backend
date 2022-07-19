/*!
=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)
* Design and Coded by Simmmple & Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, {useEffect, useState} from "react";
import {
    Tr,
    Td,
    Flex,
    Text,
    Progress,
    Icon,
    Button,
    useColorModeValue, Badge, Img, FormControl, FormLabel,
} from "@chakra-ui/react";
import { FaPlayCircle } from "react-icons/fa";
// import {useNavigate} from "react-router-dom";
import axios from "axios";


function DrawImageInfo(data, index){
    //i번째 = index
    const imgRowData = data.data
    console.log(imgRowData)
    console.log(index)

    var imgInfoArr = [ imgRowData[index][2], imgRowData[index][3].split('T')[0], imgRowData[index][3].split('T')[1] ]

    console.log(imgInfoArr)

      return (imgInfoArr)


  }


function DashboardTableRow1(props) {
    let { data,date, time, ct_result_id, prediction, fileName, index, changeClickedImg } = props;
  const { patient_result_id, name, status, progression, lastItem } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const colorStatus = useColorModeValue("white", "gray.400");
  // const navigate=useNavigate();

    const [showInfo, setShow] = useState([]);

    prediction = showInfo[0]
    date = showInfo[1]
    time = showInfo[2]

    //이미지 api 호출
    //과제: console에 너무 많이 뜨는 요청들 정리하기

  return (
    <Tr onClick={event=>{
            // event.preventDefault();
            event.preventDefault()
            changeClickedImg(index)
        }}>
      <Td
        minWidth={{ sm: "150px" }}
        ps='0px'
        borderBottomColor='#56577A'
        border={lastItem ? "none" : null}>
        <Flex alignItems='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Text value={ct_result_id} fontSize='sm' color='#fff' minWidth='100%'>
            {fileName}
          </Text>
        </Flex>
      </Td>
      <Td
        minWidth={{ sm: "15px" }}
        ps='0px'
        borderBottomColor='#56577A'
        // border={lastItem ? "none" : null}
      >
        <Flex alignItems='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Text fontSize='sm' color='#fff' minWidth='100%'>
              {prediction}
          </Text>
        </Flex>
      </Td>
      <Td
        minWidth={{ sm: "250px" }}
        ps='0px'
        borderBottomColor='#56577A'
        // border={lastItem ? "none" : null}
      >
        <Flex alignItems='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Text fontSize='sm' color='#fff' minWidth='100%'>
              {date}
          </Text>
        </Flex>
      </Td>
        <Td
        minWidth={{ sm: "250px" }}
        ps='0px'
        borderBottomColor='#56577A'
        // border={lastItem ? "none" : null}
              >
        <Flex alignItems='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Text fontSize='sm' color='#fff' minWidth='100%'>
              {time}
          </Text>
        </Flex>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow1;