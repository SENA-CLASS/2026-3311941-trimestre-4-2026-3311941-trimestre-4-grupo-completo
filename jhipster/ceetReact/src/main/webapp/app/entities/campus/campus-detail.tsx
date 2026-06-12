import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './campus.reducer';

export const CampusDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const campusEntity = useAppSelector(state => state.campus.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="campusDetailsHeading">
          <Translate contentKey="ceetApp.campus.detail.title">Campus</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{campusEntity.id}</dd>
          <dt>
            <span id="campusName">
              <Translate contentKey="ceetApp.campus.campusName">Campus Name</Translate>
            </span>
          </dt>
          <dd>{campusEntity.campusName}</dd>
          <dt>
            <span id="campusAddress">
              <Translate contentKey="ceetApp.campus.campusAddress">Campus Address</Translate>
            </span>
          </dt>
          <dd>{campusEntity.campusAddress}</dd>
          <dt>
            <span id="campusState">
              <Translate contentKey="ceetApp.campus.campusState">Campus State</Translate>
            </span>
          </dt>
          <dd>{campusEntity.campusState}</dd>
        </dl>
        <Button as={Link as any} to="/campus" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/campus/${campusEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CampusDetail;
