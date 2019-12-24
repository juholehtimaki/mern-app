import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then(res => {
        let tempExerciseList = [];
        for (let exercise of res.data) {
          tempExerciseList.push(exercise);
        }
        setExercises(tempExerciseList);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function deleteExercise(id) {
    axios.delete("http://localhost:5000/exercises/" + id).then(response => {
      console.log(response.data);
      window.location.reload(false);
    });
  }

  return (
    <div className="container">
      <h3>List of all exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, index) => {
            return (
              <tr key={index}>
                <td>{exercise.username}</td>
                <td>{exercise.description}</td>
                <td>{exercise.duration}</td>
                <td>{exercise.date.substring(0, 10)}</td>
                <td>
                  <Link to={"/edit/" + exercise._id}>Edit</Link>-
                  <Link to="#" onClick={e => deleteExercise(exercise._id)}>
                    Delete
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ExerciseList;
