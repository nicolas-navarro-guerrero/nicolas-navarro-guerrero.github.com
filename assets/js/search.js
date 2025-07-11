var idx, data;

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

const navbar_input = document.getElementById('navbar_search_box');
const navbar_resultsContainer = document.getElementById('navbar_search_results');

navbar_input.addEventListener('input', () => {
  const query = navbar_input.value.trim();
  navbar_resultsContainer.innerHTML = '';

  const results = idx.search(`${query}*`);
  if (results.length>0) {
    results.slice(0,5).forEach(r => {
      const match = data.find(d => d.url === r.ref);
      const item = document.createElement('li');
      item.innerHTML = `<a class="dropdown-item" href="${match.url}">${match.title}</a>`;
      navbar_resultsContainer.appendChild(item);
    });
    navbar_resultsContainer.classList.add('show');
  } else {
    navbar_resultsContainer.innerHTML = '<li class="dropdown-item disabled">No results found.</li>';
    navbar_resultsContainer.classList.add('show');
  }

  
  document.addEventListener('click', function (event) {
    navbar_resultsContainer.classList.remove('show');
  });
  navbar_input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      
      e.preventDefault();
      var q = navbar_input.value.trim();
      
      if (q.length > 0) {
         window.location.href = `/search/?${encodeURIComponent(q)}`;
        
      }
    }
  });
});

