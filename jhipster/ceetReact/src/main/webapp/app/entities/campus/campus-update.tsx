import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { State } from 'app/shared/model/enumerations/state.model';

import { createEntity, getEntity, reset, updateEntity } from './campus.reducer';

export const CampusUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const campusEntity = useAppSelector(state => state.campus.entity);
  const loading = useAppSelector(state => state.campus.loading);
  const updating = useAppSelector(state => state.campus.updating);
  const updateSuccess = useAppSelector(state => state.campus.updateSuccess);
  const stateValues = Object.keys(State);

  const handleClose = () => {
    navigate(`/campus${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...campusEntity,
      ...values,
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
          campusState: 'ACTIVE',
          ...campusEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.campus.home.createOrEditLabel" data-cy="CampusCreateUpdateHeading">
            <Translate contentKey="ceetApp.campus.home.createOrEditLabel">Create or edit a Campus</Translate>
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
                  id="campus-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceetApp.campus.campusName')}
                id="campus-campusName"
                name="campusName"
                data-cy="campusName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.campus.campusAddress')}
                id="campus-campusAddress"
                name="campusAddress"
                data-cy="campusAddress"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 400, message: translate('entity.validation.maxlength', { max: 400 }) },
                }}
              />
              <ValidatedField
                label={translate('ceetApp.campus.campusState')}
                id="campus-campusState"
                name="campusState"
                data-cy="campusState"
                type="select"
              >
                {stateValues.map(state => (
                  <option value={state} key={state}>
                    {translate(`ceetApp.State.${state}`)}
                  </option>
                ))}
              </ValidatedField>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/campus" replace variant="info">
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

export default CampusUpdate;
