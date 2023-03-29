import { SpinnerLoading } from '../components/SpinnerLoading'
import { useAuth } from '../hooks/useAuth'
import { ProtectRoutes } from './ProtectRoutes'
import { SignRoutes } from './SignRoutes'

export const Routes = () => {
  const { authenticated, loading } = useAuth()

  if (loading) {
    return <SpinnerLoading />
  }

  return authenticated ? <ProtectRoutes /> : <SignRoutes />
}
