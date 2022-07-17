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

//// <Icon as={logo} h={"20px"} w={"20px"} me='18px' />

//이미지 정보 + api 보여주는 함수?

function DrawImageInfo(data, index){
    //i번째에 해당하는 걸로 useState 설정
    const imgRowData = data.data
    // const list = []
    console.log(imgRowData)
    console.log(index)


    // const [imgInfo, setImgInfo] = useState([]);
    var imgInfoArr = [ imgRowData[index][2], imgRowData[index][3].split('T')[0], imgRowData[index][3].split('T')[1] ]

    console.log(imgInfoArr)
    // setImgInfo(imgInfoArr)

  // for(let i=0; i<imgRowData.length;i++){
  //   let imgData = imgRowData[i]
  //   const ct_result_id = imgData[0] //fileName - ct_result_id
  //   const fileName = imgData[1]
  //
  //   //이미지 정보
  //   const prediction = imgData[2]
  //   const date = imgData[3].split('T')[0]
  //   const time = imgData[3].split('T')[1]

    // console.log(date) ////여기까지 잘 됨
    //
    // list.push(<ImgInfoRow
    //     prediction={prediction}
    //     date={date}
    //     time={time}
    //   />)

    //console에는 누르면 다르게 출력 ok.
    //reutnr이 문제인데..
    //그리고 이미지 return 해주는 것도 있으면 좋겠당

      return (
          <Tr>
          <Td
        minWidth={{ sm: "250px" }}
        ps='0px'
        borderBottomColor='#56577A'
        // border={lastItem ? "none" : null}
              >
        <Flex alignItems='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Text fontSize='sm' color='#fff' minWidth='100%'>
            {imgInfoArr[0]}
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
            {imgInfoArr[1]}
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
            {imgInfoArr[2]}
          </Text>
        </Flex>
      </Td>
          </Tr>


      )


  }

  // return (list)

function DashboardTableRow1(props) {
    const { data, ct_result_id, prediction, fileName, index } = props;
  const { patient_result_id, name, status, date,time, progression, lastItem } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const colorStatus = useColorModeValue("white", "gray.400");
  const navigate=useNavigate();

  //여기서 usestate써도 될 듯?///???? 보여줄때 state달리한다거나..
  //   const [showInfo, setShow] = useState("");

  //api 호출
    const [orgImg, setOrg] = useState('');
    const [limeImg, setLime] = useState('');

    const token = 'JWT ' + localStorage.getItem('token')
    const fetchData = async () => {
      const original_res = await axios.get('http://localhost:8000/api/ct/ctResult/' + ct_result_id + '/original', {
        "headers": {
          "Authorization": token
        }
      })

        const lime_res = await axios.get('http://localhost:8000/api/ct/ctResult/' + ct_result_id + '/lime', {
        "headers": {
          "Authorization": token
        }
      })

        setOrg(original_res)
        console.log(orgImg)

        setLime(lime_res)
        console.log(limeImg)
    //일단 잘 찍힘.
        //이미지 출력 어떻게 하지???

    };
    fetchData();


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
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Button value={index} p='0px' bg='transparent' _hover='none' _active='none'onClick={event=>{
            event.preventDefault();
            console.log(event.currentTarget.value)
            //정보 보여주는 함수
            DrawImageInfo(data ,index)
            // DrawImageInfo({data: data4})
        }}>
            {/*<ImgInfoRow data={data4}></ImgInfoRow>*/}
            <Text>선택</Text>
          {/*<Icon  as={FaPlayCircle} color='gray.400' cursor='pointer'/>*/}
        </Button>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow1;