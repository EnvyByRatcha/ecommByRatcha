function Modal(props) {
  return (
    <>
      <div className="modal" tabIndex="-1" id={props.id}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{props.title}</h5>
              <button
                id={props.id + "_btnClose"}
                type="button"
                className="btn btn-close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            <div className="modal-body">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
