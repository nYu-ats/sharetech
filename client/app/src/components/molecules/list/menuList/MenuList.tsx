import { FC } from "react";
import { MenuListProps } from "./MenuList.type";
import styles from "./MenuList.module.css";

const MenuList: FC<MenuListProps> = (props) => {
  return (
    <div className={[styles.container].join(" ")}>
      {props.menus.map((menu) => {
        return <div className={[styles.menu].join(" ")}>{menu}</div>;
      })}
    </div>
  );
};

export default MenuList;
