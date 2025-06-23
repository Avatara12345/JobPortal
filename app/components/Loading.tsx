

const Loading = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto  p-6 rounded-lg shadow">
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
