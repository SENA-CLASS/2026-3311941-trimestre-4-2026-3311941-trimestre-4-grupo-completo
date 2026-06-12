import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './item-list.reducer';

export const ItemListDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const itemListEntity = useAppSelector(state => state.itemList.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="itemListDetailsHeading">
          <Translate contentKey="ceetApp.itemList.detail.title">ItemList</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{itemListEntity.id}</dd>
          <dt>
            <span id="itemNumber">
              <Translate contentKey="ceetApp.itemList.itemNumber">Item Number</Translate>
            </span>
          </dt>
          <dd>{itemListEntity.itemNumber}</dd>
          <dt>
            <span id="question">
              <Translate contentKey="ceetApp.itemList.question">Question</Translate>
            </span>
          </dt>
          <dd>{itemListEntity.question}</dd>
          <dt>
            <Translate contentKey="ceetApp.itemList.checkList">Check List</Translate>
          </dt>
          <dd>{itemListEntity.checkList ? itemListEntity.checkList.listName : ''}</dd>
          <dt>
            <Translate contentKey="ceetApp.itemList.learningResult">Learning Result</Translate>
          </dt>
          <dd>{itemListEntity.learningResult ? itemListEntity.learningResult.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/item-list" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/item-list/${itemListEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ItemListDetail;
