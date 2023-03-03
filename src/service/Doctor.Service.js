import Instance from '../helper/Axios';

// ดึงข้อมูลแบบแบ่งหน้า
export async function getDoctor(pageSize, currentPage, search, treatment, status) {
  try {
    const response = await Instance.get(`doctor/getDoctor?pageSize=${pageSize}&currentPage=${currentPage}&search=${search}&treatment=${treatment}&status=${status}`);
    return await response.data;
  } catch (error) {
    console.log('error', error);
  }
}