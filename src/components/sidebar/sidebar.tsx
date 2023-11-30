"use client";
import styles from "./sidebar.module.scss";
import HamIcon from "./icons/ham-icon";
import SocialIcon from "./icons/social-icon";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.sidebar}>
      {/* logo */}
      <Link href={"/"}>
        <Image height={30} width={30} src={"/logo.png"} alt="logo" />
      </Link>

      {/* Home */}
      <Link href={"/"} className={styles.activeLink}>
        {pathname === "/" && <div className={styles.circle}>&nbsp;</div>}
        <HamIcon active={pathname === "/"} />
      </Link>

      {/* formation */}
      <Link href={"/formation"} className={styles.activeLink}>
        {pathname === "/formation" && (
          <div className={styles.circle}>&nbsp;</div>
        )}
        <SocialIcon active={pathname === "/formation"} />
      </Link>
    </div>
  );
};

export default Sidebar;
