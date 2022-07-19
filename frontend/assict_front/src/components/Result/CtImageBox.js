import React, {useState} from "react";
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
    const { original_image, lime_image } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const colorStatus = useColorModeValue("white", "gray.400");



  const [imgMode, setMode] = useState("lime");


    function changeMode(){
        if(original_image ===null || lime_image===null){

        }
        else if (imgMode === "original"){
            return ( <Image onClick={()=>{setMode("lime")}} src={original_image} />)
        }
        else if (imgMode === "lime"){
            return ( <Image onClick={()=>{setMode("original")}} src={lime_image} />)
        }

    }

    return(
          <Card>
              <CardBody>
                  <Text fontSize='sm'>CT</Text>
                  {changeMode()}
            </CardBody>
        </Card>
  );
}

export default CtImageBox;