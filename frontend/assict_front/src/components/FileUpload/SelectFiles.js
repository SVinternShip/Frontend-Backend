import CardHeader from "../Card/CardHeader";
import {Flex, Text} from "@chakra-ui/react";
import React from "react";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import PanelContent from "../Layout/PanelContent";
import PanelContainer from "../Layout/PanelContainer";
import Dropzone from "./Dropzone";


function SelectFiles() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {/* Previous Results Table */}
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        <CardHeader p='6px 0px 22px 0px'>
            <Text fontSize='lg' color='#fff' fontWeight='bold'>Upload Files</Text>
        </CardHeader>
      <CardBody>
        <PanelContent>
            <PanelContainer>
                <Dropzone/>

            </PanelContainer>
        </PanelContent>
      </CardBody>
      </Card>
    </Flex>
  )
}

export default SelectFiles;