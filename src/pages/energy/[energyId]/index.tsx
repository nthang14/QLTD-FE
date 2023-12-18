import BreadcrumbsCommon from "~/components/common/BreadcrumbsCommon";
import ButtonCommon from "~/components/common/ButtonCommon";
import TitleCommon from "~/components/common/TitleCommon";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useEffect, useState, useMemo } from "react";
import { useGetPowerByIdQuery } from "~/app/services/powerService";

import { Grid } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { setNotify } from "~/app/slices/commonSlice";
import { formatCurrency, makeRows } from "~/utils/helpers";
import { useCreateNewReceiptMutation } from "~/app/services/receiptService";
export default function DetailEnergy() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();
  const [totalPayment, setTotalPayment] = useState(0);
  const [user, setUser] = useState<any>(null);
  const getPowerById = useGetPowerByIdQuery(router?.query?.energyId);
  const [rows, setRows] = useState<any>([]);
  const [createNewReceipt] = useCreateNewReceiptMutation();
  useEffect(() => {
    if (getPowerById?.data?.customer && getPowerById?.data?.rangePrice) {
      setUser(getPowerById?.data?.customer || {});

      const { total, payment } = makeRows(
        getPowerById?.data?.index - getPowerById?.data?.lastIndex,
        getPowerById?.data?.rangePrice
      );
      setTotalPayment(total);
      setRows(payment);
    }
  }, [getPowerById]);
  const handleCreateReceipt = async () => {
    const payload = {
      energy: getPowerById?.data?.index - getPowerById?.data?.lastIndex,
      powerId: getPowerById?.data?._id,
      customerId: getPowerById?.data?.customer?._id,
      rangePrice: getPowerById?.data?.rangePrice,
    };
    const result: any = await createNewReceipt(payload);
    if (result && result?.data?.data) {
      dispatch(
        setNotify({
          isShowNotify: true,
          notifyContent: t("common.messages.msg011"),
          typeAlert: "success",
        })
      );
      router.push(`/receipts/${result?.data?.data?._id}`);
    }
  };
  return (
    <div className="customer-create">
      <div className="flex justify-between items-center">
        <div>
          <BreadcrumbsCommon data={["energy", "indexDetail"]} />
          <TitleCommon title={t("power.detail.title")} />
        </div>
      </div>
      <div className={"flex justify-between flex-col h-full"}>
        <div className={" py-6 box-form"}>
          <div className="form-transfer">
            <Grid container columnSpacing={1} rowSpacing={4}>
              <Grid item xs={2} className="">
                <div className="font-medium">
                  {t("power.detail.form.fullName")}:
                </div>
              </Grid>
              <Grid item xs={4} className="">
                <div className="font-normal">{user?.fullName}</div>
              </Grid>
              <Grid item xs={2} className="">
                <div className="font-medium">
                  {t("power.detail.form.passport")}:
                </div>
              </Grid>
              <Grid item xs={4} className="">
                <div className="font-normal">{user?.passport}</div>
              </Grid>

              <Grid item xs={2} className="">
                <div className="font-medium">
                  {t("power.detail.form.lastIndex")}:
                </div>
              </Grid>
              <Grid item xs={4} className="">
                <div className="font-normal">
                  {getPowerById?.data?.lastIndex || 0}
                </div>
              </Grid>

              <Grid item xs={2} className="">
                <div className="font-medium">
                  {t("power.detail.form.newIndex")}:
                </div>
              </Grid>
              <Grid item xs={4} className="">
                <div className="font-normal">
                  {getPowerById?.data?.index || 0}
                </div>
              </Grid>

              <Grid item xs={6} className="text-left">
                <div className="font-medium">
                  {t("power.detail.form.totalPayment")}:
                </div>
              </Grid>
              <Grid item xs={6} className="flex justify-end">
                {getPowerById?.data?.isReceipt ? (
                  <ButtonCommon
                    size="medium"
                    type="button"
                    color="primary"
                    className="rounded-3xl w-[216px]"
                    variant="outlined"
                    autoFocus
                  >
                    {t("common.button.viewReceipt")}
                  </ButtonCommon>
                ) : (
                  <ButtonCommon
                    size="medium"
                    type="button"
                    color="primary"
                    disabled={getPowerById?.data?.isReceipt}
                    className="rounded-3xl w-[216px]"
                    variant="outlined"
                    onClick={handleCreateReceipt}
                    autoFocus
                  >
                    {t("common.button.createReceipt")}
                  </ButtonCommon>
                )}
              </Grid>

              <Grid item xs={12} className="">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colSpan={3}>
                          Details
                        </TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Desc</TableCell>
                        <TableCell align="right">Qty.</TableCell>
                        <TableCell align="right">Unit</TableCell>
                        <TableCell align="right">Sum</TableCell>
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
                            {formatCurrency(row.sum)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">
                          {formatCurrency(totalPayment)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid item xs={12} className=""></Grid>
              <Grid item xs={6} className="flex justify-end">
                <ButtonCommon
                  size="medium"
                  type="button"
                  color="primary"
                  className="rounded-3xl w-[216px]"
                  variant="outlined"
                  onClick={() => {
                    router.push("/energy");
                  }}
                  autoFocus
                >
                  {t("common.button.back")}
                </ButtonCommon>
              </Grid>
              <Grid item xs={6} className="">
                <ButtonCommon
                  size="medium"
                  type="button"
                  color="primary"
                  disabled={getPowerById?.data?.isReceipt}
                  className="rounded-3xl w-[216px]"
                  onClick={() => {
                    router.push(`/energy/${getPowerById?.data?._id}/edit`);
                  }}
                  autoFocus
                >
                  {t("common.button.edit")}
                </ButtonCommon>
              </Grid>
            </Grid>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
