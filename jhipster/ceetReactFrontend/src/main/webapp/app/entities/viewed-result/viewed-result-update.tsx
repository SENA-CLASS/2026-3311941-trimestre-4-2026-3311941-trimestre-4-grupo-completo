import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCourseTrimesters } from 'app/entities/course-trimester/course-trimester.reducer';
import { getEntities as getLearningResults } from 'app/entities/learning-result/learning-result.reducer';
import { getEntities as getPlannings } from 'app/entities/planning/planning.reducer';

import { createEntity, getEntity, reset, updateEntity } from './viewed-result.reducer';

export const ViewedResultUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const courseTrimesters = useAppSelector(state => state.courseTrimester.entities);
  const plannings = useAppSelector(state => state.planning.entities);
  const learningResults = useAppSelector(state => state.learningResult.entities);
  const viewedResultEntity = useAppSelector(state => state.viewedResult.entity);
  const loading = useAppSelector(state => state.viewedResult.loading);
  const updating = useAppSelector(state => state.viewedResult.updating);
  const updateSuccess = useAppSelector(state => state.viewedResult.updateSuccess);

  const handleClose = () => {
    navigate(`/viewed-result${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCourseTrimesters({}));
    dispatch(getPlannings({}));
    dispatch(getLearningResults({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...viewedResultEntity,
      ...values,
      courseTrimester: courseTrimesters.find(it => it.id.toString() === values.courseTrimester?.toString()),
      planning: plannings.find(it => it.id.toString() === values.planning?.toString()),
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
          ...viewedResultEntity,
          courseTrimester: viewedResultEntity?.courseTrimester?.id,
          planning: viewedResultEntity?.planning?.id,
          learningResult: viewedResultEntity?.learningResult?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.viewedResult.home.createOrEditLabel" data-cy="ViewedResultCreateUpdateHeading">
            <Translate contentKey="ceet2App.viewedResult.home.createOrEditLabel">Create or edit a ViewedResult</Translate>
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
                  id="viewed-result-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                id="viewed-result-courseTrimester"
                name="courseTrimester"
                data-cy="courseTrimester"
                label={translate('ceet2App.viewedResult.courseTrimester')}
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
                id="viewed-result-planning"
                name="planning"
                data-cy="planning"
                label={translate('ceet2App.viewedResult.planning')}
                type="select"
                required
              >
                <option value="" key="0" />
                {plannings
                  ? plannings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.planningCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="viewed-result-learningResult"
                name="learningResult"
                data-cy="learningResult"
                label={translate('ceet2App.viewedResult.learningResult')}
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/viewed-result" replace variant="info">
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

export default ViewedResultUpdate;
