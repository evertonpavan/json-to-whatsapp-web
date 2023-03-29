import {
  Flex,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { GoMarkGithub } from 'react-icons/go'
import { useAuth } from '../../hooks/useAuth'

type Props = {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const { socketConnected } = useAuth()

  return (
    <>
      <Flex
        minH={'100vh'}
        justifyContent={'left'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        gap={'5rem'}
        width={'100%'}
      >
        <Stack
          spacing={2}
          mx={'auto'}
          maxW={'lg'}
          py={4}
          px={6}
          minWidth={'22.5rem'}
        >
          <Stack align={'center'}>
            <Flex
              width={'100%'}
              direction={'row'}
              justifyContent={'right'}
              // alignContent={''}
              align={'center'}
              mb={'1rem'}
              gap={'2rem'}
            >
              <Link href="https://github.com/sponsors/evertonpavan" isExternal>
                <Button
                  type={'button'}
                  // leftIcon={<Icon as={GoHeart} boxSize={6} color={'pink.500'} />}
                  leftIcon={
                    <Icon viewBox="0 0 16 16" color="#db61a2">
                      <path
                        fill="currentColor"
                        d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"
                      />
                    </Icon>
                  }
                  variant={'outline'}
                  colorScheme={'gray'}
                >
                  Sponsor
                </Button>
              </Link>
              <Link href="https://github.com/evertonpavan/json-to-whatsapp-web" isExternal>
                <Icon as={GoMarkGithub} boxSize={6} />
              </Link>
            </Flex>
            <Heading fontSize={'3xl'}>JSON to Whatsapp Web</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              send a bunch of messages on
              <Link color={socketConnected ? '#22c35e' : 'gray'}>
                {' '}
                whatsapp{' '}
              </Link>
              <Icon
                as={FaWhatsapp}
                color={socketConnected ? '#22c35e' : 'gray'}
              />
            </Text>
          </Stack>
          <Stack
            spacing={8}
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            minH={'80vh'}
            maxWidth={'26rem'}
          >
            {children}
          </Stack>
        </Stack>
      </Flex>
    </>
  )
}

export { Layout }
