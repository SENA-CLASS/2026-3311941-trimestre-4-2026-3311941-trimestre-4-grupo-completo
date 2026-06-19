import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { DurationFormat } from 'app/shared/DurationFormat';

import { getEntity } from './working-day.reducer';

export const WorkingDayDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const workingDayEntity = useAppSelector(state => state.workingDay.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="workingDayDetailsHeading">
          <Translate contentKey="ceet2App.workingDay.detail.title">WorkingDay</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{workingDayEntity.id}</dd>
          <dt>
            <span id="startTime">
              <Translate contentKey="ceet2App.workingDay.startTime">Start Time</Translate>
            </span>
          </dt>
          <dd>
            {workingDayEntity.startTime ? <DurationFormat value={workingDayEntity.startTime} /> : null} ({workingDayEntity.startTime})
          </dd>
          <dt>
            <span id="endTime">
              <Translate contentKey="ceet2App.workingDay.endTime">End Time</Translate>
            </span>
          </dt>
          <dd>
            {workingDayEntity.endTime ? <DurationFormat value={workingDayEntity.endTime} /> : null} ({workingDayEntity.endTime})
          </dd>
          <dt>
            <Translate contentKey="ceet2App.workingDay.instructorWorkingDay">Instructor Working Day</Translate>
          </dt>
          <dd>{workingDayEntity.instructorWorkingDay ? workingDayEntity.instructorWorkingDay.nameWorkingDay : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.workingDay.day">Day</Translate>
          </dt>
          <dd>{workingDayEntity.day ? workingDayEntity.day.dayName : ''}</dd>
        </dl>
        <Button as={Link as any} to="/working-day" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/working-day/${workingDayEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default WorkingDayDetail;
