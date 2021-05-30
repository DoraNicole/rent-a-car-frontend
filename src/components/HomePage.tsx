import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Avatar, ListItemAvatar } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CheckIcon from '@material-ui/icons/Check';

export default function HomePage() {
    const [changePage, setChangePage] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
    const [isAppMenuOpen, setIsAppMenuOpen] = useState(false);
    const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
    const [currentPage, setCurrentPage] = useState("All cars list");

    const handleAccountDialogClose = () =>
    {
        setIsAccountDialogOpen(false);
    }

    return (
        <div style={{flexGrow: 1}}>
            <AppBar position='static'>
                <ToolBar>
                    <IconButton edge="start">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow: 1}}>Rent-a-Car</Typography>
                    <Typography variant="h6" style={{flexGrow: 1}}>{currentPage}</Typography>
                    <IconButton edge="start" onClick={()=>setIsAccountDialogOpen(true)}>
                        <AccountCircle/>
                    </IconButton>
                </ToolBar>
            </AppBar>
            <Dialog onClose={()=>setIsAccountDialogOpen(false)} open={isAccountDialogOpen}>
                <DialogTitle>Account</DialogTitle>
                <List>
                    <ListItem button>
                        <ListItemText primary="Log in"/>   
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Sign in"/>   
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem>
                        {!localStorage.getItem("token") && <ListItemAvatar>
                            <Avatar>
                                <WarningIcon/>
                            </Avatar>
                        </ListItemAvatar>}
                        {localStorage.getItem("token") && <ListItemAvatar>
                            <Avatar>
                                <CheckIcon/>
                            </Avatar>
                        </ListItemAvatar>}
                        <ListItemText primary={localStorage.getItem("token") ? "You are logged in" : "You are not logged in"}></ListItemText>
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}