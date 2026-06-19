import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getProjectActivities } from 'app/entities/project-activity/project-activity.reducer';
import { getEntities as getQuarterSchedules } from 'app/entities/quarter-schedule/quarter-schedule.reducer';

import { createEntity, getEntity, reset, updateEntity } from './planning-activity.reducer';

export const PlanningActivityUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const quarterSchedules = useAppSelector(state => state.quarterSchedule.entities);
  const projectActivities = useAppSelector(state => state.projectActivity.entities);
  const planningActivityEntity = useAppSelector(state => state.planningActivity.entity);
  const loading = useAppSelector(state => state.planningActivity.loading);
  const updating = useAppSelector(state => state.planningActivity.updating);
  const updateSuccess = useAppSelector(state => state.planningActivity.updateSuccess);

  const handleClose = () => {
    navigate(`/planning-activity${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getQuarterSchedules({}));
    dispatch(getProjectActivities({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...planningActivityEntity,
      ...values,
      quarterSchedule: quarterSchedules.find(it => it.id.toString() === values.quarterSchedule?.toString()),
      projectActivity: projectActivities.find(it => it.id.toString() === values.projectActivity?.toString()),
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
          ...planningActivityEntity,
          quarterSchedule: planningActivityEntity?.quarterSchedule?.id,
          projectActivity: planningActivityEntity?.projectActivity?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.planningActivity.home.createOrEditLabel" data-cy="PlanningActivityCreateUpdateHeading">
            <Translate contentKey="ceet2App.planningActivity.home.createOrEditLabel">Create or edit a PlanningActivity</Translate>
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
                  id="planning-activity-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                id="planning-activity-quarterSchedule"
                name="quarterSchedule"
                data-cy="quarterSchedule"
                label={translate('ceet2App.planningActivity.quarterSchedule')}
                type="select"
                required
              >
                <option value="" key="0" />
                {quarterSchedules
                  ? quarterSchedules.map(otherEntity => (
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
                id="planning-activity-projectActivity"
                name="projectActivity"
                data-cy="projectActivity"
                label={translate('ceet2App.planningActivity.projectActivity')}
                type="select"
                required
              >
                <option value="" key="0" />
                {projectActivities
                  ? projectActivities.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/planning-activity" replace variant="info">
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

export default PlanningActivityUpdate;
