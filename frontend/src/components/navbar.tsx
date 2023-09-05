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
          active={true}
          style={{ borderRadius: rem(8) }}
        />
        <NavLink
          label="Cryptography"
          leftSection={<IconPhoto />}
          variant="subtle"
          color="teal"
          active={true}
          style={{ borderRadius: rem(8) }}
        />
        <NavLink
          label="About"
          leftSection={<IconInfoCircle />}
          variant="subtle"
          color="cyan"
          active={true}
          style={{ borderRadius: rem(8) }}
        />
        <NavLink
          label="Github"
          leftSection={<IconBrandGithub />}
          variant="subtle"
          color="grey"
          active={true}
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
        <Flex justify="center" gap="xl" align="center" h={70}>
          <Avatar
            size="lg"
            variant="filled"
            radius="md"
            src="https://media.licdn.com/dms/image/C4E03AQF6MR1O9b_fJQ/profile-displayphoto-shrink_800_800/0/1516975130767?e=2147483647&v=beta&t=WmQ0SCNuBNNaAmeHhV37X78Dp4WAjSj42AP3XPqBmuE"
          ></Avatar>
          <Title order={3}>Simon</Title>
          <Divider orientation="vertical" />
          <ActionIcon variant="subtle" color="red">
            <IconLogout2 size="3rem" />
          </ActionIcon>
        </Flex>
      </Container>
    </Stack>
  );
}
