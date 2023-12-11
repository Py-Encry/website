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
import { ChangePasswordAPI } from '../api';
import { userInfoAtom } from '../../App';
import { useAtom } from 'jotai';

export default function ChangePassword() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [value, setValue] = useLocalStorage({ key: 'token', defaultValue: null });
  const form = useForm({
    initialValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      currentPassword: hasLength(
        { min: 6, max: 64 },
        'Password must be 6-64 characters long'
      ),
      password: hasLength(
        { min: 6, max: 64 },
        'Password must be 6-64 characters long'
      ),
      confirmPassword: matchesField('password', 'Passwords are not the same'),
    },
  });
  return (
    <>
      <Title order={1} ta="center">
        Change Password
      </Title>
      <Space h="lg" />
      <Box
        bg={colorScheme === 'dark' ? 'dark.5' : 'gray.2'}
        style={{ borderRadius: '10px' }}
        p={10}
        component="form"
        onSubmit={form.onSubmit((values) => {
          ChangePasswordAPI(values['currentPassword'], value ?? "", values['password'], userInfo['username'] ?? "", setUserInfo, setValue);
        })}
      >
        <PasswordInput
          m={10}
          placeholder="Current Password"
          label="Your Current Password"
          withAsterisk
          {...form.getInputProps('currentPassword')}
        />
        <Space h="sx" />
        <PasswordInput
          m={10}
          placeholder="New Password"
          label="New Password"
          description="Password must include at least one letter, number and special character"
          withAsterisk
          {...form.getInputProps('password')}
        />
        <Space h="sx" />
        <PasswordInput
          m={10}
          placeholder="Confirm Password"
          label="Confirm New Password"
          withAsterisk
          {...form.getInputProps('confirmPassword')}
        />
        <Divider />
        <Text m={10}>
          You can change your password using the form above.{' '}
          <Text span c="orange">
            You will afterwards be signed out on all platforms and will have to
            sign in again.
          </Text>
        </Text>
        <Center>
          <Button type="submit" m={10}>
            Change Password
          </Button>
        </Center>
      </Box>
    </>
  );
}
