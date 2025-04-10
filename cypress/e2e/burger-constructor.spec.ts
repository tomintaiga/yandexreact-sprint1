import data from '../../src/utils/data';

describe('service is available', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      statusCode: 200,
      body: { success: true, data },
    }).as('getIngredients');
  });

  it('should be available on localhost:5173', () => {
    cy.visit('http://localhost:5173/');
    cy.wait('@getIngredients');
  });
});

describe('burger constructor', () => {
  const BUN_ID = data[0]._id;
  const BUN_PRICE = data[0].price;
  const MAIN_ID = data[1]._id;
  const SAUCE_ID = data[3]._id;
  const BUN2_ID = data[15]._id;
  const BUN2_PRICE = data[15].price;

  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      statusCode: 200,
      body: { success: true, data },
    }).as('getIngredients');
    cy.visit('http://localhost:5173/');
    cy.wait('@getIngredients');
  });

  it('should drag and drop ingredients', () => {
    cy.get(`[data-testid="ingredient-draghandle-${BUN_ID}"]`).trigger(
      'dragstart',
    );
    cy.get('[data-testid="burger-constructor"]').trigger('drop');
    cy.get(
      `[data-testid="constructor-ingredient-draghandle-${BUN_ID}"]`,
    ).should('have.css', 'visibility', 'hidden');
  });

  it('should set proper price', () => {
    cy.get(`[data-testid="ingredient-draghandle-${BUN_ID}"]`).trigger(
      'dragstart',
    );
    cy.get('[data-testid="burger-constructor"]').trigger('drop');
    cy.get('[data-testid="constructor-total-price"]').should(
      'have.text',
      `${BUN_PRICE * 2}`,
    );
  });

  it('should replace bun', () => {
    // Первая булка
    cy.get(`[data-testid="ingredient-draghandle-${BUN_ID}"]`).trigger(
      'dragstart',
    );
    cy.get('[data-testid="burger-constructor"]').trigger('drop');
    // Вторая булка
    cy.get(`[data-testid="ingredient-draghandle-${BUN2_ID}"]`).trigger(
      'dragstart',
    );
    cy.get('[data-testid="burger-constructor"]').trigger('drop');
    // Проверяем, что цена изменилась
    cy.get('[data-testid="constructor-total-price"]').should(
      'have.text',
      `${BUN2_PRICE * 2}`,
    );
  });

  it('should move ingredients', () => {
    // Булка
    cy.get(`[data-testid="ingredient-draghandle-${BUN_ID}"]`).trigger(
      'dragstart',
    );

    // Сейчас состояние булка булка

    cy.get('[data-testid="burger-constructor"]').trigger('drop');
    cy.get(`[data-testid="ingredient-draghandle-${SAUCE_ID}"]`).trigger(
      'dragstart',
    );

    // Сейчас состояние булка соус булка

    cy.get('[data-testid="burger-constructor"]').trigger('drop');
    cy.get(`[data-testid="ingredient-draghandle-${MAIN_ID}"]`).trigger(
      'dragstart',
    );
    cy.get('[data-testid="burger-constructor"]').trigger('drop');

    // Сейчас состояние булка соус начинка булка

    cy.get(
      `[data-testid="constructor-ingredient-draghandle-${MAIN_ID}"]`,
    ).trigger('dragstart');
    cy.get(
      `[data-testid="constructor-ingredient-draghandle-${SAUCE_ID}"]`,
    ).trigger('drop');

    // Теперь состояние булка начинка соус булка

    // Проверяем порядок элементов по data-testid
    const expectedOrder = [
      `constructor-item-${BUN_ID}`, // Булочка (верх)
      `constructor-item-${SAUCE_ID}`, // Соус (теперь первый)
      `constructor-item-${MAIN_ID}`, // Начинка (теперь второй)
      `constructor-item-${BUN_ID}`, // Булочка (низ)
    ];

    // Сначала ждем появления всех элементов
    cy.get('[data-testid^="constructor-item-"]', { timeout: 10000 }).should(
      'have.length',
      4,
    );

    // Получаем все элементы конструктора и проверяем их порядок
    cy.get('[data-testid^="constructor-item-"]').then(($items) => {
      const actualOrder = $items
        .map((_, el) => el.getAttribute('data-testid'))
        .get();
      cy.log(`Actual order: ${actualOrder}`);
      cy.log(`Expected order: ${expectedOrder}`);
      expect(actualOrder).to.deep.equal(expectedOrder);
    });
  });
});
