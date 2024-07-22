import { CgSpinner } from "react-icons/cg";

export default function LoadingSpinner() {
  return (
    <CgSpinner
      className="animate-spin text-2xl"
      role="status"
      aria-label="loading spinner"
    />
  );
}
