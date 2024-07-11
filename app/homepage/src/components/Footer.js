function Footer() {
  return (
    <div style={{ backgroundColor: "#14213D" }}>
      <div className="container text-white p-3">
        <div className="row">
          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
            GYM&&LAB
          </div>
          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <ul className="list-unstyled">
              <li className="mb-3">เกี่ยวกับเรา</li>
              <li>ติดต่อเรา</li>
              <li>เกี่ยวกับเรา</li>
              <li>ข้อกำหนดและเงื่อนไข</li>
              <li>นโยบายความเป็นส่วนตัว</li>
            </ul>
          </div>
          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <ul className="list-unstyled">
              <li className="mb-3">บริการลูกค้า</li>
              <li>การจัดส่งสินค้า</li>
              <li>การรับประกันสินค้า</li>
              <li>การยกเลิกการสั่งซื้อสินค้า</li>
              <li>การคืนสินค้าและการคืนเงิน</li>
            </ul>
          </div>
          <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="mb-3">ช่องทางติดต่อ</div>
            <div className="mb-3">
              <input className="form-control" />
            </div>
            <ul className="list-inline">
              <li className="list-inline-item me-3">
                <i className="fa-brands fa-google"></i>
              </li>
              <li className="list-inline-item me-3">
                <i className="fa-brands fa-facebook"></i>
              </li>
              <li className="list-inline-item me-3">
                <i className="fa-brands fa-instagram"></i>
              </li>
              <li className="list-inline-item">
                <i className="fa-brands fa-twitter"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
