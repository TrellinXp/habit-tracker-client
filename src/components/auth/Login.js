import React, { Component } from 'react';
import authService from '../../services/auth/auth-service';
import '../../Index.css';

const error_missing_credentials = "Missing credentials";

const error_must_be_unique = "Username and email need to be unique. Either username or email is already used.";

const error_message_unique = "Username and email need to be unique.";

const error_message_missing_credentials = "Please enter a username and password";

class Login extends Component {
  state = { username: '', password: '', isSignup:false, errorMessage: ''};

  constructor(props) {
    super(props);

    this.setState(
      {
        isSignup: this.props.isSignup
      }
    )
    // This binding is necessary to make `this` work in the callback
    this.changeToSignup = this.changeMode.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        isSignup: this.props.isSignup
      }
    )
  }

  setErrorMessage(errorMessage) {
    this.setState(
      {
        errorMessage: errorMessage
      }
    )
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
          this.props.history.push("/calendar");
        })
        .catch(error => {
          console.log(error);
          let errorMessage = (error.response?.data.errorMessage !== undefined ? error.response?.data.errorMessage :  error.response?.data.message);  
          if(error_must_be_unique === errorMessage) {
            this.setErrorMessage(error_message_unique)
          } else {
            this.setErrorMessage(errorMessage);
          }
        });
    } else {
        authService
        .login(username, password)
        .then(response => {
          this.setState({ username: '', password: '' });
          this.props.getUser(response, true);          
          this.props.history.push("/calendar");
          this.setState(
            {
              errorMessage: ""
            }
          )
        })
        .catch(errorObj => {
          console.log(errorObj);
          let errorMessage = (errorObj.response?.data.errorMessage !== undefined ? errorObj.response?.data.errorMessage :  errorObj.response?.data.message);  
          if(error_missing_credentials === errorMessage  ) {
            this.setErrorMessage(error_message_missing_credentials);
          } else {
            this.setErrorMessage(errorMessage);
          }
        });
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

  getTitle() {
    const isSignup = this.state.isSignup;
    if (!isSignup) {
        return <h4> Login </h4>
    }
      return <h4> Signup </h4>
  }

  changeMode = () => {
    this.state.isSignup ? this.setState({isSignup: false}) : this.setState({isSignup: true});
    if(!this.state.isSignup) {
      this.props.history.push('/signup');
    } else {
      this.props.history.push('/');
    }
  }

  getModeText() {
    if(!this.state.isSignup) {
      return "Change to Signup";
    } else {
      return "Change to Login";
    };
  }

  render() {
    return (<div className="login-container">
    <nav className="pagetitle-oneline navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
    <div className="container">
      <div className="collapse navbar-collapse">
      </div>
    </div>
  </nav>
  <div className="page-header header-filter login-background">
    <div className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6 ml-auto mr-auto">
          <div className="card card-login">
                <form className="form" onSubmit={this.handleFormSubmit}>
                  <div className="card-header card-header-primary text-center">
                    {this.getTitle()}
                  </div>
                  <div className="card-body">

                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">face</i>
                        </span>
                      </div>

                      <input type="text" name="username" value={this.state.username} autoComplete="username"
                        onChange={this.handleChange} className="form-control" placeholder="Username ..." ></input>
                    </div>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input type="password" name="password" value={this.state.password} autoComplete="current-password"
                        onChange={this.handleChange} className="form-control" placeholder="Password..." />
                    </div>
                  </div>

                  <div className="login-button">
                    {this.hasUser()}
                  </div>
            </form>
            <div className="text-center">
                        
                  <div className="signup">
                        Don't have a user <button onClick={this.changeMode} className="signup-btn">{this.getModeText()}</button>
                  </div>
                        
                  <div className="error-message">
                    {this.state.errorMessage}
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer className="footer">
      <div className="container">
        <div className="copyright ">
          &copy;
            {new Date().getFullYear()}, made with <i className="material-icons">favorite</i>  by &nbsp;
            <a href="https://www.creative-tim.com/" target="_blank" rel="noreferrer">Creative Tim</a> for a better web.
        </div>
      </div>
    </footer>
  </div>
</div>
)
    }
}
 
export default Login;