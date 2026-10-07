// Production API client for MKV Autostand

const BASE_URL = ''; // Relative path handled by Vite proxy or same-origin in prod

export async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers || {})
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers
    });

    if (!res.ok) {
      const errText = await res.text();
      let errJson;
      try { errJson = JSON.parse(errText); } catch {}
      throw new Error((errJson && errJson.error) || `HTTP error ${res.status}: ${res.statusText}`);
    }

    // Return json if content-type is json
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await res.json();
    }
    return await res.text();
  } catch (err) {
    console.error(`API Error on [${options.method || 'GET'}] ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  get: (endpoint, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${endpoint}?${query}` : endpoint;
    return apiRequest(url, { method: 'GET' });
  },
  post: (endpoint, body) => apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(body)
  }),
  patch: (endpoint, body) => apiRequest(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(body)
  }),
  put: (endpoint, body) => apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body)
  }),
  delete: (endpoint) => apiRequest(endpoint, {
    method: 'DELETE'
  })
};
