import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from '@apollo/client'
import { Grid } from '@material-ui/core'
import ExitToApp from '@material-ui/icons/ExitToApp'
import { UPDATE_PROFILE, GET_PROFILES, GET_MYPROFILE } from '../queries'
import styles from './MainPage.module.css'

const MainPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: dataMyProfile, error: errorMyProfile } = useQuery(
    GET_MYPROFILE,
    {
      fetchPolicy: 'cache-and-network',
    }
  )
  const { data: dataProfiles, error: errorProfiles } = useQuery(GET_PROFILES, {
    fetchPolicy: 'cache-and-network',
  })
  const myFollowings = dataMyProfile?.profile.followings.edges.map(
    (node: any) => node.id
  )
  const [updateProfile] = useMutation(UPDATE_PROFILE)

  return (
    <div className={styles.mainPage__root}>
      {(errorMyProfile || errorProfiles) && (
        <h3>
          {errorProfiles!.message}/{errorMyProfile!.message}
        </h3>
      )}
      <ExitToApp
        className={styles.mainPage__out}
        onClick={() => {
          localStorage.removeItem('token')
          navigate('/')
        }}
      />
    </div>
  )
}

export default MainPage
