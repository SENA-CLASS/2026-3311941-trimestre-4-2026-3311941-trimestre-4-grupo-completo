import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './classroom-limitation.reducer';

export const ClassroomLimitationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const classroomLimitationEntity = useAppSelector(state => state.classroomLimitation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="classroomLimitationDetailsHeading">
          <Translate contentKey="ceet2App.classroomLimitation.detail.title">ClassroomLimitation</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{classroomLimitationEntity.id}</dd>
          <dt>
            <Translate contentKey="ceet2App.classroomLimitation.classroom">Classroom</Translate>
          </dt>
          <dd>{classroomLimitationEntity.classroom ? classroomLimitationEntity.classroom.id : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.classroomLimitation.learningResult">Learning Result</Translate>
          </dt>
          <dd>{classroomLimitationEntity.learningResult ? classroomLimitationEntity.learningResult.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/classroom-limitation" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/classroom-limitation/${classroomLimitationEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ClassroomLimitationDetail;
