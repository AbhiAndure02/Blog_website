
import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react/'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon, FaSun} from "react-icons/fa"
import {useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { UserSignOutSuccess } from '../redux/user/userSlice';


export default function Header() {
  const path = useLocation().pathname;
  const dispacth = useDispatch();
  const {currentUser} = useSelector((state) => state.user)
  const {theme} = useSelector((state => state.theme) )

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
   <Navbar className='border-b-2'>
    <Link to='/' className='selft-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-400 to-pink-700 rounded-lg text-white'>Blog</span>
      Here
    </Link>
    <form>
   
    <TextInput 
      type='text'
      placeholder='Searh...'
      rightIcon={AiOutlineSearch }
      className='hidden lg:inline'
      />
  
    </form>
    <Button className='w-12 h-10 lg:hidden' color='gray' pill>
      <AiOutlineSearch />
    </Button>
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
