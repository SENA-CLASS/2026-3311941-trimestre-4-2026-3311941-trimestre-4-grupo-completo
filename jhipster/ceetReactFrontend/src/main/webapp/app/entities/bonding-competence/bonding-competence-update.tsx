import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getBondingInstructors } from 'app/entities/bonding-instructor/bonding-instructor.reducer';
import { getEntities as getLearningCompetences } from 'app/entities/learning-competence/learning-competence.reducer';

import { createEntity, getEntity, reset, updateEntity } from './bonding-competence.reducer';

export const BondingCompetenceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const bondingInstructors = useAppSelector(state => state.bondingInstructor.entities);
  const learningCompetences = useAppSelector(state => state.learningCompetence.entities);
  const bondingCompetenceEntity = useAppSelector(state => state.bondingCompetence.entity);
  const loading = useAppSelector(state => state.bondingCompetence.loading);
  const updating = useAppSelector(state => state.bondingCompetence.updating);
  const updateSuccess = useAppSelector(state => state.bondingCompetence.updateSuccess);

  const handleClose = () => {
    navigate(`/bonding-competence${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getBondingInstructors({}));
    dispatch(getLearningCompetences({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...bondingCompetenceEntity,
      ...values,
      bondingInstructor: bondingInstructors.find(it => it.id.toString() === values.bondingInstructor?.toString()),
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
          ...bondingCompetenceEntity,
          bondingInstructor: bondingCompetenceEntity?.bondingInstructor?.id,
          learningCompetence: bondingCompetenceEntity?.learningCompetence?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.bondingCompetence.home.createOrEditLabel" data-cy="BondingCompetenceCreateUpdateHeading">
            <Translate contentKey="ceet2App.bondingCompetence.home.createOrEditLabel">Create or edit a BondingCompetence</Translate>
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
                  id="bonding-competence-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                id="bonding-competence-bondingInstructor"
                name="bondingInstructor"
                data-cy="bondingInstructor"
                label={translate('ceet2App.bondingCompetence.bondingInstructor')}
                type="select"
                required
              >
                <option value="" key="0" />
                {bondingInstructors
                  ? bondingInstructors.map(otherEntity => (
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
                id="bonding-competence-learningCompetence"
                name="learningCompetence"
                data-cy="learningCompetence"
                label={translate('ceet2App.bondingCompetence.learningCompetence')}
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/bonding-competence" replace variant="info">
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

export default BondingCompetenceUpdate;
