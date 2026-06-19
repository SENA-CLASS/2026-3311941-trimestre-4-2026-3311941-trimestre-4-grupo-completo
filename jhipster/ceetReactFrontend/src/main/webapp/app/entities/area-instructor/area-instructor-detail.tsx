import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './area-instructor.reducer';

export const AreaInstructorDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const areaInstructorEntity = useAppSelector(state => state.areaInstructor.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="areaInstructorDetailsHeading">
          <Translate contentKey="ceet2App.areaInstructor.detail.title">AreaInstructor</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{areaInstructorEntity.id}</dd>
          <dt>
            <span id="areaInstructorState">
              <Translate contentKey="ceet2App.areaInstructor.areaInstructorState">Area Instructor State</Translate>
            </span>
          </dt>
          <dd>{areaInstructorEntity.areaInstructorState}</dd>
          <dt>
            <Translate contentKey="ceet2App.areaInstructor.area">Area</Translate>
          </dt>
          <dd>{areaInstructorEntity.area ? areaInstructorEntity.area.areaName : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.areaInstructor.instructor">Instructor</Translate>
          </dt>
          <dd>{areaInstructorEntity.instructor ? areaInstructorEntity.instructor.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/area-instructor" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/area-instructor/${areaInstructorEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AreaInstructorDetail;
