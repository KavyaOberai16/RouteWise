import { Routes, Route} from "react-router-dom"
import  MainPage  from './pages/MainPage'
import ResultPage from './pages/ResultPage'
import CentrePage from './pages/CentrePage'
import AppLayout from './layouts/AppLayout'
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import ProtectedRoute from "../ProtectedRoute"
import LoadingPage from "./pages/LoadingPage";
import './index.css'
import './App.css'

function App() {
  return(
    <Routes>
      {/* app layout act as parent and other as child so whenever we go to new route it will come b/w navbar & footer in applayout.jsx */}
      <Route element={<AppLayout/>}> 
      {/* this is how we write routes in react, mainpage is not an actual page it just handles all 4 cards flow, 
      but still it will be included */}
    {/* react handles routes, backend handles all the api,authentication not like ejs projects we made before */}
      <Route path="/" element={<ProtectedRoute><MainPage/></ProtectedRoute>}/>  {/*all the front cards, where user inputs will be here at this route*/}
      <Route path="/result" element={<ProtectedRoute><ResultPage/></ProtectedRoute>}/> {/*all the result cards, where final product will be shown will be here at this route*/}
      <Route path="/centrePage" element={<CentrePage/>}/>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/loading" element={<LoadingPage />} />
      </Route>
    </Routes>
  );  
}

export default App
