import axios from 'axios'
import {useState, useEffect } from 'react'

function Home() {
  // interface User {
  //   _id: string
  //   nickName: string
  // }

  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    axios.get('/api/users')
    .then((response) => {
      setUsers(response.data)
    })
    .catch((error) => {
      console.log('found Error: ', error);
    })
  }, [])


  return (
    <div className='bg-gray-800 text-white'>
      <h1> Users </h1>
      <p> numberOfUsers: {users.length || 0} </p>
      {
        users?.map((user: any, idx: number) => (
          <div key={user._id}>
            <h3>{user.nickName}</h3>
          </div>
        ))
      }
    </div>
  )
}

export default Home
