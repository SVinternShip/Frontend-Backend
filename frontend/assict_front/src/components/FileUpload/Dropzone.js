import React, {UseState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Text, Button} from "@chakra-ui/react";
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
  if (current_files.length < 1)
    alert("Selected file zero")
    return
  const token = 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFzc2ljdCIsImV4cCI6MTY1ODIyNzU2MCwiZW1haWwiOiIiLCJvcmlnX2lhdCI6MTY1NzYyMjc2MH0.V1EV7pqpg_YCIhBlfxVrhbil5LCyTqZt194K0N0Rv4s'
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
          <a>Double click to open dialog or Drag your files</a>
        </Card>
      </div>

        <h4>Files</h4>
          <Separator/>
        <ul>{files}</ul>

      <div className="App">
        <div>
          <button className="btn" type="submit" onClick={event => onFileUpload(event, acceptedFiles)}>Upload</button>
        </div>
      </div>


    </div>
  );
}

export default Dropzone;