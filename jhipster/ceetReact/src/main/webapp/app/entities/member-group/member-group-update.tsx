import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getApprentices } from 'app/entities/apprentice/apprentice.reducer';
import { getEntities as getProjectGroups } from 'app/entities/project-group/project-group.reducer';

import { createEntity, getEntity, reset, updateEntity } from './member-group.reducer';

export const MemberGroupUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const projectGroups = useAppSelector(state => state.projectGroup.entities);
  const apprentices = useAppSelector(state => state.apprentice.entities);
  const memberGroupEntity = useAppSelector(state => state.memberGroup.entity);
  const loading = useAppSelector(state => state.memberGroup.loading);
  const updating = useAppSelector(state => state.memberGroup.updating);
  const updateSuccess = useAppSelector(state => state.memberGroup.updateSuccess);

  const handleClose = () => {
    navigate(`/member-group${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getProjectGroups({}));
    dispatch(getApprentices({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...memberGroupEntity,
      ...values,
      projectGroup: projectGroups.find(it => it.id.toString() === values.projectGroup?.toString()),
      apprentice: apprentices.find(it => it.id.toString() === values.apprentice?.toString()),
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
          ...memberGroupEntity,
          projectGroup: memberGroupEntity?.projectGroup?.id,
          apprentice: memberGroupEntity?.apprentice?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceetApp.memberGroup.home.createOrEditLabel" data-cy="MemberGroupCreateUpdateHeading">
            <Translate contentKey="ceetApp.memberGroup.home.createOrEditLabel">Create or edit a MemberGroup</Translate>
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
                  id="member-group-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                id="member-group-projectGroup"
                name="projectGroup"
                data-cy="projectGroup"
                label={translate('ceetApp.memberGroup.projectGroup')}
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
                id="member-group-apprentice"
                name="apprentice"
                data-cy="apprentice"
                label={translate('ceetApp.memberGroup.apprentice')}
                type="select"
                required
              >
                <option value="" key="0" />
                {apprentices
                  ? apprentices.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/member-group" replace variant="info">
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

export default MemberGroupUpdate;
