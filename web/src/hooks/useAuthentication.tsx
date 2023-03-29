import { useMutation } from 'react-query';
import { IAuthenticationRequest } from '../interfaces/IAuth';
import { authentication } from '../services/JsontowwServerAPI/functions';
import { useAuth } from './useAuth';

export const useLoginAuthentication = () => {

  const { onLoginSuccess } = useAuth();

  return useMutation(async (credentials: IAuthenticationRequest) => {

    const response = await authentication(credentials)

    return response
  }, {
    onSuccess: (data) => {

      onLoginSuccess(data)

      return data
    }
  })
}