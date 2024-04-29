const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
let timeoutId;

searchInput.addEventListener('input', () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
      search(searchTerm);
    } else {
      clearResults();
    }
  }, 500);
});

async function search(term) {
  const url = `https://itunes.apple.com/search?term=${term}&entity=song`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayResults(data.results);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayResults(results) {
  resultsDiv.innerHTML = '';

  if (results.length === 0) {
    resultsDiv.innerHTML = '<p>No results found.</p>';
    return;
  }

  results.forEach(result => {
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    resultDiv.innerHTML = `
      <h3>${result.trackName}</h3>
      <p>Artist: ${result.artistName}</p>
      <p>Album: ${result.collectionName}</p>
      <audio controls>
        <source src="${result.previewUrl}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    `;
    resultsDiv.appendChild(resultDiv);
  });
}

function clearResults() {
  resultsDiv.innerHTML = '';
}
