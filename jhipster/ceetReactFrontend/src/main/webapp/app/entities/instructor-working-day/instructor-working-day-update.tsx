import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { State } from 'app/shared/model/enumerations/state.model';

import { createEntity, getEntity, reset, updateEntity } from './instructor-working-day.reducer';

export const InstructorWorkingDayUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const instructorWorkingDayEntity = useAppSelector(state => state.instructorWorkingDay.entity);
  const loading = useAppSelector(state => state.instructorWorkingDay.loading);
  const updating = useAppSelector(state => state.instructorWorkingDay.updating);
  const updateSuccess = useAppSelector(state => state.instructorWorkingDay.updateSuccess);
  const stateValues = Object.keys(State);

  const handleClose = () => {
    navigate(`/instructor-working-day${location.search}`);
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
      ...instructorWorkingDayEntity,
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
          workingDayState: 'ACTIVE',
          ...instructorWorkingDayEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.instructorWorkingDay.home.createOrEditLabel" data-cy="InstructorWorkingDayCreateUpdateHeading">
            <Translate contentKey="ceet2App.instructorWorkingDay.home.createOrEditLabel">Create or edit a InstructorWorkingDay</Translate>
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
                  id="instructor-working-day-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceet2App.instructorWorkingDay.nameWorkingDay')}
                id="instructor-working-day-nameWorkingDay"
                name="nameWorkingDay"
                data-cy="nameWorkingDay"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 80, message: translate('entity.validation.maxlength', { max: 80 }) },
                }}
              />
              <ValidatedField
                label={translate('ceet2App.instructorWorkingDay.descriptionWorkingDay')}
                id="instructor-working-day-descriptionWorkingDay"
                name="descriptionWorkingDay"
                data-cy="descriptionWorkingDay"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 200, message: translate('entity.validation.maxlength', { max: 200 }) },
                }}
              />
              <ValidatedField
                label={translate('ceet2App.instructorWorkingDay.workingDayState')}
                id="instructor-working-day-workingDayState"
                name="workingDayState"
                data-cy="workingDayState"
                type="select"
              >
                {stateValues.map(state => (
                  <option value={state} key={state}>
                    {translate(`ceet2App.State.${state}`)}
                  </option>
                ))}
              </ValidatedField>
              <Button
                as={Link as any}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/instructor-working-day"
                replace
                variant="info"
              >
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

export default InstructorWorkingDayUpdate;
