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

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
        <Route path="/meals/:id" component={ RecipeDetails } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/profile" component={ Profile } />
      </Switch>
    </div>
  );
}

export default App;
