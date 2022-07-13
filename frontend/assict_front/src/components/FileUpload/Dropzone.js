import React, {UseState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Text, Button, Flex} from "@chakra-ui/react";
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

      <div {...getRootProps({className: 'dropzone'})} >
        <input {...getInputProps()} />
        <Card overflowX={{ xl: "hidden" }} my='22px' pb='100px' placeholder="Drag and drop files here">
          <Flex direction='column' pt={{ base: "100px", md: "100px" }}>
            <a><Text
                        fontSize="2xl"
                        fontFamily="monospace"
                        fontWeight="thin"
                        color="gray.400"
            >Double click to open dialog or Drag your files</Text></a>
          </Flex>
        </Card>
      </div>

        <h4><Text
            fontSize="larger"
            fontFamily="heading"
        >Files</Text></h4>
          <Separator/>
      <ul><Text fontFamily="monospace">{files}</Text></ul>

      <div className="App">
        <div>
          <Button variant="outline" className="btn" type="submit" onClick={event => onFileUpload(event, acceptedFiles)}>Upload</Button>
        </div>
      </div>


    </div>
  );
}

export default Dropzone;