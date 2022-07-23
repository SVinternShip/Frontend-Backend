import React, { useEffect, useState } from "react";
import {
  Spacer,
  Flex,
  Button,
  Box,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";

function NoteWithButton(props) {
  const toast = useToast();
  const { note, patient_result_id } = props;

  let [inputNote, setInputNote] = React.useState("");
  useEffect(() => {
    console.log("Note")
    console.log(note)

    setInputNote(note);
  }, [note]);
  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    console.log(inputValue);
    setInputNote(inputValue);
  };

  async function saveNote(event, patient_result_id) {
    event.preventDefault();
    //응답 성공
    const token = "JWT " + window.localStorage.getItem("token");
    let config = {
      method: "post",
      url: "/api/ct/patientResult/" + patient_result_id + "/note",
      data: {
        note: inputNote,
      },
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios(config);
    } catch (err) {
      toast({
        title: "노트 저장 실패",
        position: "top",
        status: "error",
        isClosable: true,
      });
    }
  }

  return (
    <Flex pl={{ base: "0", lg: "40px" }} pr={{ base: "0", lg: "40px" }}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        maxWidth={{ md: "600px" }}
        minH={{ sm: "60px", md: "150px" }}
        flex={{ sm: "auto" }}
      >
        <Textarea
          borderWidth="1px"
          borderRadius="lg"
          maxWidth={{ md: "600px" }}
          minH={{ sm: "60px", md: "150px" }}
          flex={{ sm: "auto" }}
          color="#fff"
          value={inputNote}
          onChange={handleInputChange}
          placeholder={inputNote}
        />
      </Box>
      <Spacer display={{ base: "none", lg: "block" }} />
      <Box alignSelf={{ base: "center" }}>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={(event) => saveNote(event, patient_result_id)}
        >
          Save
        </Button>
      </Box>
    </Flex>
  );
}

export default NoteWithButton;
