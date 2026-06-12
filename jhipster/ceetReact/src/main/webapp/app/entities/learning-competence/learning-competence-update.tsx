import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getTrainingPrograms } from 'app/entities/training-program/training-program.reducer';

import { createEntity, getEntity, reset, updateEntity } from './learning-competence.reducer';

export const LearningCompetenceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const trainingPrograms = useAppSelector(state => state.trainingProgram.entities);
  const learningCompetenceEntity = useAppSelector(state => state.learningCompetence.entity);
  const loading = useAppSelector(state => state.learningCompetence.loading);
  const updating = useAppSelector(state => state.learningCompetence.updating);
  const updateSuccess = useAppSelector(state => state.learningCompetence.updateSuccess);

  const handleClose = () => {
    navigate(`/learning-competence${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTrainingPrograms({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...learningCompetenceEntity,
      ...values,
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
          ...learningCompetenceEntity,
          trainingProgram: learningCompetenceEntity?.trainingProgram?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.learningCompetence.home.createOrEditLabel" data-cy="LearningCompetenceCreateUpdateHeading">
            <Translate contentKey="ceetApp.learningCompetence.home.createOrEditLabel">Create or edit a LearningCompetence</Translate>
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
                  id="learning-competence-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceetApp.learningCompetence.competenceCode')}
                id="learning-competence-competenceCode"
                name="competenceCode"
                data-cy="competenceCode"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.learningCompetence.competitionDenomination')}
                id="learning-competence-competitionDenomination"
                name="competitionDenomination"
                data-cy="competitionDenomination"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 1000, message: translate('entity.validation.maxlength', { max: 1000 }) },
                }}
              />
              <ValidatedField
                id="learning-competence-trainingProgram"
                name="trainingProgram"
                data-cy="trainingProgram"
                label={translate('ceetApp.learningCompetence.trainingProgram')}
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/learning-competence" replace variant="info">
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

export default LearningCompetenceUpdate;
