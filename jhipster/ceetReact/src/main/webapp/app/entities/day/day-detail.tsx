import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './day.reducer';

export const DayDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const dayEntity = useAppSelector(state => state.day.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="dayDetailsHeading">
          <Translate contentKey="ceetApp.day.detail.title">Day</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{dayEntity.id}</dd>
          <dt>
            <span id="dayName">
              <Translate contentKey="ceetApp.day.dayName">Day Name</Translate>
            </span>
          </dt>
          <dd>{dayEntity.dayName}</dd>
          <dt>
            <span id="dayState">
              <Translate contentKey="ceetApp.day.dayState">Day State</Translate>
            </span>
          </dt>
          <dd>{dayEntity.dayState}</dd>
        </dl>
        <Button as={Link as any} to="/day" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/day/${dayEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DayDetail;
