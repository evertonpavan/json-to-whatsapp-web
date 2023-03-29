import { useQuery } from 'react-query';
import { IUser } from '../contexts/auth/AuthContext';
import { profileUser } from '../services/JsontowwServerAPI/functions';

const _useUserProfile = async (user: IUser | null): Promise<any> => {

	const response = await profileUser()

	const { data } = response

	return data
}

export const useUserProfile = (user: IUser | null) => {

  if (!user) {

  }

  return useQuery(['profileUser'], () => _useUserProfile(user),
    {
      enabled: !user,
      onSuccess: (data) => {

        return data
      },
    },
  );
}
