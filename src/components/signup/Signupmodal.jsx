
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useContext, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import SignupForm from "./SignupForm";
import { datacontext } from "../../../datacontext";

export function Signupmodal() {
  const {opensignup, setopensignup} = useContext(datacontext);

  return (
    <>
      {/* <Button onClick={() => setopensignup(true)}>Toggle modal</Button> */}
      <Modal show={opensignup} size="lg" onClose={() => setopensignup(false)} popup>
        <ModalHeader />
        <ModalBody className="px-6 sm:px-10 pb-5 sm:pb-10">
          <div className="pb-10 flex font-bold font-serif text-2xl sm:text-4xl justify-center ">Please SignUp</div>
          <div className="flex justify-center w-full">
          <SignupForm/>

          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
Signupmodal
