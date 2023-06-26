import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Home from './components/Home';
import Provider from "./context/Provider"

export class App extends Component {
  render() {
    return (
     <Provider>
  <Home/>
     </Provider>
  
      
    )
  }
}

export default App