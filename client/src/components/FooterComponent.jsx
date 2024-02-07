import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsInstagram, BsTwitterX, BsGithub, BsImage} from 'react-icons/bs'
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
          href='#'
          >
           discord
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
        <Footer.Icon href='#' fontSize={10} icon={BsFacebook} />
        <Footer.Icon href='#' fontSize={10} icon={BsInstagram} />
        <Footer.Icon href='#' fontSize={10} icon={BsTwitterX} />
        <Footer.Icon href='#' fontSize={10} icon={BsGithub} />
      </div>
    </div>
   </div>
   </Footer>
  )
}
