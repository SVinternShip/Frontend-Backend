import React, { useState } from "react";
import {
    Text,
    Box,
    Image, Spinner,
} from "@chakra-ui/react";

function CtImageBox(props) {
  const { original_image, lime_image } = props;

  const [imgMode, setMode] = useState("lime");

  function changeMode() {
    if (original_image === null || lime_image === null) {
      return (
        <Box>
          <Text textAlign={"center"} fontSize="lg" color="white" pr={{lg: "80px"}}>
            Loading...
          </Text>
            <Box alignItems="stretch"  pt={{lg:"100px", sm:"30px"}} pb={{sm: "30px"}} pr={{lg: "80px"}}>
          <Spinner minWidth={{ lg: "350px", sm: "200px"}}
             minHeight={{ lg: "350px", sm: "200px"}}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
          />
            </Box>
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
