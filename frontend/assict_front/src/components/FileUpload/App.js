// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios"
//
//
//
// function onFileUpload(){
//     const formData = new FormData();
//     formData.append(
//       "demo file",
//       this.state.selectedFile,
//       this.state.selectedFile.name
//     )
//     axios.post("", formData).then(() => { //URL - 나중에 다른 파일에 저장하고 import해서 이용하는거로 바꾸기
//       this.setState({selectedFile: null});
//       this.setState({fileUploadedSuccessfully: true});
//     })
//   }
//
// function App() {
//   const [inputFile, setInputFile] = useState(null);
//
//   // const handleChangeFile = (event) => {
//   //   let reader = new FileReader();
//   //
//   //   if (event.target.files[0]) {
//   //     reader.readAsDataURL(event.target.files[0]);
//   //     setInputFile(event.target.files[0]);
//   //   }
//   // }
//
//
//   return (
//     <div className="App">
//         <form>
//             <div>
//                 <input type="file" multiple onChange={async (event) => {
//                     event.preventDefault();
//                     let fileList = [];
//                     for (let i = 0; i < event.target.files.length; i++) {
//                         fileList.push(event.target.files[i])
//                     }
//
//                     const fileSend = await axios({
//                         method: 'get',
//                         url: '',
//                         data: {
//                             fileList
//                         }
//                     })
//                 }}/>
//
//             </div>
//             <div>
//                 <button className="btn" type="submit" onclick={event=>onFileUpload(event, file)}>Upload</button>
//             </div>
//         </form>
//
//         {/*<input type="file" name="imgFile" id="imgFile" onChange={handleChangeFile}/>*/}
//         {/*<input type="submit" value="Upload File" />*/}
//
//     </div>
//   );
// }
//
// export default App;