import { Container, Flex, Title, Image, Text, Button, Space, Highlight } from "@mantine/core";
import {
    IconHome2,
    IconPhoto,
    IconBrandGithub,
    IconInfoCircle,
    IconStar,
    IconPlayerPlay,
  } from '@tabler/icons-react';
  import classes from './HeroBullets.module.css';

export default function Cryptate() {
  return (
    <Container fluid>
      <Flex>
        <Container style={{ width: "50%" }}>
          <Title>
            Able to <span className={classes.highlight}>securley</span> hide information right infront of someones eyes
          </Title>
          <Text>
            Pyenc is a fast, secure way to hide information in plain sight. It
            does this by using an advanced encrypt method that can insert
            information in pictures without being able to see that the picture
            has been modified.
          </Text>
          <Space h="md" />
          <Flex gap={20} >
            <Button radius="md" component='a' fullWidth rightSection={<IconPlayerPlay />} variant="gradient"
      gradient={{ from: 'violet', to: 'teal', deg: 45 }} >Online Encrypt/Decrypt</Button>
            <Button radius="md" component='a' fullWidth rightSection={<IconBrandGithub />} variant="gradient"
      gradient={{ from: 'teal', to: 'gray', deg: 99 }}>Github</Button>
          </Flex>
        </Container>
        <Container style={{ width: "50%" }}>
          <Image />
        </Container>
      </Flex>
    </Container>
  );
}
