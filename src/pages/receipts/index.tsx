import BreadcrumbsCommon from "~/components/common/BreadcrumbsCommon";
import ButtonCommon from "~/components/common/ButtonCommon";
import Link from "next/link";
import { useTranslations } from "next-intl";
import TableCommon from "~/components/common/TableCommon";
import TitleCommon from "~/components/common/TitleCommon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PAGE_DEFAULT, LIMIT_DEFAULT } from "~/utils/constants";
import InputCommon from "~/components/common/InputCommon";
import { debounce } from "~/utils/helpers";
import Tooltip from "@mui/material/Tooltip";
import { useGetReceiptsQuery } from "~/app/services/receiptService";
import { formatCurrency, makeRows, formatDate } from "~/utils/helpers";
import DatePickerCommon from "~/components/common/DatePickerCommon";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Grid } from "@mui/material";
import { getLastMonth } from "~/utils/helpers";

export default function ReceiptList() {
  const t = useTranslations();
  const router = useRouter();
  const [passport, setPassport] = useState("");
  const columns = [
    {
      title: t("receipt.list.customer"),
      dataIndex: "customer",
      key: "customer",
      ellipsis: true,
      wordBreak: true,
      className: "w-[100px] !p[12px]",
      render: (record: any) => (
        <div className="pni-text-line-1 my-3">
          {record?.customer?.fullName || "--"}
        </div>
      ),
    },
    {
      title: t("receipt.list.quantity"),
      dataIndex: "quantity",
      key: "quantity",
      className: "w-[100px] !p[12px]",
      render: (record: any) => <div className="">{record?.energy || "--"}</div>,
    },
    {
      title: t("receipt.list.indexOdMonth"),
      dataIndex: "indexOfMonth",
      key: "indexOfMonth",
      className: "w-[80px] !p[12px]",
      render: (record: any) => (
        <div className="">
          {formatDate(record?.power?.indexOfMonth, "MM/YYYY")}
        </div>
      ),
    },
    {
      title: t("receipt.list.totalPrice"),
      dataIndex: "totalPrice",
      key: "totalPrice",
      className: "w-[80px] !p[12px]",
      ellipsis: true,
      render: (record: any) => (
        <div className="py-1">{formatCurrency(record?.totalBill) || 0}</div>
      ),
    },
    {
      title: t("receipt.list.paid"),
      dataIndex: "paid",
      key: "paid",
      className: "w-[80px] !p[12px]",
      ellipsis: true,
      render: (record: any) => (
        <div className="py-1">{record?.paid ? "Paid" : "Unpaid"}</div>
      ),
    },
  ];
  const [paginator, setPaginator] = useState({
    page: PAGE_DEFAULT,
    limit: LIMIT_DEFAULT,
    passport: "",
    indexOfMonth: "",
  });
  const handleChange = (value: string) => {
    setPaginator({
      page: 1,
      limit: LIMIT_DEFAULT,
      passport: value,
      indexOfMonth: paginator.indexOfMonth,
    });
  };
  const handleChangeMonth = async (value: string) => {
    setPaginator({
      page: 1,
      limit: LIMIT_DEFAULT,
      passport: paginator.passport,
      indexOfMonth: dayjs(dayjs(value).valueOf()).format("YYYY/MM"),
    });
  };
  const handleSearchPassport = debounce(handleChange, 500);
  const fetchReceipt = useGetReceiptsQuery(paginator);
  const handleRowClick = (data: any) => {
    router.push(`/receipts/${data._id}`);
  };
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
          <BreadcrumbsCommon data={["receiptList"]} />
          <TitleCommon title={t("receipt.listTitle")} />
        </div>
      </div>
      <div>
        <Grid container columnSpacing={6} rowSpacing={6}>
          <Grid item xs={6} className="">
            <InputCommon
              placeholder="Search by passport"
              onChange={(e: any) => handleSearchPassport(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} className="">
            <DatePickerCommon
              onChange={(value: string) => {
                handleChangeMonth(value);
              }}
              label={t("power.create.form.indexOfMonth")}
              format={"YYYY-MM"}
            />
          </Grid>
        </Grid>

        <TableCommon
          rowClick={handleRowClick}
          fetchData={fetchReceipt?.data?.data}
          columns={columns}
          handleChangePage={(e: number) => handleChangePage(e)}
          paginator={paginator}
          data={fetchReceipt?.data}
        />
      </div>
    </div>
  );
}
