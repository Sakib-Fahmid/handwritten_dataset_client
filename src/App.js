import './App.css';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Footer from './Components/Footer/Footer';
import DataEntry from './Components/DataEntry/DataEntry';
import RequireAuth from './Components/RequireAuth/RequireAuth';


function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/signin' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/data-entry' element={
          <RequireAuth>
            <DataEntry></DataEntry>
          </RequireAuth>
        }>
        </Route>
      </Routes>
      {/* <Footer></Footer> */}
    </>
  );
}

export default App;
