import React, { useEffect, useState } from "react";
import http from "../httpService/http";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { Select } from "@material-ui/core";
import { Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ToolbarComponent from "../components/Toolbar";
import DrawerComponent from "../components/Drawer";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

function ViewUsers(props) {
  const [userdata, setuserdata] = useState([]);
  const [filteruser, setfilteruser] = useState([]);
  const history = useHistory();
  useEffect(() => {
    http
      .get(`/auth/Users`)
      .then((res) => {
        console.log(res);
        setfilteruser(res.data.Users);
        setuserdata(res.data.Users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  const [age, setAge] = React.useState("All");

  const handleChange = (event) => {
    setAge(event.target.value);
    switch (event.target.value) {
      case "Facillitator":
        const facillitator_data = userdata.filter((user) => {
          return user.isFacilitator;
        });
        setfilteruser(facillitator_data);
        break;
      case "Job Seeker":
        const Jobseeker_data = userdata.filter((user) => {
          return !user.isFacilitator;
        });
        setfilteruser(Jobseeker_data);
        break;
      case "All":
        setfilteruser(userdata);
        break;
    }
  };
  const handleSetRole = (user_id) => {
    http
      .patch(`/auth/SetRole/${user_id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

      <main className={clsx(classes.content)}>
        <div style={{ marginTop: "5%" }}>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={age}
            onChange={handleChange}
            className={classes.selectEmpty}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Facillitator"}>Facillitator</MenuItem>
            <MenuItem value={"Job Seeker"}>Job Seeker</MenuItem>
          </Select>
          <List dense={true}>
            {filteruser.map((user) => {
              return (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.first_name + " " + user.last_name}
                    secondary={true ? user.email : null}
                  />
                  <ListItemSecondaryAction>
                    <Button
                      disabled={user.isFacilitator}
                      onClick={(e) => handleSetRole(user._id)}
                    >
                      {user.isFacilitator ? " Facilitator " : "Jobseeker"}
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      </main>
    </div>
  );
}

export default ViewUsers;
