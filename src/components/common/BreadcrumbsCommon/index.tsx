import { Link } from "@mui/material";
import { Breadcrumbs, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect } from "react";

const BreadcrumbsCommon = ({ ...props }) => {
  const router = useRouter();
  const t = useTranslations();
  const common: any = {
    dashboard: {
      title: t("nav.dashboard"),
      link: "/",
    },
    customer: {
      title: t("nav.customer"),
      link: "/customers",
    },
    customerList: {
      title: t("nav.list"),
      link: "/customers",
    },
    customerCreate: {
      title: t("nav.customerCreate"),
      link: "/customers/create",
    },
    detailCustomer: {
      title: t("nav.detailCustomer"),
      link: `/customers/${router.query.customerId}`,
    },
    editCustomer: {
      title: t("nav.editCustomer"),
      link: `/customers/${router.query.customerId}/edit`,
    },
    energy: {
      title: t("nav.energy"),
      link: `/energy`,
    },
    indexCreate: {
      title: t("nav.indexCreate"),
      link: `/energy/create`,
    },
    indexEdit: {
      title: t("nav.indexEdit"),
      link: `/energy/${router.query?.energyId}/edit`,
    },
    indexDetail: {
      title: t("nav.indexDetail"),
      link: `/energy/${router.query?.energyId}`,
    },
    receiptList: {
      title: t("nav.receiptList"),
      link: `/receipts`,
    },
    receiptDetail: {
      title: t("nav.receiptDetail"),
      link: `/receipts/${router.query?.receiptId}`,
    },
    receiptDetailUser: {
      title: t("nav.receiptDetail"),
      link: `/user/receipts/${router.query?.receiptId}`,
    },
    receiptListUser: {
      title: t("nav.receiptList"),
      link: `/user/receipts`,
    },
  };

  useEffect(() => {}, [props.data]);
  const doBack = () => {
    props.handleBack();
  };

  return (
    <div className={"flex"}>
      <Breadcrumbs>
        {props?.data?.length > 0 &&
          props.data.map((datum: any, index: number) => {
            return index == props.data.length - 1 ? (
              <Typography
                key="3"
                fontWeight={"medium"}
                className={"fs-14 text-primary-06"}
              >
                {common[datum?.value || datum].title || datum.title}
              </Typography>
            ) : (
              <Link
                underline="hover"
                key={index}
                href={common[datum].link}
                className={"font-medium text-neutral-06 fs-14"}
              >
                {common[datum].title}
              </Link>
            );
          })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsCommon;
