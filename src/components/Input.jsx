import { forwardRef, useId } from "react";

function Input(
  {
    id,
    label,
    type = "text",
    bgColor = "bg-white",
    textColor = "text-black",
    className = "",
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id || generatedId;

  // Render a reusable input with an optional label and customizable styles
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 inline-block pl-1 font-semibold"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        ref={ref}
        type={type}
        className={`w-full rounded-lg border border-gray-200 px-3 py-2 duration-200 outline-none focus:bg-gray-50 ${bgColor} ${textColor} ${className}`}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
