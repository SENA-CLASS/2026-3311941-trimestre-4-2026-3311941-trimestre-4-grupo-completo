import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getBondings } from 'app/entities/bonding/bonding.reducer';
import { getEntities as getInstructors } from 'app/entities/instructor/instructor.reducer';
import { getEntities as getYears } from 'app/entities/year/year.reducer';

import { createEntity, getEntity, reset, updateEntity } from './bonding-instructor.reducer';

export const BondingInstructorUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const years = useAppSelector(state => state.year.entities);
  const instructors = useAppSelector(state => state.instructor.entities);
  const bondings = useAppSelector(state => state.bonding.entities);
  const bondingInstructorEntity = useAppSelector(state => state.bondingInstructor.entity);
  const loading = useAppSelector(state => state.bondingInstructor.loading);
  const updating = useAppSelector(state => state.bondingInstructor.updating);
  const updateSuccess = useAppSelector(state => state.bondingInstructor.updateSuccess);

  const handleClose = () => {
    navigate(`/bonding-instructor${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getYears({}));
    dispatch(getInstructors({}));
    dispatch(getBondings({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...bondingInstructorEntity,
      ...values,
      year: years.find(it => it.id.toString() === values.year?.toString()),
      instructor: instructors.find(it => it.id.toString() === values.instructor?.toString()),
      bonding: bondings.find(it => it.id.toString() === values.bonding?.toString()),
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
          ...bondingInstructorEntity,
          year: bondingInstructorEntity?.year?.id,
          instructor: bondingInstructorEntity?.instructor?.id,
          bonding: bondingInstructorEntity?.bonding?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.bondingInstructor.home.createOrEditLabel" data-cy="BondingInstructorCreateUpdateHeading">
            <Translate contentKey="ceetApp.bondingInstructor.home.createOrEditLabel">Create or edit a BondingInstructor</Translate>
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
                  id="bonding-instructor-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceetApp.bondingInstructor.startTime')}
                id="bonding-instructor-startTime"
                name="startTime"
                data-cy="startTime"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.bondingInstructor.endTime')}
                id="bonding-instructor-endTime"
                name="endTime"
                data-cy="endTime"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="bonding-instructor-year"
                name="year"
                data-cy="year"
                label={translate('ceetApp.bondingInstructor.year')}
                type="select"
                required
              >
                <option value="" key="0" />
                {years
                  ? years.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.yearNumber}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="bonding-instructor-instructor"
                name="instructor"
                data-cy="instructor"
                label={translate('ceetApp.bondingInstructor.instructor')}
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
              <ValidatedField
                id="bonding-instructor-bonding"
                name="bonding"
                data-cy="bonding"
                label={translate('ceetApp.bondingInstructor.bonding')}
                type="select"
                required
              >
                <option value="" key="0" />
                {bondings
                  ? bondings.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.bondingType}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/bonding-instructor" replace variant="info">
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

export default BondingInstructorUpdate;
