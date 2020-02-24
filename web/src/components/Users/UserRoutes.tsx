import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardActions,
  CardContent
} from "@material-ui/core";
import { Person, PersonAdd } from "@material-ui/icons";

import { addUser, fetchUsers } from "../../services/userService";
import { User } from "../../types/user";
import { RouterProps } from "../MainRouter/MainRouter";

const UserRoutes: React.FC<RouterProps> = props => {
  props.setTitle("Users");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const refreshUsers = async () => {
    const apiUsers = await fetchUsers();
    setUsers(apiUsers);
  };

  const addAndRefresh = async () => {
    await addUser({ username });
    await refreshUsers();
    setUsername("");
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <TextField
            id="username"
            label="Username"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value)
            }
            value={username}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<PersonAdd />}
            onClick={addAndRefresh}
          >
            Add user
          </Button>
        </CardActions>
      </Card>
      <List>
        {users.map((user: User) => (
          <ListItem key={user.username}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>{user.username}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default UserRoutes;
