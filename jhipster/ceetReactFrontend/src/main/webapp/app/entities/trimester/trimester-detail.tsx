import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './trimester.reducer';

export const TrimesterDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const trimesterEntity = useAppSelector(state => state.trimester.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="trimesterDetailsHeading">
          <Translate contentKey="ceet2App.trimester.detail.title">Trimester</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{trimesterEntity.id}</dd>
          <dt>
            <span id="trimesterName">
              <Translate contentKey="ceet2App.trimester.trimesterName">Trimester Name</Translate>
            </span>
          </dt>
          <dd>{trimesterEntity.trimesterName}</dd>
          <dt>
            <span id="trimesterState">
              <Translate contentKey="ceet2App.trimester.trimesterState">Trimester State</Translate>
            </span>
          </dt>
          <dd>{trimesterEntity.trimesterState}</dd>
          <dt>
            <Translate contentKey="ceet2App.trimester.workingDayCourse">Working Day Course</Translate>
          </dt>
          <dd>{trimesterEntity.workingDayCourse ? trimesterEntity.workingDayCourse.workingDayName : ''}</dd>
          <dt>
            <Translate contentKey="ceet2App.trimester.levelEducations">Level Educations</Translate>
          </dt>
          <dd>{trimesterEntity.levelEducations ? trimesterEntity.levelEducations.levelName : ''}</dd>
        </dl>
        <Button as={Link as any} to="/trimester" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/trimester/${trimesterEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TrimesterDetail;
