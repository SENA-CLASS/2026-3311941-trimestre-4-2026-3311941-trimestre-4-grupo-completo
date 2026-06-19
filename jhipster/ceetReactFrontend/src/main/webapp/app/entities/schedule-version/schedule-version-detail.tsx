import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './schedule-version.reducer';

export const ScheduleVersionDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const scheduleVersionEntity = useAppSelector(state => state.scheduleVersion.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="scheduleVersionDetailsHeading">
          <Translate contentKey="ceet2App.scheduleVersion.detail.title">ScheduleVersion</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{scheduleVersionEntity.id}</dd>
          <dt>
            <span id="versionNumber">
              <Translate contentKey="ceet2App.scheduleVersion.versionNumber">Version Number</Translate>
            </span>
          </dt>
          <dd>{scheduleVersionEntity.versionNumber}</dd>
          <dt>
            <span id="versionState">
              <Translate contentKey="ceet2App.scheduleVersion.versionState">Version State</Translate>
            </span>
          </dt>
          <dd>{scheduleVersionEntity.versionState}</dd>
          <dt>
            <Translate contentKey="ceet2App.scheduleVersion.currentQuarter">Current Quarter</Translate>
          </dt>
          <dd>{scheduleVersionEntity.currentQuarter ? scheduleVersionEntity.currentQuarter.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/schedule-version" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/schedule-version/${scheduleVersionEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ScheduleVersionDetail;
