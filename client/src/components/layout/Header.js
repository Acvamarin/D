import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logout } from '../../actions/auth'

class Header extends React.Component {

  onLogout = (e) => {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth
    let links
    if (isAuthenticated) {
      links = (
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fa fa-user"></i>
            Мой профиль
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={'/user/' + user.id}>Мой страница</Link>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item"
              href="#"
              onClick={this.onLogout}
            >Выйти</a>
          </div>
        </li>
      )
    } else {
      links = (
        <React.Fragment>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/login">
              <i className="fa fa-sign-in"></i>
              Вход
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/register">
              <i className="fa fa-user-plus"></i>
              Регистрация
            </Link>
          </li>
        </React.Fragment>
      );
    }
    return (
      <nav className="navbar navbar-icon-top navbar-expand-lg navbar navbar-dark bg-primary ">
        <div className="container">
          <Link className="navbar-brand text-white " to="/">
          <i className="fa fa-server"></i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  <i className="fa fa-university"></i>
                  Все посты
                </Link>
              </li>
              {isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/feed">
                    <i className="fa fa-users"></i>
                    Подписки
                  </Link>
                </li>
                


              )}
                {isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/find">
                    <i className="fa fa-search"></i>
                    Поиск
                  </Link>
                </li>
                


              )}
            </ul>
            <ul className="navbar-nav">{links}</ul>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ auth: state.auth })

export default connect(mapStateToProps, { logout })(Header)
