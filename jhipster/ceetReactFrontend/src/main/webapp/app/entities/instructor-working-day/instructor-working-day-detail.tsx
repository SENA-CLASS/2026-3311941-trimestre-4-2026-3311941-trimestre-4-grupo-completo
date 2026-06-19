import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './instructor-working-day.reducer';

export const InstructorWorkingDayDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const instructorWorkingDayEntity = useAppSelector(state => state.instructorWorkingDay.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="instructorWorkingDayDetailsHeading">
          <Translate contentKey="ceet2App.instructorWorkingDay.detail.title">InstructorWorkingDay</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{instructorWorkingDayEntity.id}</dd>
          <dt>
            <span id="nameWorkingDay">
              <Translate contentKey="ceet2App.instructorWorkingDay.nameWorkingDay">Name Working Day</Translate>
            </span>
          </dt>
          <dd>{instructorWorkingDayEntity.nameWorkingDay}</dd>
          <dt>
            <span id="descriptionWorkingDay">
              <Translate contentKey="ceet2App.instructorWorkingDay.descriptionWorkingDay">Description Working Day</Translate>
            </span>
          </dt>
          <dd>{instructorWorkingDayEntity.descriptionWorkingDay}</dd>
          <dt>
            <span id="workingDayState">
              <Translate contentKey="ceet2App.instructorWorkingDay.workingDayState">Working Day State</Translate>
            </span>
          </dt>
          <dd>{instructorWorkingDayEntity.workingDayState}</dd>
        </dl>
        <Button as={Link as any} to="/instructor-working-day" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/instructor-working-day/${instructorWorkingDayEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default InstructorWorkingDayDetail;
