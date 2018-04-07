import React from 'react'
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  static propTypes = {
    setLoggedInUser: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props)

    this.state = {
      credentials: {
        username: "",
        password: ""
      }
    }
  }

  formListener = (event) => {
    let value = event.target.value
    let name = event.target.name
    let currentCredState = Object.assign({},this.state.credentials)
    currentCredState[name] = value
    this.setState({
      credentials: currentCredState
    })
    console.log(this.state)
  }

  loginUser = (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')

    return fetch("http://localhost:3000/api/v1/login", {
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: token
      },
      body: JSON.stringify(this.state.credentials)
    })
    .then(response => response.json())
    .then(res => {
      if (res.error) {
        alert(res.error)
      }
      else {
        window.location = `/`
        this.props.setLoggedInUser(res)
      }
    })
  }

  signUpUser = (event) => {
  event.preventDefault()
  fetch("http://localhost:3000/api/v1/signup", {
    method: 'POST',
    headers:
    {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
    },
    body: JSON.stringify({user: this.state.credentials})
  })
    .then(res => res.json())
    .then(resp => {
      if (resp.error) {
        alert(resp.error)
      } else {
        window.location = `/`
        this.props.setLoggedInUser(resp)
      }
    })
    }

  render() {
    return (
      <div className="login">
        <h3>Log In</h3>
      <form>
      <input type="text" name="username" onChange={this.formListener} />
      <input type="password" name="password" onChange={this.formListener} />
      <button className="buttons" onClick={this.loginUser}>Login</button>
      </form>
     

      <h3>New User? Sign Up!</h3>
<form>
  <input type="text" name="username" onChange={this.formListener} />
  <input type="password" name="password" onChange={this.formListener} />
  <input type="password" name="password_confirmation" onChange={this.formListener} />
  <button className="buttons" onClick={this.signUpUser} style={{backgroundColor:"#21d8f8", color:"white", padding:"0.5em", fontFamily: "Avenir", borderRadius:"6px", borderStyle:"none"}}>Sign Up</button>
</form>
</div>

    )
  }
}




export default LoginForm;
