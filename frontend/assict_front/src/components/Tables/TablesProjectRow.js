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
import React from "react";
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

//// <Icon as={logo} h={"20px"} w={"20px"} me='18px' />
function DashboardTableRow(props) {
  const { patient_result_id, name, status, date,time, progression, lastItem } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const colorStatus = useColorModeValue("white", "gray.400");
  const navigate=useNavigate();

  return (
    <Tr onClick={event=>{
        event.preventDefault();
        // 여기서 다른 주소로 redirect
        navigate(`/home/tables/${patient_result_id}`)
    }}>
      <Td
        minWidth={{ sm: "250px" }}
        ps='0px'
        borderBottomColor='#56577A'
        border={lastItem ? "none" : null}>
        <Flex alignItems='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Text fontSize='15px' color='#fff' minWidth='100%'>
            {name}
          </Text>
        </Flex>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Text fontSize='15px' color='#fff' fontWeight='bold' pb='.5rem' padding={0}>
          {date}
        </Text>
      </Td>
        <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
            <Text fontSize='15px' color='#fff' fontWeight='bold' pb='.5rem' padding={0}>
                {time}
            </Text>
        </Td>
    <Td borderBottomColor='#56577A'>
        <Badge
            bg={status === "Finished" ? "green.400" : "transparent"}
            color={status === "Finished" ? "white" : colorStatus}
            fontSize='15px'
            p='3px 10px'
            borderRadius='8px'
            border={status === "Finished" ? "none" : "1px solid #fff"}
            fontWeight='normal'>
            {status}
        </Badge>
    </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Flex direction='column'>
          <Text
              fontSize='15px'
            color='#fff'
            fontWeight='bold'
            pb='.2rem'>{`${progression}%`}</Text>
          <Progress
            colorscheme='brand'
            maxW='125px'
            h='3px'
            bg='#2D2E5F'
            value={progression}
            borderRadius='15px'
          />
        </Flex>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow;
