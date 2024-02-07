import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
               java Top 100 DSA Quetion
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resources with 100 Java question of basic topic
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://github.com/AbhiAndure02/100javaquestion" target='_blank' rel='noopener noreferrer'>
                    100 java  Question
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://appmaster.io/cdn-cgi/image/width=1024,quality=83,format=auto/api/_files/hRaLG2N4DVjRZJQzCpN2zJ/download/" />
        </div>
    </div>
  )
}