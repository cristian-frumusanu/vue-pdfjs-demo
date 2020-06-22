import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class PDFZoom extends Vue {
  @Prop({ type: Number }) scale!: number;

  @Prop({ type: Number, default: 0.25 }) increment!: number;

  get isDisabled() {
    return !this.scale;
  }

  zoomIn() {
    this.updateScale(this.scale + this.increment);
  }

  zoomOut() {
    if (this.scale <= this.increment) return;
    this.updateScale(this.scale - this.increment);
  }

  updateScale(scale) {
    this.$emit('change', { scale });
  }

  fitWidth() {
    this.$emit('fit', 'width');
  }

  fitAuto() {
    this.$emit('fit', 'auto');
  }
}
