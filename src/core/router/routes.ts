import { RouteConfig } from 'vue-router';
import MainWrapper from '@/views/containers/MainWrapper.vue';
import { APP_TITLE } from '../utilities/appconsts';

const DocumentViewer = () =>
  import(
    /* webpackChunkName: "page-viewer" */ '@/views/pages/DocumentViewer/DocumentViewer.vue'
  );

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/joblist',
    component: MainWrapper,
    children: [
      {
        path: '/',
        name: 'document-viewer',
        component: DocumentViewer,
        meta: {
          title: `${APP_TITLE} - Viewer`,
        },
      },
    ],
  },
];

export default routes;
