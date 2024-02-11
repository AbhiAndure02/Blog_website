
import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react/'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon, FaSun} from "react-icons/fa"
import {useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { UserSignOutSuccess } from '../redux/user/userSlice';
import { useState } from 'react';
import { useEffect } from 'react';


export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const {currentUser} = useSelector((state) => state.user)
  const {theme} = useSelector((state => state.theme) )
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  

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
const handleSubmit =(e)=>{
  e.preventDefault();
  const urlParams = new URLSearchParams(location.search);
  urlParams.set('searchTerm', searchTerm);
  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`);
}
  return (
   <Navbar className='border-b-2'>
    <Link to='/' className='selft-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-red-400 via-purple-100 to-pink-9000  text-gray-900 rounded-md border-y-2 border-gray'>BlogHere</span>
      .com
    </Link>
    <form onSubmit={handleSubmit}>
   
    <TextInput 
      type='text'
      placeholder='Searh...'
      rightIcon={AiOutlineSearch }
      className='hidden lg:inline'
      value={searchTerm}
      onChange={(e)=>{
        setSearchTerm(e.target.value)
      }}
      />
  
    </form>
    <Link to='/search'>
    <Button className='w-12 h-10 lg:hidden' color='gray' pill>
      <AiOutlineSearch />
    </Button>
    </Link>
    <div className='flex gap-2 lg:order-2'>
      <Button className='w-12 h-10 hidden  sm:inline' color='gray' pill onClick={()=> dispacth(toggleTheme())}
      >
        {
          theme === 'light' ? <FaSun /> :<FaMoon />
        }
      
      </Button>
      {
        currentUser ? (
          <Dropdown 
          arrowIcon ={false}
            inline
            label={
              <Avatar
              alt='user'
              img={currentUser.profilePicture}
              rounded
              />
            }
            >
              <Dropdown.Header>
                <span className='block text-sm'>
                  @{currentUser.username}
                </span>
                <span className='block text-sm font-medium mt-2 truncate'>
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item>
                  Profile
                </Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ):
        (
          <Link to='/signin'>
          <Button gradientDuoTone="purpleToBlue" >
            Sign In
          </Button>
        </Link>
          
        )
      }
     
      <Navbar.Toggle className='text-center' />
      
    </div>
   
    <Navbar.Collapse> 
        <Navbar.Link active = {path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active = {path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active = {path==='/project'} as={'div'}>
          <Link to='/project'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    
    

   </Navbar>
  )
}
