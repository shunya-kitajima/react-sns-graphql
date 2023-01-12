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
      <Grid container>
        <Grid item xs>
          {dataMyProfile?.profile.userProf.username}
        </Grid>
        <Grid item xs>
          <span className={styles.mainPage__title}>Follow system</span>
        </Grid>
        <Grid item xs>
          <ExitToApp
            className={styles.mainPage__out}
            onClick={() => {
              localStorage.removeItem('token')
              navigate('/')
            }}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}>
          <h3>Following</h3>
          <ul className={styles.mainPage__list}>
            {dataMyProfile?.profile.followings.edges.map((node: any) => (
              <li className={styles.mainPage__item} key={node.id}>
                {node.username}
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={4}>
          <h3>ProfileList</h3>
          <ul className={styles.mainPage__list}>
            {dataProfiles.allProfiles.edges.map(
              (node: any) =>
                node.id !== dataMyProfile?.profile.id && (
                  <li className={styles.mainPage__item} key={node.id}>
                    {node.userProf.username}
                    <button
                      onClick={async () => {
                        if (myFollowings?.includes(node.userProf.id)) {
                          await updateProfile({
                            variables: {
                              id: dataMyProfile.profile.id,
                              followings: myFollowings.filter(
                                (followingId: any) =>
                                  followingId !== node.userProf.id
                              ),
                            },
                          })
                        } else {
                          await updateProfile({
                            variables: {
                              id: dataMyProfile.profile.id,
                              followings: [...myFollowings, node.userProf.id],
                            },
                          })
                        }
                      }}
                    >
                      {myFollowings?.includes(node.userProf.id)
                        ? 'unfollow'
                        : 'follow'}
                    </button>
                  </li>
                )
            )}
          </ul>
        </Grid>
        <Grid item xs={4}>
          <h3>Followers</h3>
          <ul className={styles.mainPage__list}>
            {dataMyProfile?.profile.userProf.profilesFollowings.edges.map(
              (node: any) => (
                <li className={styles.mainPage__item} key={node.id}>
                  {node.userProf.username}
                </li>
              )
            )}
          </ul>
        </Grid>
      </Grid>
    </div>
  )
}

export default MainPage
