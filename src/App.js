import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {ChooseTheme} from "./ChooseTheme";

export class App extends React.Component {
  render() {
    return (
        <React.Fragment>
          <ChooseTheme/>
        </React.Fragment>
    );
  }
}


export default App;
