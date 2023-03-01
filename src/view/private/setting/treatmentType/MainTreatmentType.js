import React, { Fragment, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { getTreatmentType } from '../../../../service/TreatmentType.Service';
import ShowData from './ShowData';

function MainTreatmentType() {
  const [data, setData] = useState([]);
  const [pagin, setPagin] = useState({
    totalRow: 1,
    pageSize: 10,
    currentPage: 1,
    totalPage: 1,
  });

  useEffect(() => {
    fetchTreatmentType(10, 1, '');
  }, []);

  async function fetchTreatmentType(pageSize, currentPage, search) {
    let res = await getTreatmentType(pageSize, currentPage, search);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
        setPagin(res.pagin);
      }
    }
  }

  return (
    <Fragment>
      <div className="w-full">
        <div className="d-flex justify-content-end">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {/* <li className="breadcrumb-item">
                <Link to="#" className="nav-breadcrumb">
                  Library
                </Link>
              </li> */}
              <li className="breadcrumb-item text-black fw-semibold" aria-current="page">
                ข้อมูลประเภทการรักษา
              </li>
            </ol>
          </nav>
        </div>
        <div className="w-full mb-5">
          <h2 className="title-content">ข้อมูลประเภทการรักษา</h2>
        </div>
        <Formik
          enableReinitialize={true}
          // validationSchema={Schema}
          initialValues={{
            search: '',
          }}
          onSubmit={(value) => {
            console.log('submit :', value);
            fetchTreatmentType(pagin.pageSize, 1, value.search);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                  <label>ค้นหา</label>
                  <input
                    value={values.search}
                    type="text"
                    className="form-input"
                    onChange={(e) => {
                      setFieldValue('search', e.target.value);
                    }}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-8 pt-4">
                  <button type="submit" className="btn btn-success mx-1">
                    <i className="fa-solid fa-magnifying-glass mx-1"></i>
                    ค้นหา
                  </button>
                  <button
                    type="reset"
                    className="btn btn-secondary mx-1"
                    onClick={() => {
                      fetchTreatmentType(10, 1, '');
                    }}
                  >
                    <i className="fa-solid fa-rotate-left mx-1"></i>
                    ล้างค่า
                  </button>
                </div>
              </div>
              <div className="w-full mt-5">
                <ShowData
                  data={data}
                  pagin={pagin}
                  changePage={(page) => {
                    fetchTreatmentType(pagin.pageSize, page, values.search);
                  }}
                  changePageSize={(pagesize) => {
                    fetchTreatmentType(pagesize, 1, values.search);
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
}

export default MainTreatmentType;
