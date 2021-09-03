import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/auth/auth-service';
import './../navbar/Navbar.css';

class Navbar extends React.Component {

    logoutUser = () => {
        authService.logout()
          .then(() => {
            this.props.getUser(null, false);
          });
      };

    renderAuthLinks() {
        return (
          <>
            <li className="navigation-item"><Link to="/">Login / Signup</Link></li>         
          </>
        );
      }


    renderLogoutLink() {
        return (
          <li className="navigation-item">
            <Link to="/">
              <button onClick={() => this.logoutUser()}>Logout</button>
            </Link>
          </li>
        )
    }

    renderCreateHabit() {
      return (
        <>
          <li className="navigation-item"><Link to="/createHabit">Create Habit</Link></li>
        </>
      );
    }

    renderCalendar() {
      return (
        <>
          <li className="navigation-item"><Link to="/calendar">Calendar</Link></li>
        </>
      );
    }

    render() {
        return (
            <nav className="navbar">
                <div className="navbar-container">
                  {this.props.userIsLoggedIn && <div className="username">Hello {this.props.userData.username}</div>}
                  <ul className="navigation">
                      {this.props.userIsLoggedIn
                          ? this.renderCalendar() : "" }
                        {this.props.userIsLoggedIn
                          ? this.renderCreateHabit(): ""}
                      {this.props.userIsLoggedIn
                          ? this.renderLogoutLink()
                          : this.renderAuthLinks()
                      }
                  </ul>
                </div>
            </nav>
        )
    }

}




export default Navbar;