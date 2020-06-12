import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class ScrollingPage extends Vue {
  @Prop({ type: Object, required: true }) page: any;
  @Prop({ type: Number, default: undefined }) focusedPage: number;
  @Prop({ type: Number, default: 0 }) scrollTop: number;
  @Prop({ type: Number, default: 0 }) clientHeight: number;
  @Prop({ type: Boolean, default: false }) enablePageJump: number;

  elementTop = 0;
  elementHeight = 0;

  get isPageFocused() {
    return this.page.pageNumber === this.focusedPage;
  }

  get isElementFocused() {
    const { elementTop, bottom, elementHeight, scrollTop, clientHeight } = this;

    if (!elementHeight) return null;

    const halfHeight = elementHeight / 2;
    const halfScreen = clientHeight / 2;
    const delta = elementHeight >= halfScreen ? halfScreen : halfHeight;
    const threshold = scrollTop + delta;

    return elementTop < threshold && bottom >= threshold;
  }

  get bottom() {
    return this.elementTop + this.elementHeight;
  }

  get scrollBottom() {
    return this.scrollTop + this.clientHeight;
  }

  @Watch('scrollTop')
  scrollTopUpdated() {
    this.updateElementBounds();
  }

  @Watch('clientHeight')
  clientHeightUpdated() {
    this.updateElementBounds();
  }

  @Watch('isPageFocused')
  isPageFocusedUpdated() {
    this.jumpToPage();
  }

  created() {
    this.$on('update-visibility', this.updateElementBounds);
  }

  mounted() {
    this.updateElementBounds();
  }

  jumpToPage() {
    if (!this.enablePageJump || this.isElementFocused || !this.isPageFocused)
      return;

    this.$emit('page-jump', this.elementTop);
  }

  updateElementBounds() {
    const { offsetTop, offsetHeight } = this.$el as any;
    this.elementTop = offsetTop;
    this.elementHeight = offsetHeight;
  }

  render() {
    const { isPageFocused, isElementFocused } = this;
    // @ts-ignore
    return this.$scopedSlots.default({
      isPageFocused,
      isElementFocused,
    });
  }
}
