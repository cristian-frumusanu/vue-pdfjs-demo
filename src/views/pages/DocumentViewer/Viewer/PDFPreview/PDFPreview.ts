import { Vue, Component, Prop } from 'vue-property-decorator';
import ScrollingDocumentSmooth from '../ScrollingDocumentSmooth/ScrollingDocumentSmooth.vue';
import PDFThumbnail from '../PDFThumbnail/PDFThumbnail.vue';

@Component({
  components: {
    ScrollingDocumentSmooth,
    PDFThumbnail,
  },
})
export default class PDFPreview extends Vue {
  @Prop({ required: true }) pages;
  @Prop({ type: Number, default: 0 }) pageCount!: number;
  @Prop({ type: Number, default: 1.0 }) scale!: number;
  @Prop({ type: Number, default: 1 }) currentPage!: number;
  @Prop({ type: Boolean, default: false }) isPreviewEnabled!: boolean;

  onPagesFetch(currentPage) {
    this.$parent.$emit('pages-fetch', currentPage);
  }

  onPageFocused(pageNumber) {
    this.$parent.$emit('page-focus', pageNumber);
  }

  onThumbnailRendered(payload) {
    this.$el.dispatchEvent(new Event('scroll'));
    this.$parent.$emit('thumbnail-rendered', payload);
  }

  onThumbnailErrored(payload) {
    this.$parent.$emit('thumbnail-errored', payload);
  }
}
