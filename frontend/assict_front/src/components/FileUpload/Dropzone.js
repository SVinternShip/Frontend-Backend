import React from 'react';
import {useDropzone} from 'react-dropzone';
import {Text} from "@chakra-ui/react";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import MainPanel from "../Layout/MainPanel";
import {Separator} from "../Separator/Separator";
import axios from 'axios';

function Dropzone(props) {
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
        <button type="button" onClick={open}>

            Open File Dialog


        </button>
      </div>



        <h4>Files</h4>
          <Separator/>
        <ul>{files}</ul>

    </div>
  );
}

export default Dropzone;