import { Route, Routes, Navigate } from 'react-router-dom';
import SignUpPage from "./views/pages/SignUpPage";
import SignInPage from "./views/pages/SignInPage";
import TablesPage from "./views/pages/TablesPage";
import FileUploadPage from "./views/pages/FileUploadPage";
import ResultPage from "./views/pages/ResultPage";

function RequireAuth({ children }) {
    let authed = false
    const token = window.localStorage.getItem('token')
    if (token !== null) //token값이 존재하면 로그인이 되었다고 판단
    {
        authed = true
        const token_json = {
            "token" : token
        }
        // need to refresh token
    }
    return authed === true ? (
        children
    ) : (
        <Navigate to="/signin"/>
    );
}

const App = () => {
    return (
        <Routes>
            <Route path="/" element={
                <Navigate to="/home/tables" />
            } />
            <Route path="/home/tables" element={
                <RequireAuth>
                    <TablesPage/>
                </RequireAuth>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/signin" element={<SignInPage/>} />
            <Route path="/home/fileupload" element={
                <RequireAuth>
                    <FileUploadPage/>
                </RequireAuth>}/>
            <Route path="/home/tables/:id" element={<ResultPage />} />
            <Route path="*" element={<Navigate to="/signin"/>} />
        </Routes>
    );
};

export default App;