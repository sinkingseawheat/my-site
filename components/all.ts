/* Section */
import S from "./Sections/_";

export {S}

/* Layout */
import _L from './Layouts/_';
import column from "./Layouts/column/_";
import flex from "./Layouts/flex/_";
import modal from "./Layouts/modal/_";

const L = {
  ..._L,
  column,
  flex,
  modal,
}

export {L}

/* Component */
import List from "./List/_";
import ShareButton from "./ShareButton/_";
import SkipNav from "./SkipNav/_";
import Picture from "./Picture/_";
import LinkText from "./LinkText/_";
import Button from "./Button/_";
import ToggleHeaderFooter from "./ToggleHeaderFooter/_";
import PageList from "./PageList/_";
import BottomPopup from "./BottomPopup/_";
import SVGIcon from "./SVGIcon/_";
import Loader from "./Loader/_";
import Table from "./Table/_";
import AdsenseBlock from "./AdsenseBlock/_";

export {
  List,
  ShareButton,
  SkipNav,
  Picture,
  LinkText,
  Button,
  ToggleHeaderFooter,
  PageList,
  BottomPopup,
  SVGIcon,
  Loader,
  Table,
  AdsenseBlock,
}

/* Header Footer */
import Header from "./Header/_";
import Footer from "./Footer/_";

export {Header, Footer}

/* Form Component */
import InputText from "./Form/InputText/_";
import InputCheckboxes from "./Form/InputCheckboxes/_";
import Textarea from "./Form/Textarea/_";

const F = {
  InputText,
  InputCheckboxes,
  Textarea,
}

export { F }