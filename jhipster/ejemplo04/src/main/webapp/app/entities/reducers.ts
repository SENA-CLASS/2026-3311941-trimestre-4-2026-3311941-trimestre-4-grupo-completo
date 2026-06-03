import cuenta from 'app/entities/cuenta/cuenta.reducer';
import tipoDocumento from 'app/entities/tipo-documento/tipo-documento.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  tipoDocumento,
  cuenta,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
