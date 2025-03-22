/* Section */
import S from "./Sections/_";

export {S}

/* Layout */
import _L from './Layouts/_';
import column from "./Layouts/column/_";

const L = {
  ..._L,
  column
}

export {L}

/* Component */
import List from "./List/_";
import GlobalMenu from "./GlobalMenu/_";
import ShareButton from "./ShareButton/_";
import SkipNav from "./SkipNav/_";
import Picture from "./Picture/_";
import LinkText from "./LinkText/_";
import Button from "./Button/_";
import ToggleHeaderFooter from "./ToggleHeaderFooter/_";
import PageList from "./PageList/_";
import BottomPopup from "./BottomPopup/_";

export {
  List,
  GlobalMenu,
  ShareButton,
  SkipNav,
  Picture,
  LinkText,
  Button,
  ToggleHeaderFooter,
  PageList,
  BottomPopup,
}

/* Header Footer */
import Header from "./Header/_";
import Footer from "./Footer/_";

export {Header, Footer}

/* Form Component */
import InputText from "./Form/InputText/_";
import InputCheckboxes from "./Form/InputCheckboxes/_";

const F = {
  InputText,
  InputCheckboxes,
}

export { F }