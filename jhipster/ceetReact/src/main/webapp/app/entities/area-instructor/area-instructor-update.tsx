import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getAreas } from 'app/entities/area/area.reducer';
import { getEntities as getInstructors } from 'app/entities/instructor/instructor.reducer';
import { State } from 'app/shared/model/enumerations/state.model';

import { createEntity, getEntity, reset, updateEntity } from './area-instructor.reducer';

export const AreaInstructorUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const areas = useAppSelector(state => state.area.entities);
  const instructors = useAppSelector(state => state.instructor.entities);
  const areaInstructorEntity = useAppSelector(state => state.areaInstructor.entity);
  const loading = useAppSelector(state => state.areaInstructor.loading);
  const updating = useAppSelector(state => state.areaInstructor.updating);
  const updateSuccess = useAppSelector(state => state.areaInstructor.updateSuccess);
  const stateValues = Object.keys(State);

  const handleClose = () => {
    navigate(`/area-instructor${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAreas({}));
    dispatch(getInstructors({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...areaInstructorEntity,
      ...values,
      area: areas.find(it => it.id.toString() === values.area?.toString()),
      instructor: instructors.find(it => it.id.toString() === values.instructor?.toString()),
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
          areaInstructorState: 'ACTIVE',
          ...areaInstructorEntity,
          area: areaInstructorEntity?.area?.id,
          instructor: areaInstructorEntity?.instructor?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.areaInstructor.home.createOrEditLabel" data-cy="AreaInstructorCreateUpdateHeading">
            <Translate contentKey="ceetApp.areaInstructor.home.createOrEditLabel">Create or edit a AreaInstructor</Translate>
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
                  id="area-instructor-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceetApp.areaInstructor.areaInstructorState')}
                id="area-instructor-areaInstructorState"
                name="areaInstructorState"
                data-cy="areaInstructorState"
                type="select"
              >
                {stateValues.map(state => (
                  <option value={state} key={state}>
                    {translate(`ceetApp.State.${state}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="area-instructor-area"
                name="area"
                data-cy="area"
                label={translate('ceetApp.areaInstructor.area')}
                type="select"
                required
              >
                <option value="" key="0" />
                {areas
                  ? areas.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.areaName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="area-instructor-instructor"
                name="instructor"
                data-cy="instructor"
                label={translate('ceetApp.areaInstructor.instructor')}
                type="select"
                required
              >
                <option value="" key="0" />
                {instructors
                  ? instructors.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/area-instructor" replace variant="info">
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

export default AreaInstructorUpdate;
