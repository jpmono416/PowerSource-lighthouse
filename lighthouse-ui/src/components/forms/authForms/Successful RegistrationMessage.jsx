import Button from "../../library/Button";
import Modal from "../../library/Modal";

export default function SuccessfulRegistrationMessage({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center justify-center" role="alert">
        <h3 className="text-green-200 font-light text-3xl mb-2">Success</h3>
        <p className="text-green-50">Your account has been created</p>
        <Button
          primary
          className="mt-6 "
          onClick={() => onClose({ doShowSignInForm: true })}
        >
          Sign-In
        </Button>
      </div>
    </Modal>
  );
}
