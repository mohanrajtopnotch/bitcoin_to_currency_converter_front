/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, Typography, Card, Row, Col } from "antd";
import "antd/dist/antd.css";
import Page from "./ChartView";
import  CurrencyStore  from "../../Zustand/CurrencyStore";
const { Option } = Select;
const { Title } = Typography;
export default function ConverterView() {
  const [dataFetch, setDataFetech] = useState("");
  // const [currencyType, setCurrencyType] = useState("USD");
  const currencyType = CurrencyStore((state) => state.currencyType);
  const SetCurrencyType = CurrencyStore((state) => state.SetCurrencyType);
  const CallAxios = async () => {
    try {
      let response = await axios.get(
        `https://api.coindesk.com/v1/bpi/currentprice.json`
      );
      console.log(response.data.bpi);
      return response.data.bpi;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  useEffect(() => {
    CallAxios().then((data) => {
      if (currencyType === "USD") {
        setDataFetech(data.USD.rate);
      }
      if (currencyType === "GBP") {
        setDataFetech(data.GBP.rate);
      }
      if (currencyType === "EUR") {
        setDataFetech(data.EUR.rate);
      }
    });
  });

  function handleChange(value) {
    SetCurrencyType(value);
    console.log(`selected ${value}`);
  }
  return (
    <>
    <Title style={{ textAlign:'center' }} level={6}>
             Currency Converter
            </Title>
      <div style={{ padding: "10px", marginTop: "1.5%" }}>
        <Row style={{ border: "1px solid red", padding: "12px" }}>
          <Col
            span={24}
            xs={24}
            xl={12}
            style={{ textAlign: "center", marginTop: "12%" }}
          >
            <Title style={{ opacity: 0.6, padding: "10px" }} level={4}>
              1 BitCoin Equals
            </Title>
            <Select
              defaultValue="United States Dollar (USD)"
              style={{ width: "300px", padding: "10px" }}
              onChange={handleChange}
            >
              <Option value="USD">United States Dollar (USD)</Option>
              <Option value="GBP">British Pound Sterling (GBP)</Option>
              <Option value="EUR">Euro (EUR)</Option>
            </Select>
            <Title level={4} style={{ padding: "10px" }}>
              {dataFetch}
            </Title>
          </Col>

          <Col span={24} xs={24} xl={12} style={{ textAlign: "center" }}>
            <Title style={{ opacity: 0.6 }} level={4}>
              Last 60 Days Trend
            </Title>
            <Card style={{ height: "450px" }}>
              <Page />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
