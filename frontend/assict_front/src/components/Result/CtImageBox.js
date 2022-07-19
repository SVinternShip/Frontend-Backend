import React from "react";
import {
    Tr,
    Td,
    Flex,
    Text,
    Progress,
    Icon,
    Button,
    useColorModeValue, Badge, Img, Box, Image,
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

    // if (props.original_image == null){
    // return }
    //
    // if (props.lime_image == null){
    //     return ignoreFallbackprop}

    return(
          <Card>
              <CardBody>
                  <Text fontSize='sm'>CT</Text>
            <Image src={original_image} fallbackSrc='data:image/png;base64,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' />
            <Text fontSize='sm'>LIME</Text>
            <Image src={lime_image} fallbackSrc='data:image/png;base64,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' />
            </CardBody>
        </Card>
  );
}

export default CtImageBox;