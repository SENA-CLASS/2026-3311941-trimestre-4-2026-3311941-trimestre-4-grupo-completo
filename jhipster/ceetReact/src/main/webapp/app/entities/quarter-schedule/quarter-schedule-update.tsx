import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getLearningResults } from 'app/entities/learning-result/learning-result.reducer';
import { getEntities as getPlannings } from 'app/entities/planning/planning.reducer';
import { getEntities as getTrimesters } from 'app/entities/trimester/trimester.reducer';

import { createEntity, getEntity, reset, updateEntity } from './quarter-schedule.reducer';

export const QuarterScheduleUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const learningResults = useAppSelector(state => state.learningResult.entities);
  const plannings = useAppSelector(state => state.planning.entities);
  const trimesters = useAppSelector(state => state.trimester.entities);
  const quarterScheduleEntity = useAppSelector(state => state.quarterSchedule.entity);
  const loading = useAppSelector(state => state.quarterSchedule.loading);
  const updating = useAppSelector(state => state.quarterSchedule.updating);
  const updateSuccess = useAppSelector(state => state.quarterSchedule.updateSuccess);

  const handleClose = () => {
    navigate(`/quarter-schedule${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getLearningResults({}));
    dispatch(getPlannings({}));
    dispatch(getTrimesters({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...quarterScheduleEntity,
      ...values,
      learningResult: learningResults.find(it => it.id.toString() === values.learningResult?.toString()),
      planning: plannings.find(it => it.id.toString() === values.planning?.toString()),
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
          ...quarterScheduleEntity,
          learningResult: quarterScheduleEntity?.learningResult?.id,
          planning: quarterScheduleEntity?.planning?.id,
          trimester: quarterScheduleEntity?.trimester?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.quarterSchedule.home.createOrEditLabel" data-cy="QuarterScheduleCreateUpdateHeading">
            <Translate contentKey="ceetApp.quarterSchedule.home.createOrEditLabel">Create or edit a QuarterSchedule</Translate>
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
                  id="quarter-schedule-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                id="quarter-schedule-learningResult"
                name="learningResult"
                data-cy="learningResult"
                label={translate('ceetApp.quarterSchedule.learningResult')}
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
              <ValidatedField
                id="quarter-schedule-planning"
                name="planning"
                data-cy="planning"
                label={translate('ceetApp.quarterSchedule.planning')}
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
                id="quarter-schedule-trimester"
                name="trimester"
                data-cy="trimester"
                label={translate('ceetApp.quarterSchedule.trimester')}
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/quarter-schedule" replace variant="info">
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

export default QuarterScheduleUpdate;
