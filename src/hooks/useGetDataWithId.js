import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function useGetDataWithId(id = "", type = "") {
  const [data, setData] = useState({});
  useEffect(() => {
    async function getUser() {
      try {
        const docRef = doc(db, `${type}`, id);
        const response = await getDoc(docRef);
        setData({
          id: response.id,
          ...response.data(),
        });
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [id, type]);
  return {
    data,
  };
}
export default useGetDataWithId;
