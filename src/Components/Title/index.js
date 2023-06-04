import React from 'react';
import './title.css';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/Auth';
import {GiExitDoor} from 'react-icons/gi'

export default function Title({children,name}) {
  const {signOut}=useContext(AuthContext)
  return (
    <div className='title'>
      {children}
      <span>{name}</span>
      <button className='btn-logout' onClick={()=>signOut()}>Logout <GiExitDoor size={20}/></button>
    </div>
  )
}
