async function tavily_search_simple(params, userSettings) {
  const { query } = params;
  const { tavilyAPIKey, max_results } = userSettings;

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      api_key: tavilyAPIKey,
      query,
      search_depth: "basic",
      topic: "general",
      max_results: max_results || 5,
      include_answer: false
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    return JSON.stringify({
      error: `Tavily API request failed: ${response.status}`,
      details: errorData
    });
  }

  const data = await response.json();

  return JSON.stringify({
    results: (data.results || []).map(result => ({
      title: result.title,
      url: result.url,
      content: result.content
    }))
  }, null, 2);
}
