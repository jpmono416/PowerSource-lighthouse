import classNames from "classnames";

export default function FormInput({
  value,
  labelTitle,
  placeholder,
  type,
  isDisabled,
  onChange,
}) {
  const inputClasses = classNames("w-full px-2 py-1 text-secondary-900", {
    disabled: isDisabled,
  });

  return (
    <div className="w-full max-w-[20rem] px-2 flex flex-col gap-1">
      <label className="w-full text-secondary-50">{labelTitle}</label>
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        title={labelTitle}
        className={inputClasses}
        role="textbox"
        disabled={isDisabled}
        onChange={onChange}
      />
    </div>
  );
}
