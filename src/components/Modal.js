import React from "react";

const Modal = ({ id, ask, yes, cancel, onYes }) => {
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
        <div className="modal-dialog" role="document">
          <div className="modal-content signout-modal-content">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Modal);
