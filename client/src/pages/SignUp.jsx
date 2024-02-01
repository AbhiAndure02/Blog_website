import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] =useState({})
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading , setLoading] =useState(false);
  const navigate = useNavigate();
  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.id]: e.target.value.trim()})
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!formData.username || !formData.password || !formData.email){
      return setErrorMessage('please fill out the fields. ')
    }
    try{
      setLoading(true);
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body : JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success == false){
        setLoading(false)
        return setErrorMessage(data.message)
      }
      setLoading(false);
      if(res.ok){
        navigate('/signin')
      }
    }catch(error){
      setErrorMessage(error.message)
      setLoading(false)

    }
  }
  return (
    <div className='min-h-screen mt-20 '>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-4">
        {/*left size */}
        <div className="flex-1">
        <Link to='/' className=' font-bold dark:text-white text-4xl'>
        <span className='px-2 py-1 bg-gradient-to-r from-red-400 via-purple-100 to-pink-9000  text-gray-900 rounded-md border-y-2 border-gray-400'>BlogHere</span>
      .com
    </Link>
  <p className='mt-5 text-sm'>This is a Blog website you can sign up here to access all the blog.
  </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className='flex flex-col gap-5 m-3 ' onSubmit={handleSubmit}>
            <div className="m-1">
              <Label value='Your username' />
              <TextInput
              type='text'
              className='border-b-2 border-gray-700 '
              placeholder='Username'
              id='username' 
              onChange={handleChange}
              
               />
            </div>
            <div className="m-1">
              <Label value='Your email' />
              <TextInput
              type='email'
              placeholder='Email'
              className='border-b-2 border-gray-700 '
              id='email' 
              onChange={handleChange}
              
               />
            </div>
            <div className="m-1">
              <Label value='Your Password' />
              <TextInput
              type='password'
              placeholder='Password'
              className='border-b-2 border-gray-700 '
              id='password'
              onChange={handleChange}
              
             
               />
            </div>
            <Button type='submit' disabled={loading} gradientDuoTone="orangeToBlue"> 
            {
              loading ? (
                <>
                <Spinner size='sm' />
                <span className='pl-3'>loading...</span>
                </>
                
              ) : 'Sign Up'
            }
            </Button>
            <OAuth />
          </form>
          <div className="mx-5 flex gap-3 text-sm">
            <span>Have an account?</span>
            <Link to ="/signin" className='text-blue-500'>Sign In here</Link>
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
