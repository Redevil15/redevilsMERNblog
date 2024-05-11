import { Button, Modal, ModalBody, Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function DashPost() {
  const { currentUser } = useSelector((state) => state.user)
  const [userPosts, setUserPosts] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [ postToDelete, setPostToDelete] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()
        if(res.ok) {
          setUserPosts(data.posts)
          if(data.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    if(currentUser.isAdmin) {
      fetchPosts()
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok) {
        setUserPosts([...userPosts, ...data.posts]);
        if(data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/post/deletepost/${postToDelete}/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if(res.ok) {
        setUserPosts((prev) => prev.filter((post) => post._id !== postToDelete))
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'
    >
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table
            hoverable
            className='shadow-md'
          >
            <Table.Head>
              <Table.HeadCell>
                Date Updated
              </Table.HeadCell>
              <Table.HeadCell>
                Post Image
              </Table.HeadCell>
              <Table.HeadCell>
                Post Title
              </Table.HeadCell>
              <Table.HeadCell>
                Category
              </Table.HeadCell>
              <Table.HeadCell>
                Delete
              </Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body
                className='divide-y'
              >
                <Table.Row
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/post/${post.slug}`}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500 rounded'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/post/${post.slug}`}
                      className='font-md text-gray-900 dark:text-white'
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      className='font-md text-red-500 hover:underline cursor-pointer'
                      onClick={() => {
                        setShowModal(true)
                        setPostToDelete(post._id)
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/update-post/${post._id}`}
                      className='text-teal-500 hover:underline'
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table> 
          {showMore && (
            <button
              className='w-full text-teal-500 self-center text-sm py-7'
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <div>
          <p>You have no posts</p>
        </div>
      )}    

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
