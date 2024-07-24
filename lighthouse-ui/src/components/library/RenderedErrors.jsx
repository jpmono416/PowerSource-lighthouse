export default function RenderedErrors({ errors }) {
  if (!errors || errors.length === 0) return;

  const errorItems = errors.map((error, i) => {
    return (
      <li key={i} className="text-primary-800 list-none">
        <span className="text-xl font-bold">! </span>
        {error}
      </li>
    );
  });

  return (
    <div className="mt-4 p-2 pl-4 bg-secondary-50 bg-opacity-80" role="alert">
      {errorItems}
    </div>
  );
}
