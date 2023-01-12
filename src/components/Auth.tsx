import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { FlipCameraAndroid } from '@material-ui/icons'
import { CREATE_USER, GET_TOKEN, CREATE_PROFILE } from '../queries'
import styles from './Auth.module.css'

const Auth: React.FC = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [createUser] = useMutation(CREATE_USER)
  const [getToken] = useMutation(GET_TOKEN)
  const [createProfile] = useMutation(CREATE_PROFILE)

  return <div>Auth</div>
}

export default Auth
