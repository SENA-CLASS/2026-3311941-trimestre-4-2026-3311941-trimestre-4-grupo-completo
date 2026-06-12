import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { State } from 'app/shared/model/enumerations/state.model';

import { createEntity, getEntity, reset, updateEntity } from './year.reducer';

export const YearUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const yearEntity = useAppSelector(state => state.year.entity);
  const loading = useAppSelector(state => state.year.loading);
  const updating = useAppSelector(state => state.year.updating);
  const updateSuccess = useAppSelector(state => state.year.updateSuccess);
  const stateValues = Object.keys(State);

  const handleClose = () => {
    navigate(`/year${location.search}`);
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
    if (values.yearNumber !== undefined && typeof values.yearNumber !== 'number') {
      values.yearNumber = Number(values.yearNumber);
    }

    const entity = {
      ...yearEntity,
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
          yearState: 'ACTIVE',
          ...yearEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.year.home.createOrEditLabel" data-cy="YearCreateUpdateHeading">
            <Translate contentKey="ceetApp.year.home.createOrEditLabel">Create or edit a Year</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="year-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceetApp.year.yearNumber')}
                id="year-yearNumber"
                name="yearNumber"
                data-cy="yearNumber"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('ceetApp.year.yearState')}
                id="year-yearState"
                name="yearState"
                data-cy="yearState"
                type="select"
              >
                {stateValues.map(state => (
                  <option value={state} key={state}>
                    {translate(`ceetApp.State.${state}`)}
                  </option>
                ))}
              </ValidatedField>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/year" replace variant="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button variant="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default YearUpdate;
