import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntities as getProjectGroups } from 'app/entities/project-group/project-group.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './general-observation.reducer';

export const GeneralObservationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const projectGroups = useAppSelector(state => state.projectGroup.entities);
  const customers = useAppSelector(state => state.customer.entities);
  const generalObservationEntity = useAppSelector(state => state.generalObservation.entity);
  const loading = useAppSelector(state => state.generalObservation.loading);
  const updating = useAppSelector(state => state.generalObservation.updating);
  const updateSuccess = useAppSelector(state => state.generalObservation.updateSuccess);

  const handleClose = () => {
    navigate(`/general-observation${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getProjectGroups({}));
    dispatch(getCustomers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.number !== undefined && typeof values.number !== 'number') {
      values.number = Number(values.number);
    }
    values.dateAudit = convertDateTimeToServer(values.dateAudit);

    const entity = {
      ...generalObservationEntity,
      ...values,
      projectGroup: projectGroups.find(it => it.id.toString() === values.projectGroup?.toString()),
      customer: customers.find(it => it.id.toString() === values.customer?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          dateAudit: displayDefaultDateTime(),
        }
      : {
          ...generalObservationEntity,
          dateAudit: convertDateTimeFromServer(generalObservationEntity.dateAudit),
          projectGroup: generalObservationEntity?.projectGroup?.id,
          customer: generalObservationEntity?.customer?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.generalObservation.home.createOrEditLabel" data-cy="GeneralObservationCreateUpdateHeading">
            <Translate contentKey="ceetApp.generalObservation.home.createOrEditLabel">Create or edit a GeneralObservation</Translate>
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
                  id="general-observation-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceetApp.generalObservation.number')}
                id="general-observation-number"
                name="number"
                data-cy="number"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('ceetApp.generalObservation.observationGeneral')}
                id="general-observation-observationGeneral"
                name="observationGeneral"
                data-cy="observationGeneral"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 500, message: translate('entity.validation.maxlength', { max: 500 }) },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.generalObservation.jury')}
                id="general-observation-jury"
                name="jury"
                data-cy="jury"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 500, message: translate('entity.validation.maxlength', { max: 500 }) },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.generalObservation.dateAudit')}
                id="general-observation-dateAudit"
                name="dateAudit"
                data-cy="dateAudit"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="general-observation-projectGroup"
                name="projectGroup"
                data-cy="projectGroup"
                label={translate('ceetApp.generalObservation.projectGroup')}
                type="select"
                required
              >
                <option value="" key="0" />
                {projectGroups
                  ? projectGroups.map(otherEntity => (
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
                id="general-observation-customer"
                name="customer"
                data-cy="customer"
                label={translate('ceetApp.generalObservation.customer')}
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/general-observation" replace variant="info">
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

export default GeneralObservationUpdate;
