import styles from "./Icon.module.css";
import { IconKey, IconDrawType, IconProps } from "./Icon.type";
import { AccountIcon, HelpIcon, HomeIcon, SearchIcon, PlusIcon } from "./common";
import { ArrowLeftIcon } from "./common/ArrowLeftIcon/ArrowLeftIcon";
import { ArrowRightIcon } from "./common/ArrowRightIcon/ArrowRightIcon";
import { ClipBoardIcon } from "./common/ClipBoardIcon/ClipBoardIcon";
import { CloseIcon } from "./common/CloseIcon/CloseIcon";
import { GearIcon } from "./common/GearIcon/GearIcon";
import { LinkIcon } from "./common/LinkIcon/LinkIcon";
import { MenuIcon } from "./common/MenuIcon/MenuIcon";
import { MovieIcon } from "./common/MovieIcon/MovieIcon";
import { PdfIcon } from "./common/PdfIcon/PdfIcon";
import { TextIcon } from "./common/TextIcon/TextIcon";
import { TrashIcon } from "./common/TrashIcon/TrashIcon";
import { ResearchIcon } from "./techNote";
import { ReactNode } from "react";

export const styling = (type: IconDrawType, props: IconProps): Array<string> => {
  let style = [styles.icon];
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
    case "EXTRASMALL":
      style.push(styles.extraSmall);
      break;
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
    case "GEAR":
      return <GearIcon {...props} />;
    case "TRASH":
      return <TrashIcon {...props} />;
    case "CLOSE":
      return <CloseIcon {...props} />;
    case "CLIPBOARD":
      return <ClipBoardIcon {...props} />;
    case "LINK":
      return <LinkIcon {...props} />;
    case "ARROWRIGHT":
      return <ArrowRightIcon {...props} />;
    case "ARROWLEFT":
      return <ArrowLeftIcon {...props} />;
    case "MENU":
      return <MenuIcon {...props} />;
    case "PDF":
      return <PdfIcon {...props} />;
    case "MOVIE":
      return <MovieIcon {...props} />;
    case "TEXT":
      return <TextIcon {...props} />;
    default:
      return <></>;
  }
};
