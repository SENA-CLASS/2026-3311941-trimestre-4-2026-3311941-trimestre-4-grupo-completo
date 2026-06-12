import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getClassrooms } from 'app/entities/classroom/classroom.reducer';
import { getEntities as getCourseTrimesters } from 'app/entities/course-trimester/course-trimester.reducer';
import { getEntities as getDays } from 'app/entities/day/day.reducer';
import { getEntities as getInstructors } from 'app/entities/instructor/instructor.reducer';
import { getEntities as getModalities } from 'app/entities/modality/modality.reducer';
import { getEntities as getScheduleVersions } from 'app/entities/schedule-version/schedule-version.reducer';

import { createEntity, getEntity, reset, updateEntity } from './schedule.reducer';

export const ScheduleUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const scheduleVersions = useAppSelector(state => state.scheduleVersion.entities);
  const modalities = useAppSelector(state => state.modality.entities);
  const days = useAppSelector(state => state.day.entities);
  const courseTrimesters = useAppSelector(state => state.courseTrimester.entities);
  const classrooms = useAppSelector(state => state.classroom.entities);
  const instructors = useAppSelector(state => state.instructor.entities);
  const scheduleEntity = useAppSelector(state => state.schedule.entity);
  const loading = useAppSelector(state => state.schedule.loading);
  const updating = useAppSelector(state => state.schedule.updating);
  const updateSuccess = useAppSelector(state => state.schedule.updateSuccess);

  const handleClose = () => {
    navigate(`/schedule${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getScheduleVersions({}));
    dispatch(getModalities({}));
    dispatch(getDays({}));
    dispatch(getCourseTrimesters({}));
    dispatch(getClassrooms({}));
    dispatch(getInstructors({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...scheduleEntity,
      ...values,
      scheduleVersion: scheduleVersions.find(it => it.id.toString() === values.scheduleVersion?.toString()),
      modality: modalities.find(it => it.id.toString() === values.modality?.toString()),
      day: days.find(it => it.id.toString() === values.day?.toString()),
      courseTrimester: courseTrimesters.find(it => it.id.toString() === values.courseTrimester?.toString()),
      classroom: classrooms.find(it => it.id.toString() === values.classroom?.toString()),
      instructor: instructors.find(it => it.id.toString() === values.instructor?.toString()),
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
          ...scheduleEntity,
          scheduleVersion: scheduleEntity?.scheduleVersion?.id,
          modality: scheduleEntity?.modality?.id,
          day: scheduleEntity?.day?.id,
          courseTrimester: scheduleEntity?.courseTrimester?.id,
          classroom: scheduleEntity?.classroom?.id,
          instructor: scheduleEntity?.instructor?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.schedule.home.createOrEditLabel" data-cy="ScheduleCreateUpdateHeading">
            <Translate contentKey="ceetApp.schedule.home.createOrEditLabel">Create or edit a Schedule</Translate>
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
                  id="schedule-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceetApp.schedule.startTime')}
                id="schedule-startTime"
                name="startTime"
                data-cy="startTime"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.schedule.endTime')}
                id="schedule-endTime"
                name="endTime"
                data-cy="endTime"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="schedule-scheduleVersion"
                name="scheduleVersion"
                data-cy="scheduleVersion"
                label={translate('ceetApp.schedule.scheduleVersion')}
                type="select"
                required
              >
                <option value="" key="0" />
                {scheduleVersions
                  ? scheduleVersions.map(otherEntity => (
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
                id="schedule-modality"
                name="modality"
                data-cy="modality"
                label={translate('ceetApp.schedule.modality')}
                type="select"
                required
              >
                <option value="" key="0" />
                {modalities
                  ? modalities.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.modalityName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField id="schedule-day" name="day" data-cy="day" label={translate('ceetApp.schedule.day')} type="select" required>
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
              <ValidatedField
                id="schedule-courseTrimester"
                name="courseTrimester"
                data-cy="courseTrimester"
                label={translate('ceetApp.schedule.courseTrimester')}
                type="select"
                required
              >
                <option value="" key="0" />
                {courseTrimesters
                  ? courseTrimesters.map(otherEntity => (
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
                id="schedule-classroom"
                name="classroom"
                data-cy="classroom"
                label={translate('ceetApp.schedule.classroom')}
                type="select"
                required
              >
                <option value="" key="0" />
                {classrooms
                  ? classrooms.map(otherEntity => (
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
                id="schedule-instructor"
                name="instructor"
                data-cy="instructor"
                label={translate('ceetApp.schedule.instructor')}
                type="select"
                required
              >
                <option value="" key="0" />
                {instructors
                  ? instructors.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/schedule" replace variant="info">
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

export default ScheduleUpdate;
