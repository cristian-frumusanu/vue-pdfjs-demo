// Element UI imports
import lang from 'element-ui/lib/locale/lang/it';
import locale from 'element-ui/lib/locale';

import {
  Input,
  Checkbox,
  CheckboxGroup,
  Card,
  Progress,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  Loading,
  Table,
  TableColumn,
  Button,
  Radio,
} from 'element-ui';

// eslint-disable-next-line
import ScrollBar from 'element-ui/lib/scrollbar.js';

lang.el.pagination.pagesize = ' per pagina';
lang.el.messagebox.cancel = 'Annulla';

locale.use(lang);

const initElementUI = vue => {
  // vue.component(MessageBox.name, MessageBox);
  // vue.prototype.$confirm = MessageBox.confirm;
  // vue.prototype.$alert = MessageBox.alert;
  vue.use(Loading.directive);
  vue.use(Input);
  vue.use(Checkbox);
  vue.use(CheckboxGroup);
  vue.use(Card);
  vue.use(Progress);
  // vue.use(Dropdown);
  // vue.use(DropdownMenu);
  // vue.use(DropdownItem);
  vue.use(Table);
  vue.use(TableColumn);
  vue.use(Button);
  vue.use(ScrollBar);
  vue.use(Radio);
};

export default initElementUI;
