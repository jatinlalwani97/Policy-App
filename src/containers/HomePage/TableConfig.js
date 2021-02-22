import { Link } from "react-router-dom";
export const TABLE_COLUMNS = [
  {
    title: "Policy ID",
    dataIndex: "policy_id",
    key: "policy_id",
  },
  {
    title: "Date of Purchase",
    dataIndex: "date_of_purchase",
    key: "date_of_purchase",
  },
  {
    title: "Fuel",
    dataIndex: "Fuel",
    key: "Fuel",
  },

  {
    title: "Customer Id",
    dataIndex: "customer_id",
    key: "customer_id",
  },

  {
    title: "Vehicle Segment",
    dataIndex: "vehicle_segment",
    key: "vehicle_segment",
  },

  {
    title: "Premium",
    dataIndex: "premium",
    key: "premium",
  },

  {
    title: "Customer Gender",
    dataIndex: "customer_gender",
    key: "customer_gender",
  },

  {
    title: "Customer Income Group",
    dataIndex: "customer_income group",
    key: "customer_income group",
  },

  {
    title: "Customer Region",
    dataIndex: "customer_region",
    key: "customer_region",
  },
  {
    title: "Action",
    key: "policy_id",
    render: (record) => <Link to={`/edit/${record.policy_id}`}>Edit</Link>,
  },
];
