import { Link } from "react-router-dom";

const MenuItem = ({ Icon, to, label }) => {
  return (
    <Link to={to}>
      <div className="flex flex-col items-center">
        <Icon className="h-6 w-6" />
        <label>{label}</label>
      </div>
    </Link>
  );
};

export default MenuItem;
