import React, { useEffect } from "react";
import ReactFancyBox from "react-fancybox";
import "react-fancybox/lib/fancybox.css";
import { Link } from "react-router-dom";
import { observer, useObservable } from "mobx-react-lite";
import restorauntStore from "../../store/restoraunt";
import optionsStore from "../../store/options";
import Select from "../../components/ui/Select";
import Spinner from "../../components/ui/Spinner";
import useStyles from "./styles";

function Home() {
  const rStore = useObservable(restorauntStore);
  const oStore = useObservable(optionsStore);
  const classes = useStyles();
  const data = localStorage.getItem("selectedType") || oStore.initialType;
  useEffect(() => {
    rStore.getData(data);
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
      <Select small />
      {renderItems()}
    </div>
  );
}

export default observer(Home);
