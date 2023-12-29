import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import {
  useGetReportUserQuery,
  useGetReportReceiptQuery,
} from "~/app/services/reportService";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { formatCurrency, makeRows, formatDate } from "~/utils/helpers";
import DatePickerCommon from "~/components/common/DatePickerCommon";

import Highcharts from "highcharts";
export default function Home() {
  const router = useRouter();
  const t = useTranslations();
  const [params, setParams] = useState<any>({
    year: dayjs(new Date()).year(),
  });
  const month = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const [dataChart, setDataChart] = useState<any>([]);
  const getReportReceipts = useGetReportReceiptQuery(params);
  const getReportUser = useGetReportUserQuery({});
  const handleChangeMonth = async (value: string) => {
    setParams({
      year: dayjs(dayjs(value).valueOf()).format("YYYY"),
    });
  };
  useEffect(() => {
    if (
      getReportReceipts &&
      getReportReceipts.isSuccess &&
      !getReportReceipts.isLoading
    ) {
      setDataChart(getReportReceipts.data);
    }
  }, [getReportReceipts]);
  useEffect(() => {
    Highcharts.chart("container", {
      chart: {
        type: "column",
      },
      title: {
        text: "Biểu đồ thống kê số tiền điện theo tháng",
        align: "center",
      },
      xAxis: {
        categories: month.map((m) => {
          return `${m}/${params.year}`;
        }),
      },
      yAxis: {
        min: 0,
        title: {
          text: "VND",
        },
        stackLabels: {
          enabled: true,
        },
      },
      legend: {
        align: "left",
        x: 70,
        verticalAlign: "top",
        y: 70,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || "white",
        borderColor: "#CCC",
        borderWidth: 1,
        shadow: false,
      },
      tooltip: {
        headerFormat: "<b>{point.x}</b><br/>",
        pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
      },
      plotOptions: {
        column: {
          stacking: "normal",
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: "Total Unpaid",
          data: month.map((m) => {
            const label = dataChart.find((d: any) => {
              return formatDate(d._id, "MM/YYYY") === `${m}/${params.year}`;
            });
            if (label) {
              return label.totalPrice - label.totalPricePaid;
            }
            return 0;
          }),
        },
        {
          name: "Total Pay",
          data: month.map((m) => {
            const label = dataChart.find((d: any) => {
              return formatDate(d._id, "MM/YYYY") === `${m}/${params.year}`;
            });
            if (label) {
              return label.totalPricePaid;
            }
            return 0;
          }),
        },
      ],
    });
  }, [dataChart]);
  return (
    <div className=" py-6 box-form">
      <div className="font-bold text-[20px]">
        Total customer: {getReportUser?.data?.total || 0}
      </div>
      <div>
        <DatePickerCommon
          onChange={(value: string) => {
            handleChangeMonth(value);
          }}
          label={t("power.create.form.indexOfMonth")}
          format={"YYYY"}
          views={["year"]}
        />
      </div>
      <div id="container"></div>
    </div>
  );
}
export async function getServerSideProps({ req }: any) {
  if (!req?.cookies?.accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
}
