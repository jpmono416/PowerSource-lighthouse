import classNames from "classnames";

export default function FormItem({
  labelTitle,
  doUseDarkText = false,
  children,
  maxWidth = "max-w-[20rem]",
  required,
}) {
  return (
    <div className={classNames("w-full px-2 flex flex-col gap-1", maxWidth)}>
      <div className="relative w-fit">
        <label
          className={classNames({
            "text-secondary-50": !doUseDarkText,
            "text-secondary-800": doUseDarkText,
          })}
        >
          {labelTitle}
        </label>
        {required && (
          <div className="absolute right-[-0.6rem] top-[-0.2rem] text-primary-700">
            *
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
