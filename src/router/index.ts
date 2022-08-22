import LibraryView from "@/views/LibraryView.vue"
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

export enum Routes {
  LibraryView = "LibraryView",
  UpdatesView = "UpdatesView",
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
    path: "/library/updates/all",
    name: Routes.UpdatesView,
    component: () => import(/* webpackChunkName: "mangaview" */ "../views/UpdatesView.vue")
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
  routes,
  scrollBehavior() {
    // always scroll to top
    const content = document.getElementById("content") || new HTMLElement()
    content.scrollTop = 0

    return { top: 0 }
  }
})

export default router
