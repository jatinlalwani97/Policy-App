import React, { useEffect } from "react";
import { BASE_API_URL } from "../../utils/constants";
import { useForm, Controller } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { Row, Col, Divider } from "antd";

function EditPolicyPage() {
  const { policyId } = useParams();
  const { push } = useHistory();
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchPolicyDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPolicyDetails = async () => {
    try {
      const request = await fetch(
        `${BASE_API_URL}/policy/search?policy_id=${policyId}`
      );
      const {
        response: { result },
      } = await request.json();
      reset(result);
    } catch (error) {
      console.error(error);
      noPolicyNotification();
      push('/');
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    delete data["date_of_purchase"];
    updatePolicyDetails(data);
  };

  const updatePolicyDetails = async (data) => {
    try {
      const request = await fetch(`${BASE_API_URL}/policy/${policyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });
      if(request.status===406){
        errorNotification();
        return;
      }
      await request.json();
      openNotification();
      push("/");
    } catch (error) {
      console.error(error);
      errorNotification();
    }
  };

  const openNotification = () => {
    notification.info({
      message: `Success`,
      description: "Successfully Updated the Data",
      placement: "bottomLeft",
      type: "success",
    });
  };
  const errorNotification = () => {
    notification.info({
      message: `Error`,
      description: "Error while updating the Data",
      placement: "bottomLeft",
      type: "error",
    });
  };
  const noPolicyNotification = () => {
    notification.info({
      message: `Error`,
      description: "No Policy available with this ID",
      placement: "bottomLeft",
      type: "error",
    });
  };

  return (
    <>
      <Divider orientation="center">Edit Policy Details</Divider>

      <Row justify="center">
        <Col span={20}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Item label="Date of Purchase">
              <Controller
                as={<Input placeholder="Date of Purchase" disabled />}
                name="date_of_purchase"
                control={control}
              />
            </Form.Item>
            <Form.Item label="Fuel">
              <Controller
                as={<Input placeholder="Fuel" />}
                name="Fuel"
                control={control}
              />
            </Form.Item>

            <Form.Item label="Vehicle Segment" name="vehicle_segment">
              <Controller
                as={<Input placeholder="Vehicle Segment" />}
                name="vehicle_segment"
                control={control}
              />
            </Form.Item>

            <Form.Item label="Premium" name="premium">
              <Controller
                as={<Input placeholder="premium" type="number" />}
                name="premium"
                control={control}
                rules={{ required: true }}
              />
            </Form.Item>

            <Form.Item
              label="Bodily Injury Liability"
              name="bodily_injury_liability"
            >
              <Controller
                as={<Input placeholder="Bodily Injury Liability" />}
                name="bodily_injury_liability"
                control={control}
              />
            </Form.Item>

            <Form.Item label="Gender" name="customer_gender">
              <Controller
                as={<Input placeholder="Gender" />}
                name="customer_gender"
                control={control}
              />
            </Form.Item>

            <Form.Item
              label="Customer Income Group"
              name="customer_income_group"
            >
              <Controller
                as={<Input placeholder="Customer Income Group" />}
                name="customer_income group"
                control={control}
              />
            </Form.Item>

            <Form.Item label="Customer Region" name="customer_region">
              <Controller
                as={<Input placeholder="Customer Region" />}
                name="customer_region"
                control={control}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </form>
        </Col>
      </Row>
    </>
  );
}

export default EditPolicyPage;
