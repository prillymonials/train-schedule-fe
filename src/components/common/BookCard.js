import thousandSeparator from '../../helpers/thousandSeparator';

const BookCard = ({
  trainId,
  trainLine,
  routeStationFrom,
  routeStationTo,
  bookStationFrom,
  bookStationTo,
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
      <p className="text-md font-bold uppercase mt-2 mb-1">{bookStationFrom} - {bookStationTo}</p>
      <label className="text-xs">{bookDate} {bookTime}</label>
      <hr className={`my-2 ${disabled ? 'border-white' : ''}`} />
      <div className="flex flex-row justify-between text-xs mb-2">
        <b>Routes</b>
        <label>{routeStationFrom} - {routeStationTo}</label>
      </div>
      <div className="flex flex-row justify-between text-xs mb-2">
        <b>Rate</b>
        <label>{thousandSeparator(rate)}</label>
      </div>
    </div>
  )
};

export default BookCard;
