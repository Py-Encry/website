import {
  Container,
  NavLink,
  Badge,
  Stack,
  rem,
  Avatar,
  Flex,
  Title,
  ActionIcon,
  Divider,
} from '@mantine/core';
import {
  IconHome2,
  IconPhoto,
  IconBrandGithub,
  IconInfoCircle,
  IconStar,
  IconLogout2,
} from '@tabler/icons-react';

export default function Navbar() {
  return (
    <Stack justify="space-between" h={1000}>
      <Stack gap="md" align="stretch">
        <NavLink
          label="Home"
          leftSection={<IconHome2 />}
          variant="subtle"
          color="green"
          component='a'
          href="/"
          active={true}
          style={{ borderRadius: rem(8) }}
        />
        <NavLink
          label="Cryptography"
          leftSection={<IconPhoto />}
          variant="subtle"
          color="teal"
          active={true}
          component='a'
          href="/cryptate"
          style={{ borderRadius: rem(8) }}
        />
        <NavLink
          label="About"
          leftSection={<IconInfoCircle />}
          variant="subtle"
          color="cyan"
          component='a'
          href="/about"
          active={true}
          style={{ borderRadius: rem(8) }}
        />
        <NavLink
          label="Github"
          leftSection={<IconBrandGithub />}
          variant="subtle"
          color="grey"
          active={true}
          component='a'
          style={{ borderRadius: rem(8) }}
          href="https://github.com/meatball133/py-enc_-Website"
        />
      </Stack>
      <Container
        h={70}
        w={400}
        fluid
        bg="var(--mantine-color-blue-light)"
        style={{ borderRadius: rem(10) }}
      >
        <Flex justify="space" gap="xl" align="center" h={70} w={400}>
          <Avatar
            size="lg"
            variant="filled"
            radius="md"
            style={{right: rem(10)}}
            src="https://cdn.discordapp.com/attachments/1078720261517480048/1104168977212649502/Jakob_Widebrant_my_beloved.gif"
          ></Avatar>
          <Title w={60} order={3}>Simon</Title>
          <Divider orientation="vertical" />
          <ActionIcon variant="subtle" color="red" style={{right: rem(10)}}>
            <IconLogout2 size="3rem" />
          </ActionIcon>
        </Flex>
      </Container>
    </Stack>
  );
}
