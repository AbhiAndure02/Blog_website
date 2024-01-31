import React, { useEffect, useState } from 'react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import {Sidebar} from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserSignOutSuccess } from '../redux/user/userSlice';

export default function DashSideBar() {
    const location = useLocation();
    const dispacth = useDispatch();
    const [tab, setTab] = useState('');
    useEffect(()=>{
      const urlParams= new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
      if(tabFromUrl){
        setTab(tabFromUrl)
      }
    },[location.search])

    const handleSignOut = async () =>{
      try {
          const res = await fetch('/api/user/signout',{
              method:'POST',
          });
          const data = await res.json();
          if(!res.ok){
              console.log(data.message);
          }else{
            dispacth(UserSignOutSuccess());
          }
          
      } catch (error) {
          console.log(error.message)
          
      }
  }
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab==='profile'} icon ={HiUser} label={'User'} labelColor='dark' as = 'div'>
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item onClick ={handleSignOut}  icon ={HiArrowSmRight} className="cursor-pointer">
                    Sign Out
                </Sidebar.Item>
                <Sidebar.Item  icon ={HiUser} >
                    Profile
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
