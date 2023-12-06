import { ListItemText, List, ListItemButton } from "@mui/material";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useTranslations } from "next-intl";
import { createElement } from "react";
import { useRouter } from "next/router";
import * as React from "react";

export default function Navigation() {
  const t = useTranslations();
  const router = useRouter();
  const menus = [
    {
      key: "dashboard",
      label: t("nav.dashboard"),
      icon: createElement(DashboardIcon),
      handleClick: () => {
        router.push("/");
      },
      children: [],
    },
    {
      key: "customers",
      label: t("nav.customer"),
      icon: createElement(RecentActorsIcon),
      handleClick: () => {
        router.push("/customers");
      },
      children: [],
    },
    {
      key: "energy",
      label: t("nav.energy"),
      icon: createElement(ElectricBoltIcon),
      handleClick: () => {
        router.push("/energy");
      },
      children: [],
    },
    {
      key: "receipts",
      label: t("nav.receipt"),
      icon: createElement(ReceiptIcon),
      handleClick: () => {
        router.push("/receipts");
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
    </>
  );
}
