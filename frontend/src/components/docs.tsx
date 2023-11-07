import { CodeHighlight } from '@mantine/code-highlight';
import {
  TypographyStylesProvider,
  Title,
  Text,
  Box,
  useMantineColorScheme,
  Divider,
  Container,
  Flex,
  ActionIcon,
  CopyButton,
} from '@mantine/core';
import './docs.css';
import { useClipboard } from '@mantine/hooks';

function DocsInfo(text: { [key: string]: any }): React.ReactNode[] {
  return text.map((element: { [key: string]: any }) => {
    console.log(element);
    if (element['info'] === 'text') {
      return <Text p={10}>{element.data.text}</Text>;
    } else if (element.info === 'example') {
      return (
        <CodeHighlight
          language={element.data.lang}
          code={element.data.code}
          style={{ borderRadius: '15px' }}
        />
      );
    }
  });
}

function MethodsSection(
  text: { [key: string]: any },
  colorScheme: any
): React.ReactNode[] {
  let code = [];
  code.push(<Divider my="sm" />);
  text.forEach((element: { [key: string]: any }) => {
    let parameters = element.info.filter(
      (element: { [key: string]: any }) => element.info === 'arguments'
    );
    console.log(parameters);
    const params = parameters[0].data.map((element: { [key: string]: any }) => {
      console.log(element.data);
      return `${element.name} : ${element.type}`;
    });
    const returns = element.info.filter(
      (element: { [key: string]: any }) => element.info === 'returns'
    );
    const return_type = returns[0].data[0]?.type;
    const method_description = element.info.filter(
      (element: { [key: string]: any }) => element.info === 'text'
    );
    const method_description_text =
      method_description[0].data.text.split('\n')[0];

    code.push(
      <Box py={10}>
        <Box
          bg={colorScheme === 'light' ? 'gray.3' : 'dark.6'}
          className="class-header"
          component="a"
          href={`#${element.name}`}
          style={{ textDecoration: 'inherit' }}
        >
          <Title order={3}>
            {element.type_method === 'method' ? '#' : '.'}
            {element.name}(<span className="argument">{params}</span>){' '}
            {return_type ? ':' : ''}{' '}
            <span className="argument">{return_type}</span>
          </Title>
        </Box>
        <Container size="xxl" py={5}>
          <Text>{method_description_text}</Text>
        </Container>
      </Box>
    );
  });
  return code;
}

function MethodSectionDetailed(
  text: { [key: string]: any },
  colorScheme: any
): React.ReactNode[] {
  let code = [];
  code.push(<Divider my="sm" />);
  text.forEach((element: { [key: string]: any }) => {
    let parameters = element.info.filter(
      (element: { [key: string]: any }) => element.info === 'arguments'
    );
    console.log(parameters);
    const params = parameters[0].data.map((element: { [key: string]: any }) => {
      console.log(element.data);
      return `${element.name} : ${element.type}`;
    });
    const returns = element.info.filter(
      (element: { [key: string]: any }) => element.info === 'returns'
    );
    const return_type = returns[0].data[0]?.type;

    code.push(
      <Box py={10}>
        <Flex>
          <CopyButton value={`${window.location.href.split('#')[0]}#${element.name}`}>
            {({ copied, copy }) => (
              <ActionIcon
                size="md"
                className="link-header"
                variant="transparent"
                fz={27}
                onClick={copy}
              >
                #
              </ActionIcon>
            )}
          </CopyButton>
          <Box
            bg={colorScheme === 'light' ? 'gray.3' : 'dark.6'}
            className="class-header"
            id={element.name}
            style={{ scrollMarginTop: '80px' }}
            w="100%"
          >
            <Title order={3}>
              {element.type_method === 'method' ? '#' : '.'}
              {element.name}(<span className="argument">{params}</span>){' '}
              {return_type ? ':' : ''}{' '}
              <span className="argument">{return_type}</span>
            </Title>
          </Box>
        </Flex>
        <Container size="xxl" py={5}>
          {DocsInfo(element.info)}
        </Container>
      </Box>
    );
  });
  return code;
}

export function Docs() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  let obj = require('./docstring.json');
  const code: React.ReactNode[] = [];
  if (obj[0].type === 'ClassDef') {
    code.push(
      <Box
        bg={colorScheme === 'light' ? 'gray.3' : 'dark.6'}
        className="class-header"
      >
        <Title>
          <span className="class">class</span> {obj[0].name}
        </Title>
      </Box>
    );
    code.push(<Container size="xxl">{DocsInfo(obj[0].info)}</Container>);
  }
  let constructur_methods = obj.filter(
    (element: { [key: string]: any }) =>
      element.type === 'FunctionDef' && element.type_method === 'constructor'
  );
  if (constructur_methods.length > 0) {
    code.push(<Title>Constructur</Title>);
    code.push(<>{MethodsSection(constructur_methods, colorScheme)}</>);
  }
  let methods = obj.filter(
    (element: { [key: string]: any }) =>
      element.type === 'FunctionDef' && element.type_method === 'method'
  );
  if (methods.length > 0) {
    code.push(<Title>Methods</Title>);
    code.push(<>{MethodsSection(methods, colorScheme)}</>);
  }

  if (constructur_methods.length > 0) {
    code.push(<Title>Constructur Detail</Title>);
    code.push(<>{MethodSectionDetailed(constructur_methods, colorScheme)}</>);
  }

  if (methods.length > 0) {
    code.push(<Title>Methods Detail</Title>);
    code.push(<>{MethodSectionDetailed(methods, colorScheme)}</>);
  }

  return <Container size="xxl">{code}</Container>;
}
