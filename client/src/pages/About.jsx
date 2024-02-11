import React from 'react'
import CallToAction from '../components/CallToAction'

export default function About() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-10 p-20 w-full  px-4">
      <h1 className="p-5 text-3xl lg:text-6xl font-semibold text-center">Welcome to <span className="text-purple-700 font-bold ">BlogHere.com</span> </h1>
      <p className="text-md lg:mx-10 text-gray-500">At BlogHere, we're passionate about exploring the ever-evolving world of technology and its impact on our lives. From the latest gadgets to groundbreaking innovations, we're here to unravel the complexities of the digital age and make technology accessible to everyone. </p>
      <p className='text-gray-500 text-md lg:mx-20'> 
      <span className='text-xl font-semibold mr-2 '>Who are we?</span> We're a team of tech enthusiasts, engineers, and researchers, driven by our curiosity and dedication to demystifying the tech landscape. Whether you're a seasoned tech aficionado or a newbie navigating the digital realm, you'll find valuable insights and resources here to keep you informed and inspired.</p>
      <p className='text-gray-500 text-md lg:mx-20'>Our blog isn't just another tech news site; it's a hub—a hub for all things tech-related. From in-depth product reviews to expert analysis of industry trends, we cover a wide spectrum of topics to help you stay ahead in this fast-paced world.
      But we're not just here to showcase the latest gadgets and gizmos; we want to empower you to harness the power of technology to transform your life. Whether you're looking to enhance your productivity, streamline your workflow, or unleash your creativity, we've got you covered with practical tips, tutorials, and how-to guides.
      And most importantly, we believe in fostering a community where technology enthusiasts can come together to share ideas, ask questions, and inspire one another. So don't be shy—join the conversation, leave a comment, or connect with us on social media. After all, technology is at its best when it's shared and celebrated together.</p>
      <div className="lg:mx-20 p-3 bg-amber-100 dark:bg-slate-700  flex justify-center items-center mx-auto mb-5">
        <CallToAction />
      </div>
      </div>
    </div>
  )
}
