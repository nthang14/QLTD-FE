import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { readGoogleToken } from "~/utils/storage";
import defaultThumbnail from "~/assets/images/default-thumbnail.jpg";
export default function FileItem({ data, ...props }: any) {
  const [thumbnail, setThumbnail] = useState("");
  function getThumbnail() {
    const fileId = data.ggId;
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
  useEffect(() => {
    getThumbnail();
  }, []);
  return (
    <div className="bg-[#e8f5e8] rounded-[10px]">
      {/* header file item */}
      <div className="items-center justify-between flex px-4 py-2 bg-[#e8f5e8] rounded-[10px] cursor-pointer">
        <img src={data.iconLink} alt="icon file" />
        <div className="pl-3 text-line-1 text-[14px] font-medium">
          {data.title}
        </div>
        <IconButton color="primary">
          <MoreVertIcon className="" />
        </IconButton>
      </div>
      {/* content */}
      <div className="px-4 py-2">
        <img
          src={
            !!thumbnail
              ? `data:image/gif;base64,${thumbnail}`
              : defaultThumbnail.src
          }
          alt="thumnial"
          width="100%"
          height="auto"
        />
      </div>
    </div>
  );
}
