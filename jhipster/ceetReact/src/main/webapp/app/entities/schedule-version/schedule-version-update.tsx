import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCurrentQuarters } from 'app/entities/current-quarter/current-quarter.reducer';
import { State } from 'app/shared/model/enumerations/state.model';

import { createEntity, getEntity, reset, updateEntity } from './schedule-version.reducer';

export const ScheduleVersionUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const currentQuarters = useAppSelector(state => state.currentQuarter.entities);
  const scheduleVersionEntity = useAppSelector(state => state.scheduleVersion.entity);
  const loading = useAppSelector(state => state.scheduleVersion.loading);
  const updating = useAppSelector(state => state.scheduleVersion.updating);
  const updateSuccess = useAppSelector(state => state.scheduleVersion.updateSuccess);
  const stateValues = Object.keys(State);

  const handleClose = () => {
    navigate(`/schedule-version${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCurrentQuarters({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...scheduleVersionEntity,
      ...values,
      currentQuarter: currentQuarters.find(it => it.id.toString() === values.currentQuarter?.toString()),
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
          versionState: 'ACTIVE',
          ...scheduleVersionEntity,
          currentQuarter: scheduleVersionEntity?.currentQuarter?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.scheduleVersion.home.createOrEditLabel" data-cy="ScheduleVersionCreateUpdateHeading">
            <Translate contentKey="ceetApp.scheduleVersion.home.createOrEditLabel">Create or edit a ScheduleVersion</Translate>
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
                  id="schedule-version-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceetApp.scheduleVersion.versionNumber')}
                id="schedule-version-versionNumber"
                name="versionNumber"
                data-cy="versionNumber"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 40, message: translate('entity.validation.maxlength', { max: 40 }) },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.scheduleVersion.versionState')}
                id="schedule-version-versionState"
                name="versionState"
                data-cy="versionState"
                type="select"
              >
                {stateValues.map(state => (
                  <option value={state} key={state}>
                    {translate(`ceetApp.State.${state}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="schedule-version-currentQuarter"
                name="currentQuarter"
                data-cy="currentQuarter"
                label={translate('ceetApp.scheduleVersion.currentQuarter')}
                type="select"
                required
              >
                <option value="" key="0" />
                {currentQuarters
                  ? currentQuarters.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/schedule-version" replace variant="info">
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

export default ScheduleVersionUpdate;
