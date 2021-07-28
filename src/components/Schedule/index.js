import axios from 'axios';
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { BASE_URL_API } from '../../constants/common';
import { setBackButton, setTitle } from '../../redux/actions/app';
import CircleIcon from '../common/CircleIcon';
import Input from '../common/Input';

const Schedule = (props) => {
  const [stations, setStations] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    props.setBackButton(false);
    props.setTitle('Schedule');

    async function fetchStations() {
      try {
        const stationResponse = await axios.get(`${BASE_URL_API}/stations`);

        setStations(stationResponse.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    fetchStations();
  }, [props]);

  const filteredSchedule = stations.filter(
    station => station.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <h2 className="font-bold text-lg mb-2">Select Stations</h2>
      {!isLoading && (
        <div className="mb-8">
          <label className="text-xs text-gray-500">Search Station</label>
          <Input
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
      )}
      {isLoading ? (
        <div className="flex justify-center">
          <img src="/loading.gif" alt="Loading" className="w-10 h-10" />
        </div>
      ) : filteredSchedule.length === 0 ? (
        <p>No Station found.</p>
      ) : (
        <div className="flex max-w-full flex-row flex-wrap">
          {filteredSchedule.map(station => (
            <CircleIcon
              key={`station-${station.id}`}
              code={station.code}
              name={station.name}
              className="mb-4 cursor-pointer"
            />
          ))}
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = {
  setBackButton,
  setTitle,
};

const RouteSchedule = withRouter(Schedule);
export default connect(undefined, mapDispatchToProps)(RouteSchedule);
