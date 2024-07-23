import FormItem from "../../FormItem";
import FormInput from "../../FormInput";
import FormInputValidator from "../../FormInputValidator";
import UserDetailsValidator from "../../../../utils/validators/UserDetailsValidator";

export default function EmailAddressInputField({
  label = "Email address",
  emailAddressValue,
  isDisabled,
  onChange,
  isActive,
  doSkipValidation,
}) {
  if (!isActive) return;

  return (
    <FormInputValidator
      className="mb-4 max-w-[20rem]"
      values={[emailAddressValue]}
      validator={UserDetailsValidator.validateEmailAddress}
      doSkipValidation={doSkipValidation}
    >
      <FormItem labelTitle={label}>
        <FormInput
          value={emailAddressValue}
          title={label}
          placeholder="your@email.com"
          type="email"
          isDisabled={isDisabled}
          onChange={onChange}
        />
      </FormItem>
    </FormInputValidator>
  );
}
