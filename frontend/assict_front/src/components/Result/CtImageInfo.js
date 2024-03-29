import React from "react";
import {
  Box,
} from "@chakra-ui/react";

function get_prediction_result(prediction) {
  if (prediction === true) {
    return (
      <Box
        color="#fff"
        fontWeight="bold"
        letterSpacing="wide"
        fontSize="xl"
        textTransform="uppercase"
      >
        정상
      </Box>
    );
  }
  return (
    <Box
      borderColor="red.700"
      color="red"
      fontWeight="bold"
      letterSpacing="wide"
      fontSize="xl"
      textTransform="uppercase"
    >
      출혈 위험
    </Box>
  );
}
function CtImageInfo(props) {
  const { prediction, fileName, studyDate } = props;

  return (
    <Box borderWidth="1px" borderRadius="lg">
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          {get_prediction_result(prediction)}
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" color="#fff" fontWeight="bold" fontSize="sm">
            파일명 : {fileName}
          </Box>
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" color="#fff" fontWeight="bold" fontSize="sm">
            촬영 날짜 : {studyDate}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CtImageInfo;
