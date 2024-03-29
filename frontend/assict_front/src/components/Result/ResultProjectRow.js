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
} from "@chakra-ui/react";


function DashboardTableRow1(props) {
    let { dateAndTime, ct_result_id,predict, fileName, index, changeClickedImg } = props;
  const { lastItem } = props;

    let date=dateAndTime.split("T")[0];
    let time=dateAndTime.split("T")[1];

    const colorChange = (value) => {
        let color
        if (value === true){
            color = null
        } else {
            color = "#ff00009c"
        }
        return color
    }

  return (
    <Tr bg={colorChange(predict)}
        fontWeight="bold" onClick={event=>{
            event.preventDefault()
            changeClickedImg(index)
        }}>
      <Td
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
        ps='0px'
        borderBottomColor='#56577A'
      >
        <Flex alignItems='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Text fontSize='sm' color='#fff' minWidth='100%'>
              {date}
          </Text>
        </Flex>
      </Td>
        <Td
        ps='0px'
        borderBottomColor='#56577A'
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