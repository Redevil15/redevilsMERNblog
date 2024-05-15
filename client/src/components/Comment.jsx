import React, { useEffect, useState } from 'react'
import moment  from 'moment'

export default function Comment({
  comment
}) {
  const [user, setUser] = useState({});
  console.log(user)

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`)
        const data = await res.json();
        if (res.ok) {
          setUser(data)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    getuser();
  }, [comment])

  return (
    <div className=''>
      <div className='flex items-center gap-2'>
        <img
          src={user.profilePictureL}
          alt={user.username}
          className='w-10 h-10 rounded-full bg-gray-200'
        />
      </div>
      <div className=''>
        <div className=''>
          <span className='font-bold mr-1 text-xs truncate'>
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
      </div>
      <p className='text-gray-100'>{comment.content}</p>
    </div>
  )
}
