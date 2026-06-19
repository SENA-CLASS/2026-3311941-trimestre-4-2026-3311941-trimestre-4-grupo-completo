import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './working-day-course.reducer';

export const WorkingDayCourseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const workingDayCourseEntity = useAppSelector(state => state.workingDayCourse.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="workingDayCourseDetailsHeading">
          <Translate contentKey="ceet2App.workingDayCourse.detail.title">WorkingDayCourse</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{workingDayCourseEntity.id}</dd>
          <dt>
            <span id="workingDayAcronym">
              <Translate contentKey="ceet2App.workingDayCourse.workingDayAcronym">Working Day Acronym</Translate>
            </span>
          </dt>
          <dd>{workingDayCourseEntity.workingDayAcronym}</dd>
          <dt>
            <span id="workingDayName">
              <Translate contentKey="ceet2App.workingDayCourse.workingDayName">Working Day Name</Translate>
            </span>
          </dt>
          <dd>{workingDayCourseEntity.workingDayName}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="ceet2App.workingDayCourse.description">Description</Translate>
            </span>
          </dt>
          <dd>{workingDayCourseEntity.description}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="ceet2App.workingDayCourse.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{workingDayCourseEntity.imageUrl}</dd>
          <dt>
            <span id="stateWorkingDay">
              <Translate contentKey="ceet2App.workingDayCourse.stateWorkingDay">State Working Day</Translate>
            </span>
          </dt>
          <dd>{workingDayCourseEntity.stateWorkingDay}</dd>
        </dl>
        <Button as={Link as any} to="/working-day-course" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/working-day-course/${workingDayCourseEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default WorkingDayCourseDetail;
