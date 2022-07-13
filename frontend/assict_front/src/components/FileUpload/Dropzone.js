import React, {UseState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Text, Button, Flex, Box} from "@chakra-ui/react";
import Card from "../Card/Card";
import {Separator} from "../Separator/Separator";
import axios from 'axios';

function upLoadDcm(file,token, patient_result_id){
  let data = new FormData();
  data.append('file', file);
  let config = {
    "method": 'post',
    "url": 'http://127.0.0.1:8000/api/ct/fileUpload/'+patient_result_id,
    "headers": {
      'Authorization': token,
      'Content-Type': 'multipart/form-data'
    },
    "data" : data
  };
  axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

async function onFileUpload(event, current_files) {
  event.preventDefault();
  if (current_files.length < 1){
    alert("Selected file zero")
    return
  }
  const token = 'JWT ' + localStorage.getItem('token')
  console.log(token)
  let config = {
    "method": 'post',
    "url": 'http://127.0.0.1:8000/api/ct/patientResult',
    "headers": {
      'Authorization': token
    }
  };

  try{
    const response = await axios(config)
    console.log(response)
    let patient_result_id = response.data['id']
    for(let i=0; i<current_files.length;i++){
      upLoadDcm(current_files[i], token, patient_result_id)
    }
  }catch (err) {
    
  }
  window.location.replace('http://localhost:3000/home/tables');
}



function Dropzone(props) {
  const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
    noClick: false,
    noKeyboard: true
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>

  ));

  return (

    <div className="container">

      <div {...getRootProps({className: 'dropzone'})} verticalAlign="middle">
        <input {...getInputProps()} />
        <Card overflowX={{ xl: "hidden" }} my='20px' pb='100px' align="center" display="flex" verticalAlign="middle">
          <Box  align="center" display="flex" alignContent="center" verticalAlign="middle" pt={{ base: "100px", md: "13%" }}>
            <a><Text
                        fontSize="2xl"
                        fontFamily="monospace"
                        fontWeight="thin"
                        color="gray.400"
                        align="center"
            >Double click to open dialog or Drag your files</Text></a>

          </Box>
        </Card>
      </div>

        <h4><Text
            fontSize="larger"
            fontFamily="heading"
        >Files</Text></h4>
          <Separator/>
      <Box h="100px">
        <ul><Text fontFamily="monospace" fontWeight="thin" fontSize="large">{files}</Text></ul>
      </Box>
      <div className="App">
        <div>
          <Button variant="outline" className="btn" type="submit" align="center" onClick={event => onFileUpload(event, acceptedFiles)}
          >Upload</Button>
        </div>
      </div>
    </div>
  );
}

export default Dropzone;