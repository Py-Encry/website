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
} from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { useState } from 'react';

export default function Cryptate() {
  const [value, setValue] = useState('Rail Fence Cipher');
  const [file, setFile] = useState<FileWithPath[]>([]);

  const options = () => {
    if (value === 'Rail Fence Cipher') {
      return (
        <Stack>
          <NumberInput
            label="Rail Count"
            withAsterisk
            defaultValue={1}
            decimalSeparator=","
            hideControls
          />
          <TextInput
            label="Message"
            withAsterisk
            placeholder="Input Message"
            w={615}
          ></TextInput>
        </Stack>
      );
    } else if (value === 'Random') {
      return (
        <Stack>
          <NumberInput
            label="Key"
            withAsterisk
            defaultValue={0}
            decimalSeparator=","
            hideControls
          />
          <TextInput
            label="Message"
            withAsterisk
            placeholder="Input Message"
            w={615}
          ></TextInput>
        </Stack>
      );
    } else if (value === 'Cesar Cipher') {
      return (
        <Stack>
          <Checkbox>Encrypt</Checkbox>
          <Checkbox>Decrypt</Checkbox>
        </Stack>
      );
    }
  };

  return (
    <Fieldset legend="Cryptate">
      <SegmentedControl
        onChange={(value) => {
          setValue(value);
        }}
        fullWidth
        data={['Rail Fence Cipher', 'Random', 'Cesar Cipher']}
      ></SegmentedControl>
      <br />
      <Dropzone
        onDrop={setFile}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        m={20}
        accept={IMAGE_MIME_TYPE}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-blue-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-red-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-dimmed)',
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Group grow>
        <Fieldset legend="Image" m={20} radius="md">
          <Image
            src={file[0] ? URL.createObjectURL(file[0]) : null}
            alt="Uploaded Image"
            h={300}
            fit="contain"
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        </Fieldset>
        <Stack>
          <Fieldset legend="Settings" m={20} radius="md">
            {options()}
          </Fieldset>
          <Button size="lg" color="teal" mx={20}>
            Encrypt
          </Button>
        </Stack>
      </Group>
    </Fieldset>
  );
}
