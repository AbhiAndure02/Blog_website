import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='min-h-screen mt-20 '>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-4">
        {/*left size */}
        <div className="flex-1">
        <Link to='/' className=' font-bold dark:text-white text-4xl'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-400 to-pink-700 rounded-lg text-white '>Blog</span>
      Here
    </Link>
  <p className='mt-5 text-sm'>This is a Blog website you can sign in here to access all the blog.
  </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className='flex flex-col gap-5 m-3 ' onSubmit={handleSubmit}>
            <div className="m-1">
              <Label value='Your email' />
              <TextInput
              type='email'
              placeholder='Email'
              id='email' 
              onChange={handleChange}
              
               />
            </div>
            <div className="m-1">
              <Label value='Your username' />
              <TextInput
              type='password'
              placeholder='******'
              id='password'
              onChange={handleChange}
              
             
               />
            </div>
            <Button type='submit' disabled={loading}> 
            {
              loading ? (
                <>
                <Spinner size='sm' />
                <span className='pl-3'>loading...</span>
                </>
                
              ) : 'Sign In'
            }
            </Button>
            <OAuth />
          </form>
          <div className="mx-5 flex gap-3 text-sm">
            <span>Don't have an accoun?t</span>
            <Link to ="/signup" className='text-blue-500'>Sign up here</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
