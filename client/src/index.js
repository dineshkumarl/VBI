import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router
} from "react-router-dom";
import App from './App';
// import {AuthProvider} from './Login/context.js';
// import { ChakraProvider } from "@chakra-ui/react";
// import {AppProgressIndicatorProvider} from './App/Common/AppProgressIndicator';
// import {createStore} from './App/reducer/';
// import reportWebVitals from './reportWebVitals';

// const store = createStore();

ReactDOM.render(
<Router>
  <App />
  </Router>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
