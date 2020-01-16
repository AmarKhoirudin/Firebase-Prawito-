import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";
import { Provider } from "react-redux";
import { storeRedux } from "../../../Config/Redux";
import Chat from "../Chat";

function App() {
  return (
    <Provider store={storeRedux}>
      <Router>
        <div>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {/* <Route path="/chat/:id" component={Chat} /> */}
          <Route path="/chat" component={Chat} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
