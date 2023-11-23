import {
  Box,
  Container,
  Flex,
  Loader,
  Modal,
  Text,
  ThemeIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";

interface CryptateModalInterface {
  status: {
    failed: boolean;
    success: boolean;
    message: string;
    link: any;
  };
  disclousure: {
    opened: boolean;
    open: () => void;
    close: () => void;
  };
}

export function CryptateModal(input: CryptateModalInterface) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const { status, disclousure } = input;
  const { failed, success, message, link } = status;
  const { opened, open, close } = disclousure;
  const icon = () => {
    if (failed) {
      return <IconX size={45} />;
    } else if (success) {
      return <IconCheck size={45} />;
    }
    return <Loader color="blue" size="lg" type="dots" />;
  };
  const text = () => {
    if (failed) {
      return "An error occurred"
    } else if (success) {
      return "Success"
    }
    return "Encrypting..."
  }

  return (
    <Modal opened={opened} w={500} h={200} onClose={close} centered>
      <Container w={400} h={150}>
        <Box
          m="auto"
          h={100}
          w={300}
          style={{
            border: `2px solid ${
              colorScheme === "dark"
                ? "var(--mantine-color-gray-8)"
                : "var(--mantine-color-gray-3)"
            }`,
            borderRadius: "15px",
          }}
        >
          <Flex w="100%" h="100%" justify="space-around" align="center">
            <ThemeIcon
              style={{ position: "relative", right: "20px" }}
              variant={failed ? "filled" : "light"}
              radius={100}
              size={75}
              color={failed ? "red" : "teal"}
            >
              {icon()}
            </ThemeIcon>
            <Text style={{ position: "relative", right: "20px" }}>
              {text()}
            </Text>
            <div>
            {success ? link : <></>}
            </div>
          </Flex>
        </Box>
      </Container>
    </Modal>
  );
}
