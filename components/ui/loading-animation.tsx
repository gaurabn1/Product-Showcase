export const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-[300px]">
      <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-t-transparent border-blue-500" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
};

