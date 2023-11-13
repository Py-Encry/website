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

export default function Profile() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [file, setFile] = useState<File | null>(null);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
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
                <FileButton onChange={setFile} accept="image/png,image/jpeg">{(props) => <Button w="95%" my={10} {...props}>Upload new Photo</Button>}</FileButton>
                </Box>
                <ThemeIcon radius="md" style={{position: "absolute", right: "1px", bottom: "200px", zIndex: "4"}}>
                <IconPhotoFilled/>
                </ThemeIcon >
                <Dropzone onDrop={() => {console.log("hi")}}  w={200} h={200} p={0} m={0}>
            <Image w={200} h={200} radius={10} src="https://cdn.discordapp.com/attachments/1078720261517480048/1104168977212649502/Jakob_Widebrant_my_beloved.gif"></Image>
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
