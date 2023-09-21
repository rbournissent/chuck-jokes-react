import { NavLink } from "react-router-dom"
import { IconHeart } from '@tabler/icons-react'
import { APP_SLOGAN, APP_TITLE } from "../consts"
import { useJokesContext } from "../context/JokesContext"

const Header = (): JSX.Element => {
  const { favorites } = useJokesContext()

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
            <NavLink to={'/favorites'}
              className='relative group'>
              <IconHeart />
              { favorites.length &&
                <span className='absolute bottom-0 right-0 text-[10px]/[16px] bg-red-600 w-4 h-4 text-center rounded-md text-white'>
                  { favorites.length }
                </span> }
                <span className='opacity-0 transition-opacity absolute top-full right-0 mt-2 rounded-md bg-slate-800 text-white p-2 whitespace-nowrap group-hover:opacity-100 pointer-events-none'>
                  My Favorites
                </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
