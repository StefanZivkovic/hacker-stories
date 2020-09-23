import React from "react";
import styles from "../App.module.css";
import { ReactComponent as Check } from "../check.svg";

type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};
type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};

const Item = ({ item, onRemoveItem }: ItemProps) => (
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
        <Check height="18px" width="18px" />
      </button>
    </span>
  </div>
);

type Stories = Array<Story>;
type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
};
const List = ({ list, onRemoveItem }: ListProps) => (
  <>
    {list.map((item: Story) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </>
);

export default List;
