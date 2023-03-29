import { useMutation, useQuery } from 'react-query';
import { jsontowwServerAPI } from '../services/JsontowwServerAPI/apiClient';
import { checkAuthentication, generateQRCode, sendMessages } from '../services/JsontowwServerAPI/functions';
import { TError } from '../types/TError';

// 10 minutos = 3600000 ms
const staleTime = 600000

export const useSendMessages= () => {

	return useMutation(async (sendMessagesRequest: any) => {

		const data = await sendMessages(sendMessagesRequest)

        return data
    }, {
        onSuccess: (data) => {
            return data
		}
	})
}

const _useGenerateQRCode = async (): Promise<any> => {
    try {

        const response = await jsontowwServerAPI.get(`/qr-code`);

        // const result = { data: response.data, status: response.status }

        const { data } = response

        return data
    } catch (error) {
        const reponseError = error as TError;
        console.log('error', error)
        return {
            message: reponseError.response.data.message,
            status: reponseError.response.status
        }
    }
}

export const useGenerateQRCode = (data: any) => {
	return useQuery(['generateQRCOde', data], () => _useGenerateQRCode(),  
    { staleTime: staleTime, enabled: data ? true : false });
}

const _useCheckAuthentication = async (): Promise<any> => {

    // return false

	const response = await checkAuthentication()

	const { data } = response

	return data
}

export const useCheckAuthentication = (data: any) => {

    return useQuery(['checkAuthentication', data], () => _useCheckAuthentication(),
        {
            staleTime: staleTime,
            
            initialData: {
                authenticated: false
            }
        });
}

