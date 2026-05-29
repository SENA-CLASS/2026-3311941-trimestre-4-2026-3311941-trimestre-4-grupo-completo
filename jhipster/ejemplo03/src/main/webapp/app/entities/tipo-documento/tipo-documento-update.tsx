import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Estado } from 'app/shared/model/enumerations/estado.model';

import { createEntity, getEntity, reset, updateEntity } from './tipo-documento.reducer';

export const TipoDocumentoUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const tipoDocumentoEntity = useAppSelector(state => state.tipoDocumento.entity);
  const loading = useAppSelector(state => state.tipoDocumento.loading);
  const updating = useAppSelector(state => state.tipoDocumento.updating);
  const updateSuccess = useAppSelector(state => state.tipoDocumento.updateSuccess);
  const estadoValues = Object.keys(Estado);

  const handleClose = () => {
    navigate('/tipo-documento');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...tipoDocumentoEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          estado: 'ACTIVO',
          ...tipoDocumentoEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ejemplo03App.tipoDocumento.home.createOrEditLabel" data-cy="TipoDocumentoCreateUpdateHeading">
            Crear o editar Tipo Documento
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && <ValidatedField name="id" required readOnly id="tipo-documento-id" label="ID" validate={{ required: true }} />}
              <ValidatedField
                label="Sigla"
                id="tipo-documento-sigla"
                name="sigla"
                data-cy="sigla"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  maxLength: { value: 20, message: 'Este campo no puede superar más de 20 caracteres.' },
                }}
              />
              <ValidatedField
                label="Nombre Documento"
                id="tipo-documento-nombreDocumento"
                name="nombreDocumento"
                data-cy="nombreDocumento"
                type="text"
                validate={{
                  required: { value: true, message: 'Este campo es obligatorio.' },
                  maxLength: { value: 100, message: 'Este campo no puede superar más de 100 caracteres.' },
                }}
              />
              <ValidatedField label="Estado" id="tipo-documento-estado" name="estado" data-cy="estado" type="select">
                {estadoValues.map(estado => (
                  <option value={estado} key={estado}>
                    {estado}
                  </option>
                ))}
              </ValidatedField>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/tipo-documento" replace variant="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Volver</span>
              </Button>
              &nbsp;
              <Button variant="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Guardar
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TipoDocumentoUpdate;
