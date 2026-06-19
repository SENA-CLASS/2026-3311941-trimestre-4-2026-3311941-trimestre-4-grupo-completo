import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { getEntities as getTrimesters } from 'app/entities/trimester/trimester.reducer';

import { createEntity, getEntity, reset, updateEntity } from './course-trimester.reducer';

export const CourseTrimesterUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const courses = useAppSelector(state => state.course.entities);
  const trimesters = useAppSelector(state => state.trimester.entities);
  const courseTrimesterEntity = useAppSelector(state => state.courseTrimester.entity);
  const loading = useAppSelector(state => state.courseTrimester.loading);
  const updating = useAppSelector(state => state.courseTrimester.updating);
  const updateSuccess = useAppSelector(state => state.courseTrimester.updateSuccess);

  const handleClose = () => {
    navigate(`/course-trimester${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCourses({}));
    dispatch(getTrimesters({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...courseTrimesterEntity,
      ...values,
      course: courses.find(it => it.id.toString() === values.course?.toString()),
      trimester: trimesters.find(it => it.id.toString() === values.trimester?.toString()),
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
          ...courseTrimesterEntity,
          course: courseTrimesterEntity?.course?.id,
          trimester: courseTrimesterEntity?.trimester?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.courseTrimester.home.createOrEditLabel" data-cy="CourseTrimesterCreateUpdateHeading">
            <Translate contentKey="ceet2App.courseTrimester.home.createOrEditLabel">Create or edit a CourseTrimester</Translate>
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
                  id="course-trimester-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                id="course-trimester-course"
                name="course"
                data-cy="course"
                label={translate('ceet2App.courseTrimester.course')}
                type="select"
                required
              >
                <option value="" key="0" />
                {courses
                  ? courses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.courseNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="course-trimester-trimester"
                name="trimester"
                data-cy="trimester"
                label={translate('ceet2App.courseTrimester.trimester')}
                type="select"
                required
              >
                <option value="" key="0" />
                {trimesters
                  ? trimesters.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/course-trimester" replace variant="info">
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

export default CourseTrimesterUpdate;
