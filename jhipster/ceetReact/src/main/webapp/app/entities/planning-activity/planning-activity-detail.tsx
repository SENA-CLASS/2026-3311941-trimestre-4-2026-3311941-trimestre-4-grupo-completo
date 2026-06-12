import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './planning-activity.reducer';

export const PlanningActivityDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const planningActivityEntity = useAppSelector(state => state.planningActivity.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="planningActivityDetailsHeading">
          <Translate contentKey="ceetApp.planningActivity.detail.title">PlanningActivity</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{planningActivityEntity.id}</dd>
          <dt>
            <Translate contentKey="ceetApp.planningActivity.quarterSchedule">Quarter Schedule</Translate>
          </dt>
          <dd>{planningActivityEntity.quarterSchedule ? planningActivityEntity.quarterSchedule.id : ''}</dd>
          <dt>
            <Translate contentKey="ceetApp.planningActivity.projectActivity">Project Activity</Translate>
          </dt>
          <dd>{planningActivityEntity.projectActivity ? planningActivityEntity.projectActivity.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/planning-activity" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/planning-activity/${planningActivityEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PlanningActivityDetail;
