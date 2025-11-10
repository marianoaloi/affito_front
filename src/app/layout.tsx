"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProviderRedux from "./providerRedux";
import Link from "next/link";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FilterListIcon from "@mui/icons-material/FilterList";
import React, { useState } from "react";
import MenuAffito from "./menu/menu";
import './firebaseConfig'
import { AuthProviderTAG } from "./menu/AuthContext";
import AuthProvider from "./menu/authProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleFilterOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };
  

  return (
    <AuthProviderTAG>
      
    <ProviderRedux>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Affito App
              </Typography>
              <IconButton color="inherit" aria-label="filter" onClick={handleFilterOpen}>
                <FilterListIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem component={Link} href="/" onClick={handleMenuClose}>Home</MenuItem>
                <MenuItem component={Link} href="/table" onClick={handleMenuClose}>Table</MenuItem>
                <MenuItem component={Link} href="/map" onClick={handleMenuClose}>Map</MenuItem>
                <MenuItem component={Link} href="/statistics" onClick={handleMenuClose}>Statistics</MenuItem>
              </Menu>
              <AuthProvider />
              <MenuAffito filterAnchorEl={filterAnchorEl} handleFilterClose={handleFilterClose} />
            </Toolbar>
          </AppBar>
          {children}
        </body>
      </html>
    </ProviderRedux>
    </AuthProviderTAG>
  );
}
