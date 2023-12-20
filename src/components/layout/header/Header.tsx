"use client";
import "./style.scss";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Popover,
  List,
  ListItemText,
  ListItemButton,
  ListItem,
  Typography,
} from "@mui/material";
import ButtonCommon from "~/components/common/ButtonCommon";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { LOGOUT, ROLE_ADMIN } from "~/utils/constants";
import { readProfile, saveAccessToken } from "~/utils/storage";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import infoIcon from "~/assets/icons/info-icon.svg";
import { useAuthLogoutMutation } from "~/app/services/authService";
import Link from "next/link";
import { NoSsr } from "@mui/base";
import logo from "~/assets/images/logo.png";
import Image from "next/image";
export default function Header() {
  const t = useTranslations();
  const [authLogout] = useAuthLogoutMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(!anchorEl ? event.currentTarget : null);
  };
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const result: any = await authLogout({});
    window.location.href = "/auth/login";
  };
  const items = [
    {
      label: <div className="capitalize">{LOGOUT}</div>,
      key: "log out",
      icon: <LogoutOutlinedIcon />,
      trailingIcon: <ArrowRightOutlinedIcon />,
    },
  ];
  const handleClickMenuItem = ({ key }: any) => {
    if (key === LOGOUT) {
      setIsModalOpen(true);
    }
    setAnchorEl(null);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    saveAccessToken("");
    router.push("/auth/login");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const profile = readProfile();
  return (
    <div>
      <div className="flex items-center justify-between px-[16px] h-[84px]">
        <Link
          href="/dashboard"
          className="pl-[70px] font-semibold text-[32px] leading-[42px] text-primary-06 text-center px-[12.15px] project-number cursor-pointer no-underline flex items-center"
        >
          <Image src={logo.src} width={80} height={50} alt="logo" />
        </Link>
        <div className="flex items-center justify-around">
          <NoSsr>
            <div className="w-10 h-10 rounded-full uppercase flex justify-center items-center bg-neutral-03 text-[24px] leading-[32px] font-medium text-neutral-07">
              {profile?.email ? profile?.email[0] : ""}
            </div>
            <div>
              <div className="font-semibold text-[14px] px-2 pr-3">
                {profile?.name || profile?.username}
              </div>
              <div className="text-primary text-[12px] px-2 pr-3">
                {profile?.role === ROLE_ADMIN.value
                  ? t("common.role", { role: ROLE_ADMIN.text })
                  : ""}
              </div>
            </div>
          </NoSsr>
          <IconButton
            aria-describedby="simple-popover"
            aria-label="simple-popover"
            title="simple-popover"
            onClick={handleClick}
          >
            {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
          </IconButton>
          <Popover
            id={id}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 53,
              horizontal: "left",
            }}
          >
            <List className="bg-white !p-0">
              {items.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    onClick={() => handleClickMenuItem(item)}
                    className="!px-0 !py-2"
                  >
                    <ListItemButton className="flex gap-3 !py-0 !px-3 logout-btn">
                      {item.icon}
                      <ListItemText className="!my-2 w-[144px]">
                        <div className="capitalize">{item.label}</div>
                      </ListItemText>
                      {item.trailingIcon}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Popover>
        </div>

        <Dialog
          open={isModalOpen}
          onClose={handleCancel}
          maxWidth="md"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            className="text-center !p-0 mt-3 h-16"
          >
            <img src={infoIcon.src} alt="info" width={64} height={64} />
          </DialogTitle>
          <DialogContent className="mt-3 pb-7">
            <Typography
              variant="subtitle1"
              className="text-[22px] leading-[28px] font-medium pni-danger-text text-center"
            >
              {t("login.logout")}
            </Typography>
            <Typography
              variant="subtitle1"
              className="text-base pni-danger-text text-center pt-3 text-neutral-08"
            >
              {t("common.messages.msg006")}
            </Typography>
          </DialogContent>
          <DialogActions className="p-0 pt-3">
            <ButtonCommon
              className="w-[216px] rounded-3xl leading-[24px]"
              size="medium"
              variant="outlined"
              onClick={handleCancel}
            >
              {t("common.button.cancel")}
            </ButtonCommon>
            <ButtonCommon
              className="w-[216px] rounded-3xl !ml-4 leading-[24px]"
              size="medium"
              variant="contained"
              onClick={handleOk}
              autoFocus
            >
              {t("common.button.continue")}
            </ButtonCommon>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
