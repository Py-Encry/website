import {
  Box,
  Title,
  Space,
  useMantineColorScheme,
  TextInput,
  PasswordInput,
  Center,
  Button,
  Divider,
  Text,
} from '@mantine/core';
import { useForm, isEmail, hasLength, matchesField } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';
import { ChangeEmailAPI } from '../api';
import { userInfoAtom } from '../../App';
import { useAtom } from 'jotai';

export default function ChangeEmail() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [value, setValue] = useLocalStorage({ key: 'token', defaultValue: null });
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmEmail: '',
    },

    validate: {
      password: hasLength(
        { min: 6, max: 64 },
        'Name must be 6-64 characters long'
      ),
      confirmEmail: matchesField('email', 'Emails are not the same'),
      email: isEmail('Invalid email'),
    },
  });
  return (
    <>
      <Title order={1} ta="center">
        Change Email
      </Title>
      <Space h="lg" />
      <Box
        bg={colorScheme === 'dark' ? 'dark.5' : 'gray.2'}
        style={{ borderRadius: '10px' }}
        p={10}
        component="form"
        onSubmit={form.onSubmit((values) => {
          ChangeEmailAPI(values['email'], value ?? "", values['password'], userInfo['username'] ?? "", setUserInfo, setValue);
        })}
      >
        <TextInput
          m={10}
          placeholder="New Email"
          label="Your New Email"
          withAsterisk
          {...form.getInputProps('email')}
        />
        <Space h="sx" />
        <TextInput
          m={10}
          placeholder="Confirm Email"
          label="Confirm New Email"
          withAsterisk
          {...form.getInputProps('confirmEmail')}
        />
        <Space h="sx" />
        <PasswordInput
          m={10}
          placeholder="Current Password"
          label="Current Password"
          withAsterisk
          {...form.getInputProps('password')}
        />
        <Divider />
        <Text m={10}>
          You can change your email using the form above.{' '}
          <Text span c="orange">
            You will afterwards be signed out on all platforms and will have to
            sign in again.
          </Text>{' '}
          If you have any issues, then it sounds like you have skill issues and
          should gain some skills to solve your problem.
        </Text>
        <Center>
          <Button type="submit" m={10}>
            Change Email
          </Button>
        </Center>
      </Box>
    </>
  );
}
