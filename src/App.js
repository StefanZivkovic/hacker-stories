import React from 'react';
import List from './features/List';
import useSemiPersistentState from './features/useSemiPersistentState';
import storiesReducer from './features/reducer';
import InputWithLabel from './features/InputWithLabel';
import axios from 'axios';

localStorage.removeItem('search');
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '');
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const [URL, setURL] = React.useState('');

  const handleFetchStories = React.useCallback(async () => {
    if (!URL) return;
    dispatchStories({type: 'STORIES_FETCH_INIT'});

    // ASYNC CALL
    // axios
    //   .get(URL)
    //   .then((result) => {
    //     dispatchStories({
    //       type: 'STORIES_FETCH_SUCCESS',
    //       payload: result.data.hits,
    //     });
    //   })
    //   .catch(() => dispatchStories({type: 'STORIES_FETCH_FAILURE'}));

    //SYNC CALL
    try {
      const result = await axios.get(URL);
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({
        type: 'STORIES_FETCH_FAILURE',
      });
    }
  }, [URL]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <form
        onSubmit={(e) => {
          setURL(`${API_ENDPOINT}${searchTerm}`);
          e.preventDefault();
        }}
      >
        <InputWithLabel
          id='search'
          value={searchTerm}
          onInputChange={(event) => setSearchTerm(event.target.value)}
          autoFocus={true}
        >
          <strong>Search:</strong>
        </InputWithLabel>
        <button type='submit' disabled={!searchTerm}>
          Search
        </button>
      </form>
      <hr />

      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default App;
