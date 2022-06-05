import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import classes from "./Avatar.module.css";

const Avatar = ({ seed, large }) => {
  const { data: session } = useSession();

  return (
    <div className={`${classes.container} ${large && classes.large}`}>
      <Image
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || session?.user?.name || "placeholder"
        }.svg`}
        alt=""
        layout="fill"
        objectFit="contain"
      />
    </div>
  );
};

export default Avatar;
