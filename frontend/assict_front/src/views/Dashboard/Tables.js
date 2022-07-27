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

import React , { useState, useEffect } from "react";

// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Spinner, useToast
} from "@chakra-ui/react";

// Custom components
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import axios from 'axios';
// Table Components
import TablesProjectRow from "../../components/Tables/TablesProjectRow";


function DrawTableRow(props){
  const tableRowData = props.data
  const list = []
  if (tableRowData.length === undefined){
    return (<Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
    />)
  }
  for(let i=0; i<tableRowData.length;i++){
    let currentData = tableRowData[i]
    const total_dcm = currentData['total_dcm']
    const complete_dcm = currentData['complete_dcm']
    if (currentData['total_dcm'] === 0)
      continue
    let patientName = currentData['patientName']
    if (patientName === "")
      patientName="Proceeding..."
    let status = "Working..."
    if (total_dcm <= complete_dcm)
       status = "Finished"
    const date = currentData['createdDate'].split('T')[0]
    const time = currentData['createdDate'].split('T')[1].split('.')[0]
    list.push(<TablesProjectRow
        key={currentData['id']}
        patient_result_id={currentData['id']}
        name={patientName}
        status={status}
        date={date}
        time={time}
        progression={Math.ceil(complete_dcm / total_dcm * 100)}
        lastItem={i === tableRowData.length - 1 ? true : false}/>)
  }

  return (list)
}

function Tables() {
  const [data, setData] = useState({ hits: [] });
  const toast = useToast()

  useEffect(() => {
    const token = 'JWT ' + window.localStorage.getItem('token')
    let endpoint = process.env.REACT_APP_SOCKET_HOST

// Create new WebSocket
    const socket = new WebSocket(endpoint + "?token=" +window.localStorage.getItem('token'))


    socket.onopen = function (event) {
      console.log("Websocket Connected!")
    };

    socket.onmessage = (evt) => {
      const data = evt.data
      toast({
        title: '분석 완료',
        position: 'top',
        description: evt.data + " 환자분의 분석이 완료되었습니다.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    };

    const fetchData = async () => {
      const result = await axios.get("/api/ct/patientResult/order/createdDate", {
        "headers": {
          "Authorization": token
        }
      })
      setData(result.data);
    };
    fetchData();

    return () => {
      socket.close()
    };
  }, []);

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {/* Previous Results Table */}
      {/* Projects Table */}
      <Card my='22px' overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        <CardHeader p='6px 0px 22px 0px'>
          <Flex direction='column'>
            <Text fontSize='xl' color='#fff' fontWeight='bold' mb='.5rem'>
              CT Result
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant='simple' color='#fff'>
            <Thead>
              <Tr my='.8rem' ps='0px'>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontSize='15px'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Patient Name
                </Th>
                <Th
                  color='gray.400'
                  fontSize='15px'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Date
                </Th>
                <Th
                    color='gray.400'
                    fontSize='15px'
                    fontFamily='Plus Jakarta Display'
                    borderBottomColor='#56577A'>
                  Time
                </Th>
                <Th
                  color='gray.400'
                  fontSize='15px'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Status
                </Th>
                <Th
                  color='gray.400'
                  fontSize='15px'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Analysis Progress
                </Th>
                <Th borderBottomColor='#56577A'/>
              </Tr>
            </Thead>
            <Tbody>
              <DrawTableRow data={data}/>
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Tables;
