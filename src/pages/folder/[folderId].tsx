import { useGetFoldersByOwnerQuery } from "~/app/services/folderService";
import { useGetFileByOwnerQuery } from "~/app/services/fileService";
import LayoutGrid from "~/components/layout/LayoutGrid";
import FolderItem from "~/components/FolderItem";
import FileItem from "~/components/FileItem";
import TableCommon from "~/components/common/TableCommon";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { saveGoogleToken, readGoogleToken } from "~/utils/storage";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { convertByte } from "~/utils/helpers";
import { Dialog, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import defaultThumbnail from "~/assets/images/default-thumbnail.jpg";

export default function FolderDetail() {
  const router = useRouter();
  console.log("router", router.query.folderId);
  const parentId = router.query.folderId?.toString();
  const t = useTranslations();
  const [paginator, setPaginator] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10000,
  });
  console.log(paginator);
  const [isPreview, setIsPreview] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  function getThumbnail(id: string) {
    const fileId = id;
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
      true
    );
    xhr.setRequestHeader("Authorization", "Bearer " + readGoogleToken());
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
      const buf = xhr.response;
      var base64String = btoa(
        new Uint8Array(buf).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setThumbnail(base64String);
    };
    xhr.send();
  }
  const handleRowClick = async (data: any) => {
    if (!data.fileExtension) {
      router.push(`/folder/${data.id}?mode=${router.query.mode}`);
    } else {
      await getThumbnail(data.ggId);
      setIsPreview(true);
    }
  };
  const columns = [
    {
      title: "Tên",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      wordBreak: true,
      className: "w-[300px] !p[12px] cursor-pointer",
      render: (record: any) => (
        <div
          className="flex items-center justify-start"
          onClick={() => {
            handleRowClick(record);
          }}
        >
          {record?.iconLink ? (
            <img
              src={record.iconLink}
              alt="icon file"
              width="20"
              height="auto"
            />
          ) : (
            <div>
              <FolderSharedIcon />
            </div>
          )}
          <div className="pni-text-line-1 my-3 pl-3" title={record?.title}>
            {record?.title}
          </div>
        </div>
      ),
    },
    {
      title: "Kích cỡ tệp",
      dataIndex: "Kích cỡ tệp",
      key: "fileSize",
      ellipsis: true,
      wordBreak: true,
      className: "w-[300px] !p[12px] cursor-pointer",
      render: (record: any) => (
        <div className="pni-text-line-1 my-3 pl-3" title={record?.fileSize}>
          {record?.fileSize ? convertByte(record?.fileSize) : "--"}
        </div>
      ),
    },
    {
      title: "Chủ sở hữu",
      dataIndex: "Kích cỡ tệp",
      key: "owner",
      ellipsis: true,
      wordBreak: true,
      className: "w-[300px] !p[12px] cursor-pointer",
      render: (record: any) => (
        <div className="pni-text-line-1 my-3 pl-3" title={record?.fileSize}>
          {record?.owner.fullName}
        </div>
      ),
    },
  ];
  const fetchFolders = useGetFoldersByOwnerQuery({ ...paginator, parentId });
  const fetchFiles = useGetFileByOwnerQuery({ ...paginator, parentId });
  if (
    fetchFiles &&
    !fetchFiles.isFetching &&
    fetchFiles.isSuccess &&
    fetchFiles?.data?.googleToken
  ) {
    saveGoogleToken(fetchFiles.data.googleToken);
  }
  const handleChangePage = (e: any) => {
    setPaginator({
      page: e,
      limit: 1,
    });
  };
  return (
    <div>
      <LayoutGrid />
      {router?.query.mode === "table" ? (
        // layout table
        <div className="table-layout">
          {fetchFolders.isSuccess && fetchFiles.isSuccess && (
            <TableCommon
              handleChangePage={handleChangePage}
              columns={columns}
              fetchData={[
                ...fetchFolders?.data?.data,
                ...fetchFiles?.data?.data,
              ]}
              paginator={paginator}
              data={fetchFolders?.data}
            />
          )}
        </div>
      ) : (
        // layout grid
        <div className="grid-layout box-form">
          {/* Folders */}
          <div>
            <div className="text-[14px] font-medium pb-3">
              {t("common.folders")}
            </div>
            <div className="grid grid-cols-6 gap-4">
              {fetchFolders?.data?.data?.map((item: any) => {
                return (
                  <div key={item.id}>
                    <FolderItem data={item} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pt-5">
            <div className="text-[14px] font-medium pb-3">
              {t("common.files")}
            </div>
            <div className="grid grid-cols-6 gap-4">
              {fetchFiles?.data?.data?.map((item: any) => {
                return (
                  <div key={item.id}>
                    <FileItem data={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <Dialog open={isPreview} onClose={() => setIsPreview(false)}>
        <div className="flex items-center justify-end cursor-pointer">
          <CloseIcon onClick={() => setIsPreview(false)} />
        </div>
        <DialogContent>
          <img
            src={
              !!thumbnail
                ? `data:image/gif;base64,${thumbnail}`
                : defaultThumbnail.src
            }
            alt="thumnial"
            width="700"
            height="auto"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
export async function getServerSideProps({ req }: any) {
  if (!req?.cookies?.accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
}
