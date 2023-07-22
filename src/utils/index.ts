import { apiBaseURL, hostBaseURL, proxyBaseURL, type Source } from "@/stores/source"

const domainName = (url: string): string => {
  url = url.replace(/^.*_proxy/, "")
  const l = new URL(url)
  return l.hostname.replace(/(www|en)\./, "")
}

export const getSourceIcon = (url: string, sources: Array<Source>): string => {
  const domain = domainName(url)
  for (const i in sources) {
    if (sources[i].domain === domain) {
      return sources[i].iconUrl
    }
  }

  return ""
}

export const resolveImage = (url: string): string => {
  if (url.startsWith("/")) {
    return hostBaseURL + url
  }
  return url
}

export const proxyImage = (e: Event) => {
  if (e.type === "error") {
    const img = (e.target as HTMLImageElement)
    const imgSrc = img.getAttribute("src")
    if (imgSrc?.startsWith("/")) {
      let newSrc = hostBaseURL + imgSrc
      img.setAttribute("src", newSrc)
    } else if (imgSrc !== "" && !imgSrc?.startsWith(proxyBaseURL)) {
      let newSrc = proxyBaseURL + imgSrc?.replace(/^\/\//, "http://")
      img.setAttribute("src", newSrc)
    }
  }
}

export const isArrayEmpty = (a: Array<string>): boolean => {
  for (let i = 0; i < a.length; i++) {
    if (a[i].trim() !== "") return false
  }

  return true
}
