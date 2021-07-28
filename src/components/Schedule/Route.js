import { StopIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BASE_URL_API, StationStatus } from "../../constants/common";
import getTimeNumber from "../../helpers/getTimeNumber";
import { setBackButton, setTitle } from "../../redux/actions/app";

const StationRow = ({ name, arrivalTime, status }) => {
  const classStatus = status === StationStatus.PASSED ? 'text-gray-400' :
    status === StationStatus.CURRENT ? 'font-bold text-blue-800' : '';
  return (
    <div className="flex items-center mb-3">
      <StopIcon className={`w-6 h-6 mr-2 ${classStatus}`} />
      <label className={`flex-1 ${classStatus}`}>{name}</label>
      <label className={`text-xs ${classStatus}`}>{arrivalTime}</label>
    </div>
  );
}

const ScheduleRoute = (props) => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const scheduleId = props.match.params.id;
  let currentStation = false;
  const currentDate = new Date();
  const currentTime = getTimeNumber(`${currentDate.getHours()}:${currentDate.getMinutes()}:00`);

  useEffect(() => {
    props.setBackButton(true);
    props.setTitle('Schedule');

    async function fetchSchedules() {
      try {
        const schedulesResponse = await axios.get(
          `${BASE_URL_API}/schedules/details/${scheduleId}`
        );
        setSchedules(schedulesResponse.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, [scheduleId, props]);

  return (
    <div className="relative">
      {isLoading ? (
        <div className="flex justify-center">
          <img src="/loading.gif" alt="Loading" className="w-10 h-10" />
        </div>
      ) : (
        schedules.map(schedule => {
          let status = StationStatus.PASSED;
          const scheduleTime = getTimeNumber(schedule.arrival_time);

          if (currentTime <= scheduleTime) {
            if (!currentStation) {
              currentStation = true;
              status = StationStatus.CURRENT;
            } else {
              status = StationStatus.NEXT;
            }
          }

          return (
            <StationRow
              key={`station-${schedule.id}`}
              name={schedule.name}
              arrivalTime={schedule.arrival_time}
              status={status}
            />
          );
        })
      )}
    </div>
  );
};

const mapDispatchToProps = {
  setBackButton,
  setTitle,
};

const RouteScheduleRoute = withRouter(ScheduleRoute);
export default connect(undefined, mapDispatchToProps)(RouteScheduleRoute);
