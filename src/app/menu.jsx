"use client";

import AppBar from '@mui/material/AppBar';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const pages = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [colorChange, setColorChange] = useState(false);

    const changeNavbarColor = () => {
        if (window.scrollY >= 80) {
            setColorChange(true);
        }
        else {
            setColorChange(false);
        }
    };

    const handleOpenNavMenu = (e) => {
        setAnchorElNav(e.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleSetActive = (e) => {
        let btn = document.querySelectorAll(".nav-item");
        btn.forEach(el => el.classList.remove('active'));

        e.target.classList.add('active');
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNavbarColor);
    }, []);

    return (
        <section className='header-wrapper'  name="Home">
            <AppBar component="nav" className={colorChange ? 'navbar-wrapper sticky' : 'navbar-wrapper'}>
                <Container maxWidth="xl" sx={{py: 1}}>
                    <Toolbar disableGutters>
                        <Link href="/">
                            <Image src={colorChange ? "/bap-black.svg" : "/bap.svg"} width="80" height="80" alt="Bagas Adji Pratama" className='web-logo' />
                        </Link>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }  }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' }
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <ScrollLink
                                            key={page}
                                            className='nav-item'
                                            href={"#"+ page}
                                            to={page}
                                            spy={true}
                                            smooth={true}
                                            offset={-100}
                                            duration={500}
                                            onClick={handleSetActive}
                                        >
                                            {page}
                                        </ScrollLink>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Link href="/">
                            <Image src={colorChange ? "/bap-black.svg" : "/bap.svg"} width="80" height="80" alt="Bagas Adji Pratama" />
                        </Link>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                            {pages.map((page) => (
                                <ScrollLink
                                    key={page}
                                    className='nav-item'
                                    href={"#"+ page}
                                    to={page}
                                    spy={true}
                                    smooth={true}
                                    offset={-100}
                                    style={{ margin: "10px", display: 'block' }}
                                    duration={500}
                                    onClick={handleSetActive}
                                >
                                    {page}
                                </ScrollLink>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </section>
    );
}

export default Navbar;