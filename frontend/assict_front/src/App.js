import { Route, Routes } from 'react-router-dom';
import SignUp from './components/Sign/SignUp';
import NewSignIn from "./views/pages/SignInPage";
import SignUpPage from "./views/pages/SignUpPage";
import SignInPage from "./views/pages/SignInPage";
import TablesPage from "./views/pages/TablesPage";

const App = () => {
    return (
        <Routes>
            <Route path="/home/signup" element={<SignUpPage />} />
            <Route path="/home/signin" element={<SignInPage />} />
            <Route path="/home/tables" element={<TablesPage />} />
        </Routes>
    );
};

export default App;