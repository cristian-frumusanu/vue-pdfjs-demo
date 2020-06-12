import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faChevronDown,
  faSearch,
  faFileAlt,
  faArrowLeft,
  faMinus,
  faPlus,
  faArrowUp,
  faArrowDown,
  faCaretRight,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faStar,
  faChevronRight,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faHome,
  faChevronDown,
  faSearch,
  faFileAlt,
  faArrowLeft,
  faMinus,
  faPlus,
  faArrowUp,
  faArrowDown,
  faCaretRight,
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faStar,
  faChevronRight,
  faCaretDown
);

const initFonts = vue => {
  vue.component('font-awesome-icon', FontAwesomeIcon);
};

export default initFonts;
