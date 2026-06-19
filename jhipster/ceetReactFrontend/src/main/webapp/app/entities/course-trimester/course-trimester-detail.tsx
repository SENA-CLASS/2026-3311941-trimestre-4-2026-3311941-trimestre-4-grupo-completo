import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './course-trimester.reducer';

export const CourseTrimesterDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const courseTrimesterEntity = useAppSelector(state => state.courseTrimester.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="courseTrimesterDetailsHeading">
          <Translate contentKey="ceet2App.courseTrimester.detail.title">CourseTrimester</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{courseTrimesterEntity.id}</dd>
          <dt>
            <Translate contentKey="ceet2App.courseTrimester.course">Course</Translate>
          </dt>
          <dd>{courseTrimesterEntity.course ? courseTrimesterEntity.course.courseNumber : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.courseTrimester.trimester">Trimester</Translate>
          </dt>
          <dd>{courseTrimesterEntity.trimester ? courseTrimesterEntity.trimester.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/course-trimester" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/course-trimester/${courseTrimesterEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CourseTrimesterDetail;
