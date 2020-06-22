import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class PDFPaginator extends Vue {
  @Prop() value: number;
  @Prop() pageCount: number;

  @Watch('pageCount')
  pageCountUpdated() {
    this.$emit('input', 1);
  }

  input(event) {
    this.$emit('input', parseInt(event.target.value, 10));
  }

  prevPage() {
    this.$emit('prev-page');
  }

  nextPage() {
    this.$emit('next-page');
  }
}
