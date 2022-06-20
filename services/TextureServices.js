import axios from "axios";

export function updateTexture(file, title, callback, token) {
  var formData = new FormData();
  formData.append(title, file);
  axios
    .post("https://api.pictsnap.simhive.com/api/texture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
        //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDE3NTBiNTliZTEwY2QxZmY4NDc0OTAxMmEwYTYwOWE5YWFkNjg5OGU1ZTQ2NDE1YTdlMTNiNGVmOTgyNDNlN2QyMWIyYmNhMjhkZTRiZjciLCJpYXQiOjE2NTU2NTA4MTAuMTgwMTcyLCJuYmYiOjE2NTU2NTA4MTAuMTgwMTc2LCJleHAiOjE2ODcxODY4MTAuMTY1MDYzLCJzdWIiOiIxMiIsInNjb3BlcyI6W119.wnkh-vwNp2cVS5dDxj3ci8_zhU8o2GoJsUCUvwAnQyLXRAcDKpoxe8Zpz4Q6AyID_4XUq7iG0T9Y0BXM06IShdZ_W5EmM-Lg-2BQYSXfdhoRWsN5VpcY9yCUFm24S34dyIhXLmd9f5EjYCxePrT4IBdjB0XgoIB7Zbt0zaqMz9B1AtFULXfR9I55w36Um47GrR09JVv-7ZuffJMeZThxJVw0RGpMczNo6zKjsfEsR-k0QvPOB2P2FHdcQXRUtj__5sX5nznWgGCeymM1RxukvTJ2yZxa1vulGfpwhE3w8YgIoOeghs0Wx1kYJdj6m2ZAYLJSoZzknefuU_YAez_tmAGV7UxBTXdj_1lJIo5t803_ggkT0wsqNggS0uHa2ZWmf9cDE_3RvOugiRJYG51QiqsG9fsl_CPn6T00dUuS23IKM7GpndHraeWaAJ-NSkL6ImMhaeHtYelf0P_5F6qOlZirBFE98HRxv23Vnnz9gkQLiA3fAMgHHLUcfGrYdtMvg0hcqfg2OdjFwzDFHUu45uzPMterrrJJAtw6yip7lTUgNtit27Eaa4qrJpCXxjRLQQ75s5CjsdPNaIeey7w2O01wnyo1OUnXTbyLepIcMbySSlPGNKCFwnd5K-bFZGQBJf5FyKvoRz99374y_d45BVrBSUcCNliNcdI68bon9ZE",
      },
    })
    .then((res) => {
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
}
