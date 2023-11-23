import {
  Container,
  Fieldset,
  FileInput,
  Checkbox,
  TextInput,
  SegmentedControl,
  Image,
  SimpleGrid,
  NumberInput,
  Stack,
  Button,
  Divider,
  Notification,
  Flex,
  Box,
  useMantineColorScheme,
  Title,
  Badge,
  Modal,
  Loader,
  ThemeIcon,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { encryptApiData } from "./api";
import { relative } from "path";
import { useDisclosure } from "@mantine/hooks";
import { CryptateModal } from "./cryptateModal";

export default function Cryptate() {
  const [failed, setFail] = useState({failed: false, success: false, message: "", link: <a></a>});
  const [file, setFile] = useState<FileWithPath[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const form = useForm({
    initialValues: {
      key: 0,
      message: "",
      mode: "Encrypt",
      method: "rail_fence_cipher",
    },
  });

  const model = () => {
    if (failed) {
      return <></>;
    }
  };

  const options = () => {
    const [method, encrypt] = [
      form.values.method,
      form.values.mode !== "Encrypt",
    ];
    if (method === "rail_fence_cipher") {
      return (
        <Stack>
          <NumberInput
            label="Rail Count"
            withAsterisk
            defaultValue={1}
            decimalSeparator=","
            hideControls
            {...form.getInputProps("key")}
          />
          <TextInput
            label="Message"
            withAsterisk
            placeholder="Input Message"
            disabled={encrypt}
            {...form.getInputProps("message")}
          ></TextInput>
        </Stack>
      );
    } else if (method === "random_spacing") {
      return (
        <Stack>
          <NumberInput
            label="Key"
            withAsterisk
            defaultValue={0}
            decimalSeparator=","
            hideControls
            {...form.getInputProps("key")}
          />
          <TextInput
            label="Message"
            withAsterisk
            placeholder="Input Message"
            disabled={encrypt}
            {...form.getInputProps("message")}
          ></TextInput>
        </Stack>
      );
    } else if (method === "Cesar Cipher") {
      return (
        <Stack>
          <Checkbox>Encrypt</Checkbox>
          <Checkbox>Decrypt</Checkbox>
        </Stack>
      );
    }
  };

  return (
    <>
      <Flex justify="center">
        <Box
          bg={colorScheme === "dark" ? "gray.9" : "gray.1"}
          my="xl"
          p={20}
          m={10}
          style={{ width: "70%", borderRadius: "10px" }}
        >
          <Title order={1} style={{ textAlign: "center" }}>
            Cryptography
          </Title>
          <Box
            component="form"
            onSubmit={form.onSubmit((values) =>
              values.mode === "Encrypt"
                ? encryptApiData(values, file, setFail)
                : ""
            )}
          >
            <Flex wrap="wrap" justify="center">
              <Dropzone
                onDrop={setFile}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={3 * 1024 ** 2}
                m={20}
                accept={IMAGE_MIME_TYPE}
                bg={colorScheme === "dark" ? "gray.8" : "gray.3"}
                w="90%"
              >
                <Group
                  justify="center"
                  gap="xl"
                  mih={220}
                  style={{ pointerEvents: "none" }}
                >
                  <Dropzone.Accept>
                    <IconUpload
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: "var(--mantine-color-blue-6)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: "var(--mantine-color-red-6)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: "var(--mantine-color-dimmed)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Attach as many files as you like, each file should not
                      exceed 5mb
                    </Text>
                  </div>
                </Group>
              </Dropzone>
              <Flex
                style={{ width: "100%" }}
                justify="center"
                direction="column"
                align="center"
              >
                <Badge
                  size="lg"
                  variant="gradient"
                  gradient={{ from: "red", to: "indigo", deg: 323 }}
                  style={{
                    position: "relative",
                    top: "32px",
                    zIndex: 2,
                    right: "43%",
                  }}
                >
                  Preview
                </Badge>
                <Box
                  m={20}
                  p={0}
                  style={{
                    borderRadius: "10px",
                    border: `2px solid ${
                      colorScheme === "dark"
                        ? "var(--mantine-color-gray-7)"
                        : "var(--mantine-color-gray-3)"
                    }`,
                  }}
                  h={460}
                  w="90%"
                >
                  <Image
                    style={{
                      backgroundColor:
                        colorScheme === "dark"
                          ? "var(--mantine-color-dark-7)"
                          : "var(--mantine-color-gray-0)",
                    }}
                    src={file[0] ? URL.createObjectURL(file[0]) : null}
                    h={450}
                    alt="Uploaded Image"
                    fit="contain"
                  />
                </Box>
              </Flex>
              <Fieldset
                m={20}
                p={20}
                pb={35}
                radius="md"
                style={{ width: "90%" }}
              >
                <Badge
                  size="lg"
                  variant="gradient"
                  gradient={{ from: "teal", to: "lime", deg: 216 }}
                  style={{
                    position: "relative",
                    bottom: "33px",
                    zIndex: 2,
                    right: "40px",
                  }}
                >
                  Configuration
                </Badge>
                <Stack>
                  <SegmentedControl
                    fullWidth
                    {...form.getInputProps("method")}
                    data={[
                      {
                        label: "Rail Fence Cipher",
                        value: "rail_fence_cipher",
                      },
                      { label: "Random Spacing", value: "random_spacing" },
                    ]}
                  ></SegmentedControl>
                  <SegmentedControl
                    fullWidth
                    data={["Encrypt", "Dycrypt"]}
                    {...form.getInputProps("mode")}
                  ></SegmentedControl>
                  <Fieldset legend="Settings" m={20} radius="md">
                    {options()}
                  </Fieldset>
                  <Button
                    size="lg"
                    variant="gradient"
                    gradient={{ from: "cyan", to: "green", deg: 0 }}
                    mx={20}
                    type="submit"
                    onClick={() => {
                      open();
                    }}
                  >
                    Submit
                  </Button>
                </Stack>
              </Fieldset>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Flex
        style={{
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
        direction="column"
        gap={10}
      ></Flex>
      <CryptateModal status={failed} disclousure={{opened: opened, open: open, close: close}}></CryptateModal>
    </>
  );
}
