import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals/:id">
          <RecipeDetails />
        </Route>
        <Route exact path="/drinks/:id">
          <RecipeDetails />
        </Route>
        <Route exact path="/meals">
          <div>
            <Header title="Meals" showProfileIcon showSearchIcon />
            <Recipes />
            <Footer />
          </div>
        </Route>
        <Route exact path="/drinks">
          <div>
            <Header title="Drinks" showProfileIcon showSearchIcon />
            <Recipes />
            <Footer />
          </div>
        </Route>
        <Route path="/meals/:id/in-progress">
          <RecipeInProgress />
        </Route>
        <Route path="/drinks/:id/in-progress">
          <RecipeInProgress />
        </Route>
        <Route path="/done-recipes">
          <div>
            <Header title="Done Recipes" showProfileIcon />
            <DoneRecipes />
          </div>
        </Route>
        <Route path="/favorite-recipes">
          <div>
            <Header title="Favorite Recipes" showProfileIcon />
            <FavoriteRecipes />
          </div>
        </Route>
        <Route path="/profile">
          <div>
            <Header title="Profile" showProfileIcon />
            <Profile />
            <Footer />
          </div>
        </Route>
      </Switch>

    </div>
  );
}

export default App;
