import React from "react";
import {
    Tr,
    Td,
    Flex,
    Text,
    Progress,
    Icon,
    Button,
    useColorModeValue, Badge, Img, Box,
} from "@chakra-ui/react";
import { FaPlayCircle } from "react-icons/fa";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
// import {useNavigate} from "react-router-dom";

function CtImageBox(props) {
    const { original_image, lime_image, lastItem } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const colorStatus = useColorModeValue("white", "gray.400");
  // const navigate=useNavigate();

  return (
      <Flex direction='column'>
          <Card>
              <CardBody>
                  <Text fontSize='sm'>CT</Text>
            <Img src={original_image} fallbackSrc='https://i.pinimg.com/originals/3e/16/86/3e1686b8d997105303e88627b2fa5677.png'/>
            <Text fontSize='sm'>LIME</Text>
            <Img src={lime_image} fallbackSrc='https://i.pinimg.com/originals/3e/16/86/3e1686b8d997105303e88627b2fa5677.png'/>
        </CardBody>
                                        </Card>
                  </Flex>
  );
}

export default CtImageBox;