import {Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useContext} from "react";
import LoginForm from "../login/loginform";
import { DataContext } from "../../datacontext";

export function Loginmodal() {
  const { openLogin, setopenLogin } = useContext(DataContext);
  
  
  return (
    <>
      {/* <Button onClick={() => setopenLogin(true)}>Toggle modal</Button> */}
      <Modal
        show={openLogin}
        size="lg"
        onClose={() => setopenLogin(false)}
        popup
      >
        <ModalHeader />
        <ModalBody className="px-6 sm:px-10 pb-5 sm:pb-10">
          <div className="pb-10 flex font-bold font-serif text-2xl sm:text-4xl justify-center ">
            Please Login
          </div>
          <div className="flex justify-center w-full">
            <LoginForm />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
Loginmodal;
