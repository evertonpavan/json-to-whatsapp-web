import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginAuthentication } from '../../hooks/useAuthentication'
import { AlertMessage, IAlertMessageProps } from '../MessageAlert'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Layout } from '../../pages/Layout'

function LoginForm() {
  const navigate = useNavigate()

  const login = useLoginAuthentication()

  const [showPassword, setShowPassword] = useState(false)
  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  const [message, setMessage] = useState<IAlertMessageProps | null>(null)

  const LoginFormSchema = yup.object().shape({
    user: yup.string().required('Required'),
    password: yup.string().required('Required'),
  })

  const formOptions = { resolver: yupResolver(LoginFormSchema) }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    ...formOptions,
  })

  const onSubmit = async (value: any) => {
    setMessage(null)

    const { user: email, password } = value

    const response = await login.mutateAsync({
      email,
      password,
    })

    const { status } = response

    if (status === 200) {
      await new Promise((resolve) => {
        setTimeout(() => {
          navigate('/')
          resolve(true)
        }, 2000)
      })

      return
    }

    setMessage({
      title: 'Failure!',
      message: 'Username or password incorrect!',
      status: 'error',
    })
  }

  return (
    <>
      <Layout>
        <Stack spacing={8} minWidth={'22.5rem'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.user}>
                <Flex flexDirection="column" gap={'0.5rem'}>
                  <Input
                    id="user"
                    {...register('user')}
                    placeholder="Usuário"
                    bg={'gray.100'}
                    border={0}
                    color={'gray.500'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                  />

                  {errors.user && (
                    <FormErrorMessage>
                      <>*{errors.user.message}</>
                    </FormErrorMessage>
                  )}
                </Flex>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    placeholder="Senha"
                    bg={'gray.100'}
                    border={0}
                    color={'gray.500'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.5rem"
                      size="sm"
                      onClick={handlePasswordVisibility}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                {errors.password && (
                  <FormErrorMessage>
                    <>*{errors.password.message}</>
                  </FormErrorMessage>
                )}
              </FormControl>

              {message && (
                <AlertMessage
                  title={message?.title}
                  message={message?.message}
                  status={message?.status || 'info'}
                  icon={''}
                />
              )}
            </Stack>
            <Button
              type={'submit'}
              fontFamily={'heading'}
              w={'full'}
              mt={'1rem'}
              colorScheme={'whatsapp'}
              isLoading={isSubmitting}
              loadingText="Authenticating..."
              opacity={isSubmitting ? 0.5 : 1}
            >
              Login
            </Button>
          </form>
        </Stack>
      </Layout>
    </>
  )
}

export { LoginForm }
