import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger } from '@mantine/core';
import Header from './components/header';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import Navbar from './components/navbar';
import Cryptate from './components/cryptate';

function App() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar p="md"><Navbar/></AppShell.Navbar>

      <AppShell.Main><Cryptate/></AppShell.Main>
    </AppShell>
  );
}

export default App;
