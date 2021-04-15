import React, { useEffect, useState } from "react";
import CurrencyStore from "../../Zustand/CurrencyStore";
import { Line } from "@ant-design/charts";
import "antd/dist/antd.css";
import axios from "axios";
const Page = () => {
  const [dataFetch, setDataFetech] = useState("");
  const currencyType = CurrencyStore((state) => state.currencyType);
  const CallAxios = async () => {
    try {
      let response = await axios.get(
        `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currencyType}&start=100`
      );
      return response.data.bpi;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  useEffect(() => {
    CallAxios().then((data) => {
      setDataFetech(data);
    });
  }, [dataFetch]);

  var r = Object.keys(dataFetch).map((item) => ({
    Date: item,
    Value: dataFetch[item],
  }));
  // console.log(r);
  const data = r;

  var config = {
    data: data,
    padding: "auto",
    xField: "Date",
    yField: "Value",
    annotations: [
      {
        type: "regionFilter",
        start: ["min", "median"],
        end: ["max", "0"],
        color: "#F4664A",
      },
      {
        type: "text",
        position: ["min", "median"],
        offsetY: -4,
        style: { textBaseline: "bottom" },
      },
      {
        type: "line",
        start: ["min", "median"],
        end: ["max", "median"],
        style: {
          stroke: "#F4664A",
          lineDash: [2, 2],
        },
      },
    ],
  };
  return <Line {...config} />;
};
export default Page;
