/* eslint-disable no-unused-vars */
import './App.css';
import Banner from './Components/Banner';
import Favourite from './Components/Favourite';
import Movies from './Components/Movies';
import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <NavBar />

      <Routes>

        {/* <Banner /> */}
        <Route path='/' exact element={
          <>
            <Banner />
            <Movies />
          </>
        }
        />
        <Route path='/favourites' element={<Favourite />} />

      </Routes>
      {/* <Movies /> */}
      {/* <Favourite /> */}
    </Router>
  );
}

export default App;
