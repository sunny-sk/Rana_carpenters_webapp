import React, { useState } from "react";

const Modal = ({
  id,
  allowToClose,
  ask,
  yes,
  cancel,
  onYes,
  children,
  cStyle,
}) => {
  return (
    <>
      <div
        className="modal fade signout-modal-overlay"
        id={id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={id}
        aria-hidden="true"
      >
        <div className={cStyle ? cStyle : "modal-dialog"} role="document">
          <div className="modal-content signout-modal-content">
            {children ? (
              <>
                <div style={{ textAlign: "right" }}>
                  <button data-dismiss="modal" className="btn">
                    {allowToClose ? "X" : ""}
                  </button>
                </div>
                {children}
              </>
            ) : (
              <>
                <div>
                  <div className="container text-center">
                    <p className="lead mt-3">
                      <b>{ask}</b>
                    </p>
                  </div>
                </div>
                <div className="modal-footer signout-modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger btn-c"
                    data-dismiss="modal"
                    // onClick={onCancel}
                  >
                    {cancel}
                  </button>
                  <button
                    type="button"
                    data-dismiss="modal"
                    onClick={onYes}
                    className="btn btn-primary btn-c modal-signout-btn"
                  >
                    {yes}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Modal);
