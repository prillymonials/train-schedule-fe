import thousandSeparator from '../../helpers/thousandSeparator';

const BookCard = ({
  trainId,
  trainLine,
  routeStationFrom,
  routeStationTo,
  bookStationFrom,
  bookStationTo,
  startTime,
  endTime,
  bookDate,
  bookTime,
  rate,
  disabled,
}) => {
  return (
    <div
      className={`p-4 mb-4 shadow-lg border-2 border-transparent rounded-md ${disabled ? 'bg-gray-200' : ''}`}
    >
      <div className="flex justify-between">
        <label className="text-xs">{trainId}</label>
        <label className="text-xs">{trainLine}</label>
      </div>
      <p className="text-md font-bold uppercase mt-2 mb-1">{routeStationFrom} - {routeStationTo}</p>
      <label className="text-xs">{startTime} - {endTime}</label>
      <hr className={`my-2 ${disabled ? 'border-white' : ''}`} />
      <div className="flex flex-row justify-between text-xs mb-2">
        <b>Book</b>
        <label>{bookDate} {bookTime}</label>
      </div>
      <div className="flex flex-row justify-between text-xs mb-2">
        <b>From</b>
        <label>{bookStationFrom}</label>
      </div>
      <div className="flex flex-row justify-between text-xs mb-2">
        <b>To</b>
        <label>{bookStationTo}</label>
      </div>
      <div className="flex flex-row justify-between text-xs mb-2">
        <b>Rate</b>
        <label>{thousandSeparator(rate)}</label>
      </div>
    </div>
  )
};

export default BookCard;
