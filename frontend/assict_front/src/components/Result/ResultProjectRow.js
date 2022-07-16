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
    useColorModeValue, Badge,
} from "@chakra-ui/react";
import { FaPlayCircle } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ImgInfoRow from "./ImgInfoRow";

//// <Icon as={logo} h={"20px"} w={"20px"} me='18px' />

function DrawImageInfo(props){
  const imgRowData = props.data
  const list = []

  for(let i=0; i<imgRowData.length;i++){
    let imgData = imgRowData[i]
    const ct_result_id = imgData[0] //fileName - ct_result_id
    const fileName = imgData[1]

    //이미지 정보
    const prediction = imgData[2]
    const date = imgData[3].split('T')[0]
    const time = imgData[3].split('T')[1]

    // console.log(date) ////여기까지 잘 됨
      
    list.push(<ImgInfoRow
        prediction={prediction}
        date={date}
        time={time}
      />)


  }

  return (list)

}

function DashboardTableRow1(props) {
    const { ct_result_id, prediction, fileName } = props;
  const { patient_result_id, name, status, date,time, progression, lastItem } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const colorStatus = useColorModeValue("white", "gray.400");
  const navigate=useNavigate();


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
      }
      setData4(arr)
      console.log(data4)



    };
    fetchData();
  }, []);


  return (
    <Tr>
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
      {/*<Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>*/}
      {/*  <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem' padding={0}>*/}
      {/*    {date}*/}
      {/*  </Text>*/}
      {/*</Td>*/}
      {/*  <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>*/}
      {/*      <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem' padding={0}>*/}
      {/*          {time}*/}
      {/*      </Text>*/}
    {/*    </Td>*/}
    {/*<Td borderBottomColor='#56577A'>*/}
    {/*    <Badge*/}
    {/*        bg={status === "Finished" ? "green.400" : "transparent"}*/}
    {/*        color={status === "Finished" ? "white" : colorStatus}*/}
    {/*        fontSize='sm'*/}
    {/*        p='3px 10px'*/}
    {/*        borderRadius='8px'*/}
    {/*        border={status === "Finished" ? "none" : "1px solid #fff"}*/}
    {/*        fontWeight='normal'>*/}
    {/*        {status}*/}
    {/*    </Badge>*/}
    {/*</Td>*/}
    {/*  <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>*/}
    {/*    <Flex direction='column'>*/}
    {/*      <Text*/}
    {/*        fontSize='sm'*/}
    {/*        color='#fff'*/}
    {/*        fontWeight='bold'*/}
    {/*        pb='.2rem'>{`${progression}%`}</Text>*/}
    {/*      <Progress*/}
    {/*        colorscheme='brand'*/}
    {/*        maxW='125px'*/}
    {/*        h='3px'*/}
    {/*        bg='#2D2E5F'*/}
    {/*        value={progression}*/}
    {/*        borderRadius='15px'*/}
    {/*      />*/}
    {/*    </Flex>*/}
    {/*  </Td>*/}
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Button value={ct_result_id} p='0px' bg='transparent' _hover='none' _active='none'onClick={event=>{
            event.preventDefault();
            console.log(event.currentTarget.value)
            //정보 보여주는 함수
            DrawImageInfo({data: data4})
        }}>
            <ImgInfoRow data={data4}></ImgInfoRow>
            <Text>선택</Text>
          {/*<Icon  as={FaPlayCircle} color='gray.400' cursor='pointer'/>*/}
        </Button>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow1;
