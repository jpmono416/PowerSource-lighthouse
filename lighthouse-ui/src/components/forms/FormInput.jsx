import classNames from "classnames";

export default function FormInput({ isDisabled, ...props }) {
  const inputClasses = classNames("w-full px-2 py-1 text-secondary-900", {
    disabled: isDisabled,
  });

  return (
    <input
      {...props}
      role="textbox"
      className={inputClasses}
      disabled={isDisabled}
    />
  );
}
