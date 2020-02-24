import React, { Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

type ListItemLinkProps = {
  text: string;
  to: string;
  icon: JSX.Element;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ListItemLink: React.FC<ListItemLinkProps> = props => {
  const { text, to, icon, setOpen } = props;
  const navigate = useHistory().push;

  const navigateHandler = () => {
    navigate(to);
    setOpen(false);
  };

  return (
    <ListItem button key={text} onClick={navigateHandler}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default ListItemLink;
