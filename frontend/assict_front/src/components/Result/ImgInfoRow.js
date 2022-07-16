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
function DashboardTableRow3(props) {
        const { ct_result_id, prediction, date, time, fileName } = props;
        const [orgImg, setOrg] = useState('');
        const [limeImg, setLime] = useState('');

  const { patient_result_id, name, status, progression, lastItem } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const colorStatus = useColorModeValue("white", "gray.400");
  const navigate=useNavigate();
  //
  // useEffect(() => {
  //     const token = 'JWT ' + localStorage.getItem('token')
  //   const fetchData = async () => {
  //     const original_res = await axios.get('http://localhost:8000/api/ct/ctResult/' + ct_result_id + 'original', {
  //       "headers": {
  //         "Authorization": token
  //       }
  //     })
  //
  //       const lime_res = await axios.get('http://localhost:8000/api/ct/ctResult/' + ct_result_id + 'lime', {
  //       "headers": {
  //         "Authorization": token
  //       }
  //     })
  //
  //       setOrg(original_res)
  //       console.log(orgImg)
  //
  //       setLime(lime_res)
  //       console.log(limeImg)
  //
  //       //이미지 출력 어떻게 하지???
  //
  //
  //   };
  //   fetchData();
  // }, []);
  //

  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        ps='0px'
        borderBottomColor='#56577A'
        border={lastItem ? "none" : null}>
        <Flex alignItems='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Text fontSize='sm' color='#fff' minWidth='100%'>
            {prediction}
          </Text>
        </Flex>
      </Td>
       <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
         <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem' padding={0}>
           {date}
         </Text>
       </Td>
         <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
             <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem' padding={0}>
                 {time}
             </Text>
         </Td>
     </Tr>
  );
}

export default DashboardTableRow3;
