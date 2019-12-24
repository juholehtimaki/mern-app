import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Components
import { NavigationBar } from "./components/NavigationBar.jsx";
import { ExercisesList } from "./components/ExercisesList.jsx";
import { EditExercise } from "./components/EditExercise.jsx";
import { CreateExercise } from "./components/CreateExercise.jsx";
import { CreateUser } from "./components/CreateUser.jsx";

export const App = () => {
  return (
    <Router>
      <NavigationBar />
      <div className="container">
        <br />
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} name={"viddu:D"} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
};
