import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getDays } from 'app/entities/day/day.reducer';
import { getEntities as getInstructorWorkingDays } from 'app/entities/instructor-working-day/instructor-working-day.reducer';

import { createEntity, getEntity, reset, updateEntity } from './working-day.reducer';

export const WorkingDayUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const instructorWorkingDays = useAppSelector(state => state.instructorWorkingDay.entities);
  const days = useAppSelector(state => state.day.entities);
  const workingDayEntity = useAppSelector(state => state.workingDay.entity);
  const loading = useAppSelector(state => state.workingDay.loading);
  const updating = useAppSelector(state => state.workingDay.updating);
  const updateSuccess = useAppSelector(state => state.workingDay.updateSuccess);

  const handleClose = () => {
    navigate(`/working-day${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getInstructorWorkingDays({}));
    dispatch(getDays({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...workingDayEntity,
      ...values,
      instructorWorkingDay: instructorWorkingDays.find(it => it.id.toString() === values.instructorWorkingDay?.toString()),
      day: days.find(it => it.id.toString() === values.day?.toString()),
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
          ...workingDayEntity,
          instructorWorkingDay: workingDayEntity?.instructorWorkingDay?.id,
          day: workingDayEntity?.day?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.workingDay.home.createOrEditLabel" data-cy="WorkingDayCreateUpdateHeading">
            <Translate contentKey="ceet2App.workingDay.home.createOrEditLabel">Create or edit a WorkingDay</Translate>
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
                  id="working-day-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceet2App.workingDay.startTime')}
                id="working-day-startTime"
                name="startTime"
                data-cy="startTime"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('ceet2App.workingDay.endTime')}
                id="working-day-endTime"
                name="endTime"
                data-cy="endTime"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="working-day-instructorWorkingDay"
                name="instructorWorkingDay"
                data-cy="instructorWorkingDay"
                label={translate('ceet2App.workingDay.instructorWorkingDay')}
                type="select"
                required
              >
                <option value="" key="0" />
                {instructorWorkingDays
                  ? instructorWorkingDays.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nameWorkingDay}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="working-day-day"
                name="day"
                data-cy="day"
                label={translate('ceet2App.workingDay.day')}
                type="select"
                required
              >
                <option value="" key="0" />
                {days
                  ? days.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.dayName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/working-day" replace variant="info">
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

export default WorkingDayUpdate;
