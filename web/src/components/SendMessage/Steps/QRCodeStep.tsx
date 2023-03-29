import {
    Flex,
    Box,
    Stack,
    Text,
    Divider,
    Skeleton,
    useBoolean
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import QRCode from 'react-qr-code';
import { useStep } from '../../../hooks/useStep';
import { IAlertMessageProps } from '../../MessageAlert';
import { useState, useEffect } from 'react';


interface IQRCodeResponse {
    qrCode?: string;
    message?: string;
}

interface IConnectionStatusResponse {
    status: boolean;
    message?: string;
  }

interface IQRCodeStepProps {
    qrCode?: IQRCodeResponse | null;
    connectionStatus: IConnectionStatusResponse;
}

function QRCodeStep({ qrCode, connectionStatus }: IQRCodeStepProps) {

    const [message, setMessage] = useState<IAlertMessageProps | null>(null);
    const [loadingGenerateQRCode, setLoadingGenerateQRCode] = useBoolean(true)

    const { currentStep, helpers } = useStep();

    const {
        canGoToNextStep,
        goToNextStep,
        setStep,
    } = helpers

    useEffect(() => {
        if (!qrCode) return;
        setLoadingGenerateQRCode.off()

    , [qrCode]})


    return (
        <>
            <Stack spacing={4} textAlign={'left'} gap={6}>
                <>
                    <Text fontSize={'md'}>
                        Scan QR Code:
                    </Text>

                    {/* {qrCode ? ( */}
                    {loadingGenerateQRCode ? (
                        <Box
                            style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%" }}
                        >
                            <Skeleton startColor='gray.500' endColor='gray.800' width='300px' height='300' />
                        </Box>
                    ) : (
                        <>
                            {/* {qrCode && qrCode.qrCode && !message?.message && message?.status !== 'error' ? ( */}
                            {qrCode && qrCode.qrCode ? (
                                <Flex
                                    style={{ height: "auto", margin: "0 auto", maxWidth: 300, width: "100%" }}
                                >
                                    <QRCode
                                        size={256}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        viewBox={`0 0 256 256`}
                                        value={qrCode?.qrCode || ''}
                                    />
                                </Flex>
                            ) : (
                                <Flex
                                    style={{ height: "300px", margin: "0 auto", maxWidth: 300, width: "100%" }}
                                    // bg={'red.100'}
                                    boxShadow={'lg'}
                                    textAlign={'center'}
                                    // color={'white'}
                                    justifyContent={'center'}
                                    align={'center'}
                                    direction={'column'}
                                    gap={'1rem'}
                                    as={'button'}
                                // onClick={() => refetchGenerateQRCode()}
                                >
                                    <Text color={'red.500'}>
                                        {/* {connectionStatus.message ? connectionStatus.message : qrCode?.message}
                                {qrCode?.message} */}
                                        {currentStep === 3 && message?.message ? message?.message : qrCode?.message}
                                    </Text>
                                    <Text>
                                        Try again
                                    </Text>
                                    <RepeatIcon boxSize={10} color={'whatsapp.500'} />
                                </Flex>
                            )}
                        </>
                    )}
                </>
            </Stack>

            <Text fontSize={'md'}>
                Status: {connectionStatus.status ? 'Connected' : 'Disconnected'}
            </Text>

        </>
    )
}

export { QRCodeStep };