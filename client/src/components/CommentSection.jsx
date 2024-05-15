import { Button, TextInput, Textarea } from 'flowbite-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function CommentSection({
  postId
}) {
  const { currentUser } = useSelector(state => state.user);
  const [comment, setComment] = useState('')

  const handleSubmit  = async (e) => {
    
  }
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-100 text-sm'>
          <p>Signed in as:</p>
          <img
            src={currentUser.profilePictureL}
            alt={currentUser.username}
            className='w-5 h-5 rounded-full object-cover'
          />
          <Link
            to={`/dashboard?tab=profile`}
            className='text-cyan-600 hover:underline text-xm'
          >
            @{currentUser.username}
          </Link>
        </div>
      ): (
        <div className='text-sm text-teal-500 my-5 flex fap-1'>
          You must be signed in to comment.
          <Link
            to='/signin'
            className='text-blue-500 hover:underline'
          >
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form 
          className='rounded-md p-3 border border-teal-500'
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder='Write a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>{200 - comment.length}</p>
            <Button
              type='submit'
              outline
              gradientDuoTone='purpleToBlue'
            >
              Post Comment
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
