import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BASE_URL_API } from "../../constants/common";
import { setBackButton, setTitle } from "../../redux/actions/app";
import BookCard from "../common/BookCard";
import NoListCard from "../common/NoListCard";
import NearMe from "./NearMe";

const Home = (props) => {
  const [stations, setStations] = useState([]);
  const [books, setBooks] = useState([]);
  const [isLoadingBooks, setLoadingBooks] = useState(true);
  const [isLoadingStation, setLoadingStation] = useState(true);
  const [error, setError] = useState('Please allow the access location.');

  useEffect(() => {
    props.setBackButton(false);
    props.setTitle('Train Schedule');

    async function fetchStations() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          try {
            setError('');
            const stationResponse = await axios.get(`${BASE_URL_API}/stations`, {
              params: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
            });
            setStations(stationResponse.data);
          } catch (error) {
            setError('Please try again later.');
          } finally {
            setLoadingStation(false);
          }
        });
      } else {
        setError('Location is not supported by this browser.');
        setLoadingStation(false);
      }
    }
    async function fetchTodayBook() {
      try {
        const stationResponse = await axios.get(`${BASE_URL_API}/books/today`, {
          params: {
            user_id: props.userId
          },
        });
        setBooks(stationResponse.data);
      } catch (error) {
        // Do Nothing
      } finally {
        setLoadingBooks(false);
      }
    }
    fetchStations();
    if (props.userId !== null) {
      fetchTodayBook();
    }
  }, [props]);

  return (
    <>
      <h2 className="font-bold text-lg">Today Book</h2>
      {props.userId === null ? (
        <NoListCard label="Please login to see today book." />
      ) : isLoadingBooks ? (
        <div className="flex justify-center">
          <img src="/loading.gif" alt="Loading" className="w-10 h-10" />
        </div>
      ) : books.length === 0 ? (
        <NoListCard label="No today book." />
      ) : books.map(book => (
        <BookCard
          key={`books-${book.id}`}
          id={book.id}
          trainId={book.train_id}
          trainLine={book.train_line}
          routeStationFrom={book.route_station_from}
          routeStationTo={book.route_station_to}
          startTime={book.start_time}
          endTime={book.end_time}
          bookStationFrom={book.book_station_from}
          bookStationTo={book.book_station_to}
          bookDate={book.book_date}
          bookTime={book.book_time}
          rate={book.rate}
        />
      ))}
      <h2 className="font-bold text-lg">Station Near Me</h2>
      <NearMe error={error} stations={stations} isLoading={isLoadingStation} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.app.userId,
  };
};

const mapDispatchToProps = {
  setBackButton,
  setTitle
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
