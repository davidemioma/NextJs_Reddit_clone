import React from "react";
import Avatar from "../avatar/Avatar";
import classes from "./Header.module.css";

const Header = ({ topic }) => {
  return (
    <div className={classes.header}>
      <div className={classes.top} />

      <div className={classes.container}>
        <div className="app">
          <div className={classes.intro}>
            <div className={classes.avatar}>
              <Avatar seed={topic} large />
            </div>

            <div className={classes.texts}>
              <h1>Welcome to the r/{topic} subreddit</h1>

              <p>r/{topic}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
