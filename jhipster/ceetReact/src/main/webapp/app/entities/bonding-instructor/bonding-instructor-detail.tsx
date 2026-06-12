import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './bonding-instructor.reducer';

export const BondingInstructorDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const bondingInstructorEntity = useAppSelector(state => state.bondingInstructor.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bondingInstructorDetailsHeading">
          <Translate contentKey="ceetApp.bondingInstructor.detail.title">BondingInstructor</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bondingInstructorEntity.id}</dd>
          <dt>
            <span id="startTime">
              <Translate contentKey="ceetApp.bondingInstructor.startTime">Start Time</Translate>
            </span>
          </dt>
          <dd>
            {bondingInstructorEntity.startTime ? (
              <TextFormat value={bondingInstructorEntity.startTime} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endTime">
              <Translate contentKey="ceetApp.bondingInstructor.endTime">End Time</Translate>
            </span>
          </dt>
          <dd>
            {bondingInstructorEntity.endTime ? (
              <TextFormat value={bondingInstructorEntity.endTime} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="ceetApp.bondingInstructor.year">Year</Translate>
          </dt>
          <dd>{bondingInstructorEntity.year ? bondingInstructorEntity.year.yearNumber : ''}</dd>
          <dt>
            <Translate contentKey="ceetApp.bondingInstructor.instructor">Instructor</Translate>
          </dt>
          <dd>{bondingInstructorEntity.instructor ? bondingInstructorEntity.instructor.id : ''}</dd>
          <dt>
            <Translate contentKey="ceetApp.bondingInstructor.bonding">Bonding</Translate>
          </dt>
          <dd>{bondingInstructorEntity.bonding ? bondingInstructorEntity.bonding.bondingType : ''}</dd>
        </dl>
        <Button as={Link as any} to="/bonding-instructor" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/bonding-instructor/${bondingInstructorEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default BondingInstructorDetail;
