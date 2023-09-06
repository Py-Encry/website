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
} from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { useState } from 'react';

export default function Cryptate() {
  const [value, setValue] = useState('Rail Fence Cipher');

  const options = () => {
    if (value === 'Rail Fence Cipher') {
      return (
        <Group>
          <Checkbox>Encrypt</Checkbox>
          <Checkbox>Decrypt</Checkbox>
        </Group>
      );
    } else if (value === 'Random') {
      return (
        <Group>
          <NumberInput
            label="Key"
            withAsterisk
            defaultValue={0}
            decimalSeparator=","
            hideControls
          />
        </Group>
      );
    } else if (value === 'Cesar Cipher') {
      return (
        <Group>
          <Checkbox>Encrypt</Checkbox>
          <Checkbox>Decrypt</Checkbox>
        </Group>
      );
    }
  };

  return (
    <Fieldset legend="Cryptate" h={500}>
      <SegmentedControl
        onChange={(value) => {
          setValue(value);
        }}
        fullWidth
        data={['Rail Fence Cipher', 'Random', 'Cesar Cipher']}
      ></SegmentedControl>
      <Fieldset legend="Settings" m={20}>
      {options()}
      </Fieldset>
    </Fieldset>
  );
}
