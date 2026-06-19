import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { DurationFormat } from 'app/shared/DurationFormat';

import { getEntity } from './schedule.reducer';

export const ScheduleDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const scheduleEntity = useAppSelector(state => state.schedule.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="scheduleDetailsHeading">
          <Translate contentKey="ceet2App.schedule.detail.title">Schedule</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{scheduleEntity.id}</dd>
          <dt>
            <span id="startTime">
              <Translate contentKey="ceet2App.schedule.startTime">Start Time</Translate>
            </span>
          </dt>
          <dd>
            {scheduleEntity.startTime ? <DurationFormat value={scheduleEntity.startTime} /> : null} ({scheduleEntity.startTime})
          </dd>
          <dt>
            <span id="endTime">
              <Translate contentKey="ceet2App.schedule.endTime">End Time</Translate>
            </span>
          </dt>
          <dd>
            {scheduleEntity.endTime ? <DurationFormat value={scheduleEntity.endTime} /> : null} ({scheduleEntity.endTime})
          </dd>
          <dt>
            <Translate contentKey="ceet2App.schedule.scheduleVersion">Schedule Version</Translate>
          </dt>
          <dd>{scheduleEntity.scheduleVersion ? scheduleEntity.scheduleVersion.id : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.schedule.modality">Modality</Translate>
          </dt>
          <dd>{scheduleEntity.modality ? scheduleEntity.modality.modalityName : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.schedule.day">Day</Translate>
          </dt>
          <dd>{scheduleEntity.day ? scheduleEntity.day.dayName : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.schedule.courseTrimester">Course Trimester</Translate>
          </dt>
          <dd>{scheduleEntity.courseTrimester ? scheduleEntity.courseTrimester.id : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.schedule.classroom">Classroom</Translate>
          </dt>
          <dd>{scheduleEntity.classroom ? scheduleEntity.classroom.id : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.schedule.instructor">Instructor</Translate>
          </dt>
          <dd>{scheduleEntity.instructor ? scheduleEntity.instructor.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/schedule" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/schedule/${scheduleEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ScheduleDetail;
