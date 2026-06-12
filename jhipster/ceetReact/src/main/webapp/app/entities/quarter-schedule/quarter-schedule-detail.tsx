import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './quarter-schedule.reducer';

export const QuarterScheduleDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const quarterScheduleEntity = useAppSelector(state => state.quarterSchedule.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="quarterScheduleDetailsHeading">
          <Translate contentKey="ceetApp.quarterSchedule.detail.title">QuarterSchedule</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{quarterScheduleEntity.id}</dd>
          <dt>
            <Translate contentKey="ceetApp.quarterSchedule.learningResult">Learning Result</Translate>
          </dt>
          <dd>{quarterScheduleEntity.learningResult ? quarterScheduleEntity.learningResult.id : ''}</dd>
          <dt>
            <Translate contentKey="ceetApp.quarterSchedule.planning">Planning</Translate>
          </dt>
          <dd>{quarterScheduleEntity.planning ? quarterScheduleEntity.planning.planningCode : ''}</dd>
          <dt>
            <Translate contentKey="ceetApp.quarterSchedule.trimester">Trimester</Translate>
          </dt>
          <dd>{quarterScheduleEntity.trimester ? quarterScheduleEntity.trimester.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/quarter-schedule" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/quarter-schedule/${quarterScheduleEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default QuarterScheduleDetail;
