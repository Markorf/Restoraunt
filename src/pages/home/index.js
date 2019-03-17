import React, { useEffect } from "react";
import ReactFancyBox from "react-fancybox";
import "react-fancybox/lib/fancybox.css";
import { Link } from "react-router-dom";
import { observer, useObservable } from "mobx-react-lite";
import Spinner from "../../components/spinner";
import restorauntStore from "../../store/restoraunt";
import optionsStore from "../../store/options";
import SimpleSelect from "../../components/select";
import useStyles from "./styles";

function Home() {
  const rStore = useObservable(restorauntStore);
  const oStore = useObservable(optionsStore);
  const classes = useStyles();
  useEffect(() => {
    rStore.getData(oStore.selectedType);
  }, [oStore.selectedType]);

  const renderItems = () => {
    const items = rStore.filteredStore;
    if (!items.length) return <h2>There are no results!</h2>;
    return (
      <div className={classes.items}>
        {items.map(item => (
          <div key={item.id}>
            <strong>
              <Link className={classes.itemLink} to={`/item/${item.id}`}>
                {item.name}
              </Link>{" "}
              : (${item.price})
            </strong>
            <ReactFancyBox
              image={item.src}
              thumbnail={item.src}
              alt={`item-${item.id}`}
            />
            <p>Desc: {item.description}</p>
          </div>
        ))}
      </div>
    );
  };

  if (rStore.isLoading) return <Spinner />;

  return (
    <div className="home">
      <h1>Our menu</h1>
      <SimpleSelect small />
      {renderItems()}
    </div>
  );
}

export default observer(Home);
