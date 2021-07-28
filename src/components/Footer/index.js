import { withRouter } from 'react-router-dom';
import {
  HomeIcon as OHomeIcon,
  CalendarIcon as OCalendarIcon,
  NewspaperIcon as ONewspaperIcon,
  UserIcon as OUserIcon,
} from '@heroicons/react/outline';
import {
  HomeIcon as SHomeIcon,
  CalendarIcon as SCalendarIcon,
  NewspaperIcon as SNewspaperIcon,
  UserIcon as SUserIcon,
} from '@heroicons/react/solid';
import MenuItem from './MenuItem';

const Footer = (props) => {
  const { pathname } = props.location

  const HomeIcon = pathname === '/' ? SHomeIcon : OHomeIcon;
  const CalendarIcon = pathname.startsWith('/schedules') ? SCalendarIcon : OCalendarIcon;
  const NewspaperIcon = pathname.startsWith('/books') ? SNewspaperIcon : ONewspaperIcon;
  const UserIcon = pathname.startsWith('/account') ? SUserIcon : OUserIcon;

  return (
    <footer className="p-4 fixed bottom-0 left-0 right-0 flex justify-around z-10 bg-blue-400 text-white">
      <MenuItem Icon={HomeIcon} to="/" label="Home" />
      <MenuItem Icon={CalendarIcon} to="/schedules" label="Schedules" />
      <MenuItem Icon={NewspaperIcon} to="/books" label="Booking" />
      <MenuItem Icon={UserIcon} to="/account" label="Account" />
    </footer>
  );
}

export default withRouter(Footer);
