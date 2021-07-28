import CircleIcon from "../common/CircleIcon";

const NearMe = ({ stations, error, isLoading }) => {
  return (
    <div className="relative">
      <div className={`mt-2 p-2 flex ${isLoading && !error ? 'justify-center' : ''} items-start w-full max-w-full overflow-hidden overflow-x-auto`}>
        {error && [...Array(4).keys()].map(index => (
          <CircleIcon key={`station-${index}`} name="Station" code="" />
        ))}
        {!error && isLoading && (
          <img src="/loading.gif" alt="Loading" className="w-10 h-10" />
        )}
        {stations.map(station => (
          <CircleIcon key={`station-${station.id}`} name={station.name} code={station.code} />
        ))}
      </div>
      {error && (
        <div className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 bg-gray-600 bg-opacity-60">
          <p className="text-white font-bold">{error}</p>
        </div>
      )}
    </div>
  );
}

export default NearMe;
