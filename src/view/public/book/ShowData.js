import React, { Fragment } from 'react';
import Profile from '../../../assets/image/Profile.png';
import Image from '../../../assets/image/Image.png';
import Pagination from 'react-js-pagination';
import { baseURL } from '../../../helper/Axios';
import DateTh from '../../../components/DateTh';
import { TextSelect } from '../../../components/TextSelect';
import PageSize from '../../../data/pageSize.json';

function ShowData({ data, pagin, changePage, changePageSize }) {
  return (
    <div className="w-full">
      <div className="row d-flex justify-content-center">
        {data.length === 0 ? (
          <div className="col-12 my-2">
            <div className="text-center text-danger">-- ไม่พบข้อมูล --</div>
          </div>
        ) : (
          <Fragment>
            <div className="col-12">
              <div className="d-flex justify-content-between mb-2">
                <div className="w-pagesize">
                  <TextSelect
                    id="pagesize"
                    name="pagesize"
                    options={PageSize}
                    value={PageSize.filter((a) => a.id === pagin.pageSize)}
                    onChange={(item) => {
                      changePageSize(item.id);
                    }}
                    getOptionLabel={(z) => z.label}
                    getOptionValue={(x) => x.id}
                  />
                </div>
              </div>
              <div className="row">
                {data.map((item, index) => (
                  <div className="col-12 my-2" key={item.id}>
                    <div className="card card-shadow p-3">
                      <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-4 col-lg-3 col-xxl-2">
                          <div className="d-flex justify-content-center justify-content-md-start">
                            <img
                              id={item.id}
                              src={item.path_image ? `${baseURL}${item.path_image}` : Profile}
                              className="mx-auto"
                              height={150}
                              width={150}
                              alt="doctor"
                              onError={(error) => {
                                error.target.src = Image;
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-8 col-lg-9 col-xxl-10 mt-md-0 mt-2">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h2>{item.treatment_type_name}</h2>
                            </div>
                            <div>
                              <p>
                                <i className="fa-regular fa-calendar-days me-1"></i>
                                <DateTh date={item.open_date} />
                              </p>
                            </div>
                          </div>
                          <div>{item.fullname}</div>
                          <div>
                            <i className="fa-regular fa-clock me-1"></i>8:00 - 15:00
                          </div>
                          <div className="d-flex justify-content-between mt-3">
                            <div className="fs-6 pt-2">
                              จำนวน <span className="fw-semibold">{`${item.book_amount}/${item.amount}`}</span>
                            </div>
                            <div>
                              <button type="button" className="btn btn-success">
                                จองคิว
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>จำนวน {pagin.totalRow} รายการ</div>
                <div>
                  <Pagination
                    activePage={pagin.currentPage}
                    itemsCountPerPage={pagin.pageSize}
                    totalItemsCount={pagin.totalRow}
                    pageRangeDisplayed={pagin.totalPage}
                    onChange={(page) => {
                      changePage(page);
                    }}
                  />
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default ShowData;
