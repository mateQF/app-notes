import React from "react";
import PropTypes from 'prop-types'

import {Toggleable} from "./Toggleable";
export default function LoginForm({
  handleSubmit,
  handlePasswordChange,
  handleUsernameChange,
  username,
  password,
}) {
  return (
    <Toggleable buttonLabel={'Go login!'}>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={username}
              name="Username"
              placeholder="Username"
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              name="Password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </div>
          <button>Login</button>
        </form>
      </div>
    </Toggleable>
  );
}

LoginForm.propTypes = {
  handleSubmit : PropTypes.func.isRequired,
  username : PropTypes.string.isRequired,
  password : PropTypes.string.isRequired,
  handlePasswordChange : PropTypes.func.isRequired,
  handleUsernameChange : PropTypes.func.isRequired
}
