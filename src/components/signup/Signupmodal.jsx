import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useContext } from "react";
import SignupForm from "./SignupForm";
import { DataContext } from "../../datacontext";
import { Form } from "antd";

export function Signupmodal() {
  const { openSignup, setopenSignup } = useContext(DataContext);
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        show={openSignup}
        size="lg"
        onClose={() => setopenSignup(false)}
        popup
        className="pt-20"
      >
        <ModalHeader />
        <ModalBody className="px-6 sm:px-10 pb-5 sm:pb-10">
          <div className="pb-10 flex font-bold font-serif text-2xl sm:text-4xl justify-center ">
            Please SignUp
          </div>
          <div className="flex justify-center w-full">
            <SignupForm />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
Signupmodal;
