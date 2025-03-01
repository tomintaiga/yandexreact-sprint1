import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import curStyle from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';

const BurgerIngredients = () => {
  // ########
  const data = useSelector((state) => state.ingredient.ingredients);
  // ########
  const [curTab, setCurTab] = React.useState('bun');
  const containerRef = React.useRef(null);

  const handleScroll = () => {
    const container = containerRef.current;

    // Get fist visible element in container
    const firstVisibleElement = Array.from(container.children).find(
      (child) => child.getBoundingClientRect().top > 0,
    );

    // Now we need to map firstVisibleElement to it't valut in data array
    const item = data.find(
      (ingredient) => ingredient._id === firstVisibleElement.id,
    );

    // Set current tab if it's not the same as item type
    if (item.type !== curTab) {
      setCurTab(item.type);
    }
  };

  return (
    <>
      <div className={curStyle.top_div}>
        <div className={curStyle.tabs}>
          <Tab value="bun" active={curTab === 'bun'} onClick={setCurTab}>
            Булки
          </Tab>
          <Tab value="sauce" active={curTab === 'sauce'} onClick={setCurTab}>
            Соусы
          </Tab>
          <Tab value="main" active={curTab === 'main'} onClick={setCurTab}>
            Начинки
          </Tab>
        </div>
        <div
          className={curStyle.products_div}
          ref={containerRef}
          onScroll={handleScroll}
        >
          {data.map((item) => {
            return <Ingredient ingredient={item} key={item._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default BurgerIngredients;
