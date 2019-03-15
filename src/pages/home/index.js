import React, { useEffect } from "react";
import ReactFancyBox from "react-fancybox";
import "react-fancybox/lib/fancybox.css";
import { observer, useObservable } from "mobx-react-lite";
import Spinner from "../../components/spinner";
import restorauntStore from "../../store/restoraunt";
import useStyles from "./styles";

function Home() {
  const rStore = useObservable(restorauntStore);
  const classes = useStyles();
  useEffect(() => {
    rStore.getFoods("/foods.json");
  }, []);

  const renderFoods = () => {
    const foods = rStore.filteredFoods;
    if (!foods.length) return <h2>There are no results!</h2>;
    return (
      <div className={classes.foods}>
        {foods.map(food => (
          <div key={food.id}>
            <strong>
              {food.name} : (${food.price})
            </strong>
            <ReactFancyBox
              image={food.src}
              thumbnail={food.src}
              alt={`Food-${food.id}`}
            />
            <p>Desc: {food.description}</p>
          </div>
        ))}
      </div>
    );
  };

  if (rStore.isLoading) return <Spinner />;
  return (
    <div className="home">
      <h1>Our menu</h1>
      {renderFoods()}
    </div>
  );
}

export default observer(Home);
