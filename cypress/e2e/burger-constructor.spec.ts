describe('service is available', () => {
  it('should be available on localhost:5173', () => {
    cy.visit('http://localhost:5173/');
  });
});

describe('burger constructor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should drag and drop ingredients', () => {
    cy.get(
      '[data-testid="ingredient-draghandle-643d69a5c3f7b9001cfa093c"]',
    ).trigger('dragstart');
    cy.get('[data-testid="burger-constructor"]').trigger('drop');
    cy.get(
      '[data-testid="constructor-ingredient-draghandle-643d69a5c3f7b9001cfa093c"]',
    ).should('have.css', 'visibility', 'hidden');
  });

  it('should set protper price', () => {
    cy.get(
      '[data-testid="ingredient-draghandle-643d69a5c3f7b9001cfa093c"]',
    ).trigger('dragstart');
    cy.get('[data-testid="burger-constructor"]').trigger('drop');
    cy.get('[data-testid="constructor-total-price"]').should(
      'have.text',
      '2510',
    );
  });

  it('should replace bun', () => {
    // Первая булка
    cy.get(
      '[data-testid="ingredient-draghandle-643d69a5c3f7b9001cfa093c"]',
    ).trigger('dragstart');
    cy.get('[data-testid="burger-constructor"]').trigger('drop');
    // Вторая булка
    cy.get(
      '[data-testid="ingredient-draghandle-643d69a5c3f7b9001cfa093d"]',
    ).trigger('dragstart');
    cy.get('[data-testid="burger-constructor"]').trigger('drop');
    // Проверяем, что цена изменилась
    cy.get('[data-testid="constructor-total-price"]').should(
      'have.text',
      '3231',
    );
  });

  const BUN_ID = '643d69a5c3f7b9001cfa093c';
  const MAIN_ID = '643d69a5c3f7b9001cfa0941';
  const SAUCE_ID = '643d69a5c3f7b9001cfa0943';

  it('should moeve ingredients', () => {
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

    // Сейчас состояние булка соус начинка буока

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
