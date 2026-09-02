import {API} from "../../../config/api";

//get /api/items (optionally ?type=Lost|Found)
export async function fetchItems(type){
  const params = type ? {type} : undefined;
  const res = await API.get("/api/items", {params});
  return res.data.data;
};

//post /api/items
export async function createItem(payload) {
  const res = await API.post("/api/items", payload);
  return res.data.data;
};