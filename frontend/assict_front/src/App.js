import { Route, Routes } from 'react-router-dom';

import SignUpPage from "./views/pages/SignUpPage";
import SignInPage from "./views/pages/SignInPage";
import TablesPage from "./views/pages/TablesPage";
import FileUploadPage from "./views/pages/FileUploadPage";
import ResultPage from "./views/pages/ResultPage";




const App = () => {
    return (
        <Routes>
            <Route path="/home/signup" element={<SignUpPage />} />
            <Route path="/home/signin" element={<SignInPage />} />
            <Route path="/home/tables" element={<TablesPage />} />
            <Route path="/home/fileupload" element={<FileUploadPage />} />

            <Route path="/home/tables/:id" element={<ResultPage />} />
        </Routes>
    );
};

export default App;