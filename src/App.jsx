import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateProject from './pages/CreateProject.jsx';
import Login from "./pages/Login.jsx";
import ProjectDetails from './pages/ProjectDetails.jsx';
function App() {
  

  return (
    <div className= ''>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/createproject' element={<CreateProject/>}/>
          <Route path='/addyourproject' element={<ProjectDetails/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
