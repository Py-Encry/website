import {
  Container,
  Title,
  Box,
  Flex,
  Text,
  useMantineColorScheme,
  Space,
  Image,
  FileButton,
  ThemeIcon,
  Button
} from '@mantine/core';
import {IconPhotoFilled} from '@tabler/icons-react'
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import ChangeEmail from './changeEmail';
import ChangePassword from './changePassword';
import { userInfoAtom } from '../../App';
import { useAtom } from 'jotai';
import { useState, useRef } from 'react';
import { UploadProfilePicture, GetProfilePicture } from '../api';
import { useLocalStorage } from '@mantine/hooks';
import "../../css/profilePage.css"

export default function Profile() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [file, setFile] = useState<File | null>(null);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [value, setValue] = useLocalStorage({ key: 'token', defaultValue: null });
  //GetProfilePicture(value ?? "", userInfo)
  return (
    <Container w="100%">
      <Title order={1} ta="center">
        Profile
      </Title>
      <Space h="lg"/>
      <Box
        bg={colorScheme === 'dark' ? 'dark.5' : 'gray.2'}
        style={{ borderRadius: '10px' }}
        p={10}
      >
        <Flex align="center">
        <Box w="45%">
        <Space h="md"/>
        <Title order={3} m={10}>
          Username
        </Title>
        <Box w="85%" m={10} p={10} bg={colorScheme === 'dark' ? 'dark.6' : 'gray.3'} style={{ borderRadius: '5px' }}>
          <Text>{userInfo["username"]}</Text>
        </Box>
        <Space h="md"/>
        <Title order={3} m={10}>
          Email
        </Title>
        <Box w="85%" m={10} p={10} bg={colorScheme === 'dark' ? 'dark.6' : 'gray.3'} style={{ borderRadius: '5px' }}>
          <Text>{userInfo["email"]}</Text>
        </Box>
        </Box>
        <Box w="55%">
            <Flex style={{position: "relative"}} align="center">
                <Box w="58%">
                <Title order={3}>Profile Picture</Title>
                <Text w="95%">You can upload a new picture by either dragging and placing a picture over the current one or click the button below. Do you want to delete your current one? <a>click this link.</a></Text>
                <Space h="md"/>
                <FileButton onChange={(image) => {UploadProfilePicture(image, value ?? "", setUserInfo, userInfo)}} accept="image/png,image/jpeg">{(props) => <Button w="95%" my={10} {...props}>Upload new Photo</Button>}</FileButton>
                </Box>
                <ThemeIcon radius="md" style={{position: "absolute", right: "1px", bottom: "200px", zIndex: "4"}}>
                <IconPhotoFilled/>
                </ThemeIcon >
                <Dropzone onDrop={(image) => {UploadProfilePicture(image[0], value ?? "", setUserInfo, userInfo)}}  w={200} h={200} p={0} m={0}>
                  <Image style={{ pointerEvents: 'all' }} className='profile' w={200} h={200} radius={10} src={userInfo['image']}></Image>
            </Dropzone>
            </Flex>
        </Box>
        </Flex>
      </Box>
      <Space h="xl"/>
      <ChangeEmail/>
      <Space h="xl"/>
      <ChangePassword/>
    </Container>
  );
}
