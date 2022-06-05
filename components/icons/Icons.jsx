import React from "react";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import classes from "./Icons.module.css";
import { ChevronDownIcon } from "@heroicons/react/solid";

const Icons = () => {
  const { data: session } = useSession();

  return (
    <div className={classes.container}>
      <div className={classes.icons}>
        <SparklesIcon className={classes.icon} />

        <GlobeIcon className={classes.icon} />

        <VideoCameraIcon className={classes.icon} />

        <hr className={classes.line} />

        <ChatIcon className={classes.icon} />

        <BellIcon className={classes.icon} />

        <PlusIcon className={classes.icon} />

        <SpeakerphoneIcon className={classes.icon} />
      </div>

      {session ? (
        <button className={classes.nav_btn} onClick={signOut}>
          <img src="https://links.papareact.com/23l" alt="" />

          <div className={classes.profile}>
            <p className={classes.username}>{session?.user?.name}</p>

            <p>1 Karma</p>
          </div>

          <ChevronDownIcon width="20px" height="20px" color="#bfbfbf" />
        </button>
      ) : (
        <button className={classes.nav_btn} onClick={signIn}>
          <img src="https://links.papareact.com/23l" alt="" />

          <p>Sign In</p>
        </button>
      )}
    </div>
  );
};

export default Icons;
