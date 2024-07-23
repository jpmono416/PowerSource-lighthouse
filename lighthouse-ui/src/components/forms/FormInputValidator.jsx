import { useEffect, useState } from "react";
import classNames from "classnames";

export default function FormInputValidator({
  values,
  validator,
  className,
  children,
  doSkipValidation,
  doUseDarkText = false,
}) {
  const [doShowErrors, setDoShowErrors] = useState(false);

  const handleBlur = () => {
    if (doSkipValidation) return setDoShowErrors(false);
    setDoShowErrors(true);
  };

  useEffect(() => {
    if (doSkipValidation) setDoShowErrors(false);
  }, [doSkipValidation]);

  const [isValid, error] = validator(...values);
  const errorMessage = !isValid && (
    <p
      className={classNames("pl-2", {
        "text-primary-500": !doUseDarkText,
        "text-primary-800": doUseDarkText,
      })}
      role="alert"
    >
      {error}
    </p>
  );

  const classes = classNames("w-full mb-2", className);

  return (
    <div className={classes} onBlur={handleBlur}>
      {children}
      {doShowErrors && errorMessage}
    </div>
  );
}
