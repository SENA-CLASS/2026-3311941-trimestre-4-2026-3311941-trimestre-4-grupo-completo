import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './classroom.reducer';

export const ClassroomDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const classroomEntity = useAppSelector(state => state.classroom.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="classroomDetailsHeading">
          <Translate contentKey="ceet2App.classroom.detail.title">Classroom</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{classroomEntity.id}</dd>
          <dt>
            <span id="classroomNumber">
              <Translate contentKey="ceet2App.classroom.classroomNumber">Classroom Number</Translate>
            </span>
          </dt>
          <dd>{classroomEntity.classroomNumber}</dd>
          <dt>
            <span id="classroomDescription">
              <Translate contentKey="ceet2App.classroom.classroomDescription">Classroom Description</Translate>
            </span>
          </dt>
          <dd>{classroomEntity.classroomDescription}</dd>
          <dt>
            <span id="classroomState">
              <Translate contentKey="ceet2App.classroom.classroomState">Classroom State</Translate>
            </span>
          </dt>
          <dd>{classroomEntity.classroomState}</dd>
          <dt>
            <span id="limitation">
              <Translate contentKey="ceet2App.classroom.limitation">Limitation</Translate>
            </span>
          </dt>
          <dd>{classroomEntity.limitation}</dd>
          <dt>
            <Translate contentKey="ceet2App.classroom.classroomType">Classroom Type</Translate>
          </dt>
          <dd>{classroomEntity.classroomType ? classroomEntity.classroomType.typeClassroom : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.classroom.campus">Campus</Translate>
          </dt>
          <dd>{classroomEntity.campus ? classroomEntity.campus.campusName : ''}</dd>
        </dl>
        <Button as={Link as any} to="/classroom" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/classroom/${classroomEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ClassroomDetail;
