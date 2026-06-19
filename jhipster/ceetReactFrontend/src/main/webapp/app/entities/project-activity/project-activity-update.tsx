import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getProjectPhases } from 'app/entities/project-phase/project-phase.reducer';

import { createEntity, getEntity, reset, updateEntity } from './project-activity.reducer';

export const ProjectActivityUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const projectPhases = useAppSelector(state => state.projectPhase.entities);
  const projectActivityEntity = useAppSelector(state => state.projectActivity.entity);
  const loading = useAppSelector(state => state.projectActivity.loading);
  const updating = useAppSelector(state => state.projectActivity.updating);
  const updateSuccess = useAppSelector(state => state.projectActivity.updateSuccess);

  const handleClose = () => {
    navigate(`/project-activity${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getProjectPhases({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.activityNumber !== undefined && typeof values.activityNumber !== 'number') {
      values.activityNumber = Number(values.activityNumber);
    }

    const entity = {
      ...projectActivityEntity,
      ...values,
      projectPhase: projectPhases.find(it => it.id.toString() === values.projectPhase?.toString()),
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
          ...projectActivityEntity,
          projectPhase: projectActivityEntity?.projectPhase?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.projectActivity.home.createOrEditLabel" data-cy="ProjectActivityCreateUpdateHeading">
            <Translate contentKey="ceet2App.projectActivity.home.createOrEditLabel">Create or edit a ProjectActivity</Translate>
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
                  id="project-activity-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceet2App.projectActivity.activityNumber')}
                id="project-activity-activityNumber"
                name="activityNumber"
                data-cy="activityNumber"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('ceet2App.projectActivity.activityDescription')}
                id="project-activity-activityDescription"
                name="activityDescription"
                data-cy="activityDescription"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 400, message: translate('entity.validation.maxlength', { max: 400 }) },
                }}
              />
              <ValidatedField
                label={translate('ceet2App.projectActivity.projectActivityState')}
                id="project-activity-projectActivityState"
                name="projectActivityState"
                data-cy="projectActivityState"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 40, message: translate('entity.validation.maxlength', { max: 40 }) },
                }}
              />
              <ValidatedField
                id="project-activity-projectPhase"
                name="projectPhase"
                data-cy="projectPhase"
                label={translate('ceet2App.projectActivity.projectPhase')}
                type="select"
                required
              >
                <option value="" key="0" />
                {projectPhases
                  ? projectPhases.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/project-activity" replace variant="info">
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

export default ProjectActivityUpdate;
