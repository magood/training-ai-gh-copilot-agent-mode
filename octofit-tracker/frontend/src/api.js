export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, total: payload.length }
  }

  if (!payload || typeof payload !== 'object') {
    return { items: [], total: 0 }
  }

  const items = [payload.results, payload.data, payload.items, payload.docs].find(
    Array.isArray,
  )

  if (!items) {
    return { items: [], total: 0 }
  }

  return {
    items,
    total: payload.count ?? payload.total ?? payload.totalDocs ?? items.length,
  }
}

export async function fetchCollection(endpointUrl) {
  const response = await fetch(endpointUrl)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeCollection(await response.json())
}
