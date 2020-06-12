import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { PR, VR } from '@/core/utilities/appconsts';

import ScrollingDocument from '../ScrollingDocument/ScrollingDocument.vue';
import PDFPage from '../PDFPage/PDFPage.vue';

@Component({
  components: {
    ScrollingDocument,
    PDFPage,
  },
})
export default class PDFDocument extends Vue {
  @Prop() pages!: any;
  @Prop({ default: 0 }) pageCount!: number;
  @Prop({ default: 1.0 }) scale!: number;
  @Prop() optimalScale!: number;
  @Prop() fit!: string;
  @Prop({ default: 1 }) currentPage!: number;
  @Prop({ default: false }) isPreviewEnabled!: boolean;

  get defaultViewport() {
    if (!this.pages.length) return { width: 0, height: 0 };
    const [page] = this.pages;

    return page.getViewport({
      scale: 1,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      dontFlip: false,
    });
  }

  get isPortrait() {
    const { width, height } = this.defaultViewport;
    return width <= height;
  }

  @Watch('pageCount')
  pageCountUpdated() {
    this.fitWidth();
  }

  // @Watch('isPreviewEnabled')
  // isPreviewEnabledUpdated() {
  //   this.fitAuto();
  // }

  @Watch('fit')
  fitUpdated(fit) {
    switch (fit) {
      case 'width':
        this.fitWidth();
        break;

      case 'auto':
        this.fitAuto();
        break;

      default:
        break;
    }
  }

  mounted() {
    this.$root.$once('document-rendered', () => {
      setTimeout(() => {
        this.fitAuto();
      }, 150);
    });
  }

  pageWidthScale() {
    const { defaultViewport, $el } = this;
    if (!defaultViewport.width) return 0;

    return ($el.clientWidth * PR * VR) / defaultViewport.width;
  }

  pageHeightScale() {
    const { defaultViewport, $el } = this;
    if (!defaultViewport.height) return 0;

    return ($el.clientHeight * PR * VR) / defaultViewport.height;
  }

  // Determine an ideal scale using viewport of document's first page, the pixel ratio from the browser
  // and a subjective scale factor based on the screen size.
  fitWidth() {
    const scale = this.pageWidthScale();
    this.updateScale(scale, { isOptimal: !this.optimalScale });
  }

  fitHeight() {
    const scale = this.isPortrait
      ? this.pageHeightScale()
      : this.pageWidthScale();
    this.updateScale(scale);
  }

  fitAuto() {
    const scale = Math.min(this.pageWidthScale(), this.pageHeightScale());
    this.updateScale(scale);
  }

  updateScale(scale, { isOptimal = false } = {}) {
    if (!scale) return;
    this.$emit('scale-change', { scale, isOptimal });
  }

  onPageJump(scrollTop) {
    this.$el.scrollTop = scrollTop; // triggers 'scroll' event
  }

  onPagesFetch(currentPage) {
    this.$parent.$emit('pages-fetch', currentPage);
  }

  onPageFocused(pageNumber) {
    this.$parent.$emit('page-focus', pageNumber);
  }

  onPageRendered(payload) {
    this.$parent.$emit('page-rendered', payload);
  }

  onPageErrored(payload) {
    this.$parent.$emit('page-errored', payload);
  }
}
