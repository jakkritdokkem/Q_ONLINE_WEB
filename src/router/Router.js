import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from '../layout/public/PublicLayout';
import PrivateLayout from '../layout/private/PrivateLayout';
import Redirect from '../view/error/Redirect';

// private
import MainTreatmentType from '../view/private/setting/treatmentType/MainTreatmentType';
import MainDoctor from '../view/private/setting/doctor/MainDoctor';
import FormDoctor from '../view/private/setting/doctor/form/FormDoctor';
import MainOpenSchedule from '../view/private/openSchedule/MainOpenSchedule';
import FormOpenSchedule from '../view/private/openSchedule/form/FormOpenSchedule';
import MainPatient from '../view/private/setting/patient/MainPatient';
import FormPatient from '../view/private/setting/patient/form/FormPatient';

// public

function Router() {
  const role = 1; // 1 = admin, 0 = user

  return (
    <Fragment>
      <BrowserRouter>
        {role === 0 ? (
          <PublicLayout>
            <Routes>
              <Route path="/" element={<h1>หน้าแรก</h1>} />
              <Route path="/home" element={<h1>หน้าแรก</h1>} />
              <Route path="/book-an-appointment" element={<h1>จองคิว</h1>} />
              <Route path="/check-book-an-appointment" element={<h1>ตรวจสอบคิว</h1>} />
              <Route path="/register" element={<h1>ลงทะเบียน</h1>} />
              <Route path="/login" element={<h1>เข้าสู่ระบบ</h1>} />
              <Route path="*" element={<Redirect />} />
            </Routes>
          </PublicLayout>
        ) : (
          <PrivateLayout>
            <Routes>
              <Route path="/" element={<h1>หลังบ้าน</h1>} />
              <Route path="/admin/book-an-appointment" element={<h1>จองคิว</h1>} />
              <Route path="/admin/open-schedule" element={<MainOpenSchedule />} />
              <Route path="/admin/open-schedule/form" element={<FormOpenSchedule />} />
              <Route path="/admin/treatment-type" element={<MainTreatmentType />} />
              <Route path="/admin/doctor" element={<MainDoctor />} />
              <Route path="/admin/doctor/form" element={<FormDoctor />} />
              <Route path="/admin/user" element={<MainPatient/>} />
              <Route path="/admin/user/form" element={<FormPatient />} />
              <Route path="*" element={<Redirect />} />
            </Routes>
          </PrivateLayout>
        )}
      </BrowserRouter>
    </Fragment>
  );
}

export default Router;
