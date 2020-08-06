import React from 'react';

const Item = ({item, onRemoveItem}) => (
  <div key={item.objectID}>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    &nbsp;
    <span>{item.author}</span>&nbsp;
    <span>{item.num_comments}</span>&nbsp;
    <span>{item.points}</span>&nbsp;
    <span>
      <button type='button' onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </div>
);
const List = ({list, onRemoveItem}) =>
  list.map((item) => <Item item={item} onRemoveItem={onRemoveItem} />);

export default List;
