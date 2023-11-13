import {
  Container,
  NavLink,
  Badge,
  Stack,
  rem,
  Avatar,
  Flex,
  Title,
  ActionIcon,
  Divider,
  Text,
  Button,
  Box,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconHome2,
  IconPhoto,
  IconBrandGithub,
  IconInfoCircle,
  IconStar,
  IconLogout2,
} from '@tabler/icons-react';
import { useState } from 'react';
import { userInfoAtom } from '../App';
import { useAtom } from 'jotai';
import { useLocalStorage } from '@mantine/hooks';
import '../css/profile.css';

export default function Navbar() {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [value, setValue] = useLocalStorage({
    key: 'token',
    defaultValue: null,
  });
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const login = () => {
    if (userInfo['username']) {
      return (
        <Container
          h={70}
          w="100%"
          m={0}
          p={0}
          bg="var(--mantine-color-blue-light)"
          style={{ borderRadius: rem(10) }}
        >
          <Flex justify="center" align="center" h="100%" w="100%">
            <Box
              w="75%"
              component="a"
              href="/profile"
              className={`profile ${colorScheme}`}
            >
              <Flex p={5} justify="space" gap="xl" align="center">
                <Avatar
                  size="lg"
                  variant="filled"
                  radius="md"
                  style={{ left: rem(2) }}
                  src="https://cdn.discordapp.com/attachments/1078720261517480048/1104168977212649502/Jakob_Widebrant_my_beloved.gif"
                ></Avatar>
                <Title w={60} order={3}>
                  {userInfo['username']}
                </Title>
              </Flex>
            </Box>
            <Divider orientation="vertical" w="0.05%"/>
            <Flex justify="center" align="center" w="25%" h="100%">
              <ActionIcon
                style={{borderRadius: "0px 10px 10px 0px"}}
                variant="subtle"
                color="red"
                w="100%"
                h="100%"
                onClick={() => {
                  setUserInfo({ username: null, email: null });
                  setValue(null);
                  window.location.href = "/";
                }}
              >
                <IconLogout2 style={{ right: rem(9) }} size="2rem" />
              </ActionIcon>
            </Flex>
          </Flex>
        </Container>
      );
    } else {
      return (
        <Stack>
          <Button variant="light" component="a" href="/login">
            Sign In
          </Button>
          <Button component="a" href="/signup">
            Sign Up
          </Button>
        </Stack>
      );
    }
  };

  return (
    <Stack justify="space-between" h={1000}>
      <Stack gap="md" align="stretch">
        <NavLink
          label="Home"
          leftSection={<IconHome2 />}
          variant="subtle"
          color="green"
          component="a"
          href="/"
          active={true}
          style={{ borderRadius: rem(8) }}
        />
        <NavLink
          label="Cryptography"
          leftSection={<IconPhoto />}
          variant="subtle"
          color="teal"
          active={true}
          component="a"
          href="/cryptate"
          style={{ borderRadius: rem(8) }}
        />
        <NavLink
          label="About"
          leftSection={<IconInfoCircle />}
          variant="subtle"
          color="cyan"
          component="a"
          href="/about"
          active={true}
          style={{ borderRadius: rem(8) }}
        />
        <NavLink
          label="Github"
          leftSection={<IconBrandGithub />}
          variant="subtle"
          color="grey"
          active={true}
          component="a"
          style={{ borderRadius: rem(8) }}
          href="https://github.com/Py-Encry/py-encry"
        />
        <NavLink
          label="API"
          leftSection={<IconStar />}
          variant="subtle"
          color="pink"
          active={true}
          component="a"
          href="/api"
          style={{ borderRadius: rem(8) }}
        />
      </Stack>
      {login()}
    </Stack>
  );
}
