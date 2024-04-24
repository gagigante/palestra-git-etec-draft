const GITHUB_PUBLIC_API = "https://api.github.com"

async function handleSearchUserRepos() {
  const username = document.querySelector("input[name=username]").value

  renderContentToResultsDiv('<p>Loading...</p>')

  const response = await fetch(`${GITHUB_PUBLIC_API}/users/${username}/repos?sort=updated`)

  if (response?.ok) {
    const jsonResponse = await response.json()

    const content = buildReposContentHtml(jsonResponse)

    renderContentToResultsDiv(content)
  } else {
    renderContentToResultsDiv('<p>User not found 😢</p>')
  }
}

/**
 * @param {string} content 
 */
function renderContentToResultsDiv(content) {
  const resultsDiv = document.querySelector("div#results")

  resultsDiv.innerHTML = content
}

/**
 * @param {{ name: string, description: string, html_url: string }[]} repos 
 */
function buildReposContentHtml(repos) {
  let content = ''

  for (let i = 0; i < repos.length; i++) {
    content += `
      <div class="result-item">
        <p class="title">${repos[i].name}</p>
        <p class="description">${repos[i].description ?? ''}</p>
        <a target="_blank" href="${repos[i].html_url}">link</a>
      </div>
    `
  }

  return content
}
