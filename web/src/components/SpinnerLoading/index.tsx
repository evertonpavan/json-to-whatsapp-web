import { Spinner } from '@chakra-ui/react'

export function SpinnerLoading() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: 0.5,
          position: 'fixed',
          zIndex: 9999,
          width: '100%',
          margin: '0',
          padding: '0',
          top: '0',
          left: '0',
        }}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="red.500"
          size="xl"
          position="relative"
          label="Carregando..."
        />
      </div>
    </>
  )
}
