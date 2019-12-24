import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { render } from "@testing-library/react";

function CreateExercise() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [duration, setDuration] = useState();

  useEffect(() => {
    //Setting current date
    let today = new Date();
    setDate(today);

    //Getting list of users
    axios
      .get("http://localhost:5000/users/")
      .then(res => {
        let temp = [];
        for (let user of res.data) {
          temp.push(user.username);
        }
        setUsers(temp);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function createNewExercise() {
    let tempExercise = {
      username: currentUser,
      description: description,
      duration: duration,
      date: date
    };
    axios
      .post("http://localhost:5000/exercises/add", tempExercise)
      .then(res =>
        render(
          <div className="container">
            <div class="alert alert-success" role="alert">
              Successfully added a new exercise log.
            </div>
          </div>
        )
      )
      .catch(err =>
        render(
          <div className="container">
            <div class="alert alert-danger" role="alert">
              Failed to add a new exercise log.
            </div>
          </div>
        )
      );
  }

  return (
    <div>
      <h3>Create new exercise log</h3>
      <form>
        <div className="form-group">
          <label htmlFor="dropdown-select">User:</label>
          <select
            className="form-control"
            onChange={e => setCurrentUser(e.target.value)}
          >
            {users.map((value, index) => {
              return <option key={index}>{value}</option>;
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            required
            className="form-control"
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration:</label>
          <input
            type="number"
            required
            className="form-control"
            onChange={e => setDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={e => setDate(e)} />
          </div>
        </div>
        <div className="form-group">
          <input
            type="button"
            value="Create exercise log"
            className="btn btn-primary"
            onClick={() => createNewExercise()}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateExercise;
