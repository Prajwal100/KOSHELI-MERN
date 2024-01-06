import React from "react";
import { Link } from "react-router-dom";
function ConfirmOrder() {
  return (
    <div className="card checkout-step-one" style={{ paddingTop: "6rem" }}>
      <section className="breadcrumb-bg mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-12 text-center">
              <div className="page-title order-done ">
                <i className="mdi mdi-check-circle-outline text-success" />

                <h1>Thank You</h1>
                <p className="col-sm-6 mx-auto">
                  Congratulations! Your Order has been Accepted.
                </p>
              </div>

              <Link className="next-btn16 hover-btn mt-4" to="/">
                Return to store
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* END SECTION BREADCRUMB */}

      {/* START SECTION CONTACT */}
      <section className="pt-5">
        <div className="container">
          <div className="row"></div>
        </div>
      </section>
    </div>
  );
}

export default ConfirmOrder;
