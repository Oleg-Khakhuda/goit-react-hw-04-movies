import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={s.nav}>
      <ul className={s.navList}>
        <li className={s.navListItem}>
          <NavLink
            exact
            to="/"
            className={s.Link}
            activeClassName={s.activeNavLink}
          >
            Home
          </NavLink>
        </li>
        <li className={s.navListItem}>
          <NavLink
            to="/movies"
            className={s.Link}
            activeClassName={s.activeNavLink}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
