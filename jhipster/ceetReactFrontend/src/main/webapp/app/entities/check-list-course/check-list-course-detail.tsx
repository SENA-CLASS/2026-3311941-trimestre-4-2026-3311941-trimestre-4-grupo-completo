import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './check-list-course.reducer';

export const CheckListCourseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const checkListCourseEntity = useAppSelector(state => state.checkListCourse.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="checkListCourseDetailsHeading">
          <Translate contentKey="ceet2App.checkListCourse.detail.title">CheckListCourse</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{checkListCourseEntity.id}</dd>
          <dt>
            <span id="checkListState">
              <Translate contentKey="ceet2App.checkListCourse.checkListState">Check List State</Translate>
            </span>
          </dt>
          <dd>{checkListCourseEntity.checkListState}</dd>
          <dt>
            <Translate contentKey="ceet2App.checkListCourse.course">Course</Translate>
          </dt>
          <dd>{checkListCourseEntity.course ? checkListCourseEntity.course.id : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.checkListCourse.checkList">Check List</Translate>
          </dt>
          <dd>{checkListCourseEntity.checkList ? checkListCourseEntity.checkList.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/check-list-course" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/check-list-course/${checkListCourseEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CheckListCourseDetail;
