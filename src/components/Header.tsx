import { NavLink } from "react-router-dom"
import { APP_SLOGAN, APP_TITLE } from "../consts"

const Header = (): JSX.Element => {
  return (
    <header className='fixed top-0 left-0 w-full bg-slate-200'>
      <nav className='p-2'>
        <ul className='flex flex-row gap-3'>
          <li className='font-bold'>
            <NavLink to={'/'}>
              { APP_TITLE }
            </NavLink>
          </li>
          <li className='flex-1 text-right italic'>
            { APP_SLOGAN }...
          </li>
          <li>
            <NavLink to={'/favorites'}>
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
