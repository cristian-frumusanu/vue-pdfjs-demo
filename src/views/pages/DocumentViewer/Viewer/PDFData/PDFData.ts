// https://rossta.net/blog/series/pdf-viewer.html
// https://rossta.net/vue-pdfjs-demo/

import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

import range from 'lodash/range';

import pdfJS from 'pdfjs-dist/webpack';

// Using import statement in this way allows Webpack
// to treat pdf.js as an async dependency so we can
// avoid adding it to one of the main bundles
const getDocument = url => pdfJS.getDocument(url).promise;

// pdf: instance of PDFData
// see docs for PDF.js for more info
const getPages = (pdf, first, last) => {
  const allPages = range(first, last + 1).map(number => pdf.getPage(number));
  return Promise.all(allPages);
};

const BUFFER_LENGTH = 10;

@Component
export default class PDFData extends Vue {
  @Prop({ default: null }) url!: string;

  pages = [];
  cursor = 0;
  pdf: Record<string, any> | null = null;

  get pageCount() {
    return this.pdf != null ? this.pdf.numPages : 0;
  }

  @Watch('url', { immediate: true })
  urlUpdated() {
    getDocument(this.url)
      .then(pdf => {
        this.pdf = pdf;
        this.$root.$emit('document-rendered');
      })
      .catch(response => {
        this.$emit('document-errored', {
          text: 'Failed to retrieve PDF',
          response,
        });
        console.log('Failed to retrieve PDF', response);
      });
  }

  @Watch('pdf')
  pdfUpdated(pdf, oldPdf) {
    if (!pdf) return;

    if (oldPdf) {
      this.pages = [];
      this.cursor = 0;
    }

    this.$emit('page-count', this.pageCount);
    this.fetchPages();
  }

  fetchPages(currentPage = 0) {
    if (!this.pdf) return;
    if (this.pageCount > 0 && this.pages.length === this.pageCount) return;

    const startIndex = this.pages.length;
    if (this.cursor > startIndex) return;

    const startPage = startIndex + 1;
    const endPage = Math.min(
      Math.max(currentPage, startIndex + BUFFER_LENGTH),
      this.pageCount
    );
    this.cursor = endPage;

    console.log(`Fetching pages ${startPage} to ${endPage}`);

    getPages(this.pdf, startPage, endPage)
      .then(pages => {
        const deleteCount = 0;
        // @ts-ignore
        this.pages.splice(startIndex, deleteCount, ...pages);
        return this.pages;
      })
      .catch(response => {
        this.$emit('document-errored', {
          text: 'Failed to retrieve pages',
          response,
        });
        console.log('Failed to retrieve pages', response);
      });
  }

  onPageRendered({ text, page }) {
    console.log(text, page);
  }

  onPageErrored({ text, response, page }) {
    console.log('Error!', text, response, page);
  }

  created() {
    this.$on('page-rendered', this.onPageRendered);
    this.$on('page-errored', this.onPageErrored);
    this.$on('pages-fetch', this.fetchPages);
  }
}
