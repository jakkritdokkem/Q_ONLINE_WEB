import address_thai from "../data/address_thai.json";

export function  getAddressThai (search) {
    let res = address_thai;
    if(search){
        
        res = res.filter((a) =>  a.SubdistrictsNameTh.includes(search) || a.DistrictsNameTh.includes(search) || a.ProvincesNameTh.includes(search) || a.PostCode.includes(search));
    }
    console.log(res.length)
    return res.slice(0,99);
}