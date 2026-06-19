import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './course-planning.reducer';

export const CoursePlanningDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const coursePlanningEntity = useAppSelector(state => state.coursePlanning.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="coursePlanningDetailsHeading">
          <Translate contentKey="ceet2App.coursePlanning.detail.title">CoursePlanning</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{coursePlanningEntity.id}</dd>
          <dt>
            <span id="stateCoursePlanning">
              <Translate contentKey="ceet2App.coursePlanning.stateCoursePlanning">State Course Planning</Translate>
            </span>
          </dt>
          <dd>{coursePlanningEntity.stateCoursePlanning}</dd>
          <dt>
            <Translate contentKey="ceet2App.coursePlanning.course">Course</Translate>
          </dt>
          <dd>{coursePlanningEntity.course ? coursePlanningEntity.course.courseNumber : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.coursePlanning.planning">Planning</Translate>
          </dt>
          <dd>{coursePlanningEntity.planning ? coursePlanningEntity.planning.planningCode : ''}</dd>
        </dl>
        <Button as={Link as any} to="/course-planning" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/course-planning/${coursePlanningEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CoursePlanningDetail;
