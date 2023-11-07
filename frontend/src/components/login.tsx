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
import { login } from './api';
import { useForm, isEmail, hasLength } from '@mantine/form';
import { IconX } from '@tabler/icons-react';

export function SignIn() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [failed, setFail] = useState([false, '']);
  console.log(failed);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      password: hasLength(
        { min: 6, max: 64 },
        'Name must be 6-64 characters long'
      ),
      email: isEmail('Invalid email'),
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
            login(values['email'], values['password'], setFail);
          })}
        >
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
            bg={colorScheme === 'dark' ? 'dark.6' : 'gray.2'}
            c={colorScheme === 'dark' ? 'white' : 'gray.6'}
            p="md"
            style={{
              borderRadius: '10px',
              cursor: 'pointer',

              '&:hover': {
                backgroundColor: colorScheme === 'dark' ? 'dark.5' : 'gray.1',
              },
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
