import React, { useState } from "react";
import {
    Tr,
    Td,
    Flex,
    Text,
    Progress,
    Icon,
    Button,
    useColorModeValue,
    Badge,
    Img,
    Box,
    Image, Spinner,
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

  function changeMode() {
    if (original_image === null || lime_image === null) {
      return (
        <Box>
          <Text textAlign={"center"} fontSize="lg" color="white">
            Loading...
          </Text>
          <Spinner
            size={"xl"}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
          />
        </Box>
      );
    } else if (original_image === undefined || lime_image === undefined) {
      return (
        <Box>
          <Image
            maxWidth={{ lg: "535px" }}
            maxHeight={{ lg: "535px" }}
            minWidth={{ sm: "350px", lg: "534px" }}
            src="https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg"
          ></Image>
        </Box>
      );
    } else if (imgMode === "original") {
      return (
        <Box>
          <Text textAlign={"center"} fontSize="lg" color="white">
            Original
          </Text>
          <Image
            minWidth={{ lg: "535px" }}
            onClick={() => {
              setMode("lime");
            }}
            src={original_image}
          />
        </Box>
      );
    } else if (imgMode === "lime") {
      return (
        <Box>
          <Text textAlign={"center"} fontSize="lg" color="white">
            LIME
          </Text>
          <Image
            minWidth={{ lg: "535px" }}
            onClick={() => {
              setMode("original");
            }}
            src={lime_image}
          />
        </Box>
      );
    }
  }

  return <Box>{changeMode()}</Box>;
}

export default CtImageBox;
