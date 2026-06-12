import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntities as getTrainingStatuses } from 'app/entities/training-status/training-status.reducer';

import { createEntity, getEntity, reset, updateEntity } from './apprentice.reducer';

export const ApprenticeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const customers = useAppSelector(state => state.customer.entities);
  const trainingStatuses = useAppSelector(state => state.trainingStatus.entities);
  const courses = useAppSelector(state => state.course.entities);
  const apprenticeEntity = useAppSelector(state => state.apprentice.entity);
  const loading = useAppSelector(state => state.apprentice.loading);
  const updating = useAppSelector(state => state.apprentice.updating);
  const updateSuccess = useAppSelector(state => state.apprentice.updateSuccess);

  const handleClose = () => {
    navigate(`/apprentice${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCustomers({}));
    dispatch(getTrainingStatuses({}));
    dispatch(getCourses({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...apprenticeEntity,
      ...values,
      customer: customers.find(it => it.id.toString() === values.customer?.toString()),
      trainingStatus: trainingStatuses.find(it => it.id.toString() === values.trainingStatus?.toString()),
      course: courses.find(it => it.id.toString() === values.course?.toString()),
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
          ...apprenticeEntity,
          customer: apprenticeEntity?.customer?.id,
          trainingStatus: apprenticeEntity?.trainingStatus?.id,
          course: apprenticeEntity?.course?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.apprentice.home.createOrEditLabel" data-cy="ApprenticeCreateUpdateHeading">
            <Translate contentKey="ceetApp.apprentice.home.createOrEditLabel">Create or edit a Apprentice</Translate>
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
                  id="apprentice-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                id="apprentice-customer"
                name="customer"
                data-cy="customer"
                label={translate('ceetApp.apprentice.customer')}
                type="select"
                required
              >
                <option value="" key="0" />
                {customers
                  ? customers.map(otherEntity => (
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
                id="apprentice-trainingStatus"
                name="trainingStatus"
                data-cy="trainingStatus"
                label={translate('ceetApp.apprentice.trainingStatus')}
                type="select"
                required
              >
                <option value="" key="0" />
                {trainingStatuses
                  ? trainingStatuses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.statusName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="apprentice-course"
                name="course"
                data-cy="course"
                label={translate('ceetApp.apprentice.course')}
                type="select"
                required
              >
                <option value="" key="0" />
                {courses
                  ? courses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/apprentice" replace variant="info">
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

export default ApprenticeUpdate;
