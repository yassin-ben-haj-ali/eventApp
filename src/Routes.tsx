import {Routes,Route} from 'react-router-dom';
import LoginPageLayout from './LoginPage/LoginPageLayout';
import LoginPage from './LoginPage/LoginPage';

const AppRoutes=()=>{
  return (
    <Routes>
      <Route path='login' 
      element={
        <LoginPageLayout>
            <LoginPage />
        </LoginPageLayout>
      }
      />
    </Routes>
  );
}
export default AppRoutes;