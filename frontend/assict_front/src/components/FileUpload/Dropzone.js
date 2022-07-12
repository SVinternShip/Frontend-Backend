import React, {UseState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Text, Button} from "@chakra-ui/react";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import MainPanel from "../Layout/MainPanel";
import {Separator} from "../Separator/Separator";
import axios from 'axios';



function Dropzone(props) {
  // const [inputFiles, setInputFiles] = useState(null);	//파일

  const axios = require('axios');

  let config = {
    method: 'post',
    url: 'http://127.0.0.1:8000/api/ct/patientResult',
    headers: { }
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

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


  function onFileUpload(event){
    const formData = new FormData();
    event.preventDefault();
    console.log(acceptedFiles);
    // formData.append(
    //   "demo file",
    //   this.state.selectedFile,
    //   this.state.selectedFile.name
    // )
    // axios.post("", formData).then(() => { //URL - 나중에 다른 파일에 저장하고 import해서 이용하는거로 바꾸기
    //   this.setState({selectedFile: null});
    //   this.setState({fileUploadedSuccessfully: true});
    // })
  }

  return (

    <div className="container">

      <div {...getRootProps({className: 'dropzone'})} >
        <input {...getInputProps()} />
        <Card overflowX={{ xl: "hidden" }} my='22px' pb='100px' placeholder="Drag and drop files here">
          Drag and drop files here

        </Card>
        <Button variant='outline'>
            Open File Dialog
        </Button>

      </div>

        <h4>Files</h4>
          <Separator/>
        <ul>{files}</ul>

      <div className="App">
        <form>
          <div>
            <input type="file" multiple onChange={async (event) => {
              event.preventDefault();
              let fileList = [];
              for (let i = 0; i < event.target.files.length; i++) {
                fileList.push(event.target.files[i])
              }

              const fileSend = await axios({
                method: 'get',
                url: '',
                data: {
                  fileList
                }
              })
            }}/>

          </div>
          <div>
            <button className="btn" type="submit" onClick={event => onFileUpload(event)}>Upload</button>
          </div>
        </form>

        {/*<input type="file" name="imgFile" id="imgFile" onChange={handleChangeFile}/>*/}
        {/*<input type="submit" value="Upload File" />*/}

      </div>


    </div>
  );
}

export default Dropzone;