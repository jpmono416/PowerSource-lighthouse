import { useEffect, useState } from "react";

import Button from "../../library/Button";
import ConfirmPasswordInputField from "./inputFields/ConfirmPasswordInputField";
import EmailAddressInputField from "./inputFields/EmailAddressInputField";
import UserDetailsValidator from "../../../utils/validators/UserDetailsValidator";
import PasswordInputField from "./inputFields/PasswordInputField";
import RenderedErrors from "../../library/RenderedErrors";
import UserNameInputField from "./inputFields/UserNameInputField";

export default function UserDetailsForm({
  headingText,
  submitButtonText,
  activeFields,
  errors,
  isLoading,
  handleClearErrors,
  onSubmit,
  doSkipValidation,
  defaultValues,
}) {
  const [username, setUsername] = useState(defaultValues?.username ?? "");
  const [emailAddress, setEmailAddress] = useState(
    defaultValues?.emailAddress ?? ""
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = (setter, value) => {
    if (errors?.length > 0 && typeof handleClearErrors === "function")
      handleClearErrors();
    setter(value);
  };

  useEffect(() => {
    if (defaultValues?.username) setUsername(defaultValues.username);
    if (defaultValues?.emailAddress)
      setEmailAddress(defaultValues.emailAddress);
  }, [defaultValues]);

  const submission = {
    username,
    emailAddress,
    password,
    confirmPassword,
  };

  for (const field in submission) {
    if (!activeFields[field]) delete submission[field];
  }

  const isFormValidated =
    doSkipValidation || UserDetailsValidator.isValidated(submission);

  submission.email = submission.emailAddress;
  const updatesMade =
    !defaultValues ||
    Object.keys(activeFields).some((field) => {
      return submission[field] !== defaultValues[field];
    });

  const submitIsDisabled =
    errors?.length > 0 || !isFormValidated || !updatesMade;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitIsDisabled) return;
    delete submission.confirmPassword;
    onSubmit(submission);
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-2 w-[95vw] max-w-md"
      onSubmit={handleSubmit}
      role="form"
    >
      <h2 className="mb-4 text-3xl font-light text-primary-200" role="heading">
        {headingText}
      </h2>

      <UserNameInputField
        userNameValue={username}
        isDisabled={isLoading}
        onChange={(e) => handleUpdate(setUsername, e.target.value)}
        isActive={activeFields?.username}
        doSkipValidation={doSkipValidation}
      />

      <EmailAddressInputField
        emailAddressValue={emailAddress}
        isDisabled={isLoading}
        onChange={(e) => handleUpdate(setEmailAddress, e.target.value)}
        isActive={activeFields?.emailAddress}
        doSkipValidation={doSkipValidation}
      />

      <PasswordInputField
        passwordValue={password}
        isDisabled={isLoading}
        onChange={(e) => handleUpdate(setPassword, e.target.value)}
        isActive={activeFields?.password}
        doSkipValidation={doSkipValidation}
      />

      <ConfirmPasswordInputField
        passwordValue={password}
        confirmPasswordValue={confirmPassword}
        isDisabled={isLoading}
        onChange={(e) => handleUpdate(setConfirmPassword, e.target.value)}
        isActive={activeFields?.confirmPassword}
        doSkipValidation={doSkipValidation}
      />

      <input type="submit" className="hidden" />
      <Button
        primary
        className="mt-8"
        isLoading={isLoading}
        isDisabled={submitIsDisabled}
        onClick={handleSubmit}
        title="Submit"
        type="submit"
      >
        {submitButtonText}
      </Button>
      <RenderedErrors errors={errors} />
    </form>
  );
}
