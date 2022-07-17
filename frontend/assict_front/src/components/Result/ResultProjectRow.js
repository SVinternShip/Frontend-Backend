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
    let { data, date, time, ct_result_id, prediction, fileName, index } = props;
  const { patient_result_id, name, status, progression, lastItem } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const colorStatus = useColorModeValue("white", "gray.400");
  // const navigate=useNavigate();

    const [showInfo, setShow] = useState([]);

    prediction = showInfo[0]
    date = showInfo[1]
    time = showInfo[2]
    console.log(prediction)
    console.log(date)
    console.log(time)

    //이미지 api 호출
    //과제: console에 너무 많이 뜨는 요청들 정리하기
    const [orgImg, setOrg] = useState(''); //OriginalImage
    const [limeImg, setLime] = useState(''); //LimeImage

    //ct_result_id
    const [ct_id, setId] = useState('');


    const token = 'JWT ' + localStorage.getItem('token')
    const fetchData = async () => {
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
        setOrg(OrgObjectURL);

        const LimeObjectURL = URL.createObjectURL(lime_res.data);
        setLime(LimeObjectURL);


    };
    fetchData();


  return (
    <Tr onClick={event=>{
            // event.preventDefault();
            console.log(event.currentTarget.value)
            //정보 보여주는 함수
            setShow(DrawImageInfo(data ,index)) //set하고 렌더
            setId(ct_result_id) //api를 위한 ct_result_id set
        }}>
      <Td
        minWidth={{ sm: "250px" }}
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
        minWidth={{ sm: "250px" }}
        ps='0px'
        borderBottomColor='#56577A'
        // border={lastItem ? "none" : null}
      >
        <Flex alignItems='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Text fontSize='sm' color='#fff' minWidth='100%'>
              {prediction}
            {/*{imgInfoArr[0]}*/}
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
            {/*{imgInfoArr[1]}*/}
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
            {/*{imgInfoArr[2]}*/}
          </Text>
        </Flex>
      </Td>
        <Td>
            <Text fontSize='sm'>CT</Text>
            <Img src={orgImg} />
            <Text fontSize='sm'>LIME</Text>
            <Img src={limeImg} />
        </Td>
            {/*{lime_res}*/}
    </Tr>
  );
}

export default DashboardTableRow1;