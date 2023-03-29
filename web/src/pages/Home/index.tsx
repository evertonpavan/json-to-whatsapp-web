import { Flex } from '@chakra-ui/react'
import { SendMessage } from '../../components/SendMessage'

function Home() {
  return (
    <>
      <Flex>
        <SendMessage />
      </Flex>
    </>
  )
}

export { Home }
