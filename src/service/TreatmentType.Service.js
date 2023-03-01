import Instance from '../helper/Axios';

export async function getTreatmentType(pagesize, currentpage, search) {
  try {
    const response = await Instance.get(`treatmentType/getTreatmentType?pagesize=${pagesize}&currentpage=${currentpage}&search=${search}`);
    return await response.data;
  } catch (error) {
    console.log('error', error);
  }
}
