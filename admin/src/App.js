import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./screen/Home";
import ViewUsers from "./screen/ViewUsers";
import ViewUser from "./screen/ViewUser";

const Routing = () => {
  const [left, setleft] = useState(false);

  const DrawerWidth = 230;

  const toggleDrawer = () => {
    setleft(false);
  };

  const openDrawer = () => {
    setleft(!left);
  };

  return (
    <Switch>
      <Route exact path="/">
        <Home
          left={left}
          toggleDrawer={toggleDrawer}
          openDrawer={openDrawer}
          DrawerWidth={DrawerWidth}
        />
      </Route>
      <Route path="/ViewUsers">
        <ViewUsers
          left={left}
          toggleDrawer={toggleDrawer}
          openDrawer={openDrawer}
          DrawerWidth={DrawerWidth}
        />
      </Route>
      <Route path="/ViewUser/:_id">
        <ViewUser
          left={left}
          toggleDrawer={toggleDrawer}
          openDrawer={openDrawer}
          DrawerWidth={DrawerWidth}
        />
      </Route>
    </Switch>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </>
  );
}
export default App;
