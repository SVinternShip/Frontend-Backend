import React from 'react';
import {useDropzone} from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import {Text, Button, Grid, GridItem , Box} from "@chakra-ui/react";
import Card from "../Card/Card";
import {Separator} from "../Separator/Separator";
import axios from 'axios';

function upLoadDcm(file,token, patient_result_id){
  let data = new FormData();
  data.append('file', file);
  let config = {
    "method": 'post',
    "url": '/api/ct/fileUpload/'+patient_result_id,
    "headers": {
      'Authorization': token,
      'Content-Type': 'multipart/form-data'
    },
    "data" : data
  };
  axios(config)
      .then(function (response) {
      })
      .catch(function (error) {
      });
}



function Dropzone(props) {
  const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
    noClick: false,
    noKeyboard: true
  });
  const navigate = useNavigate();
  async function onFileUpload(event, current_files) {
    event.preventDefault();
    if (current_files.length < 1){
      alert("Selected file zero")
      return
    }
    const token = 'JWT ' + window.localStorage.getItem('token')
    let config = {
      "method": 'post',
      "url": '/api/ct/patientResult/total_dcm/'+current_files.length,
      "headers": {
        'Authorization': token
      }
    };

    try{
      const response = await axios(config)
      let patient_result_id = response.data['id']
      for(let i=0; i<current_files.length;i++){
        upLoadDcm(current_files[i], token, patient_result_id)
      }
      navigate("/home/tables")
    }catch (err) {

    }

  }

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path}
    </li>

  ));

  return (

    <div className="container">

      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <Card overflowX={{ xl: "hidden" }} my='20px' pb='100px' align="center" display="flex" verticalAlign="middle">
          <Box  align="center" display="flex" alignContent="center" verticalAlign="middle" pt={{ base: "100px", md: "13%" }}>
            <a><Text
                ps='0px'
                color='gray.400'
                fontFamily='Plus Jakarta Display'
                borderBottomColor='#56577A'
                fontSize="2xl"
                align="center"
            >Double click to open dialog or Drag your files</Text></a>

          </Box>
        </Card>
      </div>
      <Grid templateColumns='repeat(5, 1fr)' gap={4} pb={3}>
        <GridItem colSpan={1}>
          <Text fontSize="larger" fontFamily="heading">Files</Text>
        </GridItem>
        <GridItem colStart={7}>
          <Button variant="outline" className="btn" type="submit" align="center" onClick={event => onFileUpload(event, acceptedFiles)}>Upload</Button>
        </GridItem>
      </Grid>
      <Separator/>
      <Box pos="absolute">
        <ul><Text fontFamily="monospace" fontWeight="thin" fontSize="large">{files}</Text></ul>
      </Box>
    </div>
  );
}

export default Dropzone;