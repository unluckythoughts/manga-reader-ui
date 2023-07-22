import { createRouter, createWebHistory, type RouteLocationNormalized } from "vue-router"
import LibraryView from "../views/LibraryView.vue"
import { nextTick } from "vue"

export enum Routes {
  LibraryView = "LibraryView",
  UpdatesView = "UpdatesView",
  SearchView = "SearchView",
  ItemView = "ItemView",
  SourceView = "SourceView",
  ReaderView = "ReaderView",
  SourceListView = "SourceListView"
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: "/library/updates",
      name: Routes.UpdatesView,
      component: () => import(/* webpackChunkName: "UpdatesView" */ "../views/UpdatesView.vue")
    },
    {
      path: "/source/manga/:id",
      name: Routes.ItemView,
      component: () => import(/* webpackChunkName: "ItemView" */ "../views/ItemView.vue")
    },
    {
      path: "/reader/:id",
      name: Routes.ReaderView,
      component: () => import(/* webpackChunkName: "ReaderView" */ "../views/ReaderView.vue")
    },
    {
      path: "/search",
      name: Routes.SearchView,
      component: () => import(/* webpackChunkName: "SearchView" */ "../views/SearchView.vue")
    },
    {
      path: "/sources",
      name: Routes.SourceListView,
      component: () => import(/* webpackChunkName: "SourceListView" */ "../views/SourceListView.vue")
    }
  ],
  scrollBehavior() {
    // always scroll to top
    const content = document.getElementById("content") || new HTMLElement()
    content.scrollTop = 0

    return { top: 0 }
  }
})

export default router
