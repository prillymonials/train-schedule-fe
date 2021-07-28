import { ArrowLeftIcon } from "@heroicons/react/outline";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Header = ({ hasBackButton, title, history }) => {
  function handleBackButton() {
    history.goBack();
  }

  return (
    <header className="py-4 fixed top-0 left-0 right-0 flex z-10 bg-blue-400 text-white">
      {hasBackButton && <ArrowLeftIcon className="w-6 h-6 ml-4" onClick={() => handleBackButton()} />}
      <h1 className={`text-center flex-1 font-bold ${hasBackButton ? 'pr-10' : ''}`}>
        {title}
      </h1>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    hasBackButton: state.app.hasBackButton,
    title: state.app.title,
  };
}

const RouteHeader = withRouter(Header);
export default connect(mapStateToProps)(RouteHeader);
