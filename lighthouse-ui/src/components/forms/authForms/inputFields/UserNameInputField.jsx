import FormItem from "../../FormItem";
import FormInput from "../../FormInput";
import FormInputValidator from "../../FormInputValidator";
import UserDetailsValidator from "../../../../utils/validators/UserDetailsValidator";

export default function UserNameInputField({
  label = "Username",
  userNameValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
}) {
  if (!isActive) return;

  return (
    <FormInputValidator
      className="mb-2 max-w-[20rem]"
      values={[userNameValue]}
      validator={UserDetailsValidator.validateUsername}
      doSkipValidation={doSkipValidation}
    >
      <FormItem labelTitle={label}>
        <FormInput
          value={userNameValue}
          title={label}
          placeholder="your-username"
          type="text"
          isDisabled={isDisabled}
          onChange={onChange}
        />
      </FormItem>
    </FormInputValidator>
  );
}
