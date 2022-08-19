import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import LibraryView from "@/views/LibraryView.vue"

export enum Routes {
  LibraryView = "LibraryView",
  FavoriteView = "FavoriteView",
  SourceListView = "SourceListView",
  SourceMangaListView = "SourceMangaListView",
  SourceMangaView = "SourceMangaView",
  ReaderView = "ReaderView"
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/library"
  },
  {
    path: "/library",
    name: Routes.LibraryView,
    component: LibraryView
  },
  {
    path: "/library/:id",
    name: Routes.FavoriteView,
    component: () => import(/* webpackChunkName: "mangaview" */ "../views/MangaView.vue")
  },
  {
    path: "/sources",
    name: Routes.SourceListView,
    component: () => import(/* webpackChunkName: "sourcelistview" */ "../views/SourceListView.vue")
  },
  {
    path: "/source/mangas",
    name: Routes.SourceMangaListView,
    component: () => import(/* webpackChunkName: "sourcelistview" */ "../views/MangaListView.vue")
  },
  {
    path: "/source/manga",
    name: Routes.SourceMangaView,
    component: () => import(/* webpackChunkName: "mangaview" */ "../views/MangaView.vue")
  },
  {
    path: "/reader/:id",
    name: Routes.ReaderView,
    component: () => import(/* webpackChunkName: "chapterview" */ "../views/ReaderView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
