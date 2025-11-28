const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.REACT_APP_SUPABASE_URL || ''
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.REACT_APP_SUPABASE_ANON_KEY || ''

const baseHeaders = {
  apikey: supabaseKey,
  Authorization: supabaseKey ? `Bearer ${supabaseKey}` : '',
  'Content-Type': 'application/json',
}

const baseRestUrl = supabaseUrl ? `${supabaseUrl}/rest/v1` : ''

export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseKey)

async function supabaseRequest(url, { method = 'GET', body, headers = {} } = {}) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: 'Supabase configuration is missing.' }
  }

  const response = await fetch(url.toString(), {
    method,
    headers: {
      ...baseHeaders,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const errorText = await response.text()
    return { data: null, error: errorText || response.statusText }
  }

  const data = await response.json()
  return { data, error: null }
}

export async function fetchTableRows(table, { select = '*', orderBy, limit } = {}) {
  const url = new URL(`${baseRestUrl}/${table}`)
  url.searchParams.set('select', select)

  if (orderBy) {
    const [column, direction] = orderBy.split('.')
    url.searchParams.set('order', `${column}.${direction || 'asc'}`)
  }

  if (limit) {
    url.searchParams.set('limit', limit)
  }

  return supabaseRequest(url, { method: 'GET' })
}

export async function insertRow(table, payload) {
  const url = new URL(`${baseRestUrl}/${table}`)
  return supabaseRequest(url, {
    method: 'POST',
    body: payload,
    headers: { Prefer: 'return=representation' },
  })
}
