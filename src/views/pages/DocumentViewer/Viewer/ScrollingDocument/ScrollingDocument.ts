import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import ScrollingPage from '../ScrollingPage/ScrollingPage.vue';

@Component({
  components: {
    ScrollingPage,
  },
})
export default class ScrollingDocument extends Vue {
  @Prop({ required: true }) pages;
  @Prop({ type: Boolean, default: false }) enablePageJump!: boolean;
  @Prop({ type: Number, default: 1 }) currentPage!: number;
  @Prop({ type: Boolean, default: true }) isParentVisible!: boolean;

  focusedPage: number | undefined = 0;
  scrollTop = 0;
  clientHeight = 0;

  get pagesLength() {
    return this.pages.length;
  }

  @Watch('isParentVisible')
  isParentVisibleUpdated() {
    this.updateScrollBounds();
  }

  @Watch('pagesLength')
  pagesLengthUpdated(count, oldCount) {
    if (oldCount === 0) this.$emit('pages-reset');

    // Set focusedPage after new pages are mounted
    this.$nextTick(() => {
      this.focusedPage = this.currentPage;
    });
  }

  @Watch('currentPage')
  currentPageUpdated(currentPage) {
    if (currentPage > this.pages.length) {
      this.fetchPages(currentPage);
    } else {
      this.focusedPage = currentPage;
    }
  }

  fetchPages(currentPage) {
    this.$emit('pages-fetch', currentPage);
  }

  onPageJump(scrollTop) {
    this.$emit('page-jump', scrollTop);
  }

  updateScrollBounds() {
    const { scrollTop, clientHeight } = this.$el;
    this.scrollTop = scrollTop;
    this.clientHeight = clientHeight;
  }
}
