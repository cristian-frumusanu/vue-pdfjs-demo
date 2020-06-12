// @ts-nocheck
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

import { mapState } from 'vuex';
@Component({
  computed: {
    ...mapState(['selectedSentence']),
  },
})
export default class PDFPage extends Vue {
  @Prop({ default: null }) page!: any;
  @Prop({ default: null }) scale!: number;
  @Prop({ default: null, required: true }) optimalScale!: number;
  @Prop({ default: false }) isPageFocused!: boolean;
  @Prop({ default: false }) isElementFocused!: boolean;

  viewport: any;
  renderTask: any;
  selectedSentenceFrame: IFrameDto = null;

  get actualSizeViewport() {
    return this.viewport.clone({ scale: this.scale });
  }

  get canvasStyle() {
    const {
      width: actualSizeWidth,
      height: actualSizeHeight,
    } = this.actualSizeViewport;
    const [pixelWidth, pixelHeight] = [
      actualSizeWidth,
      actualSizeHeight,
    ].map(dim => Math.ceil(dim));
    return `width: ${pixelWidth}px; height: ${pixelHeight}px;`;
  }

  get canvasAttrs() {
    let { width, height } = this.viewport;
    [width, height] = [width, height].map(dim => Math.ceil(dim));
    const style = this.canvasStyle;

    return {
      width,
      height,
      style,
      class: 'pdf-page box-shadow',
    };
  }

  get pageNumber() {
    return this.page.pageNumber;
  }

  @Watch('scale')
  scaleUpdated() {
    this.updateVisibility();
  }

  @Watch('page')
  pageUpdated(newPage, oldPage) {
    this.destroyPage(oldPage);
  }

  @Watch('isElementFocused')
  isElementFocusedUpdated(isElementFocused) {
    if (isElementFocused) this.focusPage();
  }

  @Watch('selectedSentence')
  selectedSentenceUpdated(newSelectedSentence: IRelevantSentenceDto) {
    this.selectedSentenceFrame = null;

    if (newSelectedSentence.page === this.pageNumber) {
      this.selectedSentenceFrame = newSelectedSentence.frame;
      this.drawRectangle(newSelectedSentence.frame);
    } else if (this.selectedSentenceFrame) {
      this.selectedSentenceFrame = null;
    }
  }

  created() {
    this.viewport = this.page.getViewport({
      scale: this.optimalScale,
      rotation: 0,
      offsetX: 0,
      offsetY: 0,
      dontFlip: false,
    });
  }

  beforeDestroy() {
    this.destroyPage(this.page);
  }

  focusPage() {
    if (this.isPageFocused) return;
    this.$emit('page-focus', this.pageNumber);
  }

  drawPage() {
    if (this.renderTask) return;

    const { viewport } = this;
    const canvasContext = (this.$refs.canvas as any).getContext('2d');
    const renderContext = { canvasContext, viewport };

    this.renderTask = this.page.render(renderContext);
    this.renderTask.promise
      .then(() => {
        this.$emit('page-rendered', {
          page: this.page,
          text: `Rendered page ${this.pageNumber}`,
        });
      })
      .catch(response => {
        this.destroyRenderTask();
        this.$emit('page-errored', {
          response,
          page: this.page,
          text: `Failed to render page ${this.pageNumber}`,
        });
      });
  }

  drawRectangle(rectangleParams: IFrameDto) {
    this.$nextTick(() => {
      const canvasContext = (this.$refs['canvas-h'] as any).getContext('2d');
      canvasContext.clearRect(
        0,
        0,
        canvasContext.canvas.width,
        canvasContext.canvas.height
      );
      canvasContext.beginPath();
      canvasContext.fillStyle = 'rgb(238,232,170,0.5)';

      canvasContext.fillRect(
        rectangleParams.x * this.optimalScale,
        rectangleParams.y * this.optimalScale,
        rectangleParams.width * this.optimalScale,
        rectangleParams.height * this.optimalScale
      );
    });
  }

  updateVisibility() {
    this.$parent.$emit('update-visibility');
  }

  destroyPage(page) {
    // eslint-disable-next-line
    if (page) page._destroy();
    this.destroyRenderTask();
  }

  destroyRenderTask() {
    if (!this.renderTask) return;

    this.renderTask.cancel();
    delete this.renderTask;
  }
}
