import { MDBIcon } from "mdbreact";
import React from "react";

export const STATUS_LIST = [
  {
    key: "error",
    list: ["expired", "failure", "failed"],
    badge: <MDBIcon icon="times-circle" />,
    className: "ribbon--danger"
  },
  {
    key: "approved",
    list: ["approved", "payed"],
    badge: <MDBIcon icon="check-circle" />,
    className: "ribbon--sucess"
  },
  {
    key: "pending",
    list: ["init", "pending"],
    badge: <MDBIcon icon="clock" />,
    className: "ribbon--warning"
  }
];

export const STATUS_CHECKOUT = [
  {
    key: "canpay",
    list: ["init"]
  }
];
