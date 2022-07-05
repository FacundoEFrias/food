import './App.css';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Landing from './Componentes/landing';
import Home from './Componentes/home';
import FoodDetails from './Componentes/foodDetails';
import Formulario from './Componentes/recipeCreate';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <div>
     <Routes>

      <Route exact path="/" element={<Landing/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/home/:id" element={<FoodDetails/>}/>
      
      <Route path="/recipe" element={<Formulario/>}/>
      
  
     </Routes>
     </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
