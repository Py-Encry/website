import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger } from "@mantine/core";
import Header from "./components/header";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import '@mantine/code-highlight/styles.css';
import Navbar from "./components/navbar";
import Cryptate from "./components/cryptate";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import {Docs} from "./components/docs";
import {SignIn} from "./components/login";
import {SignUP} from "./components/signup";
import { atomWithStorage  } from 'jotai/utils'
import Profile from "./components/profile/profile";

const userInfoAtom = atomWithStorage('userinfo', {'username': null, 'email': null, 'image': null})

function App() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cryptate" element={<Cryptate />} />
            <Route path="/about" element={<About />} />
            <Route path="/api" element={<Docs />} />
            <Route path="/login" element={<SignIn/>} />
            <Route path="/signup" element={<SignUP/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </BrowserRouter>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
export { userInfoAtom }
