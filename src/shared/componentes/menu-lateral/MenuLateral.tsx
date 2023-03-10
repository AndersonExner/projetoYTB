
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, Drawer, Icon, List, useMediaQuery, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import React from 'react';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface IListItemLinkProps {
  label: string;
  icon: string;
  to: string;
  onClick: (() => void) | undefined;
}

const ListItemLink : React.FC <IListItemLinkProps> = ({label, icon, to, onClick}) => {

  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false})
  
  const handleClick = () => {
    navigate(to);
    onClick?.();
  }

  return (

    <ListItemButton onClick={handleClick} selected={!!match}>
      <ListItemIcon >
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />  
    </ListItemButton>

  )
}

interface IMenuLateral {
  children: React.ReactNode;
}

export const MenuLateral : React.FC <IMenuLateral> = ({ children }) => {

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm')); 

  const {isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext()
  const {toggleTheme} = useAppThemeContext()

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} display="flex" flexDirection="column" height="100%">

          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center" >  
            <Avatar sx={{ height:theme.spacing(12), width:theme.spacing(12) }} />
          </Box>

          <Divider/>

          <Box flex={1}>
            <List component="nav">
            {drawerOptions.map(drawerOptions =>(
              <ListItemLink 
              key={drawerOptions.path}
              icon={drawerOptions.icon}
              to={drawerOptions.path}
              label={drawerOptions.label}
              onClick={smDown ? toggleDrawerOpen : undefined}
            />
            ))}
            </List>
          </Box>

          <Box>
            <List component="nav">
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon >
                <Icon>dark_mode</Icon>
              </ListItemIcon>
              <ListItemText primary="Alternar Tema" />  
              </ListItemButton>
            </List>
          </Box>


        </Box>      
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};