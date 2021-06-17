import classes from './MealsSummary.module.css';

const MealsSummary = () => {
    return (
        <section className={classes.summary}>
            <h2>ReactFood Delivery!</h2>
            <p>
            Fast delivery service in Seattle area!
            </p>

            <p>
            Make your order on website or mobile app, ReactFood delivers the order fast. 
            </p>
        </section>
    );
};

export default MealsSummary;