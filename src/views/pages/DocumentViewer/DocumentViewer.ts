/* eslint-disable */

import { Vue, Component } from 'vue-property-decorator';
import PDFViewer from './Viewer/PDFViewer/PDFViewer.vue';

@Component({
  components: {
    PDFViewer,
  },
})
export default class DocumentViewer extends Vue {
  isLoading = false;

  get pdfURL() {
    return `https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK`;
  }
}
