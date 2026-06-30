import MiniSearch from 'minisearch';

// Promise cached globally at the module layer to guarantee it triggers only once
let indexPromise: Promise<MiniSearch> | null = null;

export function getSearchIndexEngine(): Promise<MiniSearch> {
  if (indexPromise) return indexPromise;

  indexPromise = fetch('http://localhost:3001/assets/search-index.json')
    .then((res) => {
      if (!res.ok) throw new Error('Network validation failure loading asset index.');
      return res.json();
    })
    .then((indexJson) => {
      return MiniSearch.loadJSON(JSON.stringify(indexJson), {
        fields: ['title', 'tags', 'content'],
        storeFields: ['title', 'image', 'tags', 'description', 'date', 'id'],
        searchOptions: { prefix: true, fuzzy: 0.2 }
      });
    });
  
  return indexPromise;
}
