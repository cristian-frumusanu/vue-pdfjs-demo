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
  faExpandAlt,
  faCompressAlt,
  faPlusCircle,
  faMinusCircle,
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
  faCaretDown,
  faExpandAlt,
  faCompressAlt,
  faPlusCircle,
  faMinusCircle
);

const initFonts = vue => {
  vue.component('font-awesome-icon', FontAwesomeIcon);
};

export default initFonts;
