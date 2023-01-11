import NormalTab from "components/molecules/tab/NormalTab/NormalTab";
import MyTechNote from "components/organisms/cardGroup/MyTechNote/MyTechNote";
import usePointer from "hooks/common/usePointer";
import useTechNoteSummary from "hooks/myPage/useTechNoteSummary";
import { FC } from "react";
import MyPageTemplate from "templates/MyPage/MyPage.template";
import { MyPageProps } from "./MyPage.type";
import toast from "react-hot-toast";
import { ApiError } from "shared/constants/Message";

const MyPage: FC<MyPageProps> = (props) => {
  const [myTechNote, loadStatus, myTechNoteHandler] = useTechNoteSummary({
    author: ["test"],
    chunkSize: 1,
  });
  const tabs = [
    {
      tabName: "My Tech note",
      content: (
        <MyTechNote
          cards={myTechNote}
          isLoading={loadStatus.isLoading}
          loadMore={myTechNoteHandler.loadMore}
          canLoadMore={loadStatus.hasNextPage}
        />
      ),
    },
    {
      tabName: "Status",
    },
    {
      tabName: "Tag",
    },
  ];
  const [activeTabIndex, setActiveHandler] = usePointer({ limit: tabs.length });

  if (loadStatus.isError) {
    toast.error(ApiError, { id: "MyTechNote" });
  }

  const myPageTab = (
    <NormalTab
      active={activeTabIndex}
      switchTab={setActiveHandler.switchPointer}
      tabs={tabs}
    />
  );

  return <MyPageTemplate myPageTab={myPageTab} />;
};

export default MyPage;
