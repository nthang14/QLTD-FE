import BreadcrumbsCommon from "~/components/common/BreadcrumbsCommon";
import ButtonCommon from "~/components/common/ButtonCommon";
import TitleCommon from "~/components/common/TitleCommon";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";

import dayjs from "dayjs";
import { Grid } from "@mui/material";
import duration from "dayjs/plugin/duration";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useGetReceiptByIdQuery,
  usePaymentMutation,
} from "~/app/services/receiptService";
import { useDispatch } from "react-redux";
import { setNotify } from "~/app/slices/commonSlice";
import { formatCurrency, makeRows, formatDate } from "~/utils/helpers";
import { DocTienBangChu } from "~/utils/converNumberToChar";
import html2canvas from "html2canvas";
import CheckIcon from "@mui/icons-material/Check";
export default function ReceiptDEtail() {
  const reportTemplateRef = useRef(null);
  const dispatch = useDispatch();
  const t = useTranslations();
  const router = useRouter();
  const docPrice = new DocTienBangChu();
  const fetchReceipt = useGetReceiptByIdQuery(router?.query?.receiptId);
  const [receiptDetail, setReceiptDetail] = useState<any>({});
  const [rows, setRows] = useState<any>([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [date, setDate] = useState(null);
  useEffect(() => {
    if (fetchReceipt.isSuccess && !fetchReceipt.isLoading) {
      setReceiptDetail(fetchReceipt?.data?.data);
      const { total, payment } = makeRows(
        fetchReceipt?.data?.data.energy,
        fetchReceipt?.data?.data.rangePrice
      );
      setTotalPayment(total);
      setRows(payment);
      const [day, month, year] = formatDate(
        fetchReceipt?.data?.data.createdAt,
        "DD/MM/YYYY"
      ).split("/");
      setDate({
        day: day,
        month: month,
        year,
      });
    }
  }, [fetchReceipt]);
  const handleGeneratePdf = () => {
    html2canvas(document.getElementById("test"))
      .then(function (canvas) {
        canvas.style.display = "none";
        document.body.appendChild(canvas);
        return canvas;
      })
      .then((canvas) => {
        const image = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.setAttribute(
          "download",
          `${receiptDetail.customer.fullName}-${formatDate(
            receiptDetail.indexOfMonth,
            "DD/MM/YYYY"
          )}`
        );
        a.setAttribute("href", image);
        a.click();
        canvas.remove();
      });
  };
  const [payment] = usePaymentMutation();
  const handlePay = async () => {
    const result = await payment(receiptDetail._id);
    if (result) {
      fetchReceipt.refetch();
    }
  };
  return (
    <div className="customer-create">
      <div className="flex justify-between items-center w-full">
        <div className=" w-full">
          <BreadcrumbsCommon data={["receiptList", "receiptDetail"]} />
          <div className="flex justify-between w-full">
            <TitleCommon title={t("power.detail.title")} />
            <div>
              {receiptDetail.paid ? (
                <ButtonCommon
                  size="medium"
                  type="button"
                  color="primary"
                  disabled
                  className="rounded-3xl w-[180px] mr-3"
                  autoFocus
                >
                  <CheckIcon className="fill-white" />
                  {t("common.button.paid")}
                </ButtonCommon>
              ) : (
                <ButtonCommon
                  size="medium"
                  type="button"
                  color="primary"
                  className="rounded-3xl w-[180px] mr-3"
                  autoFocus
                  onClick={handlePay}
                >
                  {t("common.button.pay")}
                </ButtonCommon>
              )}

              <ButtonCommon
                size="medium"
                type="button"
                color="primary"
                className="rounded-3xl w-[180px]"
                variant="outlined"
                autoFocus
                onClick={handleGeneratePdf}
              >
                {t("common.button.exportReceipt")}
              </ButtonCommon>
            </div>
          </div>
        </div>
      </div>
      <div
        className={"flex justify-between flex-col h-full"}
        ref={reportTemplateRef}
      >
        <div className={" py-6 box-form"} id="test">
          <div className="form-transfer">
            <div className="uppercase text-[24px] text-center font-bold pb-1">
              {t("detailPrice.invoice")}
            </div>
            <div className="text-center pb-6">
              {t("detailPrice.date", {
                day: date?.day,
                month: date?.month,
                year: date?.year,
              })}
            </div>
            <Grid container columnSpacing={1} rowSpacing={2}>
              <Grid item xs={2} className="">
                <div className="font-medium">
                  {t("power.detail.form.fullName")}:
                </div>
              </Grid>
              <Grid item xs={4} className="">
                <div className="font-normal">
                  {receiptDetail?.customer?.fullName}
                </div>
              </Grid>

              <Grid item xs={6} className=""></Grid>
              <Grid item xs={2} className="">
                <div className="font-medium">
                  {t("receipt.detail.form.phoneNumber")}:
                </div>
              </Grid>
              <Grid item xs={4} className="">
                <div className="font-normal">
                  {receiptDetail?.customer?.phoneNumber}
                </div>
              </Grid>

              <Grid item xs={6} className=""></Grid>
              <Grid item xs={2} className="">
                <div className="font-medium">
                  {t("receipt.detail.form.address")}:
                </div>
              </Grid>
              <Grid item xs={10} className="">
                <div className="font-normal">
                  {receiptDetail?.customer?.address}
                </div>
              </Grid>
              <Grid item xs={2} className="">
                <div className="font-medium">
                  {t("receipt.detail.form.month")}:
                </div>
              </Grid>
              <Grid item xs={4} className="">
                <div className="font-normal">
                  {formatDate(receiptDetail?.indexOfMonth, "MM/YYYY")}
                </div>
              </Grid>
              <Grid item xs={2} className="">
                <div className="font-medium">
                  {t("detailPrice.unitCurrency")}:
                </div>
              </Grid>
              <Grid item xs={4} className="">
                <div className="font-normal">{"VND"}</div>
              </Grid>
              <Grid item xs={2} className="">
                <div className="font-medium">
                  {t("power.detail.form.lastIndex")}:
                </div>
              </Grid>
              <Grid item xs={4} className="">
                <div className="font-normal">{receiptDetail?.lastIndex}</div>
              </Grid>
              <Grid item xs={2} className="">
                <div className="font-medium">
                  {t("power.detail.form.newIndex")}:
                </div>
              </Grid>
              <Grid item xs={4} className="">
                <div className="font-normal">{receiptDetail?.index}</div>
              </Grid>

              <Grid item xs={12} className="pb-5">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colSpan={3}>
                          {t("detailPrice.detail")}
                        </TableCell>
                        <TableCell align="right">
                          {t("detailPrice.price")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell> {t("detailPrice.level")}</TableCell>
                        <TableCell align="right">
                          {t("detailPrice.quantity")}
                        </TableCell>
                        <TableCell align="right">
                          {t("detailPrice.unit")}
                        </TableCell>
                        <TableCell align="right">
                          {t("detailPrice.sum")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row: any, index: number) => (
                        <TableRow key={row.desc}>
                          <TableCell>{`Level-${index + 1}`}</TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                          <TableCell align="right">
                            {formatCurrency(row.unitPrice)}
                          </TableCell>
                          <TableCell align="right">
                            {formatCurrency(row.sum) || 0}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell />

                        <TableCell colSpan={2} className="font-bold text-right">
                          {t("detailPrice.totalEnergy")}
                        </TableCell>
                        <TableCell align="right">
                          {receiptDetail?.energy}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell />

                        <TableCell
                          colSpan={2}
                          className="font-bold  text-right"
                        >
                          {t("detailPrice.totalPrice")}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(totalPayment)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell />

                        <TableCell
                          colSpan={2}
                          className="font-bold  text-right"
                        >
                          {t("detailPrice.totalPriceChar")}
                        </TableCell>
                        <TableCell align="right" className="max-w-[120px]">
                          <div>{docPrice.doc(totalPayment)}</div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={6} className="flex justify-center">
                <div>
                  <div className="pb-10 text-center">
                    {t("detailPrice.customer")}
                  </div>
                  <div className="text-center">
                    {receiptDetail?.customer?.fullName}
                  </div>
                </div>
              </Grid>
              <Grid item xs={6} className="flex justify-center">
                <div>
                  <div className="pb-10 text-center">
                    {t("detailPrice.seller")}
                  </div>
                  <div className="text-center">{`Energy management`}</div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
