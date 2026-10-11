const Button = ({
  children,
  type = "button",
  bgColor = "bg-violet-600",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  // Render a reusable button with customizable styles
  return (
    <button
      type={type}
      className={`cursor-pointer transition-all active:scale-95 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
