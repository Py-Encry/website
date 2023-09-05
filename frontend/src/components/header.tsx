import {
  Container,
  Group,
  Text,
  rem,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export default function Header() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Container px={300} fluid>
      <Group mih={60} gap="md" justify="space-between">
        <Text 
          size={rem(32)}
          fw={700}
          style={{ height: 60, position: 'relative', top: 10 }}
          variant="gradient"
          gradient={{ from: 'green', to: 'blue', deg: 90 }}
        >
          PyEnc
        </Text>
        <ActionIcon
          variant="outline"
          color={colorScheme === "dark" ? 'yellow' : 'blue'}
          onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
          title="Toggle color scheme"
        >
          {colorScheme === 'dark' ? <IconSun /> : <IconMoonStars />}
        </ActionIcon>
      </Group>
    </Container>
  );
}
