
const LoadingSpinner = () => {
  return <div className="bg-[#ffffff] flex flex-col items-center justify-center p-4 w-full">
    <div style={{ width: 40, height: 40 }} className="relative">
      <div className="absolute inset-0 border-4 border-[#000000] rounded-full"></div>
      <div
        className="absolute inset-0 border-4 border-t-[#000000] rounded-full animate-spin"
        style={{ borderTopColor: '#000000' }}
      ></div>
    </div></div>;
}

export default LoadingSpinner;