
import './App.css'
import StudentTable from './table';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
function App(){
  return(
    <div className='App'>
       {/* <StudentTable/> */}
       {/* <Login></Login> */}
       <Routes>
        <Route path= '/' element={<Login />}/>
        <Route path='/StudentTable' element={<StudentTable />} />
       </Routes>
    </div>
  )
}
export default App;