/// <reference types="cypress" />

const BASE_URL = 'https://norma.nomoreparties.space/api';
const ID_BUN = `[data-cy='643d69a5c3f7b9001cfa093c']`;
const ID_ANOTHER_BUN = `[data-cy='643d69a5c3f7b9001cfa093d']`;
const ID_FILLING = `[data-cy='643d69a5c3f7b9001cfa0941']`;

const addBun = () => {
  return cy.get(ID_BUN).children('button').click();
};
const addAnotherBun = () => {
  return cy.get(ID_ANOTHER_BUN).children('button').click();
};
const addFilling = () => {
  return cy.get(ID_FILLING).children('button').click();
};

const openFillingModal = () => {
  return cy.get(ID_FILLING).children('a').click();
};

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.intercept('POST', `${BASE_URL}/auth/login`, { fixture: 'user.json' });
  cy.intercept('GET', `${BASE_URL}/auth/user`, { fixture: 'user.json' });
  cy.intercept('POST', `${BASE_URL}/orders`, { fixture: 'orderResponse.json' });
  cy.visit('/');
  cy.viewport(1440, 800);
  cy.get('#modals').as('modal');
});

describe('Конструктор бургера', () => {
  describe('Добавление ингредиентов', () => {
    it('Инкремент счетчика ингредиента', () => {
      addFilling();
      cy.get(ID_FILLING).find('.counter__num').should('contain', '1');
    });

    describe('Добавление булок и начинок', () => {
      it('Добавление булки и начинки', () => {
        addBun();
        addFilling();
      });

      it('Добавление булки после начинки', () => {
        addFilling();
        addBun();
      });
    });

    describe('Замена булок', () => {
      it('Замена булки при пустом списке начинок', () => {
        addBun();
        addAnotherBun();
      });

      it('Замена булки при наличии начинки', () => {
        addBun();
        addFilling();
        addAnotherBun();
      });
    });
  });

  describe('Оформление заказа', () => {
    beforeEach(() => {
      window.localStorage.setItem('refreshToken', 'ipsum');
      cy.setCookie('accessToken', 'lorem');
      cy.getAllLocalStorage().should('not.be.empty');
      cy.getCookie('accessToken').should('not.be.empty');
    });

    afterEach(() => {
      window.localStorage.clear();
      cy.clearAllCookies();
      cy.getAllLocalStorage().should('be.empty');
      cy.getAllCookies().should('be.empty');
    });

    it('Отправка заказа и проверка ответа', () => {
      addBun();
      addFilling();
      cy.get(`[data-cy='order-button']`).click();
      cy.get('@modal').find('h2').should('contain', '38483');
    });
  });

  describe('Модальные окна', () => {
    beforeEach(() => {
      cy.get('@modal').should('be.empty');
    });

    it('Открытие и проверка модального окна ингредиента', () => {
      openFillingModal();
      cy.get('@modal').should('not.be.empty');
      cy.url().should('include', '643d69a5c3f7b9001cfa0941');
    });

    it('Закрытие модального окна по клику на «✕»', () => {
      openFillingModal();
      cy.get('@modal').should('not.be.empty');
      cy.get('@modal').find('button').click();
      cy.get('@modal').should('be.empty');
    });

    it('Закрытие модального окна по клику на оверлей', () => {
      openFillingModal();
      cy.get('@modal').should('not.be.empty');
      cy.get(`[data-cy='overlay']`).click({ force: true });
      cy.get('@modal').should('be.empty');
    });

    it('Закрытие модального окна по нажатию Escape', () => {
      openFillingModal();
      cy.get('@modal').should('not.be.empty');
      cy.get('body').trigger('keydown', { key: 'Escape' });
      cy.get('@modal').should('be.empty');
    });
  });
});
