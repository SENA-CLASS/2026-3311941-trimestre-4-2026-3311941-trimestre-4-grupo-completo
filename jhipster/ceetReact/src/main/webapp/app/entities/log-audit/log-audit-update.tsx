import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './log-audit.reducer';

export const LogAuditUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const customers = useAppSelector(state => state.customer.entities);
  const logAuditEntity = useAppSelector(state => state.logAudit.entity);
  const loading = useAppSelector(state => state.logAudit.loading);
  const updating = useAppSelector(state => state.logAudit.updating);
  const updateSuccess = useAppSelector(state => state.logAudit.updateSuccess);

  const handleClose = () => {
    navigate(`/log-audit${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCustomers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.dateAudit = convertDateTimeToServer(values.dateAudit);

    const entity = {
      ...logAuditEntity,
      ...values,
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
          ...logAuditEntity,
          dateAudit: convertDateTimeFromServer(logAuditEntity.dateAudit),
          customer: logAuditEntity?.customer?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.logAudit.home.createOrEditLabel" data-cy="LogAuditCreateUpdateHeading">
            <Translate contentKey="ceetApp.logAudit.home.createOrEditLabel">Create or edit a LogAudit</Translate>
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
                  id="log-audit-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceetApp.logAudit.levelAudit')}
                id="log-audit-levelAudit"
                name="levelAudit"
                data-cy="levelAudit"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 400, message: translate('entity.validation.maxlength', { max: 400 }) },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.logAudit.logName')}
                id="log-audit-logName"
                name="logName"
                data-cy="logName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 400, message: translate('entity.validation.maxlength', { max: 400 }) },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.logAudit.messageAudit')}
                id="log-audit-messageAudit"
                name="messageAudit"
                data-cy="messageAudit"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 400, message: translate('entity.validation.maxlength', { max: 400 }) },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.logAudit.dateAudit')}
                id="log-audit-dateAudit"
                name="dateAudit"
                data-cy="dateAudit"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="log-audit-customer"
                name="customer"
                data-cy="customer"
                label={translate('ceetApp.logAudit.customer')}
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
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/log-audit" replace variant="info">
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

export default LogAuditUpdate;
