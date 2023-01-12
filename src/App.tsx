import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Auth from './components/Auth'
import MainPage from './components/MainPage'
import styles from './App.module.css'

const App: React.FC = () => {
  return <div></div>
}

export default App
