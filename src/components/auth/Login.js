
import React, { Component } from 'react';
import authService from '../../services/auth/auth-service';
import '../../Index.css';
import LoginButton from './LoginButton';
import Signup from './Signup';

class Login extends Component {
  state = { username: '', password: '', isSignup: false };

  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.changeToSignup = this.changeToSignup.bind(this);
  }
 
  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
 
    if(this.state.isSignup) {
        authService
        .signup(username, password)
        .then(response => {
          this.setState({ username: '', password: '' });
          this.props.getUser(response, true);          
          this.props.history.push("/habits");
        })
        .catch(error => console.log(error));
    } else {
        authService
        .login(username, password)
        .then(response => {
          this.setState({ username: '', password: '' });
          this.props.getUser(response, true);          
          this.props.history.push("/habits");
        })
        .catch(error => console.log(error));
    }
  };
 
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  hasUser() {
    const isSignup = this.state.isSignup;
    if (!isSignup) {
        return <button type="submit" className="signup-btn"> Login </button>
    }
    return <button type="submit" className="signup-btn"> Signup </button>
  }

  changeToSignup() {
    this.setState({
        isSignup: true
    })
  }
 
  render() {
    return (<div>
    <nav className="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
    <div className="container">
      <div className="navbar-translate">
        <a className="navbar-brand" href="https://demos.creative-tim.com/material-kit/index.html">
          Material Kit </a>
      </div>
      <div className="collapse navbar-collapse">
      </div>
    </div>
  </nav>
  <div className="page-header header-filter" >
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6 ml-auto mr-auto">
          <div className="card card-login">
            <form className="form" onSubmit={this.handleFormSubmit}>
              <div className="card-header card-header-primary text-center">
                <h4 className="card-title">Login</h4>
              </div>
              <div className="card-body">
            
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="material-icons">face</i>
                    </span>
                  </div>
                  
                        <input type="text" name="username" value={this.state.username}
                                    onChange={this.handleChange} className="form-control" placeholder="Username ..." ></input>
                        </div>
                        <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                            <i className="material-icons">lock_outline</i>
                            </span>
                        </div>
                        <input  type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange} 
                                className="form-control"
                                placeholder="Password..." />
                        </div>
                    </div>
                    <div className="footer text-center">
                        {this.hasUser()}
                        <br />
                        Don't have a user <button onClick={this.changeToSignup}>Change to Signup</button>
                    </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <footer className="footer">
      <div className="container">
        <nav className="float-left">
          <ul>
            <li>
              <a href="https://www.creative-tim.com/">
                Creative Tim
              </a>
            </li>
            <li>
              <a href="https://www.creative-tim.com/presentation">
                About Us
              </a>
            </li>
            <li>
              <a href="https://www.creative-tim.com/blog">
                Blog
              </a>
            </li>
            <li>
              <a href="https://www.creative-tim.com/license">
                Licenses
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright float-right">
          &copy;
          <script>
            document.write(new Date().getFullYear())
          </script>, made with <i className="material-icons">favorite</i> by
          <a href="https://www.creative-tim.com/" target="_blank">Creative Tim</a> for a better web.
        </div>
      </div>
    </footer>
  </div>
</div>
)
    }
}
 
export default Login;