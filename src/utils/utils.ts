import { Source } from "@/store/types"

const domainName = (url: string): string => {
  url = url.replace(/^.*_proxy/, "")
  const l = new URL(url)
  return l.hostname.replace(/(www|en)\./, "")
}

export const getSourceIcon = (url: string, sources: Array<Source>) => {
  const domain = domainName(url)
  for (const i in sources) {
    if (sources[i].domain === domain) {
      return sources[i].iconUrl
    }
  }
}

export const setAltImg = (e: Event, baseUrl: string) => {
  if (e.type === "error") {
    const img = (e.target as HTMLImageElement)
    const imgSrc = img.getAttribute("src")
    if (imgSrc !== "" && !imgSrc?.startsWith(baseUrl)) {
      const newSrc = baseUrl + "/_proxy/" + imgSrc?.replace(/^\/\//, "http://")
      img.setAttribute("src", newSrc)
    }
  }
}
