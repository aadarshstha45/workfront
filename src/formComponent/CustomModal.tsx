/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";

interface CustomModalProps {
  heading: string;
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLInputElement>;
  finalRef: React.RefObject<HTMLInputElement>;
  onSubmit: SubmitHandler<any>;
  handleSubmit: any;
  handleClose: () => void;
  loading: boolean;
  loadingText: string;
  children: ReactNode;
}

const CustomModal = ({
  isOpen,
  onClose,
  initialRef,
  finalRef,
  onSubmit,
  handleSubmit,
  handleClose,
  loading,
  children,
  heading,
  loadingText,
}: CustomModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isCentered
      closeOnEsc
    >
      <ModalOverlay opacity={0.5} />
      <ModalContent as={"form"} onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader textAlign={"center"}>{heading}</ModalHeader>
        <ModalCloseButton onClick={handleClose} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter justifyContent={"start"}>
          <ButtonGroup>
            <Button
              type="submit"
              isLoading={loading}
              loadingText={`${loadingText}...`}
              mb={4}
              onClick={onClose}
              colorScheme={"green"}
            >
              Add
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { CustomModal };
