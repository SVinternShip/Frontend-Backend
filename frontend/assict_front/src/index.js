/*!

=========================================================
* Vision UI Free Chakra - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-chakra
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-chakra/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch, Redirect, BrowserRouter} from "react-router-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    rootElement
);

reportWebVitals();