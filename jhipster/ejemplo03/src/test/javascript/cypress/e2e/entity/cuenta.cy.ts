import {
  entityConfirmDeleteButtonSelector,
  entityCreateButtonSelector,
  entityCreateCancelButtonSelector,
  entityCreateSaveButtonSelector,
  entityDeleteButtonSelector,
  entityDetailsBackButtonSelector,
  entityDetailsButtonSelector,
  entityEditButtonSelector,
  entityTableSelector,
} from '../../support/entity';

describe('Cuenta e2e test', () => {
  const cuentaPageUrl = '/cuenta';
  const cuentaPageUrlPattern = new RegExp('/cuenta(\\?.*)?$');
  let username: string;
  let password: string;
  // const cuentaSample = {"numeroDocumento":"aw","primerNombre":"positively","primerApellido":"pronoun against within"};

  let cuenta;
  // let tipoDocumento;
  // let user;

  before(() => {
    cy.credentials().then(credentials => {
      ({ username, password } = credentials);
    });
  });

  beforeEach(() => {
    cy.login(username, password);
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/tipo-documentos',
      body: {"sigla":"criminal suspiciousl","nombreDocumento":"barring","estado":"ACTIVO"},
    }).then(({ body }) => {
      tipoDocumento = body;
    });
    // create an instance at the required relationship entity:
    cy.authenticatedRequest({
      method: 'POST',
      url: '/api/users',
      body: {"id":"aa04ba72-6c2f-437e-b8cd-8c0313aec9b2","login":"Alicia4","firstName":"Pío","lastName":"Córdova Carreón","email":"MariadelCarmen.LeyvaArroyo15@hotmail.com","imageUrl":"fort precedent"},
    }).then(({ body }) => {
      user = body;
    });
  });
   */

  beforeEach(() => {
    cy.intercept('GET', '/api/cuentas+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/cuentas').as('postEntityRequest');
    cy.intercept('DELETE', '/api/cuentas/*').as('deleteEntityRequest');
  });

  /* Disabled due to incompatibility
  beforeEach(() => {
    // Simulate relationships api for better performance and reproducibility.
    cy.intercept('GET', '/api/tipo-documentos', {
      statusCode: 200,
      body: [tipoDocumento],
    });

    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [user],
    });

  });
   */

  afterEach(() => {
    if (cuenta) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/cuentas/${cuenta.id}`,
      }).then(() => {
        cuenta = undefined;
      });
    }
  });

  /* Disabled due to incompatibility
  afterEach(() => {
    if (tipoDocumento) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/tipo-documentos/${tipoDocumento.id}`,
      }).then(() => {
        tipoDocumento = undefined;
      });
    }
    if (user) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/users/${user.id}`,
      }).then(() => {
        user = undefined;
      });
    }
  });
   */

  it('Cuentas menu should load Cuentas page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('cuenta');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Cuenta').should('exist');
    cy.url().should('match', cuentaPageUrlPattern);
  });

  describe('Cuenta page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(cuentaPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Cuenta page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/cuenta/new$'));
        cy.getEntityCreateUpdateHeading('Cuenta');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', cuentaPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      /* Disabled due to incompatibility
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/cuentas',
          body: {
            ...cuentaSample,
            tipoDocumento: tipoDocumento,
            user: user,
          },
        }).then(({ body }) => {
          cuenta = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/cuentas+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/cuentas?page=0&size=20>; rel="last",<http://localhost/api/cuentas?page=0&size=20>; rel="first"',
              },
              body: [cuenta],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(cuentaPageUrl);

        cy.wait('@entitiesRequestInternal');
      });
       */

      beforeEach(function () {
        cy.visit(cuentaPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response?.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details Cuenta page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('cuenta');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', cuentaPageUrlPattern);
      });

      it('edit button click should load edit Cuenta page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Cuenta');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', cuentaPageUrlPattern);
      });

      it('edit button click should load edit Cuenta page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Cuenta');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', cuentaPageUrlPattern);
      });

      // Reason: cannot create a required entity with relationship with required relationships.
      it.skip('last delete button click should delete instance of Cuenta', () => {
        cy.intercept('GET', '/api/cuentas/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('cuenta').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', cuentaPageUrlPattern);

        cuenta = undefined;
      });
    });
  });

  describe('new Cuenta page', () => {
    beforeEach(() => {
      cy.visit(cuentaPageUrl);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Cuenta');
    });

    // Reason: cannot create a required entity with relationship with required relationships.
    it.skip('should create an instance of Cuenta', () => {
      cy.get(`[data-cy="numeroDocumento"]`).type('inspection lest');
      cy.get(`[data-cy="numeroDocumento"]`).should('have.value', 'inspection lest');

      cy.get(`[data-cy="primerNombre"]`).type('incidentally');
      cy.get(`[data-cy="primerNombre"]`).should('have.value', 'incidentally');

      cy.get(`[data-cy="segundoNombre"]`).type('cheap oh');
      cy.get(`[data-cy="segundoNombre"]`).should('have.value', 'cheap oh');

      cy.get(`[data-cy="primerApellido"]`).type('confiscate');
      cy.get(`[data-cy="primerApellido"]`).should('have.value', 'confiscate');

      cy.get(`[data-cy="segundoApellido"]`).type('since igloo bolster');
      cy.get(`[data-cy="segundoApellido"]`).should('have.value', 'since igloo bolster');

      cy.get(`[data-cy="tipoDocumento"]`).select(1);
      cy.get(`[data-cy="user"]`).select(1);

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        cuenta = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', cuentaPageUrlPattern);
    });
  });
});
