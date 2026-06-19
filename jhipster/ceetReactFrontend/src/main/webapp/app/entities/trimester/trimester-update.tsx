import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getLevelEducations } from 'app/entities/level-education/level-education.reducer';
import { getEntities as getWorkingDayCourses } from 'app/entities/working-day-course/working-day-course.reducer';

import { createEntity, getEntity, reset, updateEntity } from './trimester.reducer';

export const TrimesterUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const workingDayCourses = useAppSelector(state => state.workingDayCourse.entities);
  const levelEducations = useAppSelector(state => state.levelEducation.entities);
  const trimesterEntity = useAppSelector(state => state.trimester.entity);
  const loading = useAppSelector(state => state.trimester.loading);
  const updating = useAppSelector(state => state.trimester.updating);
  const updateSuccess = useAppSelector(state => state.trimester.updateSuccess);

  const handleClose = () => {
    navigate(`/trimester${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getWorkingDayCourses({}));
    dispatch(getLevelEducations({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.trimesterName !== undefined && typeof values.trimesterName !== 'number') {
      values.trimesterName = Number(values.trimesterName);
    }

    const entity = {
      ...trimesterEntity,
      ...values,
      workingDayCourse: workingDayCourses.find(it => it.id.toString() === values.workingDayCourse?.toString()),
      levelEducations: levelEducations.find(it => it.id.toString() === values.levelEducations?.toString()),
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
          ...trimesterEntity,
          workingDayCourse: trimesterEntity?.workingDayCourse?.id,
          levelEducations: trimesterEntity?.levelEducations?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.trimester.home.createOrEditLabel" data-cy="TrimesterCreateUpdateHeading">
            <Translate contentKey="ceet2App.trimester.home.createOrEditLabel">Create or edit a Trimester</Translate>
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
                  id="trimester-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceet2App.trimester.trimesterName')}
                id="trimester-trimesterName"
                name="trimesterName"
                data-cy="trimesterName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('ceet2App.trimester.trimesterState')}
                id="trimester-trimesterState"
                name="trimesterState"
                data-cy="trimesterState"
                type="text"
              />
              <ValidatedField
                id="trimester-workingDayCourse"
                name="workingDayCourse"
                data-cy="workingDayCourse"
                label={translate('ceet2App.trimester.workingDayCourse')}
                type="select"
                required
              >
                <option value="" key="0" />
                {workingDayCourses
                  ? workingDayCourses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.workingDayName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="trimester-levelEducations"
                name="levelEducations"
                data-cy="levelEducations"
                label={translate('ceet2App.trimester.levelEducations')}
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/trimester" replace variant="info">
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

export default TrimesterUpdate;
