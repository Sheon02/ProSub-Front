const Loader = () => {
  return (
    <div 
      className="mx-auto block h-25 w-25 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;