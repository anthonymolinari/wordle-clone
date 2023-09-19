import { Fragment } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const TopBanner = () => {
    return (
        <Fragment>
        <Box sx={{
            display: 'flex',
            flexGrow: 1,
        }}>
            <AppBar position='static' color='grey' sx={{ textAlign: 'center' }} >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 13, fontWeight: 'bold' }}>
                        WORD-GUESS
                    </Typography>
                    <IconButton
                        size="medium"
                        edge="end"
                        color="inherit"
                        aria-label="stats"
                        sx={{ mr: 0 , ml: 4 }}
                    >
                        <LeaderboardIcon />
                    </IconButton>
                    <IconButton
                        size="medium"
                        edge="end"
                        color="inherit"
                        aria-label="stats"
                        sx={{ mr: 0 }}
                    >
                        <SettingsIcon />
                    </IconButton>
                    <IconButton
                        size="medium"
                        edge="end"
                        color="inherit"
                        aria-label="stats"
                        sx={{ mr: 0 }}
                    >
                        <HelpOutlineIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>    
        </Box>
        </Fragment>
    )
}

export default TopBanner;
