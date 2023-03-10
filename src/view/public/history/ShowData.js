import React from 'react';
import { TextSelect } from '../../../components/TextSelect';
import PageSize from '../../../data/pageSize.json';
import Pagination from 'react-js-pagination';
import DateTh from '../../../components/DateTh';

function ShowData({ data, pagin, changePage, changePageSize }) {
  return (
    <div className="w-full">
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
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr className="table-success">
              <th scope="col" style={{ width: '5%' }}>
                ลำดับ
              </th>
              <th scope="col" style={{ width: '25%' }}>
                ชื่อแพทย์
              </th>
              <th scope="col" style={{ width: '25%' }}>
                ประเภทการรักษา
              </th>
              <th scope="col" style={{ width: '20%' }}>
                วันที่จองคิว
              </th>
              <th scope="col" style={{ width: '15%' }}>
                คิวที่
              </th>
              <th scope="col" style={{ width: '10%' }}>
                สถานะ
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="text-center text-danger">-- ไม่พบข้อมูล --</div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{(pagin.currentPage - 1) * pagin.pageSize + (index + 1)}</td>
                  <td>{item.fullname}</td>
                  <td>{item.treatment_type_name}</td>
                  <td>
                    <DateTh date={item.open_date} />
                  </td>
                  <td>
                    <p className={item.book_amount < item.amount ? 'text-success' : 'text-danger'}>
                      {item.book_amount}/{item.amount}
                    </p>
                  </td>
                  <td>{item.is_used === 1 ? 'ใช้งาน' : 'ไม่ใช้งาน'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between">
        <div>จำนวน {pagin.totalRow} รายการ</div>
        <div>
          <Pagination
            activePage={pagin.currentPage}
            itemsCountPerPage={pagin.pageSize}
            totalItemsCount={pagin.totalRow}
            pageRangeDisplayed={pagin.totalPage}
            onChange={(page) => {
              // changePage(page);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ShowData;
