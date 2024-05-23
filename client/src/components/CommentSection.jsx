import { Alert, Button, TextInput, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';

export default function CommentSection({
  postId
}) {
  const { currentUser } = useSelector(state => state.user);
  const [comment, setComment] = useState('')
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const handleSubmit  = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id
        })
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message)
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments/${postId}`);
        const data = await res.json();
        setComments(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if(!currentUser){
        navigate('/signin');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.map(comment => 
          comment._id === commentId ? {
            ...comment,
            likes: data.likes,
            numberOfLikes: data.likes.length
          }: comment
        ))
      }
    } catch (error) {
      console.log(error);
    }
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
          {commentError && (
            <Alert
              color='failure'
              className='mt-5'        
            />
          )}
          </div>
        </form>
      )}
      {comments.length === 0 ? (
        <p className='text-sm my-5'>
          No comments yet!
        </p>
      ): (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              {comments.length}
            </div>
          </div>
          {comments.map(comment => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              
            />
          ))}
        </>
      )}
    </div>
  )
}
