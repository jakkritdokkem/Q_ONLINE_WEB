import React from 'react';
import '../../../style/authen.css';
import Treatment from '../../../assets/image/Treatment.png';

function Login() {
  return (
    <div id="login">
      <div className="d-flex justify-content-start">
        <h2 className="title-content">เข้าสู่ระบบ</h2>
      </div>
      <div className="row content">
        <div className="col-md-7 mb-3">
          <img src={Treatment} alt={Treatment} style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="col-md-5 d-flex align-items-center">
          <form className="w-full">
            <div className="form-group my-3">
              <label>เลขบัตรประจำตัวประชาชน</label>
              <input type="email" name="email" autoComplete="off" className={`form-input`} />
            </div>
            <div className="form-group my-3">
              <label>รหัสผ่าน</label>
              <input type="password" name="password" className={`form-input`} />
            </div>
            <button type="submit" className="btn btn-success w-full py-2 mt-3">
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
