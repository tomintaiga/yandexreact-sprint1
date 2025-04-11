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

const addIngredientToBurger = (id: string) => {
  cy.get(`[data-testid="ingredient-draghandle-${id}"]`).trigger('dragstart');
  cy.get('[data-testid="burger-constructor"]').trigger('drop');
};

const madeOrder = () => {
  addIngredientToBurger(BUN_ID);
  addIngredientToBurger(MAIN_ID);
  addIngredientToBurger(SAUCE_ID);

  // Кликаем по кнопке "Оформить заказ"
  cy.get('[data-testid="order-button"]').click();

  // Проверяем, что модалка открылась
  cy.get('[data-testid="order-details"]').should('be.visible');
};

const BUN_ID = data[0]._id;
const BUN_PRICE = data[0].price;
const MAIN_ID = data[1]._id;
const SAUCE_ID = data[3]._id;
const BUN2_ID = data[15]._id;
const BUN2_PRICE = data[15].price;

describe('burger constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      statusCode: 200,
      body: { success: true, data },
    }).as('getIngredients');
    cy.visit('http://localhost:5173/');
    cy.wait('@getIngredients');
  });

  it('should drag and drop ingredients', () => {
    addIngredientToBurger(BUN_ID);
    cy.get(
      `[data-testid="constructor-ingredient-draghandle-${BUN_ID}"]`,
    ).should('have.css', 'visibility', 'hidden');
  });

  it('should set proper price', () => {
    addIngredientToBurger(BUN_ID);
    cy.get('[data-testid="constructor-total-price"]').should(
      'have.text',
      `${BUN_PRICE * 2}`,
    );
  });

  it('should replace bun', () => {
    // Первая булка
    addIngredientToBurger(BUN_ID);
    // Вторая булка
    addIngredientToBurger(BUN2_ID);
    // Проверяем, что цена изменилась
    cy.get('[data-testid="constructor-total-price"]').should(
      'have.text',
      `${BUN2_PRICE * 2}`,
    );
  });

  it('should move ingredients', () => {
    // Булка
    addIngredientToBurger(BUN_ID);
    // Сейчас состояние булка булка

    addIngredientToBurger(SAUCE_ID);
    // Сейчас состояние булка соус булка

    addIngredientToBurger(MAIN_ID);
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

  it('should update counter value when ingredient is added', () => {
    // Проверяем для булки
    cy.get(`[data-testid="ingredient-draghandle-${BUN_ID}"]`).as('bun');
    cy.get('@bun').trigger('dragstart');
    cy.get('[data-testid="burger-constructor"]').trigger('drop');
    cy.get('@bun').find('div.counter > p').should('have.text', '2');

    // Проверяем для не булки
    cy.get(`[data-testid="ingredient-draghandle-${MAIN_ID}"]`).as('main');
    cy.get('@main').trigger('dragstart');
    cy.get('[data-testid="burger-constructor"]').trigger('drop');
    cy.get('@main').find('div.counter > p').should('have.text', '1');
  });
});

describe('order burger', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      statusCode: 200,
      body: { success: true, data },
    }).as('getIngredients');
    cy.visit('http://localhost:5173/');
    cy.wait('@getIngredients');

    cy.intercept('POST', '**/orders', {
      fixture: 'orderResponse.json',
    }).as('postOrder');

    cy.setCookie('token', 'abc123');
  });

  it('should show order modal', () => {
    addIngredientToBurger(BUN_ID);
    addIngredientToBurger(MAIN_ID);
    addIngredientToBurger(SAUCE_ID);

    // Кликаем по кнопке "Оформить заказ"
    cy.get('[data-testid="order-button"]').click();

    // Проверяем, что модалка открылась
    cy.get('[data-testid="order-details"]').should('be.visible');

    // Получаем номер заказа
    cy.get('[data-testid="order-number"]').then(($orderNumber) => {
      const orderNumberText = $orderNumber.text();
      expect(orderNumberText).to.eq('74236');
    });
  });

  it('should close modal on close button click', () => {

    madeOrder();

    // Кликаем по кнопке закрытия
    cy.get('[data-testid="modal-close-button"]').click();

    // Проверяем, что модалка закрылась
    cy.get('[data-testid="order-details"]').should('not.exist');
  });

  it('should close modal on escape key press', () => {
    madeOrder();

    // Нажимаем клавишу Escape
    cy.get('body').type('{esc}');

    // Проверяем, что модалка закрылась
    cy.get('[data-testid="order-details"]').should('not.exist');
  });
});
