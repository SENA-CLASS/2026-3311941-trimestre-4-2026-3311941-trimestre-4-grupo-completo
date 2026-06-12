import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './classroom-type.reducer';

export const ClassroomTypeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const classroomTypeEntity = useAppSelector(state => state.classroomType.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="classroomTypeDetailsHeading">
          <Translate contentKey="ceetApp.classroomType.detail.title">ClassroomType</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{classroomTypeEntity.id}</dd>
          <dt>
            <span id="typeClassroom">
              <Translate contentKey="ceetApp.classroomType.typeClassroom">Type Classroom</Translate>
            </span>
          </dt>
          <dd>{classroomTypeEntity.typeClassroom}</dd>
          <dt>
            <span id="classroomDescription">
              <Translate contentKey="ceetApp.classroomType.classroomDescription">Classroom Description</Translate>
            </span>
          </dt>
          <dd>{classroomTypeEntity.classroomDescription}</dd>
          <dt>
            <span id="classroomState">
              <Translate contentKey="ceetApp.classroomType.classroomState">Classroom State</Translate>
            </span>
          </dt>
          <dd>{classroomTypeEntity.classroomState}</dd>
        </dl>
        <Button as={Link as any} to="/classroom-type" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/classroom-type/${classroomTypeEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ClassroomTypeDetail;
