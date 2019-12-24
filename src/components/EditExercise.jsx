import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditExercise(props) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [duration, setDuration] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    //Fetching exercise
    axios
      .get("http://localhost:5000/exercises/" + props.match.params.id)
      .then(res => {
        setId(res.data._id);
        setCurrentUser(res.data.username);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setDate(Date.parse(res.data.date));
      })
      .catch(err => {
        console.log(err);
      });
    //Fetching userlist
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

  function editExercise() {
    let tempExercise = {
      username: currentUser,
      description: description,
      duration: duration,
      date: date
    };

    axios
      .post(
        "http://localhost:5000/exercises/update/" + props.match.params.id,
        tempExercise
      )
      .then(res => {
        window.location = "/";
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <h3>Edit an existing exercise log</h3>
      <form>
        <div class="form-group">
          <label for="dropdown-select">User:</label>
          <select
            class="form-control"
            onChange={e => setCurrentUser(e.target.value)}
            selected={currentUser}
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
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration:</label>
          <input
            type="number"
            required
            value={duration}
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
            value="Edit exercise log"
            className="btn btn-primary"
            onClick={() => editExercise()}
          />
        </div>
      </form>
    </div>
  );
}

export default EditExercise;
