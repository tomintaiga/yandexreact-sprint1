import curCss from './ingredient-detail-caption.module.css';
import PropTypes from 'prop-types';

const IngredientDetailCaption = ({ caption, value }) => {
  return (
    <div className={curCss.ingredient_root}>
      <p className="text text_type_main-small text_color_inactive">{caption}</p>
      <p className="text text_type_digits-default text_color_inactive">
        {value}
      </p>
    </div>
  );
};

IngredientDetailCaption.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default IngredientDetailCaption;
