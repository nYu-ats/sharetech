import SalesContentPreCheckTemplate from "components/molecules/salesContentTemplate/preCheck/SalesContentPreCheckTemplate";
import NormalTab from "components/molecules/tab/NormalTab/NormalTab";
import SalesContentActionPanel from "components/organisms/actionPanel/salesContent/SalesContentActionPanel";
import SalesContentForm from "components/organisms/form/salesContentForm/SalesContentForm";
import SalesContentMetaForm from "components/organisms/form/salesContentMetaForm/SalesContentMetaForm";
import { ModalContext } from "features/providers/modal/ModalProvider";
import { useAuth } from "hooks/common/useAuth";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Oval } from "react-loader-spinner";
import { Pages } from "shared/constants/pages";
import SalesContentEditTemplate from "templates/salesRoom/edit/SalesContentEdit.template";
import { CustomNextPage } from "types/custom-next-page";
import { SalesContentEditProps, SalesContentProps } from "./SalesContentEdit.type";
import useSalesContentForm from "./hooks/useSalesContentForm";
import usePaging from "hooks/common/usePaging";
import { useSearchParams } from "next/navigation";

const SalesContentEdit: CustomNextPage<SalesContentEditProps> = (props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const organization = searchParams.get("organization");
  const { openModal, closeModal } = useContext(ModalContext);
  const auth = useAuth();
  const contentId = router.query.contentId as string;
  const [, activeTabPage, setActiveHandler] = usePaging({ numPage: 2 });
  const [formStatus, arrayFields, formHandler] = useSalesContentForm({
    contentId: contentId,
    organization: organization,
  });

  const onSaveClick = async (data: SalesContentProps) => {
    openModal(<Oval height={24} width={24} color="#ffffff" />);
    const isValid = await formHandler.preCheck();
    if (isValid) {
      openModal(
        <SalesContentPreCheckTemplate
          title={data.title}
          tags={data.tags}
          salesContents={data.salesContents}
          onReturn={onModifyClick}
          onSubmit={formHandler.handleSubmit(onSubmitClick)}
        />
      );
    } else {
      closeModal();
    }
  };

  const onModifyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    closeModal();
  };

  const onSubmitClick = async (data: SalesContentProps) => {
    const userId = auth.user.id as string;
    const tags = data.tags.map((tag) => tag.value);
    const contents = data.salesContents.map((salesContent, index) => {
      switch (salesContent.contentType) {
        case "PDF":
        case "MOVIE":
          const name =
            salesContent.content instanceof File ? salesContent.content.name : "";
          return {
            index: index,
            title: salesContent.title,
            contentType: salesContent.contentType,
            name: name,
          };
        case "TEXT":
        default:
          const text =
            typeof salesContent.content === "string"
              ? (salesContent.content as string)
              : "";
          return {
            index: index,
            title: salesContent.title,
            contentType: salesContent.contentType,
            text: text,
          };
      }
    });
    await formHandler.submit(contentId, data.title, userId, tags, contents);
    closeModal();
    router.push(Pages.salesRoom.view(contentId));
  };

  const actionPanel = <SalesContentActionPanel isEditMode={true} />;
  const contentMetaForm = (
    <SalesContentMetaForm
      inputRegister={formHandler.register}
      addTag={formHandler.addTagInput}
      removeTag={formHandler.removeTagInput}
      tagFields={arrayFields.tagFields}
    />
  );

  const salesContentForm = (
    <SalesContentForm
      inputRegister={formHandler.register}
      inputWatcher={formHandler.watch}
      onDropFile={formHandler.dropFile}
      onRemoveFile={formHandler.removeFile}
      contentFields={arrayFields.salesContentFields}
      onMenuClick={formHandler.menuChange}
    />
  );

  const tabs = (
    <NormalTab
      active={activeTabPage - 1}
      switchTab={setActiveHandler.jumpTo}
      tabs={[{ tabName: "コンテンツ", content: salesContentForm }, { tabName: "Q&A" }]}
    />
  );

  return (
    <SalesContentEditTemplate
      contentMetaForm={contentMetaForm}
      contentForm={tabs}
      actionPanel={actionPanel}
      onSubmit={formHandler.handleSubmit(onSaveClick)}
    />
  );
};

export default SalesContentEdit;
SalesContentEdit.requireAuth = true;
