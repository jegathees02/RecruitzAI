import { Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,Text,ModalCloseButton,ModalFooter,Button } from "@chakra-ui/react";
const RetakeTestModal = ({ isOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Retake Test</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              It seems like all values are 1. Consider retaking the test for more accurate results.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* You can add a button to trigger the retake functionality */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  export default RetakeTestModal;