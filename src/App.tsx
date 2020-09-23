import React from "react";
import List from "./features/List";
import useSemiPersistentState from "./features/useSemiPersistentState";
import storiesReducer from "./features/reducer";
import InputWithLabel from "./features/InputWithLabel";
import axios from "axios";
import styled from "styled-components";

import styles from "./App.module.css";
import { Story } from "./models/story";

localStorage.removeItem("search");
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const StyledContainer = styled.div`
  height: 100vw;
  padding: 20px;

  background: #83a4d4;
  background: linear-gradient(to left, #b6fbff, #83a4d4);

  color: #171212;
`;

const StyledHeadlinePrimary = styled.h1`
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
`;

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "");
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const [URL, setURL] = React.useState("");

  const handleFetchStories = React.useCallback(async () => {
    if (!URL) return;
    dispatchStories({ type: "STORIES_FETCH_INIT" });

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
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({
        type: "STORIES_FETCH_FAILURE",
      });
    }
  }, [URL]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item: Story) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <StyledContainer>
      <StyledHeadlinePrimary>My Hacker Stories</StyledHeadlinePrimary>
      <form
        className={styles.searchForm}
        onSubmit={(e) => {
          setURL(`${API_ENDPOINT}${searchTerm}`);
          e.preventDefault();
        }}
      >
        <InputWithLabel
          id="search"
          value={searchTerm}
          onInputChange={handleSearchInput}
          autoFocus={true}
        >
          <strong>Search:</strong>
        </InputWithLabel>
        <button
          type="submit"
          disabled={!searchTerm}
          className={`${styles.button} ${styles.buttonLarge}`}
        >
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
    </StyledContainer>
  );
};

export default App;
