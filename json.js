var response = {
  "2021-03-15": 46669.3276,
  "2021-03-16": 47825.7816,
  "2021-03-17": 49171.8784,
  "2021-03-18": 48365.0435,
  "2021-03-19": 48607.7424,
  "2021-03-20": 48649.4575,
  "2021-03-21": 48275.0583,
  "2021-03-22": 45327.0139,
  "2021-03-23": 45869.65,
  "2021-03-24": 44270.8074,
  "2021-03-25": 43609.7734,
  "2021-03-26": 46672.0426,
  "2021-03-27": 47356.905,
  "2021-03-28": 47300.1989,
  "2021-03-29": 48983.9678,
  "2021-03-30": 50177.0489,
  "2021-03-31": 50132.8621,
  "2021-04-01": 49871.4629,
  "2021-04-02": 50151.8752,
  "2021-04-03": 48527.8856,
  "2021-04-04": 49525.1132,
  "2021-04-05": 50061.2296,
  "2021-04-06": 48863.595,
  "2021-04-07": 47137.1815,
  "2021-04-08": 48751.2342,
  "2021-04-09": 48836.7291,
  "2021-04-10": 50241.0544,
  "2021-04-11": 50425.9885,
  "2021-04-12": 50245.042,
  "2021-04-13": 53191.6882,
  "2021-04-14": 52552.8535,
};

var r=Object.keys(response).map((item)=> ({"Date":item,"Value":response[item]}) )
console.log(r)

import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import "antd/dist/antd.css";
import axios from "axios";
const Page = () => {
  const [dataFetch, setDataFetech] = useState("");
  const CallAxios = async () => {
    try {
      let response = await axios.get(
        `https://api.coindesk.com/v1/bpi/historical/close.json?currency=EUR&start=201`
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
  });

  var r = Object.keys(dataFetch).map((item) => ({
    Date: item,
    Value: dataFetch[item],
  }));
  console.log(r);
  const data = r;