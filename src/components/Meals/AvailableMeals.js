import { useEffect, useState} from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
/* no need after add them to fire base back end database
const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];
*/
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);//use state update function
  //fetch data from web
  useEffect(() => {
    const fetchMeals = async () => {
    //realtime database url
    //send request to rest api endpoint to fetch the meals
      const response = await fetch('https://foodorderreactapp-default-rtdb.firebaseio.com/meals.json');
      //meals data from backend
      const responseData = await response.json();

      const loadMeals = []; //m1,m2,m3,m4
      for(const key in responseData) {
        loadMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadMeals);
    };
    fetchMeals();
  }, []); //empty array first then fill meals with response data meal list
  
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;