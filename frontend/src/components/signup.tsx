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
import { Signup } from './api';
import { useForm, isEmail, hasLength, matchesField } from '@mantine/form';
import { IconX } from '@tabler/icons-react';
import { useLocalStorage } from '@mantine/hooks';
import { userInfoAtom } from '../App';
import { useAtom } from 'jotai';
import '../css/information.css';

export function SignUP() {
  const [value, setValue] = useLocalStorage({
    key: 'token',
    defaultValue: null,
  });
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [failed, setFail] = useState([false, '']);
  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      confirm: false,
    },
    validate: {
      password: hasLength(
        { min: 6, max: 64 },
        'Name must be 6-64 characters long'
      ),
      email: isEmail('Invalid email'),
      confirmPassword: matchesField('password', 'Passwords are not the same'),
      confirm: (value) => (
        value ? null : 'You must agree to sell your privacy'),
      username: hasLength(
        {min: 3, max: 64},
        'Name must be 3-64 characters long'
      )
    },
    
  }
  );
  console.log(form.values.confirm)

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
            console.log('Hi');
            Signup(
              values['email'],
              values['username'],
              values['password'],
              values['confirmPassword'],
              setFail,
              setValue,
              setUserInfo
            );
            console.log('Hi');
          })}
        >
          <TextInput
            placeholder="Your Username"
            label="Username"
            withAsterisk
            {...form.getInputProps('username')}
          />
          <Space h="md" />
          <TextInput
            placeholder="Your Email-adress"
            label="Email Adress"
            withAsterisk
            {...form.getInputProps('email')}
          />
          <Space h="md" />
          <PasswordInput
            placeholder="Password"
            label="Password"
            description="Password must include at least one letter, number and special character"
            {...form.getInputProps('password')}
            withAsterisk
          />
          <Space h="md" />
          <PasswordInput
            placeholder="Confirm Password"
            label="Confirm Password"
            description="Password must include at least one letter, number and special character"
            {...form.getInputProps('confirmPassword')}
            withAsterisk
          />
          <Space h="md" />
          <Checkbox
            label="I agree to sell my privacy"
            {...form.getInputProps('confirm')}
          />
          <Space h="lg" />
          <Center>
            <Button type="submit">Sign up</Button>
          </Center>
          <Space h="md" />
          <Text
            display="block"
            ta="center"
            td="underline"
            component="a"
            href="./login"
            c={colorScheme === 'dark' ? 'white' : 'gray.6'}
            p="md"
            className={`clickbutton ${colorScheme}`}
            //bg={colorScheme === 'dark' ? 'dark.6' : 'gray.2'}
            style={{
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            Already have an account? then sign in
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
      </Flex>
    </>
  );
}
