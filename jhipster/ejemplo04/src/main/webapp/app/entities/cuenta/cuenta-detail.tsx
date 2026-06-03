import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './cuenta.reducer';

export const CuentaDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const cuentaEntity = useAppSelector(state => state.cuenta.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="cuentaDetailsHeading">Cuenta</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{cuentaEntity.id}</dd>
          <dt>
            <span id="numeroDocumento">Numero Documento</span>
          </dt>
          <dd>{cuentaEntity.numeroDocumento}</dd>
          <dt>
            <span id="primerNombre">Primer Nombre</span>
          </dt>
          <dd>{cuentaEntity.primerNombre}</dd>
          <dt>
            <span id="segundoNombre">Segundo Nombre</span>
          </dt>
          <dd>{cuentaEntity.segundoNombre}</dd>
          <dt>
            <span id="primerApellido">Primer Apellido</span>
          </dt>
          <dd>{cuentaEntity.primerApellido}</dd>
          <dt>
            <span id="segundoApellido">Segundo Apellido</span>
          </dt>
          <dd>{cuentaEntity.segundoApellido}</dd>
          <dt>User</dt>
          <dd>{cuentaEntity.user ? cuentaEntity.user.login : ''}</dd>
          <dt>Tipo Documento</dt>
          <dd>{cuentaEntity.tipoDocumento ? cuentaEntity.tipoDocumento.nombreDocumento : ''}</dd>
        </dl>
        <Button as={Link as any} to="/cuenta" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Volver</span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/cuenta/${cuentaEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Editar</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CuentaDetail;
