const apiKey = import.meta.env.VITE_API_KEY || '00979299c8f941b99b42ed7e5be04324';

async function handleSearch() {
  const query = document.getElementById('search').value;

  // hide search button after click
  document.getElementById('search-btn').classList.add('hide');


  await fetchNews(query);
}



async function fetchNews(query) {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`;
  try {
    const response = await fetch(proxyUrl + url);
    const data = await response.json();
    displayNews(data.articles);
  } catch (err) {
    document.getElementById('news-container').innerHTML = "<p>Failed to fetch news.</p>";
  }
}

function displayNews(articles) {
  const container = document.getElementById('news-container');
  container.innerHTML = '';
  if (!articles || articles.length === 0) {
    container.innerHTML = '<p>No articles found.</p>';
    return;
  }
  articles.forEach(article => {
    const div = document.createElement('div');
    div.className = 'article';
    div.innerHTML = `
      <h2>${article.title}</h2>
      <p><b>Published:</b> ${new Date(article.publishedAt).toLocaleString()}</p>
      <img src="${article.urlToImage || ''}" alt="${article.title}">
      <p>${article.description || ''}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    container.appendChild(div);
  });
}
