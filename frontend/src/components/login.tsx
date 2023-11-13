import {
  Text,
  Box,
  Container,
  TextInput,
  PasswordInput,
  Space,
  Button,
  Center,
  Flex,
  Notification,
  useMantineColorScheme,
  Checkbox,
} from '@mantine/core';
import { useState } from 'react';
import { Login } from './api';
import { useForm, isEmail, hasLength } from '@mantine/form';
import { IconX } from '@tabler/icons-react';
import { useLocalStorage } from '@mantine/hooks';
import { userInfoAtom } from '../App';
import { useAtom } from 'jotai';
import "../css/information.css"

export function SignIn() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [value, setValue] = useLocalStorage({ key: 'token', defaultValue: null });
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)
  const [failed, setFail] = useState([false, '']);
  console.log(failed);
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      password: hasLength(
        { min: 6, max: 64 },
        'Name must be 6-64 characters long'
      )
    },
  });

  return (
    <>
      <Container size="xs" px="xs">
        <Box
          style={{
            backgroundColor: colorScheme === 'dark' ? 'dark.6' : 'gray.2',
            borderRadius: '10px',
          }}
          p="md"
          component="form"
          onSubmit={form.onSubmit((values) => {
            Login(values['username'], values['password'], setFail, setValue, setUserInfo);
          })}
        >
          <TextInput
            placeholder="Your Username"
            label="Username"
            withAsterisk
            {...form.getInputProps('username')}
          />
          <Space h="md" />
          <PasswordInput
            placeholder="Password"
            label="Password"
            description="Password must include at least one letter, number and special character"
            withAsterisk
            {...form.getInputProps('password')}
          />
          <Space h="md" />
          <Center>
            <Button type="submit">Login In</Button>
          </Center>
          <Space h="md" />
          <Text
            display="block"
            ta="center"
            td="underline"
            component="a"
            href="./signup"
            className={`clickbutton ${colorScheme}`}
            c={colorScheme === 'dark' ? 'white' : 'gray.6'}
            p="md"
            style={{
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            Don't have an accont?, then sign up
          </Text>
        </Box>
      </Container>
      <Flex
        style={{
          position: 'absolute',
          bottom: 50,
          right: 50,
        }}
        direction="column"
        gap={10}
      >
        <Notification
          icon={<IconX size="1.5rem" />}
          color="red"
          title="Login failed"
          style={{
            width: 400,
            height: 75,
            display: failed[0] ? 'flex' : 'none',
          }}
          onClose={() => {
            setFail([false, '']);
          }}
        >
          {failed[1]}
        </Notification>
      </Flex>
    </>
  );
}
