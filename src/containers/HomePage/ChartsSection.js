import React, { useState, useEffect } from "react";
import { Spin, notification, Row, Col, Button , Divider} from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { BASE_API_URL, NUM_TO_MONTH } from "../../utils/constants";

function ChartsSection() {
  const [policyData, setPolicyData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    fetchMonthWisePolicies("East");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMonthWisePolicies = async (zone) => {
    setLoader(true);
    try {
      const request = await fetch(`${BASE_API_URL}/policy/count?zone=${zone}`);
      const {
        response: { result },
      } = await request.json();
      const mapData = result.map(({ _id, number_of_policies }) => ({
        month: NUM_TO_MONTH[_id],
        number_of_policies,
      }));
      console.log(mapData)
      setPolicyData([].concat(mapData));
      setLoader(false);
    } catch (error) {
      console.error(error);
      setPolicyData([]);
      setLoader(false);
      openNotification();
    }
  };
  

  const openNotification = () => {
    notification.info({
      message: `Error`,
      description: "Error occurred while fetching the Chart Data",
      placement: "bottomLeft",
      type: "error",
    });
  };
  return (
    <>
      <Divider orientation="center">Zone wise Policy Data</Divider>
      {loader && (
        <Row justify="center" align="middle">
          <Col span={24} style={{ textAlign: "center" }}>
            <Spin size={50} />
          </Col>
        </Row>
      )}
      {!loader && policyData.length > 0 && (
        <LineChart
          width={900}
          height={400}
          data={policyData}
          margin={{bottom:30}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="number_of_policies"
            label="No. of Policies"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      )}
      <Row justify="center" align="middle">
        <Col span={24} style={{ textAlign: "center" }}>
          <h4>Select Zone to change Graph's Data</h4>
        </Col>
        {ZONE_DATA.map((item, index) => (
          <Col key={index.toString()} span={2}>
            <Button onClick={() => fetchMonthWisePolicies(item)} type="primary">
              {item}
            </Button>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default ChartsSection;

const ZONE_DATA = ["North", "South", "East", "West"];
