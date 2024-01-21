import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './Header';
import Login from './login/LogIn';
import Signin from './login/SignUp';
import HomePage from './pages/HomePage';
import Recipes from './pages/recipe/Recipes';
import Shopping from './pages/Shopping';
import AddRecipe from './pages/recipe/AddRecipe';
import LogOut from './login/LogOut';
import Recipe from './pages/recipe/Recipe';
function App() {

  return (
    <div className="App">
      <header><Header prop={true} /></header>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<Signin />}></Route>
        <Route path="/homePage" element={<HomePage />}></Route>
        <Route path="/recipe" element={<Recipes byUser={false} />}></Route>
        <Route path="/recipe/:user" element={<Recipes byUser={true} />}></Route>
        <Route path="/recipe/add" element={<AddRecipe />}></Route>
        <Route path="/recipe/edit" element={<AddRecipe />}></Route>
        <Route path="/recipe/detail" element={<Recipe />}></Route>
        <Route path="/logOut" element={<LogOut />}></Route>
        <Route path="/shopping" element={<Shopping />}></Route>
      </Routes>
      <div className='container'>
        <div className='welcome'>wellcome</div>
        <div className='here'>here you have the best recipes you have ever dreamed...</div>
      </div>
    </div>
  );
}

export default App;
