import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getYears } from 'app/entities/year/year.reducer';
import { State } from 'app/shared/model/enumerations/state.model';

import { createEntity, getEntity, reset, updateEntity } from './current-quarter.reducer';

export const CurrentQuarterUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const years = useAppSelector(state => state.year.entities);
  const currentQuarterEntity = useAppSelector(state => state.currentQuarter.entity);
  const loading = useAppSelector(state => state.currentQuarter.loading);
  const updating = useAppSelector(state => state.currentQuarter.updating);
  const updateSuccess = useAppSelector(state => state.currentQuarter.updateSuccess);
  const stateValues = Object.keys(State);

  const handleClose = () => {
    navigate(`/current-quarter${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getYears({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.scheduledQuarter !== undefined && typeof values.scheduledQuarter !== 'number') {
      values.scheduledQuarter = Number(values.scheduledQuarter);
    }

    const entity = {
      ...currentQuarterEntity,
      ...values,
      year: years.find(it => it.id.toString() === values.year?.toString()),
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
          currentQuarterState: 'ACTIVE',
          ...currentQuarterEntity,
          year: currentQuarterEntity?.year?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.currentQuarter.home.createOrEditLabel" data-cy="CurrentQuarterCreateUpdateHeading">
            <Translate contentKey="ceet2App.currentQuarter.home.createOrEditLabel">Create or edit a CurrentQuarter</Translate>
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
                  id="current-quarter-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceet2App.currentQuarter.scheduledQuarter')}
                id="current-quarter-scheduledQuarter"
                name="scheduledQuarter"
                data-cy="scheduledQuarter"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('ceet2App.currentQuarter.startQuarter')}
                id="current-quarter-startQuarter"
                name="startQuarter"
                data-cy="startQuarter"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('ceet2App.currentQuarter.endQuarter')}
                id="current-quarter-endQuarter"
                name="endQuarter"
                data-cy="endQuarter"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('ceet2App.currentQuarter.currentQuarterState')}
                id="current-quarter-currentQuarterState"
                name="currentQuarterState"
                data-cy="currentQuarterState"
                type="select"
              >
                {stateValues.map(state => (
                  <option value={state} key={state}>
                    {translate(`ceet2App.State.${state}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="current-quarter-year"
                name="year"
                data-cy="year"
                label={translate('ceet2App.currentQuarter.year')}
                type="select"
                required
              >
                <option value="" key="0" />
                {years
                  ? years.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.yearNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/current-quarter" replace variant="info">
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

export default CurrentQuarterUpdate;
