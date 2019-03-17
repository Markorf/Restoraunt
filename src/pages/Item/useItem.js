import { useEffect } from "react";
import { useObservable } from "mobx-react-lite";
import restorauntStore from "../../store/restoraunt";

function useItem(id) {
  const rStore = useObservable(restorauntStore);
  useEffect(() => {
    rStore.getItem(id);
    // mora () => jer ce biti problem pri redirektu
    return () => (rStore.item = {});
  }, [id]);

  return rStore;
}

export default useItem;
