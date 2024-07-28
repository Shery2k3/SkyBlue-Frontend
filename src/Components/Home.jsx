import React from 'react'
import { useAuth } from '../Context/User/UserContextProvider'

const Home = () => {
  const [auth,setAuth] = useAuth()
  return (
    <div>
      <div>
        Home
      </div>
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </div>
  )
}

export default Home