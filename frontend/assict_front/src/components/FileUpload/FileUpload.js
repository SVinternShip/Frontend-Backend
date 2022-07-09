import React from "react";

// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Icon,
  Text,
  Grid,
  Th,
  Thead,
  Tr,
  Spacer,
  SimpleGrid,
} from "@chakra-ui/react";

import medusa from "../../assets/img/cardimgfree.png";
// Custom components
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";

// Table Components
import TablesProjectRow from "../../components/Tables/TablesProjectRow";
import TablesTableRow from "../../components/Tables/TablesTableRow";
import {tablesProjectData, tablesTableData} from "../../variables/general";

function FileUpload() {
  return (
    <Flex minH='100vh'
        h={{ base: "100vh", lg: "fit-content" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        pt={{ sm: "100px", md: "0px" }}
        flexDirection='column'
        me={{ base: "auto", lg: "50px", xl: "auto" }}>
        <Card

          p='0px'
          gridArea={{ md: "1 / 1 / 2 / 3", "2xl": "auto" }}
          bgImage={medusa}
          bgSize='cover'
          bgPosition='100%'
      >

          <CardBody >

              <Flex
                flexDirection='column'

                p='22px'
                minW='60%'
                lineHeight='1.6'>
                <Text fontSize='sm' color='gray.400' fontWeight='bold'>

                </Text>
                <Text fontSize='28px' color='#fff' fontWeight='bold' mb='18px'>
                  Upload Files
                </Text>
                <Text
                  fontSize='md'
                  color='gray.400'
                  fontWeight='normal'
                  mb='auto'>
                  Drag files inside here
                </Text>
              </Flex>

          </CardBody>
        </Card>


    </Flex>
  );
}

export default FileUpload;
