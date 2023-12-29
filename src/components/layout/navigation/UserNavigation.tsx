import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";
import ButtonCommon from "~/components/common/ButtonCommon";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useTranslations } from "next-intl";
import { createElement, useState } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import infoIcon from "~/assets/icons/info-icon.svg";
import { saveAccessToken, saveProfile } from "~/utils/storage";

export default function Navigation() {
  const t = useTranslations();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    saveAccessToken("");
    saveProfile({});
    router.push("/auth/login");
  };
  const menus = [
    {
      key: "myProfile",
      label: t("nav.myProfile"),
      icon: createElement(AccountBoxIcon),
      handleClick: () => {
        router.push("/user/my-profile");
      },
      children: [],
    },
    {
      key: "receipts",
      label: t("nav.receipt"),
      icon: createElement(ReceiptIcon),
      handleClick: () => {
        router.push("/user/receipts");
      },
      children: [],
    },
    {
      key: "changePassword",
      label: t("nav.changePassword"),
      icon: createElement(LockOpenIcon),
      handleClick: () => {
        router.push("/user/change-password");
      },
      children: [],
    },
    {
      key: "logOut",
      label: t("nav.logOut"),
      icon: createElement(ElectricBoltIcon),
      handleClick: () => {
        setIsModalOpen(true);
      },
      children: [],
    },
  ];
  return (
    <>
      <List
        sx={{
          width: "224.03px",
          maxWidth: 360,
          bgcolor: "background.paper",
          padding: "12px",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {menus.map((menu: any, indexMenu: number) => {
          return (
            <div key={menu.key} className="pt-2">
              <ListItemButton
                className={`rounded-2xl hover:bg-[#E6F4FB] ${
                  (router?.pathname === "/" && menu.key === "dashboard") ||
                  router?.pathname?.includes(menu.key)
                    ? " bg-[#E6F4FB] text-primary-06"
                    : ""
                }`}
                onClick={() => menu.handleClick()}
              >
                {menu.icon || ""}
                <ListItemText className="pl-3">
                  <div
                    className={`text-sm font-medium text-[14px] text-neutral`}
                  >
                    {menu.label}
                  </div>
                </ListItemText>
              </ListItemButton>
            </div>
          );
        })}
      </List>
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
    </>
  );
}
