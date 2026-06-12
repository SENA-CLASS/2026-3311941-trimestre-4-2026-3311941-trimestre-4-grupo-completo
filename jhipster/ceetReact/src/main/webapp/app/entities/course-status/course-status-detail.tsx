import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './course-status.reducer';

export const CourseStatusDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const courseStatusEntity = useAppSelector(state => state.courseStatus.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="courseStatusDetailsHeading">
          <Translate contentKey="ceetApp.courseStatus.detail.title">CourseStatus</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{courseStatusEntity.id}</dd>
          <dt>
            <span id="nameCourseStatus">
              <Translate contentKey="ceetApp.courseStatus.nameCourseStatus">Name Course Status</Translate>
            </span>
          </dt>
          <dd>{courseStatusEntity.nameCourseStatus}</dd>
          <dt>
            <span id="stateCourse">
              <Translate contentKey="ceetApp.courseStatus.stateCourse">State Course</Translate>
            </span>
          </dt>
          <dd>{courseStatusEntity.stateCourse}</dd>
        </dl>
        <Button as={Link as any} to="/course-status" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/course-status/${courseStatusEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CourseStatusDetail;
