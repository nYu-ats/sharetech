import React, { FC } from "react";
import { useRouter } from "next/router";
import { HeaderProps } from "./Header.type";
import styles from "./Header.module.css";
import HumbergerButton from "components/atoms/button/HumburgerButton/HumburgerButton";
import NormaImage from "components/atoms/image/NormalImage/NormalImage";
import SiteLogo from "../../../../assets/images/siteLogo.png";
import NormalLink from "components/atoms/link/NormalLink/NormalLink";
import KeywordSearch from "../../form/KeywordSearch/KeywordSearch";
import CircleButton from "components/atoms/button/CircleButton/CircleButton";
import { getIcon } from "assets/icons/Icon.function";
import useKeywordForm from "hooks/header/useKeywordForm";
import useToggle from "hooks/common/useToggle";
import { Route } from "shared/constants/Routes";
import queryString from "query-string";

const Header: FC<HeaderProps> = (props) => {
  const router = useRouter();
  const [keyword, keywordHandler] = useKeywordForm({});
  const [isOpen, toggleHandler] = useToggle({});
  const searchByKeyword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (keyword) {
      router.push(Route.search + "?" + queryString.stringify({ keyword: [keyword] }));
    }
  };

  return (
    <div className={[styles.header].join(" ")}>
      <div className={[styles.left].join(" ")}>
        <div className={[styles.siteLogo, styles.verticalCenterize].join(" ")}>
          <NormalLink
            anchor="#"
            children={
              <NormaImage src={SiteLogo} alt="Share Tech" width={160} height={56} />
            }
          />
        </div>
        <div className={[styles.verticalCenterize].join(" ")}>
          <KeywordSearch
            value={keyword}
            onChange={keywordHandler.changeKeyword}
            onSubmit={searchByKeyword}
          />
        </div>
      </div>
      <div className={[styles.right].join(" ")}>
        <div className={[styles.icons].join(" ")}>
          <div className={[styles.icon, styles.verticalCenterize].join(" ")}>
            <CircleButton
              children={getIcon("HOME", { size: "SMALL" })}
              size="SMALL"
              outline={true}
            />
          </div>
          <div className={[styles.icon, styles.verticalCenterize].join(" ")}>
            <CircleButton
              children={getIcon("HELP", { size: "SMALL" })}
              size="SMALL"
              outline={true}
            />
          </div>
          <div className={[styles.icon, styles.verticalCenterize].join(" ")}>
            <CircleButton
              children={getIcon("ACCOUNT", { size: "SMALL" })}
              size="SMALL"
              outline={true}
            />
          </div>
        </div>
        <div className={[styles.verticalCenterize].join(" ")}>
          <HumbergerButton
            children={<></>}
            isOpen={isOpen}
            onClick={(e) => toggleHandler.changeActive}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
