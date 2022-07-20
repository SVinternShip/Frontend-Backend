import React, {useEffect, useState} from "react";
import {
    Tr,
    Spacer,
    Flex,
    Text,
    Progress,
    Icon,
    Button,
    Box,
    useColorModeValue, Badge, Img, FormControl, FormLabel, EditablePreview, EditableInput, Editable,
} from "@chakra-ui/react";

function saveNote(event, note){
    event.preventDefault()
    console.log(note)
}
function NoteWithButton(props) {
    const {note} = props;
    let currentNote = note

    return(
        <Flex pl={{base:"0", lg:"40px"}} pr={{base:"0", lg:"40px"}}>
            <Box borderWidth='1px' borderRadius='lg' maxWidth={{md:"600px"}} minH={{sm:"60px", md:"150px"}} flex={{sm:"auto"}}>
                <Editable color='#fff' placeholder={"Write your note"} defaultValue={currentNote} onSubmit={(nextValue)=>{
                    currentNote = nextValue
                    console.log(currentNote)
                }}>
                    <EditablePreview />
                    <EditableInput/>
                </Editable>
            </Box>
            <Spacer display={{base: 'none', lg:'block'}} />
            <Box alignSelf={{base:"center"}}>
                <Button colorScheme='teal' variant='outline' onClick={event=>saveNote(event, currentNote)}>
                    Save
                </Button>
            </Box>
        </Flex>
    )
}

export default NoteWithButton;
