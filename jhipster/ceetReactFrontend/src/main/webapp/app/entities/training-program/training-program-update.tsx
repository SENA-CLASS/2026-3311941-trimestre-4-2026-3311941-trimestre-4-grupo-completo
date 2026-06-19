import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getLevelEducations } from 'app/entities/level-education/level-education.reducer';
import { StateProgram } from 'app/shared/model/enumerations/state-program.model';

import { createEntity, getEntity, reset, updateEntity } from './training-program.reducer';

export const TrainingProgramUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const levelEducations = useAppSelector(state => state.levelEducation.entities);
  const trainingProgramEntity = useAppSelector(state => state.trainingProgram.entity);
  const loading = useAppSelector(state => state.trainingProgram.loading);
  const updating = useAppSelector(state => state.trainingProgram.updating);
  const updateSuccess = useAppSelector(state => state.trainingProgram.updateSuccess);
  const stateProgramValues = Object.keys(StateProgram);

  const handleClose = () => {
    navigate(`/training-program${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getLevelEducations({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...trainingProgramEntity,
      ...values,
      levelEducation: levelEducations.find(it => it.id.toString() === values.levelEducation?.toString()),
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
          programState: 'EXECUTION',
          ...trainingProgramEntity,
          levelEducation: trainingProgramEntity?.levelEducation?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.trainingProgram.home.createOrEditLabel" data-cy="TrainingProgramCreateUpdateHeading">
            <Translate contentKey="ceet2App.trainingProgram.home.createOrEditLabel">Create or edit a TrainingProgram</Translate>
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
                  id="training-program-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceet2App.trainingProgram.programCode')}
                id="training-program-programCode"
                name="programCode"
                data-cy="programCode"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('ceet2App.trainingProgram.programVersion')}
                id="training-program-programVersion"
                name="programVersion"
                data-cy="programVersion"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 40, message: translate('entity.validation.maxlength', { max: 40 }) },
                }}
              />
              <ValidatedField
                label={translate('ceet2App.trainingProgram.programName')}
                id="training-program-programName"
                name="programName"
                data-cy="programName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 500, message: translate('entity.validation.maxlength', { max: 500 }) },
                }}
              />
              <ValidatedField
                label={translate('ceet2App.trainingProgram.programInitials')}
                id="training-program-programInitials"
                name="programInitials"
                data-cy="programInitials"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 40, message: translate('entity.validation.maxlength', { max: 40 }) },
                }}
              />
              <ValidatedField
                label={translate('ceet2App.trainingProgram.programState')}
                id="training-program-programState"
                name="programState"
                data-cy="programState"
                type="select"
              >
                {stateProgramValues.map(stateProgram => (
                  <option value={stateProgram} key={stateProgram}>
                    {translate(`ceet2App.StateProgram.${stateProgram}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="training-program-levelEducation"
                name="levelEducation"
                data-cy="levelEducation"
                label={translate('ceet2App.trainingProgram.levelEducation')}
                type="select"
                required
              >
                <option value="" key="0" />
                {levelEducations
                  ? levelEducations.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.levelName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/training-program" replace variant="info">
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

export default TrainingProgramUpdate;
