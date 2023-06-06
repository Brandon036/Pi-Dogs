import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './Views/Home/Home';
import Landing from './Views/Landing/Landing.jsx';
import Form from "./Views/Form/Form"


function App() {
  return (
    <div className="App">

      <Routes>
        <Route exact path="/" element={<Landing />}/>
        <Route path="/home" element={<Home />}/>
        
        <Route path="/form" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
