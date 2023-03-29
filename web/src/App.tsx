import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './services/ReactQuery/queryClient'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AuthContext, StepContext } from './contexts'
import { Routes } from './routes'

const theme = extendTheme({})

function App() {
  return (
    <AuthContext>
      <StepContext>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme} resetCSS={true} cssVarsRoot="body">
            <Routes />
          </ChakraProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </StepContext>
    </AuthContext>
  )
}

export default App
