import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';

import PDFDocument from '../PDFDocument/PDFDocument.vue';
import PDFData from '../PDFData/PDFData.vue';
import PDFPaginator from '../PDFPaginator/PDFPaginator.vue';
import PDFPreview from '../PDFPreview/PDFPreview.vue';
import PDFZoom from '../PDFZoom/PDFZoom.vue';

function floor(value, precision) {
  const multiplier = 10 ** (precision || 0);
  return Math.floor(value * multiplier) / multiplier;
}

@Component({
  components: {
    PDFDocument,
    PDFData,
    PDFPaginator,
    PDFPreview,
    PDFZoom,
  },
  computed: {
    ...mapState({
      currentStorePage: 'currentPage',
    }),
  },
})
export default class PDFViewer extends Vue {
  @Prop({ default: null }) url!: string;

  scale: number | undefined = 1;
  optimalScale: number | null = null;
  fit = 'auto';
  currentPage = 1;
  pageCount: number | undefined = 0;
  isPreviewEnabled = false;

  @Watch('url')
  urlUpdated() {
    this.currentPage = 0;
  }

  @Watch('currentStorePage')
  currentStorePageUpdated(newCurrentPageIndex) {
    if (newCurrentPageIndex !== null) {
      this.currentPage = newCurrentPageIndex;
    }
  }

  mounted() {
    document.body.classList.add('overflow-hidden');
  }

  onDocumentRendered() {
    debugger;
    this.$emit('document-rendered', this.url);
  }

  onDocumentErrored(e) {
    this.$emit('document-errored', e);
  }

  updateScale({ scale, isOptimal = false }) {
    const roundedScale = floor(scale, 2);
    if (isOptimal) this.optimalScale = roundedScale;
    this.scale = roundedScale;
  }

  updateFit(fit) {
    this.fit = fit;
  }

  updatePageCount(pageCount) {
    this.pageCount = pageCount;
  }

  updateCurrentPage(pageNumber) {
    this.currentPage = pageNumber;
  }

  togglePreview() {
    this.isPreviewEnabled = !this.isPreviewEnabled;
  }

  prevPage() {
    this.currentPage =
      this.currentPage > 1 ? this.currentPage - 1 : this.currentPage;
  }

  nextPage() {
    this.currentPage += 1;
  }
}
