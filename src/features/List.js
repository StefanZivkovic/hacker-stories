import React from "react";
import styles from "../App.module.css";

const Item = ({ item, onRemoveItem }) => (
  <div className={styles.item} key={item.objectID}>
    <span style={{ width: "40%" }}>
      <a href={item.url}>{item.title}</a>
    </span>
    &nbsp;
    <span style={{ width: "30%" }}>{item.author}</span>&nbsp;
    <span style={{ width: "10%" }}>{item.num_comments}</span>&nbsp;
    <span style={{ width: "10%" }}>{item.points}</span>&nbsp;
    <span style={{ width: "10%" }}>
      <button
        className={`${styles.button} ${styles.buttonSmall}`}
        type="button"
        onClick={() => onRemoveItem(item)}
      >
        Dismiss
      </button>
    </span>
  </div>
);
const List = ({ list, onRemoveItem }) =>
  list.map((item) => <Item item={item} onRemoveItem={onRemoveItem} />);

export default List;
