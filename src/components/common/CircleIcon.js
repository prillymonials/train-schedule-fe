import { LocationMarkerIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const CircleIcon = ({ code, name, className }) => {
  return (
    <Link to={`/schedules/${code}`}>
      <div className={`mx-2 w-16 flex flex-col justify-start items-center ${className}`}>
        <div className="p-4 w-16 h-16 flex justify-center items-center rounded-full bg-blue-500 text-white">
          <LocationMarkerIcon className="h-6 w-6" />
        </div>
        <label className="text-xs text-center mt-2">{name}</label>
      </div>
    </Link>
  );
}

export default CircleIcon;
