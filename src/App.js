import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Schedule from "./components/Schedule";
import ScheduleList from "./components/Schedule/ScheduleList";
import ScheduleRoute from "./components/Schedule/Route";
import Account from "./components/Account";
import Books from "./components/Books";
import BookForm from "./components/Books/BookForm";

function App({ errorMessage }) {
  return (
    <div className="container mx-auto px-4 h-screen">
      <Header />
      <div className={`${errorMessage ? '' : 'hidden'} absolute top-16 left-2 right-2 p-2 bg-blue-600 bg-opacity-80 rounded-sm text-white z-50 font-bold`}>
        {errorMessage}
      </div>
      <div className="flex-1 pt-16 pb-24">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/schedules" component={Schedule} />
          <Route path="/schedules/routes/:id" component={ScheduleRoute} />
          <Route path="/schedules/:code" component={ScheduleList} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/new" component={BookForm} />
          <Route exact path="/account" component={Account} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    errorMessage: state.app.errorMessage
  };
}

export default connect(mapStateToProps)(App);
