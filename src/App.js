import React from 'react'
import {  
  BrowserRouter as Router,  
  Routes,  
  Route 
}   
from 'react-router-dom';  
import EmpRegister from './EmpRegister';
import EmpDash from './EmpDash';
import AdminDash from './AdminDash';

const App = () => {
  return (
  <>
  <Router>
    <Routes>
    <Route exact path='/' element={< EmpRegister />}></Route>  
    <Route exact path='/empDash' element={< EmpDash />}></Route>  
    <Route exact path='/adminDash' element={< AdminDash />}></Route>  
    </Routes>
  </Router>
  </>
  )
}

export default App
