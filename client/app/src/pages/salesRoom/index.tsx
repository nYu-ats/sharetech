import { CreateSalesContentFormProps, SalesRoomProps } from "./SalesRoom.type";
import toast from "react-hot-toast";
import { ApiError } from "shared/constants/messages";
import { CustomNextPage } from "types/custom-next-page";
import SalesRoomTemplate from "templates/salesRoom/list/SalesRoom.template";
import SalesRoomActionPanel from "components/organisms/actionPanel/salesRoom/SalesRoomActionPanel";
import { ModalContext } from "features/providers/modal/ModalProvider";
import React, { useContext } from "react";
import CreateSalesContentForm from "components/organisms/form/createSalesContentForm/CreateSalesContentForm";
import { useForm } from "react-hook-form";
import { createSalesContent } from "repositories/shareTech/salesContent";
import { useAuth } from "hooks/common/useAuth";
import { useRouter } from "next/router";
import { Pages } from "shared/constants/pages";
import { Oval } from "react-loader-spinner";
import useSalesContentList from "./hooks/useSalesContentList";
import SalesContentCardGroup from "components/organisms/cardGroup/salesContent/SalesContent";

const SalesRoom: CustomNextPage<SalesRoomProps> = (props) => {
  const router = useRouter();
  const { openModal, closeModal } = useContext(ModalContext);
  const auth = useAuth();
  const { register, handleSubmit } = useForm<CreateSalesContentFormProps>();
  const [salesContentList, loadStatus, salesContentListHandler] = useSalesContentList({
    userId: auth.user.id as string,
  });

  const createSubmitClick = async (data: CreateSalesContentFormProps) => {
    if (auth.status === "authenticated") {
      openModal(<Oval height={24} width={24} color="#ffffff" />);
      await createSalesContent(
        auth.user.organization as string,
        auth.user.id as string,
        data.title
      ).then((data) => {
        closeModal();
        router.push(Pages.salesRoom.edit(data.result.id));
      });
    } else {
      router.push(Pages.login);
    }
  };

  const onCreateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    openModal(createSalesContentForm);
  };

  const onCancelClick = () => {
    closeModal();
  };

  const salesContents = (
    <SalesContentCardGroup
      cardProps={salesContentList}
      isLoading={loadStatus.isLoading}
      loadMore={salesContentListHandler.loadNext}
      canLoadMore={loadStatus.hasNextPage}
    />
  );

  const createSalesContentForm = (
    <CreateSalesContentForm
      textOptions={register("title", { required: true })}
      onCancelClick={onCancelClick}
      onSubmit={handleSubmit(createSubmitClick)}
    />
  );

  if (loadStatus.isError) {
    toast.error(ApiError, { id: "MyTechNote" });
  }

  return (
    <SalesRoomTemplate
      content={salesContents}
      actionPanel={<SalesRoomActionPanel onCreateClick={onCreateClick} />}
    />
  );
};

export default SalesRoom;
SalesRoom.requireAuth = true;
