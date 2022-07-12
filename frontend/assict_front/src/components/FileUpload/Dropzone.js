import React, {UseState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Text, Button} from "@chakra-ui/react";
import Card from "../Card/Card";
import {Separator} from "../Separator/Separator";
import axios from 'axios';


function onFileUpload(event, current_files){
  const formData = new FormData();
  event.preventDefault();
  console.log(current_files);

  //axios await patientResult -> id return (성공했을 때)
  // 위 id 값으로 current_files 하나씩 http://{{django_server}}:8000/api/ct/fileUpload/1
}


function Dropzone(props) {
  // const [inputFiles, setInputFiles] = useState(null);	//파일


  const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
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
          Drag and drop files here

        </Card>
        <Button type="file" multiple variant='outline'>
            Open File Dialog
        </Button>

      </div>

        <h4>Files</h4>
          <Separator/>
        <ul>{files}</ul>

      <div className="App">

        <div>
          <button className="btn" type="submit" onClick={event => onFileUpload(event, acceptedFiles)}>Upload</button>
        </div>

        {/*<input type="file" name="imgFile" id="imgFile" onChange={handleChangeFile}/>*/}
        {/*<input type="submit" value="Upload File" />*/}

      </div>


    </div>
  );
}

export default Dropzone;