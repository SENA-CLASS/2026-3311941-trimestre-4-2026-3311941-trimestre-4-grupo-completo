import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './check-list.reducer';

export const CheckListDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const checkListEntity = useAppSelector(state => state.checkList.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="checkListDetailsHeading">
          <Translate contentKey="ceet2App.checkList.detail.title">CheckList</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{checkListEntity.id}</dd>
          <dt>
            <span id="listName">
              <Translate contentKey="ceet2App.checkList.listName">List Name</Translate>
            </span>
          </dt>
          <dd>{checkListEntity.listName}</dd>
          <dt>
            <span id="listState">
              <Translate contentKey="ceet2App.checkList.listState">List State</Translate>
            </span>
          </dt>
          <dd>{checkListEntity.listState}</dd>
          <dt>
            <Translate contentKey="ceet2App.checkList.trainingProgram">Training Program</Translate>
          </dt>
          <dd>{checkListEntity.trainingProgram ? checkListEntity.trainingProgram.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/check-list" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/check-list/${checkListEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CheckListDetail;
