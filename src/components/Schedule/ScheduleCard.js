import { withRouter } from "react-router-dom";

const ScheduleCard = ({
  id,
  trainId,
  trainLine,
  stationFrom,
  stationTo,
  startTime,
  endTime,
  disabled,
  history,
}) => {
  function handleClickCard() {
    if (!disabled) {
      history.push(`/schedules/routes/${id}`);
    }
  }

  return (
    <div
      className={`p-4 mb-4 shadow-lg border-2 border-transparent rounded-md ${disabled ? 'bg-gray-200' : 'hover:border-gray-50 cursor-pointer'}`}
      onClick={() => handleClickCard()}
    >
      <div className="flex justify-between">
        <label className="text-xs">{trainId}</label>
        <label className="text-xs">{trainLine}</label>
      </div>
      <p className="text-md font-bold uppercase mt-2 mb-1">{stationFrom} - {stationTo}</p>
      <label className="text-xs">{startTime} - {endTime}</label>
    </div>
  )
};

export default withRouter(ScheduleCard);
