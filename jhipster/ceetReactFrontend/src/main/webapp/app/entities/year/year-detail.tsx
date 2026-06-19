import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './year.reducer';

export const YearDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const yearEntity = useAppSelector(state => state.year.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="yearDetailsHeading">
          <Translate contentKey="ceet2App.year.detail.title">Year</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{yearEntity.id}</dd>
          <dt>
            <span id="yearNumber">
              <Translate contentKey="ceet2App.year.yearNumber">Year Number</Translate>
            </span>
          </dt>
          <dd>{yearEntity.yearNumber}</dd>
          <dt>
            <span id="yearState">
              <Translate contentKey="ceet2App.year.yearState">Year State</Translate>
            </span>
          </dt>
          <dd>{yearEntity.yearState}</dd>
        </dl>
        <Button as={Link as any} to="/year" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/year/${yearEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default YearDetail;
