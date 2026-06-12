import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './bounding-schedule.reducer';

export const BoundingScheduleDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const boundingScheduleEntity = useAppSelector(state => state.boundingSchedule.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="boundingScheduleDetailsHeading">
          <Translate contentKey="ceetApp.boundingSchedule.detail.title">BoundingSchedule</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{boundingScheduleEntity.id}</dd>
          <dt>
            <Translate contentKey="ceetApp.boundingSchedule.bondingInstructor">Bonding Instructor</Translate>
          </dt>
          <dd>{boundingScheduleEntity.bondingInstructor ? boundingScheduleEntity.bondingInstructor.id : ''}</dd>
          <dt>
            <Translate contentKey="ceetApp.boundingSchedule.instructorWorkingDay">Instructor Working Day</Translate>
          </dt>
          <dd>{boundingScheduleEntity.instructorWorkingDay ? boundingScheduleEntity.instructorWorkingDay.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/bounding-schedule" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/bounding-schedule/${boundingScheduleEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BoundingScheduleDetail;
