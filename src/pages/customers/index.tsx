import BreadcrumbsCommon from "~/components/common/BreadcrumbsCommon";
import ButtonCommon from "~/components/common/ButtonCommon";
import Link from "next/link";
import { useTranslations } from "next-intl";
import TableCommon from "~/components/common/TableCommon";
import TitleCommon from "~/components/common/TitleCommon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PAGE_DEFAULT, LIMIT_DEFAULT } from "~/utils/constants";
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from "~/app/services/userService";
import { formatDate } from "~/utils/helpers";
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
  const fetchUsers = useGetUsersQuery(paginator);
  const handleRowClick = (data: any) => {
    router.push(`/customers/${data._id}`);
  };
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const handleUpdateStatus = async (data: any) => {
    const result = await updateUserStatus(data);
    if (result) {
      fetchUsers.refetch();
    }
  };
  const columns = [
    {
      title: t("customer.list.columns.passport"),
      dataIndex: "passport",
      key: "passport",
      ellipsis: true,
      wordBreak: true,
      className: "w-[150px] !p[12px]",
      render: (record: any) => (
        <div className="pni-text-line-1 my-3">{record?.passport}</div>
      ),
    },
    {
      title: t("customer.list.columns.fullName"),
      dataIndex: "fullName",
      key: "fullName",
      className: "w-[150px] !p[12px]",
      render: (record: any) => <div className="">{record?.fullName}</div>,
    },
    {
      title: t("customer.list.columns.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      className: "w-[150px] !p[12px]",
      render: (record: any) => (
        <div className="">{formatDate(record?.createdAt)}</div>
      ),
    },
    {
      title: t("customer.list.columns.phoneNumber"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      className: "w-[100px] !p[12px]",
      ellipsis: true,
      render: (record: any) => (
        <div className="py-1">{record?.phoneNumber || "--"}</div>
      ),
    },
    {
      title: t("customer.list.columns.address"),
      dataIndex: "address",
      key: "address",
      className: "w-[200px] !p[12px]",
      ellipsis: true,
      render: (record: any) => (
        <div className="py-1">{record?.address || "--"}</div>
      ),
    },
    {
      title: t("customer.list.columns.action"),
      dataIndex: "action",
      key: "action",
      className: "w-[100px] !p[12px]",
      ellipsis: true,
      render: (record: any) => (
        <div className="py-1">
          {record.isActive ? (
            <ButtonCommon
              color={"primary"}
              className="btn h-[40px] w-[80px]"
              variant="outlined"
              title={"Active"}
              onClick={() =>
                handleUpdateStatus({
                  id: record._id,
                  payload: { isActive: !record.isActive },
                })
              }
            />
          ) : (
            <ButtonCommon
              color={"error"}
              className="btn h-[40px] w-[80px]"
              variant="outlined"
              title={"Inactive"}
              onClick={() =>
                handleUpdateStatus({
                  id: record._id,
                  payload: { isActive: !record.isActive },
                })
              }
            />
          )}
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
        <Link href="/customers/create">
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
          fetchData={fetchUsers?.data?.data}
          columns={columns}
          handleChangePage={(e: number) => handleChangePage(e)}
          paginator={paginator}
          data={fetchUsers?.data}
        />
      </div>
    </div>
  );
}
