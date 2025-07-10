let idx, data;

fetch('/search_data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    idx = lunr(function () {
      this.ref('url');
      this.field('title', { boost: 10 });
      this.field('tags');


      this.pipeline.remove(lunr.stemmer);

      data.forEach(function(doc) {
        this.add(doc);
      }, this);
    });
  });

const input = document.getElementById('search_box');
const resultsContainer = document.getElementById('search_results');

input.addEventListener('input', () => {
  const query = input.value.trim();
  resultsContainer.innerHTML = '';

  const results = idx.search(`${query}*`);

  if (results.length) {
    results.slice(0, 5).forEach(r => {
      const match = data.find(d => d.url === r.ref);
      const item = document.createElement('li');
      item.innerHTML = `<a class="dropdown-item" href="${match.url}">${match.title}</a>`;
      resultsContainer.appendChild(item);
    });
    resultsContainer.classList.add('show');
  } else {
    resultsContainer.innerHTML = '<li class="dropdown-item disabled">No results found.</li>';
    resultsContainer.classList.add('show');
  }
  document.addEventListener('click', function (event) {
  const searchForm = document.getElementById('site_search');
  const resultsContainer = document.getElementById('search_results');

  if (!searchForm.contains(event.target)) {
    resultsContainer.classList.remove('show');
  }
});
});

