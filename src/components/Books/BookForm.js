import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BASE_URL_API } from "../../constants/common";
import thousandSeparator from "../../helpers/thousandSeparator";
import { setBackButton, setTitle, showErrorMessage } from "../../redux/actions/app";
import Input from "../common/Input";
import Select from "../common/Select";

const BookForm = (props) => {
  // Form
  const [stationFrom, setStationFrom] = useState('');
  const [route, setRoute] = useState('');
  const [stationTo, setStationTo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [rate, setRate] = useState('');

  // Loading
  const [isLoadingStationFrom, setLoadingStationFrom] = useState(true);
  const [isLoadingRoute, setLoadingRoute] = useState(false);
  const [isLoadingStationTo, setLoadingStationTo] = useState(false);
  const [isLoadingTime, setLoadingTime] = useState(false);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);

  // Options
  const [stationFromList, setStationFromList] = useState([]);
  const [routeList, setRouteList] = useState([]);
  const [stationToList, setStationToList] = useState([]);
  const [timeList, setTimeList] = useState([]);

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const tomorrowMonth = `0${currentDate.getMonth() + 1}`.slice(-2);
  const tomorrowDate = `0${currentDate.getDate()}`.slice(-2);
  const tomorrow = `${currentDate.getFullYear()}-${tomorrowMonth}-${tomorrowDate}`

  const buttonDisabled = !(stationFrom !== '' && route !== '' && stationTo !== '' && date !== '' && time !== '');

  useEffect(() => {
    props.setBackButton(true);
    props.setTitle('New Booking');

    async function fetchStations() {
      try {
        const stations = await axios.get(`${BASE_URL_API}/stations`);
        setStationFromList(stations.data.map(station => ({
          label: station.name,
          value: station.code,
        })));
        setLoadingStationFrom(false);
      } catch (e) {
        setLoadingStationFrom(false);
      }
    };
    if (props.userId !== null) {
      fetchStations();
    }
  }, [props]);

  async function getRoutesFromStationFrom(stationFromValue) {
    try {
      const routes = await axios.get(`${BASE_URL_API}/books/routes/${stationFromValue}`);
      setRouteList(routes.data.map(route => ({
        label: `${route.station_name_from} - ${route.station_name_to} ${
          route.remarks ? `(${route.remarks})` : ''
        }`,
        value: route.id,
      })));
      setLoadingRoute(false);
    } catch (e) {
      setLoadingRoute(false);
    }
  }

  async function getStationToFromRoutes(routeId) {
    try {
      const stations = await axios.get(`${BASE_URL_API}/books/stations/${routeId}`);
      let fromAndToCodeIsEqual = false;
      const stationList = [];
      stations.data.forEach(station => {
        if (fromAndToCodeIsEqual) {
          stationList.push({
            label: station.name,
            value: station.station_code,
          });
        }

        if (!fromAndToCodeIsEqual && station.station_code === stationFrom) {
          fromAndToCodeIsEqual = true;
        }
      });
      setStationToList(stationList);
      setLoadingStationTo(false);
    } catch (e) {
      setLoadingStationTo(false);
    }
  }

  async function getScheduleAndRates(stationToValue) {
    try {
      const schedules = await axios.get(`${BASE_URL_API}/books/schedules/${route}/${stationFrom}`);
      const rates = await axios.get(`${BASE_URL_API}/books/rates/${stationFrom}/${stationToValue}`);
      
      setTimeList(schedules.data.map(schedule => ({
        label: schedule.arrival_time,
        value: schedule.arrival_time,
      })));
      setRate(rates.data[0].rate);
      setLoadingTime(false);
    } catch (e) {
      setLoadingTime(false);
    }
  }

  async function handleSubmitForm() {
    if (buttonDisabled) {
      return;
    }
    setLoadingSubmit(true);

    try {
      await axios.post(`${BASE_URL_API}/books`, {
        userId: props.userId,
        routeId: route,
        stationCodeFrom: stationFrom,
        stationCodeTo: stationTo,
        bookTime: time,
        bookDate: date,
        rate,
      });
      
      props.showErrorMessage('Your book successfully submitted.');
      props.history.replace('/books');
    } catch (e) {
      setLoadingSubmit(false);
      props.showErrorMessage(e.response.data.message);
    }
  }

  function handleChangeStationFrom(value) {
    setRoute('');
    setStationTo('');
    setDate('');
    setTime('');
    setRate('');
    setRouteList([]);
    setStationToList([]);
    setTimeList([]);
    setLoadingRoute(true);
    getRoutesFromStationFrom(value);
    setStationFrom(value);
  }

  function handleChangeRoute(value) {
    setStationTo('');
    setDate('');
    setTime('');
    setRate('');
    setStationToList([]);
    setTimeList([]);
    setLoadingStationTo(true);
    getStationToFromRoutes(value);
    setRoute(value);
  }

  function handleChangeStationTo(value) {
    setDate('');
    setTime('');
    setRate('');
    setTimeList([]);
    setLoadingTime(true);
    getScheduleAndRates(value);
    setStationTo(value);
  }

  if (props.userId === null) {
    return (
      <p className="text-center font-bold">Please login to create a book.</p>
    );
  }

  return (
    <div className="flex flex-col">
      {isLoadingStationFrom ? (
        <div className="flex justify-center mt-2">
          <img src="/loading.gif" alt="Loading" className="w-10 h-10" />
        </div>
      ) : (
        <div className="mb-2">
          <label className="text-xs text-gray-500">Your Station</label>
          <Select
            name="stationFrom"
            value={stationFrom}
            options={stationFromList}
            onChange={e => handleChangeStationFrom(e.target.value)}
          />
        </div>
      )}
      {stationFrom !== '' ?
        isLoadingRoute ? (
          <div className="flex justify-center mt-2">
            <img src="/loading.gif" alt="Loading" className="w-10 h-10" />
          </div>
        ) : (
          <div className="mb-2">
            <label className="text-xs text-gray-500">Routes</label>
            <Select
              name="routes"
              value={route}
              options={routeList}
              onChange={e => handleChangeRoute(e.target.value)}
            />
          </div>
        ) : null
      }
      {stationFrom !== '' && route !== '' ? isLoadingStationTo ? (
        <div className="flex justify-center mt-2">
          <img src="/loading.gif" alt="Loading" className="w-10 h-10" />
        </div>
      ) : (
        <div className="mb-2">
          <label className="text-xs text-gray-500">Destination</label>
          <Select
            name="stationTo"
            value={stationTo}
            options={stationToList}
            onChange={e => handleChangeStationTo(e.target.value)}
          />
        </div>
      ) : null}
      {stationFrom !== '' && route !== '' && stationTo !== '' ? isLoadingTime ? (
        <div className="flex justify-center mt-2">
          <img src="/loading.gif" alt="Loading" className="w-10 h-10" />
        </div>
      ) : (
        <>
          <div className="mb-2">
            <label className="text-xs text-gray-500">Date</label>
            <Input
              type="date"
              min={tomorrow}
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="text-xs text-gray-500">Time</label>
            <Select
              name="time"
              value={time}
              options={timeList}
              onChange={e => setTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-xs text-gray-500">Rate</label>
            <Input
              value={thousandSeparator(rate)}
              disabled
            />
          </div>
          {isLoadingSubmit ? (
            <div className="flex justify-center mt-2">
              <img src="/loading.gif" alt="Loading" className="w-10 h-10" />
            </div>
          ) : (
            <button
              className="bg-blue-400 text-white py-2 w-full rounded-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={() => handleSubmitForm()}
              disabled={buttonDisabled}
            >
              Submit
            </button>
          )}
        </>
      ) : null}
    </div>
  )
};

const mapStateToProps = state => {
  return {
    userId: state.app.userId,
  };
}

const mapDispatchToProps = {
  setBackButton,
  setTitle,
  showErrorMessage
};

const RouteBookForm = withRouter(BookForm);
export default connect(mapStateToProps, mapDispatchToProps)(RouteBookForm);
