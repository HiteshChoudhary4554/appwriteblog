import React from 'react'
import { useSelector } from 'react-redux'
import { Container, LogoutBtn } from '../index'
import { NavLink } from 'react-router-dom'

function Header() {
  const authStatus = useSelector(state => state.auth.isAuthenticated)

  const navItems = [
    {
      name:"Home",
      slug:"/",
      active:true
    },
    {
      name:"Login",
      slug:"/signin",
      active:!authStatus
    },
    {
      name:"Signup",
      slug:"/signup",
      active:!authStatus
    },
    {
      name:"AddPost",
      slug:"/add-post",
      active:authStatus
    }
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
      <nav className='flex'>
        <div className='mr-4'>
          <h2>Logo</h2>
        </div>
        <div className=''>
          <ul className='flex ml-auto'>
            {navItems.map((item) => item.active && (
              <li key={item.slug}>
                <NavLink
                  to={item.slug}
                  className={`inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full`}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </div>
      </nav>
      </Container>
    </header>
  )
}

export default Header