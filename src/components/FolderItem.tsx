import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
export default function FolderItem({ data, ...props }: any) {
  return (
    <div className="items-center justify-between flex px-4 py-2 bg-[#e8f5e8] rounded-[10px] cursor-pointer">
      <div className="flex items-center">
        <FolderIcon />
        <p className="pl-3 text-line-1 text-[14px] font-medium">{data.title}</p>
      </div>
      <IconButton color="primary">
        <MoreVertIcon className="" />
      </IconButton>
    </div>
  );
}
