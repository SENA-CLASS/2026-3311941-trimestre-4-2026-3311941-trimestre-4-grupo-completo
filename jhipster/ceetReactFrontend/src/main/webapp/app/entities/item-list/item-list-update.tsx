import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCheckLists } from 'app/entities/check-list/check-list.reducer';
import { getEntities as getLearningResults } from 'app/entities/learning-result/learning-result.reducer';

import { createEntity, getEntity, reset, updateEntity } from './item-list.reducer';

export const ItemListUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const checkLists = useAppSelector(state => state.checkList.entities);
  const learningResults = useAppSelector(state => state.learningResult.entities);
  const itemListEntity = useAppSelector(state => state.itemList.entity);
  const loading = useAppSelector(state => state.itemList.loading);
  const updating = useAppSelector(state => state.itemList.updating);
  const updateSuccess = useAppSelector(state => state.itemList.updateSuccess);

  const handleClose = () => {
    navigate(`/item-list${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCheckLists({}));
    dispatch(getLearningResults({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.itemNumber !== undefined && typeof values.itemNumber !== 'number') {
      values.itemNumber = Number(values.itemNumber);
    }

    const entity = {
      ...itemListEntity,
      ...values,
      checkList: checkLists.find(it => it.id.toString() === values.checkList?.toString()),
      learningResult: learningResults.find(it => it.id.toString() === values.learningResult?.toString()),
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
          ...itemListEntity,
          checkList: itemListEntity?.checkList?.id,
          learningResult: itemListEntity?.learningResult?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.itemList.home.createOrEditLabel" data-cy="ItemListCreateUpdateHeading">
            <Translate contentKey="ceet2App.itemList.home.createOrEditLabel">Create or edit a ItemList</Translate>
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
                  id="item-list-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceet2App.itemList.itemNumber')}
                id="item-list-itemNumber"
                name="itemNumber"
                data-cy="itemNumber"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('ceet2App.itemList.question')}
                id="item-list-question"
                name="question"
                data-cy="question"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 1000, message: translate('entity.validation.maxlength', { max: 1000 }) },
                }}
              />
              <ValidatedField
                id="item-list-checkList"
                name="checkList"
                data-cy="checkList"
                label={translate('ceet2App.itemList.checkList')}
                type="select"
                required
              >
                <option value="" key="0" />
                {checkLists
                  ? checkLists.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.listName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="item-list-learningResult"
                name="learningResult"
                data-cy="learningResult"
                label={translate('ceet2App.itemList.learningResult')}
                type="select"
                required
              >
                <option value="" key="0" />
                {learningResults
                  ? learningResults.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/item-list" replace variant="info">
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

export default ItemListUpdate;
