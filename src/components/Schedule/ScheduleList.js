import axios from 'axios';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { BASE_URL_API } from '../../constants/common';
import getTimeNumber from '../../helpers/getTimeNumber';
import { setBackButton, setTitle } from '../../redux/actions/app';
import ScheduleCard from './ScheduleCard';

const ScheduleList = (props) => {
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const stationCode = props.match.params.code;
  
  useEffect(() => {
    props.setBackButton(true);
    props.setTitle(`Schedule - ${stationCode}`);

    async function fetchSchedules() {
      try {
        const schedulesResponse = await axios.get(
          `${BASE_URL_API}/schedules/${stationCode}`
        );
        const availableScheduleList = [];

        schedulesResponse.data.forEach(schedule => {
          const startTime = getTimeNumber(schedule.start_time);
          const endTime = getTimeNumber(schedule.end_time);

          const currentDate = new Date();
          const currentTime = (currentDate.getHours() === 0 ? 24 : currentDate.getHours()) * 60 + currentDate.getMinutes();

          if ((startTime <= currentTime && currentTime <= endTime) || (currentTime <= startTime)) {
            availableScheduleList.push(schedule);
          }
        });

        setAvailableSchedules(availableScheduleList);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    fetchSchedules();
  }, [props, stationCode]);

  return (
    <>
      <h2 className="font-bold text-lg mb-2">Available Schedule</h2>
      {isLoading ? (
        <div className="flex justify-center">
          <img src="/loading.gif" alt="Loading" className="w-10 h-10" />
        </div>
      ) : availableSchedules.map(schedule => (
        <ScheduleCard
          key={`schedule-${schedule.id}`}
          id={schedule.id}
          trainId={schedule.train_id}
          trainLine={schedule.train_line}
          stationFrom={schedule.station_from}
          stationTo={schedule.station_to}
          startTime={schedule.start_time}
          endTime={schedule.end_time}
        />
      ))}
    </>
  );
};

const mapDispatchToProps = {
  setBackButton,
  setTitle
};

const RouteScheduleList = withRouter(ScheduleList);
export default connect(undefined, mapDispatchToProps)(RouteScheduleList);
