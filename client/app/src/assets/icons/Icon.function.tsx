import styles from "./Icon.module.css";
import { IconKey, IconDrawType, IconProps } from "./Icon.type";
import { AccountIcon, HelpIcon, HomeIcon, SearchIcon, PlusIcon } from "./common";
import { ResearchIcon } from "./techNote";
import { ReactNode } from "react";

export const styling = (type: IconDrawType, props: IconProps): Array<string> => {
  let style = [];
  if (type === "FILL") {
    switch (props.color) {
      case "SITECOLOR":
        style.push(styles.siteColor);
        break;
      case "BLACK":
        style.push(styles.black);
        break;
      case "WHITE":
        style.push(styles.white);
        break;
      case "LIGHTGRAY":
        style.push(styles.lightGray);
        break;
      default:
        style.push(styles.siteColor);
        break;
    }
  } else {
    switch (props.color) {
      case "SITECOLOR":
        style.push(styles.strokeSiteColor);
        break;
      case "BLACK":
        style.push(styles.strokeBlack);
        break;
      case "WHITE":
        style.push(styles.strokeWhite);
        break;
      case "LIGHTGRAY":
        style.push(styles.strokeLightGray);
        break;
      default:
        style.push(styles.strokeSiteColor);
        break;
    }
  }

  switch (props.size) {
    case "SMALL":
      style.push(styles.small);
      break;
    case "NORMAL":
      style.push(styles.normal);
      break;
    case "LARGE":
      style.push(styles.large);
      break;
    default:
      style.push(styles.small);
      break;
  }

  return style;
};

export const getIcon = (key: IconKey, props: IconProps): ReactNode => {
  switch (key) {
    case "ACCOUNT":
      return <AccountIcon {...props} />;
    case "HELP":
      return <HelpIcon {...props} />;
    case "HOME":
      return <HomeIcon {...props} />;
    case "SEARCH":
      return <SearchIcon {...props} />;
    case "PLUS":
      return <PlusIcon {...props} />;
    case "RESEARCH":
      return <ResearchIcon {...props} />;
    default:
      return <></>;
  }
};
