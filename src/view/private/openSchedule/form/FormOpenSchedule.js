import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import { TextSelect } from '../../../../components/TextSelect';
import { getTreatmentTypeAll } from '../../../../service/TreatmentType.Service';
import { getDoctorBy } from '../../../../service/Doctor.Service';

function FormOpenScheduld() {
  const location = useLocation();
  const [dataTreatment, setDataTreatment] = useState([]);
  const [dataDoctor, setDataDoctor] = useState([]);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    getTreatmentAll();
  }, []);

  async function getTreatmentAll() {
    let res = await getTreatmentTypeAll();
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setDataTreatment(res.data);
      }
    }
  }

  async function getDoctor(id) {
    let res = await getDoctorBy(id);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setDataDoctor(res.data);
      }
    }
  }

  console.log(dataDoctor);

  return (
    <Fragment>
      <div className="w-full">
        <div className="d-flex justify-content-end">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/open_schedule" className="nav-breadcrumb">
                  ข้อมูลการเปิดจองคิว
                </Link>
              </li>
              <li className="breadcrumb-item text-black fw-semibold" aria-current="page">
                {location.state ? 'แก้ไข' : 'เพิ่ม'}ข้อมูลการเปิดจองคิว
              </li>
            </ol>
          </nav>
        </div>
        <div className="w-full mb-5">
          <h2 className="title-content">{location.state ? 'แก้ไข' : 'เพิ่ม'}ข้อมูลการเปิดจองคิว</h2>
        </div>
        <Formik
          enableReinitialize={true}
          // validationSchema={Schema}
          initialValues={{
            // prefixId: detail ? detail.prefix_id : '',
            // name: detail ? detail.name : '',
            // lastname: detail ? detail.lastname : '',
            // treatment: detail ? detail.treatment_type_id : '',
            treatment: '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);
            // save(value);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                  <div className="row">
                    <div className="col-12 px-1 mt-2">
                      <label>ประเภทการรักษา</label>
                      <TextSelect
                        id="treatment"
                        name="treatment"
                        options={dataTreatment}
                        value={dataTreatment.filter((a) => a.id === values.treatment)}
                        onChange={(item) => {
                          getDoctor(item.id);
                          setFieldValue('treatment', item.id);
                        }}
                        getOptionLabel={(z) => z.name}
                        getOptionValue={(x) => x.id}
                      />
                    </div>
                    <div className="col-12 px-1 mt-2">
                      <label>ชื่อแพทย์</label>
                      <TextSelect
                        id="prefixId"
                        name="prefixId"
                        options={[]}
                        value={[].filter((a) => a.id === values.prefixId)}
                        onChange={(item) => {
                          setFieldValue('prefixId', item.id);
                        }}
                        getOptionLabel={(z) => z.name}
                        getOptionValue={(x) => x.id}
                      />
                    </div>
                    <div className="col-12 px-1 mt-2">
                      <label>วันที่เปิดจองคิว</label>
                      <input
                        name="name"
                        type="date"
                        value={values.name}
                        className={`form-input ${touched.name ? (errors.name ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('name', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="name" className="text-invalid" />
                    </div>
                    <div className="col-12 px-1 mt-2">
                      <label>จำนวน</label>
                      <input
                        name="name"
                        type="number"
                        value={values.name}
                        className={`form-input ${touched.name ? (errors.name ? 'invalid' : 'valid') : ''}`}
                        onChange={(e) => {
                          setFieldValue('name', e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="name" className="text-invalid" />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-success mx-1">
                      บันทึก
                    </button>
                    <button type="reset" className="btn btn-secondary mx-1">
                      ล้างค่า
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
}

export default FormOpenScheduld;
