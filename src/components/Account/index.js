import { UserIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout, setBackButton, setTitle } from "../../redux/actions/app";
import UserForm from "./UserForm"

const Account = (props) => {
  useEffect(() => {
    props.setBackButton(false);
    props.setTitle('Account');
  }, [props]);

  function handleLogout() {
    localStorage.removeItem('_userId');
    localStorage.removeItem('_username');
    props.logout();
  }

  return props.userId ? (
    <div className="flex flex-col items-center mt-8">
      <div className="bg-blue-500 rounded-full p-4 w-14 h-14">
        <UserIcon className="w-6 h-6 text-white" />
      </div>
      <label className="font-bold text-gray-600 mt-2 mb-6">{props.username}</label>
      <button
        className="w-full border border-blue-400 py-2 text-blue-400 bg-white font-bold rounded-sm"
        onClick={() => handleLogout()}
      >
        Sign Out
      </button>
    </div>
  ) : (
    <UserForm />
  );
};

const mapStateToProps = state => {
  return {
    userId: state.app.userId,
    username: state.app.username,
  };
}

const mapDispatchToProps = {
  setTitle,
  setBackButton,
  logout,
};

const RouteAccount = withRouter(Account);
export default connect(mapStateToProps, mapDispatchToProps)(RouteAccount);
