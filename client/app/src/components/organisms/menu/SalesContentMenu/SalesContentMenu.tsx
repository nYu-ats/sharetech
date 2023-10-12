import { getIcon } from "assets/icons/Icon.function";
import MenuList from "components/molecules/list/menuList/MenuList";
import React, { FC } from "react";
import { SalesContentMenuProps } from "./SalesContentMenu.type";
import styles from "./SalesContentMenu.module.css";
import { IconKey } from "assets/icons/Icon.type";
import useToggle from "hooks/common/useToggle";

const SalesContentMenu: FC<SalesContentMenuProps> = (props) => {
  const [isActive, action] = useToggle({});
  const menuIcons = [
    { key: "PDF", icon: "PDF", label: "PDF" },
    { key: "MOVIE", icon: "MOVIE", label: "動画" },
    { key: "TEXT", icon: "TEXT", label: "文章" },
  ];

  return (
    <div className={[styles.wrapper].join(" ")}>
      <div
        className={[styles.toggleBtn].join(" ")}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => action.toggle()}
      >
        {getIcon("MENU", { color: "LIGHTGRAY", size: "NORMAL" })}
      </div>
      <div
        className={[styles.menus, isActive ? styles.menusOpen : styles.menusClose].join(
          " "
        )}
      >
        <MenuList
          menus={menuIcons.map((menu) => {
            return (
              <div
                className={[
                  styles.menu,
                  menu.key == props.isActiveMenu ? styles.activeMenu : null,
                ].join(" ")}
                data-key={`${menu.key}-${String(props.index)}`}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  props.onClick(e);
                  action.toggle();
                }}
              >
                <div className={[styles.icon].join(" ")}>
                  {getIcon(menu.icon as IconKey, { color: "LIGHTGRAY", size: "SMALL" })}
                </div>
                <div className={[styles.verticalCenter].join(" ")}>
                  <p className={[styles.menuText].join(" ")}>{menu.label}</p>
                </div>
              </div>
            );
          })}
        />
      </div>
    </div>
  );
};

export default SalesContentMenu;
