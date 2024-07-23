import classNames from "classnames";

export default function FormInput({
  value,
  title,
  placeholder,
  type,
  isDisabled,
  onChange,
}) {
  const inputClasses = classNames("w-full px-2 py-1 text-secondary-900", {
    disabled: isDisabled,
  });

  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      title={title}
      className={inputClasses}
      role="textbox"
      disabled={isDisabled}
      onChange={onChange}
    />
  );
}
