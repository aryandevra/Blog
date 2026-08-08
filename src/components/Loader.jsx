const Loader = ({ className = '' }) => {
  // Render a loading spinner
  return (
    <div
      className={`h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black xl:h-18 xl:w-18 ${className}`}
    />
  );
};

export default Loader;
