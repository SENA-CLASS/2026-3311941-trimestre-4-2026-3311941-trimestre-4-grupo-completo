import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getLearningCompetences } from 'app/entities/learning-competence/learning-competence.reducer';

import { createEntity, getEntity, reset, updateEntity } from './learning-result.reducer';

export const LearningResultUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const learningCompetences = useAppSelector(state => state.learningCompetence.entities);
  const learningResultEntity = useAppSelector(state => state.learningResult.entity);
  const loading = useAppSelector(state => state.learningResult.loading);
  const updating = useAppSelector(state => state.learningResult.updating);
  const updateSuccess = useAppSelector(state => state.learningResult.updateSuccess);

  const handleClose = () => {
    navigate(`/learning-result${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getLearningCompetences({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...learningResultEntity,
      ...values,
      learningCompetence: learningCompetences.find(it => it.id.toString() === values.learningCompetence?.toString()),
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
          ...learningResultEntity,
          learningCompetence: learningResultEntity?.learningCompetence?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.learningResult.home.createOrEditLabel" data-cy="LearningResultCreateUpdateHeading">
            <Translate contentKey="ceetApp.learningResult.home.createOrEditLabel">Create or edit a LearningResult</Translate>
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
                  id="learning-result-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceetApp.learningResult.resultCode')}
                id="learning-result-resultCode"
                name="resultCode"
                data-cy="resultCode"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 40, message: translate('entity.validation.maxlength', { max: 40 }) },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.learningResult.denomination')}
                id="learning-result-denomination"
                name="denomination"
                data-cy="denomination"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 1000, message: translate('entity.validation.maxlength', { max: 1000 }) },
                }}
              />
              <ValidatedField
                id="learning-result-learningCompetence"
                name="learningCompetence"
                data-cy="learningCompetence"
                label={translate('ceetApp.learningResult.learningCompetence')}
                type="select"
                required
              >
                <option value="" key="0" />
                {learningCompetences
                  ? learningCompetences.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/learning-result" replace variant="info">
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

export default LearningResultUpdate;
