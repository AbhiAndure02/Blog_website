import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsInstagram, BsTwitterX, BsGithub, BsImage, BsLinkedin, BsDiscord} from 'react-icons/bs'
import React from 'react'

export default function FooterComponent() {
  return (
   <Footer container className='border border-t-8 border-teal-900'>
   <div className="w-full max-w-7xl mx-auto">
    <div className="grid w-full justify-between sm:flex ms:grid-cols-1">
      <div className="mt-5">
      <Link to='/' className='selft-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-red-400 via-purple-100 to-pink-9000  text-gray-900 rounded-md border-y-2 border-gray-400'>BlogHere</span>
      .com
    </Link>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
        <div>
          
        <Footer.Title title='About' />
        <Footer.LinkGroup col>
          <Footer.Link
          href='https://abhiandureportfolio.netlify.app'
          target ='_blank'
          rel='noopner noreferel'
          >
            Portfolio
          </Footer.Link>
          <Footer.Link
          href='/about'
          target ='_blank'
          rel='noopner noreferel'
          >
           abhi's blog
          </Footer.Link>
        </Footer.LinkGroup>
        </div>
        <div>
          
        <Footer.Title title='FOOLOW US' />
        <Footer.LinkGroup col>
          <Footer.Link
          href='https://www.github.com/AbhiAndure02'
          target ='_blank'
          rel='noopner noreferel'
          >
           Github
          </Footer.Link>
          <Footer.Link
          target='_blank'
          rel='noopner noreferrer'
          href='https://discord.com/channels/1206130811393540126/1206130811393540129'
          >
           Discord
          </Footer.Link>
        </Footer.LinkGroup>
        </div>

        <div>
        <Footer.Title title='LGAL' />
        <Footer.LinkGroup col>
          <Footer.Link
          href='#'
          >
           privacy policy
          </Footer.Link>
          <Footer.Link
          href='#'
          >
           Terms & condition
          </Footer.Link>
        </Footer.LinkGroup>
        </div>
        

      </div>
    </div>
    <Footer.Divider />
    <div className='w-full sm:flex sm:items-center sm:justify-between'>
      <Footer.Copyright href='#' by="Abhishek's blog" year={new Date().getFullYear()}/>
      <div className='flex gap-6 mt-5 sm:mt-0 sm:justify-center'>
        <Footer.Icon target='_blank' rel='noopener noreferrer' href='https://github.com/AbhiAndure02' fontSize={10} icon={BsGithub} />
        <Footer.Icon className='text-pink-400' href='https://www.instagram.com/i__am__abhi__/' target='_blank' rel='noopener noreferrer' fontSize={10} icon={BsInstagram} />
        <Footer.Icon className='text-blue-800' href='https://www.linkedin.com/in/abhishek-andure-228567228?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' target='_blank' rel='noopener noreferrer' fontSize={10} icon={BsLinkedin} />
        <Footer.Icon className='text-blue-500 cursor-pointer' href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer' fontSize={10} icon={BsFacebook} />
        <Footer.Icon className='text-black' href='https://x.com/aa_abhiandure2?t=uup8Wth05t6ugfLpr7oCzg&s=08' target='_blank' rel='noopener noreferrer' fontSize={10} icon={BsTwitterX} />
        <Footer.Icon className='text-black w-10 h-10 rounded-full' href='https://discord.com/channels/1206130811393540126/1206130811393540129' target='_blank' rel='noopener noreferrer' fontSize={10} icon={BsDiscord}/>

      </div>
    </div>
   </div>
   </Footer>
  )
}
