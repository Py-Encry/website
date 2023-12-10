import { Container, Flex, Title, Image, Text, Button, Space, Highlight, Group, ThemeIcon, Card,SimpleGrid } from "@mantine/core";
import {
    IconHome2,
    IconPhoto,
    IconBrandGithub,
    IconInfoCircle,
    IconStar,
    IconPlayerPlay,
    IconGauge,
    IconLock,
    IconHeartHandshake
  
  } from '@tabler/icons-react';
import classes from '../css/HeroBullets.module.css';
import { useViewportSize } from '@mantine/hooks';
// className={classes.highlight}
export default function Cryptate() {
  const { width } = useViewportSize();
  return (
    <Container fluid>
      <Flex>
        <Container style={{ width: "55%" }}>
          <Title>
            Able to <Text fw={850} fz={40} span gradient={{ from: 'blue', to: 'green', deg: 246 }}      variant="gradient">Securley</Text> hide information right infront of someones eyes
          </Title>
          <Space h="md" />
          <Text>
            Pyencry is a fast, secure way to hide information in plain sight. It
            does this by using an advanced encrypt method that can insert
            information in pictures without being able to see that the picture
            has been modified.
          </Text>
          <Space h="xl" />
          <SimpleGrid cols={width <= 1000 ? 1: 3}>
          <Card radius="lg" className={classes.card} shadow="lg">
            <IconGauge
              color="var(--mantine-color-green-7)"
              size={75}
              stroke={2}
            />
            <Title order={3} size="h4" fw={500} className={classes.lineCard}>
              Preformace
            </Title>
            <Text>
              Powered by the latest technology, we ensure that you can encrypt and decrypt your information as fast as possible
            </Text>
          </Card>
          <Card radius="lg" className={classes.card} shadow="lg">
            <IconHeartHandshake
              color="var(--mantine-color-cyan-7)"
              size={75}
              stroke={2}
            />
            <Title order={3} size="h4" fw={500} className={classes.lineCard}>
              Ease of Use
            </Title>
            <Text>
              We have made the process of encrypting and decrypting as easy as
              possible, so you can focus on the important stuff
            </Text>
          </Card>
          <Card radius="lg" className={classes.card} shadow="lg">
            <IconLock
              color="var(--mantine-color-blue-7)"
              size={75}
              stroke={2}
            />
            <Title order={3} size="h4" fw={500} className={classes.lineCard}>
              Security
            </Title>
            <Text>
              We have made sure that your information is safe, and that no one
              can access it without your permission
            </Text>
          </Card>
          </SimpleGrid>
          <Space h="xl" />
          <Flex gap={20} >
            <Button radius="md" component='a' fullWidth rightSection={<IconPlayerPlay />} variant="gradient"
      gradient={{ from: 'violet', to: 'teal', deg: 45 }} href="/cryptate">Online Encrypt/Decrypt</Button>
            <Button radius="md" component='a' fullWidth rightSection={<IconBrandGithub />} variant="gradient"
      gradient={{ from: 'teal', to: 'gray', deg: 99 }} href="https://github.com/Py-Encry/py-encry">Github</Button>
          </Flex>
        </Container>
        <Container style={{ width: "45%" }}>
          <Flex justify="center" align="center" h="100%">
            <Image radius="lg" src="https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"/>
          </Flex>
        </Container>
      </Flex>
    </Container>
  );
}
