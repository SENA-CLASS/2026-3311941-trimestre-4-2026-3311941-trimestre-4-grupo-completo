import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './current-quarter.reducer';

export const CurrentQuarterDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const currentQuarterEntity = useAppSelector(state => state.currentQuarter.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="currentQuarterDetailsHeading">
          <Translate contentKey="ceetApp.currentQuarter.detail.title">CurrentQuarter</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{currentQuarterEntity.id}</dd>
          <dt>
            <span id="scheduledQuarter">
              <Translate contentKey="ceetApp.currentQuarter.scheduledQuarter">Scheduled Quarter</Translate>
            </span>
          </dt>
          <dd>{currentQuarterEntity.scheduledQuarter}</dd>
          <dt>
            <span id="startQuarter">
              <Translate contentKey="ceetApp.currentQuarter.startQuarter">Start Quarter</Translate>
            </span>
          </dt>
          <dd>
            {currentQuarterEntity.startQuarter ? (
              <TextFormat value={currentQuarterEntity.startQuarter} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="endQuarter">
              <Translate contentKey="ceetApp.currentQuarter.endQuarter">End Quarter</Translate>
            </span>
          </dt>
          <dd>
            {currentQuarterEntity.endQuarter ? (
              <TextFormat value={currentQuarterEntity.endQuarter} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="currentQuarterState">
              <Translate contentKey="ceetApp.currentQuarter.currentQuarterState">Current Quarter State</Translate>
            </span>
          </dt>
          <dd>{currentQuarterEntity.currentQuarterState}</dd>
          <dt>
            <Translate contentKey="ceetApp.currentQuarter.year">Year</Translate>
          </dt>
          <dd>{currentQuarterEntity.year ? currentQuarterEntity.year.yearNumber : ''}</dd>
        </dl>
        <Button as={Link as any} to="/current-quarter" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/current-quarter/${currentQuarterEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CurrentQuarterDetail;
