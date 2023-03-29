import { AuthContextProvider } from './auth/AuthContext'
import { StepContextProvider } from './step/StepContext'

const AuthContext = ({ children }: any) => {
  return (
    <>
      <AuthContextProvider> {children} </AuthContextProvider>
    </>
  )
}

const StepContext = ({ children }: any) => {
  return (
    <>
      <StepContextProvider> {children} </StepContextProvider>
    </>
  )
}

export { AuthContext, StepContext }
