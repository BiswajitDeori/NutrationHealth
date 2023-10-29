
import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom"

import Profile from './component/camera';
import { Home } from './component/Home';
import { Table } from './component/table';
import LoadingSpinner from './component/loading';
function App()
{

  return (
    <div className='App'>
      <Router>
          <div>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path="camera" element={<Profile/>}></Route>
            <Route path='*' element={<div>404 Not found</div>}></Route>
          </Routes>
          </div>
      </Router>
    </div>

  )



}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <div className='container mt-5'>
//           <Profile/>
//         </div>
//       </header>
//     </div>
//   );
// }

export default App;
