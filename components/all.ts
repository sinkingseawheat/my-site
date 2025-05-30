/* Section */
import Section from "./Section/_";

export {Section}

/* Layout */
import _L from './Layouts/_';
import grid from "./Layouts/grid/_";
import flex from "./Layouts/flex/_";
import modal from "./Layouts/modal/_";
import item from "./Layouts/item/_";

const L = {
  ..._L,
  grid,
  flex,
  modal,
  item,
}

export {L}

/* Component */
import List from "./List/_";
import ShareButton from "./ShareButton/_";
import SkipNav from "./SkipNav/_";
import Picture from "./Picture/_";
import LinkElm from "./LinkElm/_";
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
  LinkElm,
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
import InputFileImages from "./Form/InputFileImages/_";
import Textarea from "./Form/Textarea/_";
import Button from "./Form/Button/_";

const F = {
  InputText,
  InputCheckboxes,
  InputFileImages,
  Textarea,
  Button,
}

export { F }