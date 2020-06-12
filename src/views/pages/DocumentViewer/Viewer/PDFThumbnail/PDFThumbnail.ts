import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class PDFThumbnail extends Vue {
  @Prop({ type: Object, required: true }) page;
  @Prop({ required: true }) scale;
  @Prop({ type: Boolean, default: false }) isPageFocused: boolean;

  src: string | null = null;
  renderTask: any = null;

  get viewport() {
    return this.page.getViewport({
      scale: 1,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      dontFlip: false,
    });
  }

  get pageNumber() {
    return this.page.pageNumber;
  }

  @Watch('page')
  pageUpdated() {
    this.destroyPage();
  }

  @Watch('src')
  srcUpdated() {
    this.updateVisibility();
  }

  @Watch('scale')
  scaleUpdated() {
    this.updateVisibility();
  }

  @Watch('isPageFocused')
  pageFocused(isPageFocused) {
    if (isPageFocused) {
      this.$el.scrollIntoView({
        block: 'center',
      });
    }
  }

  beforeDestroy() {
    this.destroyPage(undefined, this.page);
  }

  focusPage() {
    this.$emit('page-focus', this.pageNumber);
  }

  drawPage() {
    if (this.renderTask) return;

    const { viewport } = this;
    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d');
    const renderContext = { canvasContext, viewport };

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    this.renderTask = this.page.render(renderContext);
    this.renderTask.promise
      .then(() => {
        this.src = canvas.toDataURL();

        // Zeroing the width and height causes Firefox to release graphics
        // resources immediately, which can greatly reduce memory consumption.
        canvas.width = 0;
        canvas.height = 0;
      })
      .then(() => {
        this.$emit('thumbnail-rendered', {
          page: this.page,
          text: `Rendered thumbnail ${this.pageNumber}`,
        });
      })
      .catch(response => {
        this.destroyRenderTask();
        this.$emit('thumbnail-errored', {
          response,
          page: this.page,
          text: `Failed to render thumbnail ${this.pageNumber}`,
        });
      });
  }

  destroyPage(_newPage?, page?) {
    // PDFPageProxy#_destroy
    // https://mozilla.github.io/pdf.js/api/draft/PDFPageProxy.html
    // eslint-disable-next-line
    if (page) page._destroy();

    this.destroyRenderTask();
  }

  destroyRenderTask() {
    if (!this.renderTask) return;

    // RenderTask#cancel
    // https://mozilla.github.io/pdf.js/api/draft/RenderTask.html
    this.renderTask.cancel();
    delete this.renderTask;
  }

  updateVisibility() {
    this.$parent.$emit('update-visibility');
  }
}
