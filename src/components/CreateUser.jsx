import React, { useState } from "react";
import axios from "axios";
import { render } from "@testing-library/react";

function CreateUser() {
  const [username, setUsername] = useState();

  function submit() {
    axios
      .post("http://localhost:5000/users/add", { username })
      .then(res =>
        render(
          <div className="container">
            <div class="alert alert-success" role="alert">
              Successfully added a new user.
            </div>
          </div>
        )
      )
      .catch(err =>
        render(
          <div className="container">
            <div class="alert alert-danger" role="alert">
              Failed to add a new user.
            </div>
          </div>
        )
      );
  }

  return (
    <div>
      <h3>Create new user</h3>
      <form>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button
            type="button"
            value="Create User"
            className="btn btn-primary"
            onClick={() => submit()}
          >
            Create user
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
