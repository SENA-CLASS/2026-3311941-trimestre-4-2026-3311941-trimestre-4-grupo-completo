import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getBondingInstructors } from 'app/entities/bonding-instructor/bonding-instructor.reducer';
import { getEntities as getInstructorWorkingDays } from 'app/entities/instructor-working-day/instructor-working-day.reducer';

import { createEntity, getEntity, reset, updateEntity } from './bounding-schedule.reducer';

export const BoundingScheduleUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const bondingInstructors = useAppSelector(state => state.bondingInstructor.entities);
  const instructorWorkingDays = useAppSelector(state => state.instructorWorkingDay.entities);
  const boundingScheduleEntity = useAppSelector(state => state.boundingSchedule.entity);
  const loading = useAppSelector(state => state.boundingSchedule.loading);
  const updating = useAppSelector(state => state.boundingSchedule.updating);
  const updateSuccess = useAppSelector(state => state.boundingSchedule.updateSuccess);

  const handleClose = () => {
    navigate(`/bounding-schedule${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getBondingInstructors({}));
    dispatch(getInstructorWorkingDays({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...boundingScheduleEntity,
      ...values,
      bondingInstructor: bondingInstructors.find(it => it.id.toString() === values.bondingInstructor?.toString()),
      instructorWorkingDay: instructorWorkingDays.find(it => it.id.toString() === values.instructorWorkingDay?.toString()),
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
          ...boundingScheduleEntity,
          bondingInstructor: boundingScheduleEntity?.bondingInstructor?.id,
          instructorWorkingDay: boundingScheduleEntity?.instructorWorkingDay?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.boundingSchedule.home.createOrEditLabel" data-cy="BoundingScheduleCreateUpdateHeading">
            <Translate contentKey="ceetApp.boundingSchedule.home.createOrEditLabel">Create or edit a BoundingSchedule</Translate>
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
                  id="bounding-schedule-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                id="bounding-schedule-bondingInstructor"
                name="bondingInstructor"
                data-cy="bondingInstructor"
                label={translate('ceetApp.boundingSchedule.bondingInstructor')}
                type="select"
                required
              >
                <option value="" key="0" />
                {bondingInstructors
                  ? bondingInstructors.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="bounding-schedule-instructorWorkingDay"
                name="instructorWorkingDay"
                data-cy="instructorWorkingDay"
                label={translate('ceetApp.boundingSchedule.instructorWorkingDay')}
                type="select"
                required
              >
                <option value="" key="0" />
                {instructorWorkingDays
                  ? instructorWorkingDays.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/bounding-schedule" replace variant="info">
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

export default BoundingScheduleUpdate;
