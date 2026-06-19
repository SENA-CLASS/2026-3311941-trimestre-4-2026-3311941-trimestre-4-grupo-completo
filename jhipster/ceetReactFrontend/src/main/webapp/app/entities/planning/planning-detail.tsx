import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './planning.reducer';

export const PlanningDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const planningEntity = useAppSelector(state => state.planning.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="planningDetailsHeading">
          <Translate contentKey="ceet2App.planning.detail.title">Planning</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{planningEntity.id}</dd>
          <dt>
            <span id="planningCode">
              <Translate contentKey="ceet2App.planning.planningCode">Planning Code</Translate>
            </span>
          </dt>
          <dd>{planningEntity.planningCode}</dd>
          <dt>
            <span id="planningDate">
              <Translate contentKey="ceet2App.planning.planningDate">Planning Date</Translate>
            </span>
          </dt>
          <dd>
            {planningEntity.planningDate ? <TextFormat value={planningEntity.planningDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="planningState">
              <Translate contentKey="ceet2App.planning.planningState">Planning State</Translate>
            </span>
          </dt>
          <dd>{planningEntity.planningState}</dd>
        </dl>
        <Button as={Link as any} to="/planning" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/planning/${planningEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PlanningDetail;
