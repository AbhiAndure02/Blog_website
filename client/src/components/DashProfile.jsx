import { TextInput, Button, Alert, Modal, ModalBody } from 'flowbite-react'
import React, { useEffect, useRef } from 'react'
import {useSelector} from 'react-redux'

import { useState } from 'react'
import {getDownloadURL, getStorage, ref,  uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart,
      updateSuccess,
      updateFailure,
      deleteUserStart,
      deleteUserfailure,
      deleteUsersuccess,
      UserSignOutSuccess

     } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import {HiOutlineExclamationCircle} from "react-icons/hi"




export default function DashProfile() {
    const {currentUser, error, loading} = useSelector((state) => state.user)
    const fileref = useRef();
    const [imgFile, setimgFile] = useState(null);
    const [imgFileUrl, setImgFileUrl] = useState(null);
    const [imgFileProgress, SetimgFileProgress] = useState(null)
    const [imgUploadError, SetimgUploadError] = useState(null)
    const [showModel, setShowModel] = useState(false);
    const [updateUserError, setUpdateUserError] = useState(null)
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const handleImgChange =(e) =>{
        const file=  e.target.files[0];
      if(file){
        setimgFile(file)
        setImgFileUrl(URL.createObjectURL(file))
      }
    }

    useEffect(()=>{
        if(imgFile){
            uploadImage();
        }
    },[imgFile]);

    const uploadImage = async () =>{
        SetimgUploadError(null)
        const storage = getStorage(app)
        const filename = new Date().getTime + imgFile.name;
        const storageRef = ref(storage, filename)
        const uploadTask = uploadBytesResumable(storageRef, imgFile);
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                SetimgFileProgress(progress.toFixed(0))
            },
            (error) =>{
                SetimgUploadError('could not upload file (file must less than 2MB')
                SetimgFileProgress(null);
                setImgFileUrl(null)
                setimgFile(null)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setImgFileUrl(downloadURL)
                    setFormData({ ...formData, profilePicture: downloadURL});
                    })
                })
            }
    const handleChange =(e) =>{
        setFormData({ ...formData, [e.target.id]:e.target.value })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null)
        

        if(Object.keys(formData).length ===0){
            setUpdateUserError('no change made')
            return;
        };
        if(imgFileProgress){
            setUpdateUserError('please wait for imae to upload')
            return;
        }
        try{
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(!res.ok){
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message)

            }else{
                dispatch(updateSuccess(data));
                setUpdateUserSuccess('user profile updated successfully')
            }

        }catch(error){
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message)

        }
    }
    const handleDelete =async() =>{
        setShowModel(false);

        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`,{
                method: 'DELETE',
            });
            const data = await res.json();
            if(!res.ok){
                dispatch(deleteUserfailure(data.message))
              
            }else{
                dispatch(deleteUsersuccess(data))
              
            }
            
        } catch (error) {
            dispatch(deleteUserfailure(error.message))
            
            
        }
        
    }
    const handleSignOut = async () =>{
        try {
            const res = await fetch('/api/user/signout',{
                method:'POST',
            });
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
            }else{
                dispatch(UserSignOutSuccess());
            }

            
        } catch (error) {
            console.log(error.message)
            
        }
    }

  return (
    <div className='mx-w-lg mx-auto w-full'>
       <h1 className='my-7 text-center font-semibold'>Profile</h1>
       
       <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-auto w-[450px]'>
        <input type="file" accept='image/*' onChange={handleImgChange} ref={fileref} hidden/>
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=>fileref.current.click()}>
            {imgFileProgress && (
                <CircularProgressbar value={imgFileProgress || 0} text={`${imgFileProgress}%`}
                strokeWidth={5}
                styles={
                    {
                        root:{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        },
                        path:{
                            stroke:`rgba(62,150,199), ${imgFileProgress /100}`
                        }
                    }
                } />
            )}
        <img src={imgFileUrl || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full border-8 object-cover border-gray-300 ${imgFileProgress && imgFileProgress<100 && 'opacity-60'}`} />
        </div>
        {imgUploadError &&  <Alert color='failure'>{imgUploadError} </Alert> }
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}  onChange={handleChange}/>
        <TextInput type='eamil' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
            Update
        </Button>
       </form>
       <div className='text-red-500 flex justify-between p-3 mt-5 mb-5'>
        <span className='cursor-pointer md:ml-32 '
        onClick={()=>setShowModel(true)}>Delete Account</span>
        <span onClick={handleSignOut} className='cursor-pointer md:mr-24'>Sign Out</span>
       </div>

       {updateUserSuccess &&(
        <Alert color='success' className='mt-5'>
            {updateUserSuccess}
        </Alert>
       )}

        {updateUserError &&(
        <Alert color='failure' className='mt-5'>
            {updateUserError}
        </Alert>
       )}

        {error &&(
        <Alert color='failure'  className='mt-5'>
            {error}
        </Alert>
       )}




       <Modal show ={showModel} onClose={()=>setShowModel(false)} popup size='sm'>
        <Modal.Header />
        <ModalBody >
            <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                <h2 className='mb-5 text-lg text-gray-500 dark:text-gray-200'>
                    Are you sure you  want delete your account?
                </h2>
                <div className="flex justify-between">
                <Button color='failure' onClick={handleDelete}>Delete</Button>
                <Button onClick={()=>setShowModel(false)}>cancel</Button>
                </div>
            </div>
        </ModalBody>
       </Modal>
    </div>
  )
}
