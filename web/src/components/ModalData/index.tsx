import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { IData } from '../../interfaces/IData'

interface IModalProps {
  label: string
  data: IData
}

function ModalData({ label, data }: IModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<ExternalLinkIcon />}
        // iconSpacing={0}
      >
        {label}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
        // maxWidth={'80vh'}
        >
          <ModalHeader>JSON file data:</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          // maxWidth={'80vh'}
          >
            <pre
              style={{
                whiteSpace: 'pre-wrap',
              }}
            >
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export { ModalData }
