import Instance from '../helper/Axios';

export async function getTreatmentType(pageSize, currentPage, search) {
  try {
    const response = await Instance.get(`treatment/getTreatment?pageSize=${pageSize}&currentPage=${currentPage}&search=${search}`);
    return await response.data;
  } catch (error) {
    console.log('error', error);
  }
}

export async function createTreatmentType(data) {
  try {
    const response = await Instance.post(`treatment/createTreatment`, data);
    return await response.data;
  } catch (error) {
    console.log('error', error);
  }
}
