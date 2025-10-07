import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button  } from '../index'
import { logout } from '../../Store/authSlice'
import service from '../../appwrite/Auth'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth.userData?.$id)
  const handleLogout = async () => {
    try {
       await service.logout(userId);
       dispatch(logout())
       navigate("/")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Button type="submit" onClick={handleLogout}>Logout</Button>
  )
}

export default LogoutBtn