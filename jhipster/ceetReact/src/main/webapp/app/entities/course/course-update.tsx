import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCourseStatuses } from 'app/entities/course-status/course-status.reducer';
import { getEntities as getTrainingPrograms } from 'app/entities/training-program/training-program.reducer';
import { getEntities as getWorkingDayCourses } from 'app/entities/working-day-course/working-day-course.reducer';

import { createEntity, getEntity, reset, updateEntity } from './course.reducer';

export const CourseUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const courseStatuses = useAppSelector(state => state.courseStatus.entities);
  const workingDayCourses = useAppSelector(state => state.workingDayCourse.entities);
  const trainingPrograms = useAppSelector(state => state.trainingProgram.entities);
  const courseEntity = useAppSelector(state => state.course.entity);
  const loading = useAppSelector(state => state.course.loading);
  const updating = useAppSelector(state => state.course.updating);
  const updateSuccess = useAppSelector(state => state.course.updateSuccess);

  const handleClose = () => {
    navigate(`/course${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCourseStatuses({}));
    dispatch(getWorkingDayCourses({}));
    dispatch(getTrainingPrograms({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...courseEntity,
      ...values,
      courseStatus: courseStatuses.find(it => it.id.toString() === values.courseStatus?.toString()),
      workingDayCourse: workingDayCourses.find(it => it.id.toString() === values.workingDayCourse?.toString()),
      trainingProgram: trainingPrograms.find(it => it.id.toString() === values.trainingProgram?.toString()),
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
          ...courseEntity,
          courseStatus: courseEntity?.courseStatus?.id,
          workingDayCourse: courseEntity?.workingDayCourse?.id,
          trainingProgram: courseEntity?.trainingProgram?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.course.home.createOrEditLabel" data-cy="CourseCreateUpdateHeading">
            <Translate contentKey="ceetApp.course.home.createOrEditLabel">Create or edit a Course</Translate>
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
                  id="course-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceetApp.course.courseNumber')}
                id="course-courseNumber"
                name="courseNumber"
                data-cy="courseNumber"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.course.startDate')}
                id="course-startDate"
                name="startDate"
                data-cy="startDate"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.course.endDate')}
                id="course-endDate"
                name="endDate"
                data-cy="endDate"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.course.route')}
                id="course-route"
                name="route"
                data-cy="route"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 40, message: translate('entity.validation.maxlength', { max: 40 }) },
                }}
              />
              <ValidatedField
                id="course-courseStatus"
                name="courseStatus"
                data-cy="courseStatus"
                label={translate('ceetApp.course.courseStatus')}
                type="select"
                required
              >
                <option value="" key="0" />
                {courseStatuses
                  ? courseStatuses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nameCourseStatus}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="course-workingDayCourse"
                name="workingDayCourse"
                data-cy="workingDayCourse"
                label={translate('ceetApp.course.workingDayCourse')}
                type="select"
                required
              >
                <option value="" key="0" />
                {workingDayCourses
                  ? workingDayCourses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.workingDayName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="course-trainingProgram"
                name="trainingProgram"
                data-cy="trainingProgram"
                label={translate('ceetApp.course.trainingProgram')}
                type="select"
                required
              >
                <option value="" key="0" />
                {trainingPrograms
                  ? trainingPrograms.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/course" replace variant="info">
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

export default CourseUpdate;
