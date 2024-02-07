import React, { useEffect, useState } from 'react'
import {HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi'
import {Sidebar} from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserSignOutSuccess } from '../redux/user/userSlice';


export default function DashSideBar() {
    const location = useLocation();
    const dispacth = useDispatch();
    const {currentUser} = useSelector(state=>state.user)
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
            <Sidebar.ItemGroup className='flex flex-col gap-2'>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab==='profile'} 
                icon ={HiUser} 
                label={currentUser.isAdmin ? 'Admin' : "User"} labelColor='dark' as = 'div'>
                    Profile
                </Sidebar.Item>
                </Link>{
                    currentUser.isAdmin &&(
                        <Link to='/dashboard?tab=posts'>
                        <Sidebar.Item 
                        active={tab==='posts'} 
                        icon ={HiDocumentText} labelColor='dark' as='div' >
                            Posts
                        </Sidebar.Item>
                        </Link>
                    )
                }

{
                    currentUser.isAdmin &&(
                        <Link to='/dashboard?tab=users'>
                        <Sidebar.Item 
                        active={tab==='users'} 
                        icon ={HiOutlineUserGroup} labelColor='dark' as='div' >
                            Usres
                        </Sidebar.Item>
                        </Link>
                    )
                }
                <Sidebar.Item onClick ={handleSignOut}  icon ={HiArrowSmRight} className="cursor-pointer">
                    Sign Out
                </Sidebar.Item>
                
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
