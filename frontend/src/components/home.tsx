import { Container, Flex, Title, Image, Text, Button, Space, Highlight, Group, ThemeIcon } from "@mantine/core";
import {
    IconHome2,
    IconPhoto,
    IconBrandGithub,
    IconInfoCircle,
    IconStar,
    IconPlayerPlay,
  } from '@tabler/icons-react';
import classes from '../css/HeroBullets.module.css';
// className={classes.highlight}
export default function Cryptate() {
  return (
    <Container fluid>
      <Flex>
        <Container style={{ width: "55%" }}>
          <Title>
            Able to <Text fw={850} fz={40} span gradient={{ from: 'blue', to: 'green', deg: 246 }}      variant="gradient">Securley</Text> hide information right infront of someones eyes
          </Title>
          <Space h="md" />
          <Text>
            Pyenc is a fast, secure way to hide information in plain sight. It
            does this by using an advanced encrypt method that can insert
            information in pictures without being able to see that the picture
            has been modified.
          </Text>
          <Space h="xl" />
          <Flex>
            <Container className={classes.gradientBorder} w="33%" h={125}>
              <Flex  h={125} m={0} p={0}   justify="center"
      align="center">
                <ThemeIcon variant="gradient" radius={30} style={{marginRight: "10px"}}
      size="xxl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>
                <IconHome2 size={70} />
                </ThemeIcon>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>
              </Flex>
            </Container>
            <Container w="33%">
              <Flex>
                <IconHome2 size={30} />
                <Text>Easy to use</Text>
              </Flex>
            </Container>
            <Container w="33%">
              <Flex>
                <IconHome2 size={30} />
                <Text>Easy to use</Text>
              </Flex>
            </Container>
          </Flex>
          <Space h="xl" />
          <Flex gap={20} >
            <Button radius="md" component='a' fullWidth rightSection={<IconPlayerPlay />} variant="gradient"
      gradient={{ from: 'violet', to: 'teal', deg: 45 }} >Online Encrypt/Decrypt</Button>
            <Button radius="md" component='a' fullWidth rightSection={<IconBrandGithub />} variant="gradient"
      gradient={{ from: 'teal', to: 'gray', deg: 99 }}>Github</Button>
          </Flex>
        </Container>
        <Container style={{ width: "45%" }}>
          <Image radius="lg" src="https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"/>
        </Container>
      </Flex>
    </Container>
  );
}
