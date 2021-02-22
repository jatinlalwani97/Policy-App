import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Divider, Input } from "antd";

const { Search } = Input;

function SearchSection() {
  const { push } = useHistory();
  const [searchText, setSearchText] = useState("");
  const searchById = () => {
    push(`edit/${searchText}`);
  };
  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <Divider orientation="center">Search Policy by ID</Divider>
      </Col>
      <Col span={18}>
        <Search
          placeholder="Enter Policy ID"
          allowClear
          enterButton="Search"
          size="large"
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={searchById}
        />
      </Col>
    </Row>
  );
}

export default SearchSection;
