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
  Icon,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

// Custom components
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import axios from 'axios';
// Table Components
import TablesProjectRow from "../../components/Tables/TablesProjectRow";
import TablesTableRow from "../../components/Tables/TablesTableRow";

// Data
import { tablesProjectData, tablesTableData } from "../../variables/general";

// Icons
import { AiFillCheckCircle } from "react-icons/ai";

function DrawTableRow(props){
  const tableRowData = props.data
  const list = []

  for(let i=0; i<tableRowData.length;i++){
    let currentData = tableRowData[i]
    console.log(currentData)
    const total_dcm = currentData['total_dcm']
    const complete_dcm = currentData['complete_dcm']
    if (currentData['total_dcm'] === 0)
      continue
    let patientName = currentData['patientName']
    if (patientName === "")
      patientName="Proceeding..."
    let status = "Working..."
    if (total_dcm === complete_dcm)
       status = "Finished"

    list.push(<TablesProjectRow
        patient_result_id={currentData['id']}
        name={patientName}
        status={status}
        budget={currentData['createdDate']}
        progression={Math.ceil(complete_dcm / total_dcm * 100)}
        lastItem={i === tableRowData.length - 1 ? true : false}/>)
  }

  return (list)
}

function Tables() {
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const token = 'JWT ' + localStorage.getItem('token')
    const fetchData = async () => {
      const result = await axios.get("http://127.0.0.1:8000/api/ct/patientResult", {
        "headers": {
          "Authorization": token
        }
      })
      console.log(result)
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {/* Previous Results Table */}
      {/* Projects Table */}
      <Card my='22px' overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        <CardHeader p='6px 0px 22px 0px'>
          <Flex direction='column'>
            <Text fontSize='lg' color='#fff' fontWeight='bold' mb='.5rem'>
              CT Result
            </Text>
            <Flex align='center'>

            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant='simple' color='#fff'>
            <Thead>
              <Tr my='.8rem' ps='0px'>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Patient Name
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Date
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Status
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Analysis Progress
                </Th>
                <Th borderBottomColor='#56577A'></Th>
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
