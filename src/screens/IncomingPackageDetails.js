import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listIncomingPackageDetails } from "../actions/incomimgPackageActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function IncomingPackageDetails({ match }) {
  const dispatch = useDispatch();
  // console.log(match.params._id);
  // console.log(match);

  const incomingPackageDetails = useSelector(
    (state) => state.incomingPackageDetails
  );
  const { loading, error, incomingPackage } = incomingPackageDetails;

  useEffect(() => {
    dispatch(listIncomingPackageDetails(match.params._id));
  }, []);

  console.log(incomingPackage);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error} </Message>
      ) : (
        <div>
          <h1>This is Single Incoming Package details</h1>
          packageName = {incomingPackage.name}
          <br />
          package_id= {incomingPackage._id}
          <br />
          tracking_number = {incomingPackage.trackingNumber}
          <br />
          comment = {incomingPackage.comment}
          <br />
          created_at= {incomingPackage.created_at}
          <br />
          {/* warehouse_id= {incomingPackage.warehouse.warehouse_name} */}
          <br />
          {/* product_id = {incomingPackage.user.username} */}
          <br />
          {/* user_id= {incomingPackage.user.username} */}
          <br />
        </div>
      )}
    </div>
  );
}

export default IncomingPackageDetails;
