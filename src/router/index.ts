import { store } from "@/store"
import { MutationTypes } from "@/store/mutations"
import LibraryView from "@/views/LibraryView.vue"
import { createRouter, createWebHistory, RouteLocationNormalized, RouteRecordRaw } from "vue-router"

export enum Routes {
  LibraryView = "LibraryView",
  UpdatesView = "UpdatesView",
  FavoriteView = "FavoriteView",
  SearchView = "SearchView",
  SourceListView = "SourceListView",
  SourceItemListView = "SourceItemListView",
  SourceItemView = "SourceItemView",
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
    component: () => import(/* webpackChunkName: "UpdatesView" */ "../views/UpdatesView.vue")
  },
  {
    path: "/library/:id",
    name: Routes.FavoriteView,
    component: () => import(/* webpackChunkName: "ItemView" */ "../views/ItemView.vue")
  },
  {
    path: "/sources",
    name: Routes.SourceListView,
    component: () => import(/* webpackChunkName: "SourceListView" */ "../views/SourceListView.vue")
  },
  {
    path: "/sources/search",
    name: Routes.SearchView,
    component: () => import(/* webpackChunkName: "SearchView" */ "../views/SearchView.vue")
  },
  {
    path: "/source/mangas",
    name: Routes.SourceItemListView,
    component: () => import(/* webpackChunkName: "ItemListView" */ "../views/ItemListView.vue")
  },
  {
    path: "/source/manga",
    name: Routes.SourceItemView,
    component: () => import(/* webpackChunkName: "ItemView" */ "../views/ItemView.vue")
  },
  {
    path: "/reader/:id",
    name: Routes.ReaderView,
    component: () => import(/* webpackChunkName: "ReaderView" */ "../views/ReaderView.vue")
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

router.beforeResolve((to: RouteLocationNormalized) => {
  if (store !== undefined) {
    if (to.path.startsWith("/library")) {
      if (!store.state.inLibrary) {
        store.commit(MutationTypes.SET_IN_LIBRARY, true)
      }
    } else if (to.path.startsWith("/source")) {
      if (store.state.inLibrary) {
        store.commit(MutationTypes.SET_IN_LIBRARY, false)
      }
    }
    store.commit(MutationTypes.SET_LOADING, false)
  }
})

export default router
