import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/auth/auth-service'

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
            <li className="navigation-item"><Link to="/signup">Register</Link></li>
            <li className="navigation-item"><Link to="/">Login</Link></li>
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


    render() {
        return (
            <nav className="navbar">
                {this.props.userIsLoggedIn && `Hello ${this.props.userData.username}`}
                <ul className="navigation">
                    <li className="navigation-item"><Link to="/habits">List of Habits</Link></li>
                    {this.props.userIsLoggedIn
                        ? this.renderLogoutLink()
                        : this.renderAuthLinks()
                    }
                </ul>
            </nav>
        )
    }

}




export default Navbar;