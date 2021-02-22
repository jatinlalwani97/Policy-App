import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Spin, Table } from "antd";
import { BASE_API_URL } from "../../utils/constants";
import { TABLE_COLUMNS } from "./TableConfig";
import ChartsSection from "./ChartsSection";
import SearchSection from './SearchSection';

function HomePage() {
  const [policyList, setPolicyList] = useState([]);
  const [policyLoader, setPolicyLoader] = useState(false);
  
  useEffect(() => {
    fetchPolicies();
  }, []);
  const fetchPolicies = async () => {
    setPolicyLoader(true);
    try {
      const request = await fetch(`${BASE_API_URL}/policy?limit=1200&page=1`);
      const {
        response: {
          result: { policies },
        },
      } = await request.json();
      setPolicyList([].concat(policies));
      setPolicyLoader(false);
    } catch (error) {
      console.error(error);
      setPolicyList([]);
      setPolicyLoader(false);
    }
  };
  return (
    <>
      <Row justify="center" align="middle">
        <Col span={16}>
          <ChartsSection />
        </Col>
        <Col span={16}>
          <SearchSection />
        </Col>
        {policyLoader && (
          <Col span={3}>
            <Spin  size={40}/>
          </Col>
        )}
        <Col span={16}>
          <Divider orientation="center">Policy List</Divider>
        </Col>
        {!policyLoader && policyList.length > 0 && (
          <Col span={16}>
            <Table columns={TABLE_COLUMNS} dataSource={policyList} />
          </Col>
        )}
      </Row>
    </>
  );
}

export default HomePage;
