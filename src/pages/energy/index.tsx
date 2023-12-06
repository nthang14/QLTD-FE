import BreadcrumbsCommon from "~/components/common/BreadcrumbsCommon";
import ButtonCommon from "~/components/common/ButtonCommon";
import Link from "next/link";
import { useTranslations } from "next-intl";
import TableCommon from "~/components/common/TableCommon";
import TitleCommon from "~/components/common/TitleCommon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PAGE_DEFAULT, LIMIT_DEFAULT } from "~/utils/constants";
import { useGetPowersQuery } from "~/app/services/powerService";
import { formatDate, calBill } from "~/utils/helpers";
import InputCommon from "~/components/common/InputCommon";
import { debounce } from "~/utils/helpers";

export default function CustomerList() {
  const t = useTranslations();
  const router = useRouter();
  const [passport, setPassport] = useState("");
  const [paginator, setPaginator] = useState({
    page: PAGE_DEFAULT,
    limit: LIMIT_DEFAULT,
    passport: "",
  });
  const handleChange = (value: string) => {
    setPaginator({
      page: 1,
      limit: LIMIT_DEFAULT,
      passport: value,
    });
  };

  const handleSearchPassport = debounce(handleChange, 500);
  const fetchPowers = useGetPowersQuery(paginator);
  const handleRowClick = (data: any) => {
    router.push(`/energy/${data._id}`);
  };

  const columns = [
    {
      title: t("power.list.columns.passport"),
      dataIndex: "passport",
      key: "passport",
      ellipsis: true,
      wordBreak: true,
      className: "w-[100px] !p[12px]",
      render: (record: any) => (
        <div className="pni-text-line-1 my-3">
          {record?.customer?.passport || "--"}
        </div>
      ),
    },
    {
      title: t("power.list.columns.fullName"),
      dataIndex: "fullName",
      key: "fullName",
      className: "w-[100px] !p[12px]",
      render: (record: any) => (
        <div className="">{record?.customer?.fullName || "--"}</div>
      ),
    },
    {
      title: t("power.list.columns.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      className: "w-[80px] !p[12px]",
      render: (record: any) => (
        <div className="">{formatDate(record?.createdAt, "DD/MM/YYYY")}</div>
      ),
    },
    {
      title: t("power.list.columns.lastIndex"),
      dataIndex: "lastIndex",
      key: "lastIndex",
      className: "w-[80px] !p[12px]",
      ellipsis: true,
      render: (record: any) => (
        <div className="py-1">{record?.lastIndex || 0}</div>
      ),
    },
    {
      title: t("power.list.columns.newIndex"),
      dataIndex: "newIndex",
      key: "newIndex",
      className: "w-[80px] !p[12px]",
      ellipsis: true,
      render: (record: any) => <div className="py-1">{record?.index || 0}</div>,
    },
    {
      title: t("power.list.columns.quantity"),
      dataIndex: "quantity",
      key: "quantity",
      className: "w-[80px] !p[12px]",
      ellipsis: true,
      render: (record: any) => (
        <div className="py-1">
          {record?.index - (record?.lastIndex || 0) || "--"}
        </div>
      ),
    },
    {
      title: t("power.list.columns.quantity"),
      dataIndex: "quantity",
      key: "quantity",
      className: "w-[80px] !p[12px]",
      ellipsis: true,
      render: (record: any) => (
        <div className="py-1">
          {record?.index - (record?.lastIndex || 0) || "--"}
        </div>
      ),
    },
    {
      title: t("power.list.columns.total"),
      dataIndex: "total",
      key: "total",
      className: "w-[80px] !p[12px]",
      ellipsis: true,
      render: (record: any) => (
        <div className="py-1">
          {calBill(
            record?.index - (record?.lastIndex || 0),
            record?.rangePrice
          ) || "--"}
        </div>
      ),
    },
  ];

  const handleChangePage = (e: any) => {
    setPaginator((prevState) => ({
      ...prevState,
      page: e,
    }));
  };
  return (
    <div className="customer-list">
      <div className="flex justify-between items-center pb-5">
        <div>
          <BreadcrumbsCommon data={["customer", "customerList"]} />
          <TitleCommon title={t("customer.list.title")} />
        </div>
        <Link href="/energy/create">
          <ButtonCommon
            color={"primary"}
            className="btn h-[40px] w-[154px]"
            variant="outlined"
            title={t("common.button.createCustomer")}
          />
        </Link>
      </div>
      <div>
        <InputCommon
          placeholder="Search by passport"
          onChange={(e: any) => handleSearchPassport(e.target.value)}
        />
        <TableCommon
          rowClick={handleRowClick}
          fetchData={fetchPowers?.data?.data}
          columns={columns}
          handleChangePage={(e: number) => handleChangePage(e)}
          paginator={paginator}
          data={fetchPowers?.data}
        />
      </div>
    </div>
  );
}
