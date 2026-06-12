import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './course.reducer';

export const CourseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const courseEntity = useAppSelector(state => state.course.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="courseDetailsHeading">
          <Translate contentKey="ceetApp.course.detail.title">Course</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{courseEntity.id}</dd>
          <dt>
            <span id="courseNumber">
              <Translate contentKey="ceetApp.course.courseNumber">Course Number</Translate>
            </span>
          </dt>
          <dd>{courseEntity.courseNumber}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="ceetApp.course.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {courseEntity.startDate ? <TextFormat value={courseEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="ceetApp.course.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>{courseEntity.endDate ? <TextFormat value={courseEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="route">
              <Translate contentKey="ceetApp.course.route">Route</Translate>
            </span>
          </dt>
          <dd>{courseEntity.route}</dd>
          <dt>
            <Translate contentKey="ceetApp.course.courseStatus">Course Status</Translate>
          </dt>
          <dd>{courseEntity.courseStatus ? courseEntity.courseStatus.nameCourseStatus : ''}</dd>
          <dt>
            <Translate contentKey="ceetApp.course.workingDayCourse">Working Day Course</Translate>
          </dt>
          <dd>{courseEntity.workingDayCourse ? courseEntity.workingDayCourse.workingDayName : ''}</dd>
          <dt>
            <Translate contentKey="ceetApp.course.trainingProgram">Training Program</Translate>
          </dt>
          <dd>{courseEntity.trainingProgram ? courseEntity.trainingProgram.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/course" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/course/${courseEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CourseDetail;
