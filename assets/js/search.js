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
const navbar_resultsContainer =
  document.getElementById('navbar_search_results');

if (navbar_input && navbar_resultsContainer) {
  navbar_input.addEventListener('input', () => {
    const query = navbar_input.value.trim();

    navbar_resultsContainer.innerHTML = '';
    navbar_resultsContainer.classList.remove('show');

    // The index may still be loading. Do not search empty input.
    if (!idx || !query) {
      return;
    }

    let results;

    try {
      results = idx.search(`${query}*`);
    } catch (error) {
      console.warn('Unable to parse search query:', error);
      return;
    }

    if (results.length > 0) {
      results.slice(0, 5).forEach(r => {
        const match = data.find(d => d.url === r.ref);

        if (!match) {
          return;
        }

        const item = document.createElement('li');
        const link = document.createElement('a');

        link.className = 'dropdown-item';
        link.href = match.url;
        link.textContent = match.title;

        item.appendChild(link);
        navbar_resultsContainer.appendChild(item);
      });
    } else {
      const item = document.createElement('li');

      item.className = 'dropdown-item disabled';
      item.textContent = 'No results found.';

      navbar_resultsContainer.appendChild(item);
    }

    navbar_resultsContainer.classList.add('show');
  });

  // Register once, not on every input event.
  document.addEventListener('click', event => {
    const clickedInput = navbar_input.contains(event.target);
    const clickedResults =
      navbar_resultsContainer.contains(event.target);

    if (!clickedInput && !clickedResults) {
      navbar_resultsContainer.classList.remove('show');
    }
  });

  // Register once, independently of the input handler.
  navbar_input.addEventListener('keydown', event => {
    if (event.key !== 'Enter' || event.isComposing) {
      return;
    }

    event.preventDefault();

    const query = navbar_input.value.trim();

    if (query) {
      window.location.href = `/search/?${encodeURIComponent(query)}`;
    }
  });
}

