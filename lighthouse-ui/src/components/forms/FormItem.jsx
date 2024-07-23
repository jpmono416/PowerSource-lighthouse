import classNames from "classnames";

export default function FormItem({
  labelTitle,
  doUseDarkText = false,
  children,
  maxWidth = "max-w-[20rem]",
}) {
  return (
    <div className={classNames("w-full px-2 flex flex-col gap-1", maxWidth)}>
      <label
        className={classNames("w-full", {
          "text-secondary-50": !doUseDarkText,
          "text-secondary-800": doUseDarkText,
        })}
      >
        {labelTitle}
      </label>
      {children}
    </div>
  );
}
