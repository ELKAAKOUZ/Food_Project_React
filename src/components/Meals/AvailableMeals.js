import React,{useEffect,useState} from "react";
import Card from "../UI/Card";
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';
// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];


const AvailableMeals = ()=>{
      const[meals,setMeals]=useState([]);
      const[isLoading,setIsLoading]=useState(false);
      const[httpError,setHttpError]=useState(null);

      async function fetchDataFromApi(){
        setIsLoading(true);
        try{
            const response=await fetch('https://fetchingapi-6c12f-default-rtdb.firebaseio.com/meals.json');
            if(!response.ok){
              throw new Error('es gipt something wrong ya negm')
            }
            const data=await response.json();
            const loadedarray=[];
            for(const key in data){
              loadedarray.push({
                id:key,
                price:data[key].price,
                descriptopn:data[key].description,
                name:data[key].name
              });
              console.log(loadedarray)
              
            };
            setMeals(loadedarray)
        }
        catch(error){
          setIsLoading(false);
          setHttpError(error.message);
        };
        
        setIsLoading(false);
        
    };
    useEffect(()=>{fetchDataFromApi()},[])
    const mealslist=meals.map(meal =>
       <MealItem key={meal.id} id={meal.id} name={meal.name} price={meal.price} description={meal.description}/>
    )
    console.log(httpError)
    return(
        <section className={classes.meals}>
            <Card>
                <ul>
                    {isLoading ? <p>loading ...</p>:mealslist}
                    {httpError  && <p>{httpError}</p>}

                </ul>
            </Card>
        </section>
    );
};
export default AvailableMeals;