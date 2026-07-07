import { forwardRef, useId } from "react";

function Select({ id, label, options = [], className = "", ...props }, ref) {
  const generatedId = useId();
  const selectId = id || generatedId;

  // Render a reusable select input with customizable options and styles
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1 inline-block pl-1 font-semibold"
        >
          {label}
        </label>
      )}

      <select
        id={selectId}
        ref={ref}
        className={`w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-black duration-200 outline-none focus:bg-gray-50 ${className}`}
        {...props}
      >
        {options.map(({ label, value }) => (
          <option key={String(value)} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
