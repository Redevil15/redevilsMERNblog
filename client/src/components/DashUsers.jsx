import { Button, Modal, ModalBody, Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaCheck, FaTimes } from 'react-icons/fa'

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user)
  const [users, setUsers] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [ userToDelete, setUserToDelete] = useState(null);
  console.log(users)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`)
        const data = await res.json()
        if(res.ok) {
          setUsers(data.users)
          if(data.length < 10) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    if(currentUser.isAdmin) {
      fetchUsers()
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok) {
        setUsers([...users, ...data.users]);
        if(data.posts.length < 10) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteUser = async () => {
    console.log(userToDelete)
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/deleteuser/${userToDelete}/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if(res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userToDelete))
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
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table
            hoverable
            className='shadow-md'
          >
            <Table.Head>
              <Table.HeadCell>
                Date Created
              </Table.HeadCell>
              <Table.HeadCell>
                User Image
              </Table.HeadCell>
              <Table.HeadCell>
                Username
              </Table.HeadCell>
              <Table.HeadCell>
                Email
              </Table.HeadCell>
              <Table.HeadCell>
                Admin
              </Table.HeadCell>
              <Table.HeadCell>
                <span>Delete</span>
              </Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body
                className='divide-y'
              >
                <Table.Row
                  className='bg-white dark:border-gray-700 dark:bg-gray-800'
                >
                  <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link
                      //to={`/user/${_}`}
                    >
                      <img
                        src={user.profilePictureL}
                        alt="user profile picture"
                        className='w-20 h-10 object-cover bg-gray-500 rounded'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      //to={`/post/${post.slug}`}
                      className='font-md text-gray-900 dark:text-white'
                    >
                      {user.username}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (

                      <FaCheck
                        color="green"
                      />
                    ): (
                      <FaTimes
                        color="red"
                      />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                      <span
                        className='font-md text-red-500 hover:underline cursor-pointer'
                        onClick={() => {
                          setShowModal(true)
                          setUserToDelete(user._id)
                        }}
                      >
                        Delete
                      </span>
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
              <Button color='failure' onClick={handleDeleteUser}>
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
