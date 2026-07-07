function Button({
  children,
  type = "button",
  bgColor = "bg-violet-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  // Render a reusable button with customizable styles
  return (
    <button
      type={type}
      className={`cursor-pointer ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
