export default function Loading( {isThereAnyTask=true} ) {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col space-y-4">
      {isThereAnyTask && (
        <>
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-black"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"></div>
        </div>
        <p className="text-center text-lg font-semibold text-gray-800">
          Fetching Tasks...
        </p>
        </>
      )}
      {!isThereAnyTask && (
        <p className="text-center text-lg font-semibold text-gray-800">
          No Tasks...
        </p>
      )}
    </div>
  );
}
