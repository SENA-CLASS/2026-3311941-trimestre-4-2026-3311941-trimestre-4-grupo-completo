import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntities as getGroupResponses } from 'app/entities/group-response/group-response.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './observation-response.reducer';

export const ObservationResponseUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const groupResponses = useAppSelector(state => state.groupResponse.entities);
  const customers = useAppSelector(state => state.customer.entities);
  const observationResponseEntity = useAppSelector(state => state.observationResponse.entity);
  const loading = useAppSelector(state => state.observationResponse.loading);
  const updating = useAppSelector(state => state.observationResponse.updating);
  const updateSuccess = useAppSelector(state => state.observationResponse.updateSuccess);

  const handleClose = () => {
    navigate(`/observation-response${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getGroupResponses({}));
    dispatch(getCustomers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.numberObservation !== undefined && typeof values.numberObservation !== 'number') {
      values.numberObservation = Number(values.numberObservation);
    }
    values.dateObservation = convertDateTimeToServer(values.dateObservation);

    const entity = {
      ...observationResponseEntity,
      ...values,
      groupResponse: groupResponses.find(it => it.id.toString() === values.groupResponse?.toString()),
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
          dateObservation: displayDefaultDateTime(),
        }
      : {
          ...observationResponseEntity,
          dateObservation: convertDateTimeFromServer(observationResponseEntity.dateObservation),
          groupResponse: observationResponseEntity?.groupResponse?.id,
          customer: observationResponseEntity?.customer?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.observationResponse.home.createOrEditLabel" data-cy="ObservationResponseCreateUpdateHeading">
            <Translate contentKey="ceet2App.observationResponse.home.createOrEditLabel">Create or edit a ObservationResponse</Translate>
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
                  id="observation-response-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceet2App.observationResponse.numberObservation')}
                id="observation-response-numberObservation"
                name="numberObservation"
                data-cy="numberObservation"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('ceet2App.observationResponse.obsevation')}
                id="observation-response-obsevation"
                name="obsevation"
                data-cy="obsevation"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 400, message: translate('entity.validation.maxlength', { max: 400 }) },
                }}
              />
              <ValidatedField
                label={translate('ceet2App.observationResponse.juries')}
                id="observation-response-juries"
                name="juries"
                data-cy="juries"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 400, message: translate('entity.validation.maxlength', { max: 400 }) },
                }}
              />
              <ValidatedField
                label={translate('ceet2App.observationResponse.dateObservation')}
                id="observation-response-dateObservation"
                name="dateObservation"
                data-cy="dateObservation"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="observation-response-groupResponse"
                name="groupResponse"
                data-cy="groupResponse"
                label={translate('ceet2App.observationResponse.groupResponse')}
                type="select"
                required
              >
                <option value="" key="0" />
                {groupResponses
                  ? groupResponses.map(otherEntity => (
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
                id="observation-response-customer"
                name="customer"
                data-cy="customer"
                label={translate('ceet2App.observationResponse.customer')}
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
              <Button
                as={Link as any}
                id="cancel-save"
                data-cy="entityCreateCancelButton"
                to="/observation-response"
                replace
                variant="info"
              >
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

export default ObservationResponseUpdate;
