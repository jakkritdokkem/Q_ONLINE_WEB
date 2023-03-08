import React, { Fragment, useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, Form, ErrorMessage } from "formik";
import prefixUser from "../../../../../data/prefixUser.json";
import { TextSelect } from "../../../../../components/TextSelect";
import { createUser, getDetailUser, updateUser } from "../../../../../service/User.Service";
import { getAddressThai } from "../../../../../service/Address.Service";
import Schema from "./Validation";

function FormPatient() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");
  const [address, setAddress] = useState([]);
  const dataGender = [
    {
      id: "1",
      title: "ชาย",
    },
    {
      id: "2",
      title: "หญิง",
    },
    {
      id: "3",
      title: "อื่น ๆ",
    },
  ];

  useEffect(() => {
    if (searchAddress) {
      getAddressList(searchAddress);
    }
  }, [searchAddress]);

  useEffect(() => {
    if (location.state) {
      getDetail(location.state);
    }
  }, [location.state]);

  async function getDetail(id) {
    let res = await getDetailUser(id);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        setData(res.data);
      }
    }
  }

  function getAddressList(search) {
    let res = getAddressThai(search);
    if (res) {
      setAddress(res);
    }
  }

  async function save(data) {
    let res = location.state ? await updateUser(location.state, data) : await createUser(data);
    if (res) {
      if (res.statusCode === 200 && res.taskStatus) {
        Swal.fire({
          icon: "success",
          title: location.state ? "แก้ไขข้อมูลสำเร็จ" : "บันทึกข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(-1);
      } else {
        Swal.fire({
          icon: "error",
          title: "บันทึกข้อมูลไม่สำเร็จ !!",
          showConfirmButton: true,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด !!",
        text: "Server Error",
        showConfirmButton: true,
      });
    }
  }

  return (
    <Fragment>
      <div className="w-full">
        <div className="d-flex justify-content-end">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin/user" className="nav-breadcrumb">
                  ข้อมูลรายชื่อผู้ป่วย
                </Link>
              </li>
              <li className="breadcrumb-item text-black fw-semibold" aria-current="page">
                {location.state ? "แก้ไข" : "เพิ่ม"}ข้อมูลรายชื่อผู้ป่วย
              </li>
            </ol>
          </nav>
        </div>
        <div className="w-full mb-5">
          <h2 className="title-content">{location.state ? "แก้ไข" : "เพิ่ม"}ข้อมูลรายชื่อผู้ป่วย</h2>
        </div>
        <Formik
          enableReinitialize={true}
          validationSchema={Schema}
          initialValues={{
            idCard: data ? data.id_card : "",
            prefixId: data ? data.prefix_id : "",
            name: data ? data.name : "",
            lastname: data ? data.lastname : "",
            birthday: data ? data.birthday : "",
            phoneNumber: data ? data.phone_number : "",
            gender: data ? data.gender : "",
            address: data ? data.address : "",
            subdistrict: data ? data.subdistrict : "",
            district: data ? data.district : "",
            province: data ? data.province : "",
            postcode: data ? data.postcode : "",
            prifixContactId: data ? data.prifix_contact_id : "",
            nameContact: data ? data.name_contact : "",
            lastnameContact: data ? data.lastname_contact : "",
            password: data ? data.password : "",
            fullAddress: data ? `ต.${data.subdistrict} อ.${data.district} จ.${data.province} ${data.postcode}` : "",
            subdistrictsId: "",
          }}
          onSubmit={(value) => {
            save(value);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                  <div className="row">
                    <div className="col-6 px-1 mt-2">
                      <label>เลขบัตรประชาชน</label>
                      <input
                        name="idCard"
                        type="text"
                        value={values.idCard}
                        className={`form-input ${touched.idCard ? (errors.idCard ? "invalid" : "valid") : ""}`}
                        onChange={(e) => {
                          setFieldValue("idCard", e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="idCard" className="text-invalid" />
                    </div>

                    <div className="col-6 px-1 mt-2">
                      <label>รหัสผ่าน</label>
                      <input
                        name="password"
                        type="text"
                        value={values.password}
                        className={`form-input ${touched.password ? (errors.password ? "invalid" : "valid") : ""}`}
                        onChange={(e) => {
                          setFieldValue("password", e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="password" className="text-invalid" />
                    </div>

                    <div className="col-4 px-1 mt-2">
                      <label>คำนำหน้า</label>
                      <TextSelect
                        id="prefixId"
                        name="prefixId"
                        options={prefixUser}
                        value={prefixUser.filter((a) => a.id === values.prefixId)}
                        onChange={(item) => {
                          setFieldValue("prefixId", item.id);
                        }}
                        getOptionLabel={(z) => z.name}
                        getOptionValue={(x) => x.id}
                      />
                    </div>

                    <div className="col-4 px-1 mt-2">
                      <label>ชื่อ</label>
                      <input
                        name="name"
                        type="text"
                        value={values.name}
                        className={`form-input ${touched.name ? (errors.name ? "invalid" : "valid") : ""}`}
                        onChange={(e) => {
                          setFieldValue("name", e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="name" className="text-invalid" />
                    </div>
                    <div className="col-4 px-1 mt-2">
                      <label>นามสกุล</label>
                      <input
                        name="lastname"
                        type="text"
                        value={values.lastname}
                        className={`form-input ${touched.lastname ? (errors.lastname ? "invalid" : "valid") : ""}`}
                        onChange={(e) => {
                          setFieldValue("lastname", e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="lastname" className="text-invalid" />
                    </div>
                    <div className="col-4 px-1 mt-2">
                      <label>เพศ</label>
                      <TextSelect
                        id="gender"
                        name="gender"
                        options={dataGender}
                        value={dataGender.filter((a) => a.id === values.gender)}
                        onChange={(item) => {
                          setFieldValue("gender", item.id);
                        }}
                        getOptionLabel={(z) => z.title}
                        getOptionValue={(x) => x.id}
                      />
                    </div>
                    <div className="col-4 px-1 mt-2">
                      <label>วันเดือนปีเกิด</label>
                      <input
                        name="birthday"
                        type="date"
                        value={values.birthday ? new Date(values.birthday).toISOString().slice(0, 10) : values.birthday}
                        className={`form-input ${touched.birthday ? (errors.birthday ? "invalid" : "valid") : ""}`}
                        onChange={(e) => {
                          setFieldValue("birthday", e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="birthday" className="text-invalid" />
                    </div>
                    <div className="col-4 px-1 mt-2">
                      <label>เบอร์โทร</label>
                      <input
                        name="phoneNumber"
                        type="text"
                        value={values.phoneNumber}
                        className={`form-input ${touched.phoneNumber ? (errors.phoneNumber ? "invalid" : "valid") : ""}`}
                        onChange={(e) => {
                          setFieldValue("phoneNumber", e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="phoneNumber" className="text-invalid" />
                    </div>
                    
                    <div className="col-12 px-1 mt-2">
                      <label>ค้นหาที่อยู่</label>
                      <TextSelect
                        id="SubdistrictsId"
                        name="SubdistrictsId"
                        isClearable={true}
                        options={address}
                        value={address.filter((a) => a.SubdistrictsId === values.subdistrictsId)}
                        onInputChange={(inputValue) => {
                          if (inputValue) {
                            setSearchAddress(inputValue);
                          } else {
                            setAddress([]);
                          }
                        }}
                        onMenuClose={() => {
                          setSearchAddress("");
                          setAddress([]);
                        }}
                        onChange={(e) => {
                          if (e && e.SubdistrictsId) {
                            setFieldValue("subdistrictsId", e.SubdistrictsId);
                            setFieldValue("subdistrict", e.SubdistrictsNameTh);
                            setFieldValue("district", e.DistrictsNameTh);
                            setFieldValue("province", e.ProvincesNameTh);
                            setFieldValue("postcode", e.PostCode);
                            setFieldValue("fullAddress", `ต.${e.SubdistrictsNameTh} อ.${e.DistrictsNameTh} จ.${e.ProvincesNameTh} ${e.PostCode}`);
                          } else {
                            setFieldValue("subdistrictsId", "");
                            setFieldValue("subdistrict", "");
                            setFieldValue("district", "");
                            setFieldValue("province", "");
                            setFieldValue("postcode", "");
                            setFieldValue("fullAddress", "");
                          }
                        }}
                        getOptionLabel={(z) => `ต.${z.SubdistrictsNameTh} อ.${z.DistrictsNameTh} จ.${z.ProvincesNameTh} ${z.PostCode}`}
                        getOptionValue={(x) => x.SubdistrictsId}
                      />
                    </div>

                    <div className="col-6 px-1 mt-2">
                      <label>ที่อยู่</label>
                      <input
                        name="address"
                        type="text"
                        value={values.address}
                        className={`form-input ${touched.address ? (errors.address ? "invalid" : "valid") : ""}`}
                        onChange={(e) => {
                          setFieldValue("address", e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="address" className="text-invalid" />
                    </div>

                    

                    <div className="col-6 px-1 mt-2">
                      <label>ตำบล / อำเภอ / จังหวัด/ รหัสไปรษณีย์</label>
                      <input name="fullAddress" type="text" disabled={true} className={`form-input ${touched.fullAddress ? (errors.fullAddress ? "invalid" : "valid") : ""}`} value={values.fullAddress} />
                      <ErrorMessage component="div" name="fullAddress" className="text-invalid" />
                    </div>

                    <div className="col-4 px-1 mt-2">
                      <label>คำนำหน้าชื่อผู้ติดต่อ</label>
                      <TextSelect
                        id="prifixContactId"
                        name="prifixContactId"
                        options={prefixUser}
                        value={prefixUser.filter((a) => a.id === values.prifixContactId)}
                        onChange={(item) => {
                          setFieldValue("prifixContactId", item.id);
                        }}
                        getOptionLabel={(z) => z.name}
                        getOptionValue={(x) => x.id}
                      />
                    </div>
                    <div className="col-4 px-1 mt-2">
                      <label>ชื่อผู้ติดต่อ</label>
                      <input
                        name="nameContact"
                        type="text"
                        value={values.nameContact}
                        className={`form-input ${touched.nameContact ? (errors.nameContact ? "invalid" : "valid") : ""}`}
                        onChange={(e) => {
                          setFieldValue("nameContact", e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="nameContact" className="text-invalid" />
                    </div>
                    <div className="col-4 px-1 mt-2">
                      <label>นามสกุลผู้ติดต่อ</label>
                      <input
                        name="lastnameContact"
                        type="text"
                        value={values.lastnameContact}
                        className={`form-input ${touched.lastnameContact ? (errors.lastnameContact ? "invalid" : "valid") : ""}`}
                        onChange={(e) => {
                          setFieldValue("lastnameContact", e.target.value);
                        }}
                      />
                      <ErrorMessage component="div" name="lastnameContact" className="text-invalid" />
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

export default FormPatient;
