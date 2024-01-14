import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Header from './Header';
import Login from './login/LogIn';
import Signin from './login/SignUp';
import HomePage from './pages/HomePage';
import Recipes from './pages/Recipes';
import Shopping from './pages/Shopping';
import AddRecipe from './pages/AddRecipe';
import LogOut from './login/LogOut';
import Recipe from './Recipe';
function App() {

  return (
    <div className="App">
      <Header prop={true}/>
      <hr/>
   

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<Signin />}></Route>
        <Route path="/homePage" element={<HomePage />}></Route>
        <Route path="/recipe" element={<Recipes byUser={false}/>}></Route>
        <Route path="/recipe/:user" element={<Recipes byUser={true}/>}></Route>
        <Route path="/recipe/add" element={<AddRecipe />}></Route>
        <Route path="/recipe/edit" element={<AddRecipe />}></Route>
        <Route path="/recipe/detail" element={<Recipe />}></Route>
        <Route path="/logOut" element={<LogOut/>}></Route>

        <Route path="/shopping" element={<Shopping />}></Route>        
      </Routes>
     
      <ul>
        לשאול:
        <li>delete- how to update the recipes,buies</li>
        <li>קריאות שרת רק ברידקס??? ,איך??</li>
        <li>מעבר ישיר בין כל המתכונים למתכונים שלי</li>
        <li>עיצובים...</li>


      </ul>
    </div>
  );
}

export default App;
