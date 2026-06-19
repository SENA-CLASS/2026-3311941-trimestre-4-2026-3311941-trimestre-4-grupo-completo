import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getAssessments } from 'app/entities/assessment/assessment.reducer';
import { getEntities as getItemLists } from 'app/entities/item-list/item-list.reducer';
import { getEntities as getProjectGroups } from 'app/entities/project-group/project-group.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

import { createEntity, getEntity, reset, updateEntity } from './group-response.reducer';

export const GroupResponseUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const projectGroups = useAppSelector(state => state.projectGroup.entities);
  const assessments = useAppSelector(state => state.assessment.entities);
  const itemLists = useAppSelector(state => state.itemList.entities);
  const groupResponseEntity = useAppSelector(state => state.groupResponse.entity);
  const loading = useAppSelector(state => state.groupResponse.loading);
  const updating = useAppSelector(state => state.groupResponse.updating);
  const updateSuccess = useAppSelector(state => state.groupResponse.updateSuccess);

  const handleClose = () => {
    navigate(`/group-response${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getProjectGroups({}));
    dispatch(getAssessments({}));
    dispatch(getItemLists({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.evaluationDate = convertDateTimeToServer(values.evaluationDate);

    const entity = {
      ...groupResponseEntity,
      ...values,
      projectGroup: projectGroups.find(it => it.id.toString() === values.projectGroup?.toString()),
      assessment: assessments.find(it => it.id.toString() === values.assessment?.toString()),
      itemList: itemLists.find(it => it.id.toString() === values.itemList?.toString()),
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
          evaluationDate: displayDefaultDateTime(),
        }
      : {
          ...groupResponseEntity,
          evaluationDate: convertDateTimeFromServer(groupResponseEntity.evaluationDate),
          projectGroup: groupResponseEntity?.projectGroup?.id,
          assessment: groupResponseEntity?.assessment?.id,
          itemList: groupResponseEntity?.itemList?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.groupResponse.home.createOrEditLabel" data-cy="GroupResponseCreateUpdateHeading">
            <Translate contentKey="ceet2App.groupResponse.home.createOrEditLabel">Create or edit a GroupResponse</Translate>
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
                  id="group-response-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceet2App.groupResponse.evaluationDate')}
                id="group-response-evaluationDate"
                name="evaluationDate"
                data-cy="evaluationDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="group-response-projectGroup"
                name="projectGroup"
                data-cy="projectGroup"
                label={translate('ceet2App.groupResponse.projectGroup')}
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
                id="group-response-assessment"
                name="assessment"
                data-cy="assessment"
                label={translate('ceet2App.groupResponse.assessment')}
                type="select"
                required
              >
                <option value="" key="0" />
                {assessments
                  ? assessments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.assessmentType}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="group-response-itemList"
                name="itemList"
                data-cy="itemList"
                label={translate('ceet2App.groupResponse.itemList')}
                type="select"
                required
              >
                <option value="" key="0" />
                {itemLists
                  ? itemLists.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/group-response" replace variant="info">
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

export default GroupResponseUpdate;
