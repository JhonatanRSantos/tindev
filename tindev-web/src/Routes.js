import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import Dev from "./pages/dev/Dev";

export default function Routes () {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/dev/:id" component={Dev} />
        </BrowserRouter>
    );
}