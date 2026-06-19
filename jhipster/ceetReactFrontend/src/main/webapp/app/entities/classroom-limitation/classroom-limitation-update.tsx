import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getClassrooms } from 'app/entities/classroom/classroom.reducer';
import { getEntities as getLearningResults } from 'app/entities/learning-result/learning-result.reducer';

import { createEntity, getEntity, reset, updateEntity } from './classroom-limitation.reducer';

export const ClassroomLimitationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const classrooms = useAppSelector(state => state.classroom.entities);
  const learningResults = useAppSelector(state => state.learningResult.entities);
  const classroomLimitationEntity = useAppSelector(state => state.classroomLimitation.entity);
  const loading = useAppSelector(state => state.classroomLimitation.loading);
  const updating = useAppSelector(state => state.classroomLimitation.updating);
  const updateSuccess = useAppSelector(state => state.classroomLimitation.updateSuccess);

  const handleClose = () => {
    navigate(`/classroom-limitation${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getClassrooms({}));
    dispatch(getLearningResults({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...classroomLimitationEntity,
      ...values,
      classroom: classrooms.find(it => it.id.toString() === values.classroom?.toString()),
      learningResult: learningResults.find(it => it.id.toString() === values.learningResult?.toString()),
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
          ...classroomLimitationEntity,
          classroom: classroomLimitationEntity?.classroom?.id,
          learningResult: classroomLimitationEntity?.learningResult?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.classroomLimitation.home.createOrEditLabel" data-cy="ClassroomLimitationCreateUpdateHeading">
            <Translate contentKey="ceet2App.classroomLimitation.home.createOrEditLabel">Create or edit a ClassroomLimitation</Translate>
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
                  id="classroom-limitation-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                id="classroom-limitation-classroom"
                name="classroom"
                data-cy="classroom"
                label={translate('ceet2App.classroomLimitation.classroom')}
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
                id="classroom-limitation-learningResult"
                name="learningResult"
                data-cy="learningResult"
                label={translate('ceet2App.classroomLimitation.learningResult')}
                type="select"
                required
              >
                <option value="" key="0" />
                {learningResults
                  ? learningResults.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button
                as={Link as any}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/classroom-limitation"
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

export default ClassroomLimitationUpdate;
