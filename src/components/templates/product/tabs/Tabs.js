import React from "react";
import styles from "./tabs.module.css";
import { useState } from "react";
import Discription from "../description/Discription";
import MoreInfoes from "../moreInfoes/MoreInfoes";
import Comments from "../comments/Comments";
const Tabs = () => {
  const [tab, setTab] = useState("description");
  return (
    <div data-aos="fade-left" className={styles.tabs}>
      <input
        onClick={() => setTab("description")}
        type="radio"
        id="description"
        name="tab-control"
        checked={tab == "description" && "checked"}
      />
      <input
        onClick={() => setTab("moreInfoes")}
        type="radio"
        id="moreInfoes"
        name="tab-control"
        checked={tab == "moreInfoes" && "checked"}
      />
      <input
        onClick={() => setTab("comments")}
        type="radio"
        id="comments"
        name="tab-control"
        checked={tab == "comments" && "checked"}
      />
      <ul>
        <li title="Features">
          <label htmlFor="description" role="button">
            {" "}
            توضیحات{" "}
          </label>
        </li>
        <li title="Delivery Contents">
          <label htmlFor="moreInfoes" role="button">
            {" "}
            اطلاعات بیشتر{" "}
          </label>
        </li>
        <li title="Shipping">
          <label htmlFor="comments" role="button">
            {" "}
            نظرات (7){" "}
          </label>
        </li>
      </ul>

      <div className={styles.contents}>
        <section className={styles.tabs_content}>
          <Discription />
        </section>
        <section className={styles.tabs_content}>
          <MoreInfoes />
        </section>
        <section className={styles.tabs_content}>
          <Comments />
        </section>
      </div>
    </div>
  );
};

export default Tabs;
