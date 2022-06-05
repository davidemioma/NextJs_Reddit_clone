import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import Modal from "../Modal/Modal";
import Icons from "../icons/Icons";
import Link from "next/link";
import classes from "./Nav.module.css";

const Nav = () => {
  const [modalOpen, setmodalOpen] = useState(false);

  return (
    <>
      <div className={classes.nav}>
        <Link href="/">
          <div className={classes.logo}>
            <Image
              src="https://links.papareact.com/fqy"
              objectFit="contain"
              layout="fill"
              alt=""
            />
          </div>
        </Link>

        <div className={classes.home}>
          <HomeIcon width="28px" height="28px" />

          <p>Home</p>

          <ChevronDownIcon width="20px" height="20px" />
        </div>

        <div className={classes.search}>
          <SearchIcon width="25px" height="25px" color="#bfbfbf" />

          <input type="text" placeholder="Search Reddit" />
        </div>

        <div className={classes.icons}>
          <Icons />
        </div>

        <MenuIcon
          className={classes.menu_icon}
          onClick={() => setmodalOpen(!modalOpen)}
        />
      </div>

      {modalOpen && <Modal />}
    </>
  );
};

export default Nav;
