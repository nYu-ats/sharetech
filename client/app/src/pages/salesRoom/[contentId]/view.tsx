import NormalText from "components/atoms/text/normalText/NormalText";
import MovieView from "components/organisms/fileView/movie/MovieView";
import PdfView from "components/organisms/fileView/pdf/PdfView";
import TagList from "components/molecules/list/tagList/TagList";
import SalesContentViewTemplate from "components/molecules/salesContentTemplate/view/SalesContentViewTemplate";
import NormalTab from "components/molecules/tab/NormalTab/NormalTab";
import SalesContentActionPanel from "components/organisms/actionPanel/salesContent/SalesContentActionPanel";
import usePaging from "hooks/common/usePaging";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useSearchParams } from "next/navigation";
import { Pages } from "shared/constants/pages";
import SalesRoomTemplate from "templates/salesRoom/view/SalesContentView.template";
import { CustomNextPage } from "types/custom-next-page";
import useSalesContent from "./hooks/useSalesContent";
import { SalesContentShareProps, SalesContentViewProps } from "./SalesContentView.type";
import { ModalContext } from "features/providers/modal/ModalProvider";
import SalesContentShareFormContainer from "components/organisms/form/salesContentShareForm/salesContentShareFormContainer/SalesContentShareFormContainer";
import useSalesContentShareForm from "./hooks/useSalesContentShareForm";
import { useEffect } from "react";
import { useAuth } from "hooks/common/useAuth";

const SalesContentView: CustomNextPage<SalesContentViewProps> = (props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const organization = searchParams.get("organization");
  const auth = useAuth();
  const contentId = router.query.contentId as string;
  const [, activeTabPage, setActiveHandler] = usePaging({ numPage: 2 });
  const [salesContent, blobs, salesContentStatus] = useSalesContent({
    contentId,
    organization,
  });
  const { openModal, closeModal, showModal } = useContext(ModalContext);
  const [
    currenSharedUsers,
    currentSharingPassword,
    arrayFields,
    salesContentShareFormHandler,
  ] = useSalesContentShareForm({
    contentId: contentId,
  });
  const onEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(Pages.salesRoom.edit(contentId));
  };

  const onShareClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    openModal(salesContentSahreForm);
  };

  const closeShareForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    closeModal();
  };

  const urlCopyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await global.navigator.clipboard.writeText(
      `${location.href}/?organization=${auth.user.organization}`
    );
  };

  const passwordCopyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await global.navigator.clipboard.writeText(currentSharingPassword);
  };

  const updatePasswordSubmit = async (data: SalesContentShareProps) => {
    await salesContentShareFormHandler.updatePasswordSubmit(contentId, data.password);
  };

  const addUserSubmit = async (data: SalesContentShareProps) => {
    await salesContentShareFormHandler.sharedUserAddSubmit(
      contentId,
      data.newUsers.map((user) => user.value)
    );
  };

  const deleteUserSubmit = async (data: SalesContentShareProps) => {
    await salesContentShareFormHandler.sharedUserDeleteSubmit(
      contentId,
      data.deleteUsers
    );
  };

  useEffect(() => {
    // Modal上のarrayのユーザーフィールドが追加・削除された際に再レンダリングの必要があるため
    if (showModal) {
      openModal(salesContentSahreForm);
    }
  }, [arrayFields.newUserFields]);

  const salesContentSahreForm = (
    <SalesContentShareFormContainer
      sharedUserFields={arrayFields.newUserFields}
      currentUsers={currenSharedUsers}
      inputRegister={salesContentShareFormHandler.register}
      closeForm={closeShareForm}
      copyUrl={urlCopyClick}
      copyPassword={passwordCopyClick}
      addUser={salesContentShareFormHandler.addUserInput}
      removeUser={salesContentShareFormHandler.removeUserInput}
      updatePasswordSubmit={salesContentShareFormHandler.handleSubmit(
        updatePasswordSubmit
      )}
      addUserSubmit={salesContentShareFormHandler.handleSubmit(addUserSubmit)}
      deleteUserSubmit={salesContentShareFormHandler.handleSubmit(deleteUserSubmit)}
    />
  );

  const actionPanel = (
    <SalesContentActionPanel
      isEditMode={false}
      onEditClick={onEditClick}
      onShareClick={onShareClick}
    />
  );

  const tags = (
    <TagList
      tags={salesContent.tags.map((tag) => {
        return { name: tag, searchLink: "#" };
      })}
    />
  );

  const content = (
    <SalesContentViewTemplate
      contents={salesContent.contents.map((content, index) => {
        switch (content.contentType) {
          case "PDF":
            return {
              title: content.title,
              content: <PdfView fileSource={blobs[index]} />,
            };
          case "MOVIE":
            return {
              title: content.title,
              content: <MovieView fileSource={blobs[index]} />,
            };
          case "TEXT":
            return {
              title: content.title,
              content: <NormalText text={content.text} />,
            };
          default:
            return {
              title: "Sample",
              content: <div className="w-full h-96 bg-whiteSmoke animate-pulse"></div>,
            };
        }
      })}
    />
  );

  const tabContents = [{ tabName: "コンテンツ", content: content }, { tabName: "Q&A" }];

  const tab = (
    <NormalTab
      active={activeTabPage - 1}
      switchTab={setActiveHandler.jumpTo}
      tabs={tabContents}
    />
  );

  return (
    <SalesRoomTemplate
      title={salesContent.title}
      tags={tags}
      content={tab}
      actionPanel={actionPanel}
    />
  );
};

export default SalesContentView;
SalesContentView.requireAuth = true;
