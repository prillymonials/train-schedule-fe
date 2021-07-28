import { PlusIcon } from '@heroicons/react/outline';
import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL_API } from "../../constants/common";
import { setBackButton, setTitle } from "../../redux/actions/app";
import BookCard from "../common/BookCard";
import NoListCard from "../common/NoListCard";

const Books = (props) => {
  const [activeBooks, setActiveBooks] = useState([]);
  const [historyBooks, setHistoryBooks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    props.setBackButton(false);
    props.setTitle('Books');

    async function fetchBooks() {
      try {
        const activeBooksResponse = await axios.get(`${BASE_URL_API}/books/active`, {
          params: { user_id: props.userId },
        });
        const historyBooksResponse = await axios.get(`${BASE_URL_API}/books/history`, {
          params: { user_id: props.userId },
        });
        setActiveBooks(activeBooksResponse.data);
        setHistoryBooks(historyBooksResponse.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    if (props.userId !== null) {
      fetchBooks();
    }
  }, [props]);

  if (props.userId === null) {
    return (
      <p className="text-center font-bold">Please login to get your book list.</p>
    );
  }
  
  return (
    <>
      <div className="fixed bottom-24 right-1/2 transform translate-x-1/2">
        <Link to="/books/new">
          <div className="p-4 bg-blue-400 rounded-full">
            <PlusIcon className="w-6 h-6 text-white" />
          </div>
        </Link>
      </div>
      <h2 className="font-bold text-lg mb-2">Active Book</h2>
      {isLoading ? (
        <div className="flex justify-center">
          <img src="/loading.gif" alt="Loading" className="w-10 h-10" />
        </div>
      ) : activeBooks.length === 0 ? (
        <NoListCard label="No Active Book list." />
      ) : activeBooks.map(book => (
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
      <h2 className="font-bold text-lg mb-2">History</h2>
      {isLoading ? (
        <div className="flex justify-center">
          <img src="/loading.gif" alt="Loading" className="w-10 h-10" />
        </div>
      ) : activeBooks.length === 0 ? (
        <NoListCard label="No History Book list." />
      ) : historyBooks.map(book => (
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
          disabled
        />
      ))}
    </>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);
