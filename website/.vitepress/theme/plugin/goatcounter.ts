function mountGoatcounter(id: string) {
  // @ts-ignore
  if (window.goatcounter || window.location.hostname === 'localhost') {
    return
  }

  const script = document.createElement("script")

  script.dataset.goatcounter = `https://${id}.goatcounter.com/count`
  script.async = true
  script.src = "//gc.zgo.at/count.js"

  document.head.appendChild(script)
}

export default function ({ id }: { id: string }) {
  // eslint-disable-next-line node/prefer-global/process
  if (process.env.NODE_ENV === 'production' && id && typeof window !== 'undefined') {
    mountGoatcounter(id)
  }
}