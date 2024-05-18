import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>
          Want to learn more about React?
        </h2>
        <p className='text-gray-500 my-2'>
          Checkout these resources with 100 React Projects
        </p>
        <Button
          gradientDuoTone='purpleToPink'
          className='rounded-tl-xl rounded-bl-none'
        >
          <a 
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noreferrer noopener"
          >
          </a>
            100 React Projects
        </Button>
      </div>
      <div className='p-7 flex-1'>
        <img
          src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Call to action"
          className='w-full object-cover'
        />
      </div>
    </div>
  )
}
