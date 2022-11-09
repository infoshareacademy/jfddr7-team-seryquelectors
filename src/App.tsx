import './App.css';
import {Routes, Route} from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';


function App() {
  return (
    <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='home' element={null} />
    </Routes>
  );
}

export default App;
