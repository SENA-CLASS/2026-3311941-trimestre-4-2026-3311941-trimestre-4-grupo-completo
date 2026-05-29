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

describe('TipoDocumento e2e test', () => {
  const tipoDocumentoPageUrl = '/tipo-documento';
  const tipoDocumentoPageUrlPattern = new RegExp('/tipo-documento(\\?.*)?$');
  let username: string;
  let password: string;
  const tipoDocumentoSample = { sigla: 'expatiate separate c', nombreDocumento: 'right capitalize gah', estado: 'INACTIVO' };

  let tipoDocumento;

  before(() => {
    cy.credentials().then(credentials => {
      ({ username, password } = credentials);
    });
  });

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/tipo-documentos+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/tipo-documentos').as('postEntityRequest');
    cy.intercept('DELETE', '/api/tipo-documentos/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (tipoDocumento) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/tipo-documentos/${tipoDocumento.id}`,
      }).then(() => {
        tipoDocumento = undefined;
      });
    }
  });

  it('TipoDocumentos menu should load TipoDocumentos page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('tipo-documento');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('TipoDocumento').should('exist');
    cy.url().should('match', tipoDocumentoPageUrlPattern);
  });

  describe('TipoDocumento page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(tipoDocumentoPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create TipoDocumento page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/tipo-documento/new$'));
        cy.getEntityCreateUpdateHeading('TipoDocumento');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', tipoDocumentoPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/tipo-documentos',
          body: tipoDocumentoSample,
        }).then(({ body }) => {
          tipoDocumento = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/tipo-documentos+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [tipoDocumento],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(tipoDocumentoPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details TipoDocumento page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('tipoDocumento');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', tipoDocumentoPageUrlPattern);
      });

      it('edit button click should load edit TipoDocumento page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('TipoDocumento');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', tipoDocumentoPageUrlPattern);
      });

      it('edit button click should load edit TipoDocumento page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('TipoDocumento');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', tipoDocumentoPageUrlPattern);
      });

      it('last delete button click should delete instance of TipoDocumento', () => {
        cy.intercept('GET', '/api/tipo-documentos/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('tipoDocumento').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', tipoDocumentoPageUrlPattern);

        tipoDocumento = undefined;
      });
    });
  });

  describe('new TipoDocumento page', () => {
    beforeEach(() => {
      cy.visit(tipoDocumentoPageUrl);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('TipoDocumento');
    });

    it('should create an instance of TipoDocumento', () => {
      cy.get(`[data-cy="sigla"]`).type('aside humidity booho');
      cy.get(`[data-cy="sigla"]`).should('have.value', 'aside humidity booho');

      cy.get(`[data-cy="nombreDocumento"]`).type('cooperative cute because');
      cy.get(`[data-cy="nombreDocumento"]`).should('have.value', 'cooperative cute because');

      cy.get(`[data-cy="estado"]`).select('INACTIVO');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        tipoDocumento = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', tipoDocumentoPageUrlPattern);
    });
  });
});
