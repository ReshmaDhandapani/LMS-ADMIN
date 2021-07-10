import React, { useEffect, useState } from "react";
import ToolbarComponent from "../components/Toolbar";
import DrawerComponent from "../components/Drawer";
import { useParams } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

function ViewUser(props) {
  const useStyles = makeStyles((theme) => ({
    content: {
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: props.DrawerWidth,
      [theme.breakpoints.up("md")]: {
        marginLeft: props.DrawerWidth,
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
      },
    },
  }));

  const classes = useStyles();
  const { _id } = useParams();
  return (
    <div>
      <ToolbarComponent
        openDrawerHandler={props.openDrawer}
        DrawerWidth={props.DrawerWidth}
      />
      <DrawerComponent
        left={props.left}
        toggleDrawerHandler={props.toggleDrawer}
        DrawerWidth={props.DrawerWidth}
      />

      <main className={clsx(classes.content)}>{_id}</main>
    </div>
  );
}

export default ViewUser;
