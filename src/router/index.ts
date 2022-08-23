import { store } from "@/store"
import { MutationTypes } from "@/store/mutations"
import MangaListView from "@/views/MangaListView.vue"
import { createRouter, createWebHistory, NavigationHookAfter, RouteLocationNormalized, RouteRecordRaw } from "vue-router"

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
    component: MangaListView
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
    component: MangaListView
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
  scrollBehavior(to: RouteLocationNormalized) {
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
