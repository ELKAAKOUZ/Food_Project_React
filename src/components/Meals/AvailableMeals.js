import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  // async function fetchDataFromApi() {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(
  //       "https://meals-aec1f-default-rtdb.firebaseio.com/meals.json"
  //     );
  //     console.log(response);
  //     if (!response.ok) {
  //       throw new Error("something went wrong ");
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     const loadedarray = [];
  //     for (const key in data) {
  //       loadedarray.push({
  //         id: key,
  //         price: data[key].price,
  //         description: data[key].description,
  //         name: data[key].name,
  //       });
  //       console.log(loadedarray);
  //     }
  //     setMeals(loadedarray);
  //   } catch (error) {
  //     setIsLoading(false);
  //     setHttpError(error.message);
  //   }

  //   setIsLoading(false);
  // }
  // useEffect(() => {
  //   fetchDataFromApi();
  // }, []);
  const mealslist = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));
  console.log(httpError);
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {isLoading ? <p>loading ...</p> : mealslist}
          {httpError && <p>{httpError}</p>}
        </ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
